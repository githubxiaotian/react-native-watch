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
    ToastAndroid,
    TouchableHighlight
} from 'react-native';
let firstStart = true;
let watchOn = false;
export  default class WatchControl extends Component {
    static propTypes = {
        addRecord: React.PropTypes.func.isRequired,
        clearRecord: React.PropTypes.func.isRequired,
        startTime: React.PropTypes.func.isRequired,
        stopTime: React.PropTypes.func.isRequired
    }
    constructor(props) {
        super(props);
        this.state = {
            start: '启动',
            reSet: '计次',
            startBtnColor: "#60B644",
            underlayColor: '#fff'

        }
    }

    /**
     * 清楚所有记录
     * @private
     */
    _countOrReset() {
        if (firstStart) {//第一次计时还未开始
            return;
        }
        if (watchOn) {
            this.props.addRecord();
        } else {
            this.props.clearRecord();
            watchOn = false;
            firstStart = true,
            this.setState({
                start: '启动',
                reSet: '计次',
                startBtnColor: "#60B644",
                underlayColor: '#fff'
            });
        }

    }

    /**
     * 正在计时，则关闭计时；没有计时，则开始计时
     * @private
     */
    _toggleTime() {
        if (firstStart){
            firstStart = !firstStart;
            this.props.startTime();
            watchOn = true;
            this.setState({
                start: '停止',
                startBtnColor: "#ff0000",
                underlayColor: '#fff'
            });
            return
        }

        if (watchOn) {//正在计时
            watchOn = false;
            this.props.stopTime();
            this.setState ({
                start: '启动',
                reSet: '复位',
                startBtnColor: "#60B644",
                underlayColor: '#fff'
            });
        } else {//没有计时
            watchOn = true;
            this.props.startTime();
            this.setState({
                start: '停止',
                reSet: '计次',
                startBtnColor: "#ff0000",
                underlayColor: '#fff'
            });
        }
    }

    render() {
        return (<View style={style.watchControlContainer}>
                <TouchableHighlight style={style.btnStop} underlayColor='#eee'
                                    onPress={this._countOrReset.bind(this)}>
                    <Text style={style.btnCountText}>{this.state.reSet}</Text>
                </TouchableHighlight>
                <TouchableHighlight style={style.btnStop} underlayColor='#eee'
                                    onPress={this._toggleTime.bind(this)}>
                    <Text style={[style.btnStopText,{color:this.state.startBtnColor}]}>{this.state.start}</Text>
                </TouchableHighlight>
            </View>
        );
    }
}
const style = StyleSheet.create({
    watchControlContainer: {
        flexDirection: 'row',
        height: 130,
        width: Dimensions.get('window').width,
        backgroundColor: '#f3f3f3',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 30, paddingRight: 60, paddingLeft: 60, paddingBottom: 30,
    },
    btnStop: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnCountText: {
        fontSize: 14,
        backgroundColor: 'transparent',
        color: '#555',
    },
    btnStopText: {
        fontSize: 14,
        backgroundColor: 'transparent',
    }

});