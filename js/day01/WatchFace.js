/**
 * Created by xiaotian on 2017/3/29.
 */
'use strict'
import React, {Component} from 'react';//从react文件中导入默认输出，已经Component属性
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
} from 'react-native';
let watchOn = false;
let initialTime = 0;
let currentTime = 0;
let timeAccumulation = 0;
let recordTime = 0;
export default class WatchFace extends Component {


    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            totalTime: '00:00:00',
            sectionTime: '00:00:00',
        };
    }

    /**
     * 开始计时或者继续计时
     * @private
     */
    _startTime() {
        initialTime = (new Date()).getTime();
        watchOn = true;
        let milSecond, second, minute, countingTime, secmilSecond, secsecond, secminute, seccountingTime ,offsetTime;
        let interval = setInterval(
            () => {
                currentTime = (new Date()).getTime();
                //时间的增加量
                offsetTime = currentTime - initialTime;
                countingTime = timeAccumulation + offsetTime;
                minute = Math.floor(countingTime / (60 * 1000));
                second = Math.floor((countingTime - 6000 * minute) / 1000);
                milSecond = Math.floor((countingTime % 1000) / 10);
                seccountingTime = countingTime - recordTime;
                secminute = Math.floor(seccountingTime / (60 * 1000));
                secsecond = Math.floor((seccountingTime - 6000 * secminute) / 1000);
                secmilSecond = Math.floor((seccountingTime % 1000) / 10);
                this.setState({
                    totalTime: (minute < 10 ? "0" + minute : minute) + ":" + (second < 10 ? "0" + second : second) + "." + (milSecond < 10 ? "0" + milSecond : milSecond),
                    sectionTime: (secminute < 10 ? "0" + secminute : secminute) + ":" + (secsecond < 10 ? "0" + secsecond : secsecond) + "." + (secmilSecond < 10 ? "0" + secmilSecond : secmilSecond),
                });
                if (!watchOn) {
                    clearInterval(interval);
                    timeAccumulation = countingTime
                }
            }, 10);
    }

    _stopTime() {
        watchOn = false;
    }
    _getTime(){
        recordTime = timeAccumulation + currentTime - initialTime;
        return recordTime;
    }
    _clearData(){
         watchOn = false;
         initialTime = 0;
         currentTime = 0;
         timeAccumulation = 0;
         recordTime = 0;
         this.setState({
             totalTime: '00:00:00',
             sectionTime: '00:00:00',
         });
    }
    render() {
        return (<View style={style.watchFaceContainer}>
            <Text style={style.sectionTime}>{this.state.sectionTime}</Text>
            <Text style={style.totalTime}>{this.state.totalTime}</Text>
        </View>);
    }

}

const style = StyleSheet.create({

    watchFaceContainer: {
        flexDirection: 'column',//不指定默认column
        width: Dimensions.get('window').width,
        height: 170,

        paddingTop: 50, paddingLeft: 30, paddingRight: 30, paddingBottom: 50,
        backgroundColor: '#fff',
        borderBottomWidth: 1, borderBottomColor: '#ddd',
    },
    sectionTime: {
        fontSize: 20,
        fontWeight: '100',//字体粗细，值越大，字体越粗
        paddingRight: 30,
        color: '#555',
        position: 'absolute',//不指定默认为，relative
        left: Dimensions.get('window').width - 140,//距离左边的边距，相对于父控件
        top: 30,
    },
    totalTime: {
        alignSelf:'center',
        fontSize: Dimensions.get('window').width === 375 ? 70 : 60,
        fontWeight: '100',
        color: '#222',
        paddingLeft: 20
    },

});