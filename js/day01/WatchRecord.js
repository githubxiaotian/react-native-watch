/**
 * Created by xiaotian on 2017/3/29.
 */
import React, {Component}from 'react';
import {
    StyleSheet,
    ListView,
    View,
    Text,
    Dimensions,
    ToastAndroid,
    TouchableHighlight
} from 'react-native';
let records = [];
let dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
export default class WatchRecord extends Component {


    constructor(props) {
        super(props);
        this.state = {
            data: dataSource.cloneWithRows(records)
        }
    }

    _addRecord(recordTime) {
        let length = records.length;
        minute = Math.floor(recordTime / (60 * 1000));
        second = Math.floor((recordTime - 6000 * minute) / 1000);
        milSecond = Math.floor((recordTime % 1000) / 10);
        let totalTime =(minute < 10 ? "0" + minute : minute) + ":" + (second < 10 ? "0" + second : second) + "." + (milSecond < 10 ? "0" + milSecond : milSecond);
        records.push({title: '计次' + (length + 1), time: totalTime})
        this.setState({
            data: dataSource.cloneWithRows(records),
        });

    }

    _clearData() {
        records = [];
        this.setState({
            data: dataSource.cloneWithRows(records),
        });
    }

    render() {
        return (
            <ListView
                enableEmptySections={true}
                style={{
                    width: Dimensions.get('window').width,
                    height: Dimensions.get('window').height - 300,
                    paddingLeft: 15,
                }}
                dataSource={this.state.data}
                renderRow={(rowData) =>
                    <View style={{
                        height: 40,
                        borderBottomWidth: 1, borderBottomColor: "#bbb",
                        paddingTop: 5, paddingLeft: 10, paddingRight: 10, paddingBottom: 5,
                        flexDirection: "row",
                        alignItems: "center"
                    }}>
                        <Text style={{
                            backgroundColor: "transparent",
                            flex: 1,
                            textAlign: "left",
                            paddingLeft: 20,
                            color: "#777"
                        }}>{rowData.title}</Text>
                        <View style={{alignItems: "center"}}>
                            <Text style={{
                                backgroundColor: "transparent",
                                flex: 1,
                                textAlign: "right",
                                paddingRight: 20,
                                color: "#222"
                            }}>{rowData.time}</Text>
                        </View>
                    </View>}/>
        );


    }
}