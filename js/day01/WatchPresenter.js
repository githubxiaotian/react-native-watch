/**
 * Created by xiaotian on 2017/3/29.
 */
import React, {Component} from 'react';
import {View} from 'react-native'
import WatchFace from './WatchFace'
import WatchControl from './WatchControl'
import WatchRecord from './WatchRecord'

export default class WatchPresenter extends Component {
    constructor(props) {
        super(props);
    }

    /**
     * 添加一条记录
     * @private
     */
    _addRecord() {
        let recordTime = this.refs.watchFace._getTime();
        this.refs.watchRecord._addRecord(recordTime);
    }

    /**
     * 清楚所有记录
     * @private
     */
    _clearRecord() {
        this.refs.watchFace._clearData();
        this.refs.watchRecord._clearData();
    }

    /**
     * 停止计时
     * @private
     */
    _stopTime() {
        this.refs.watchFace._stopTime();
    }

    /**
     * 开始计时
     * @private
     */
    _startTime() {
        this.refs.watchFace._startTime();
    }

    render() {
        return ( <View >
            <WatchFace ref={'watchFace'}/>
            <WatchControl stopTime={this._stopTime.bind(this)} startTime={this._startTime.bind(this)}
                          addRecord={this._addRecord.bind(this)} clearRecord={ this._clearRecord.bind(this)}/>
            <WatchRecord ref={'watchRecord'}/>
        </View>);
    }
}
