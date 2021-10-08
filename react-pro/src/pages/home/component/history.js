
import './history.scss';
import React, { Component } from 'react';
import { Timeline} from 'antd';
import { format, differenceInDays } from 'date-fns';
import { baseData, setStorage, getStorage, gConfig} from 'common/js/global.js';
import { DeleteTwoTone } from "@ant-design/icons";

export default class History extends Component {  // 类名  继承  react组件
  constructor(props) {
    super(props);
    this.state = {
      historyData: {},
    };
  }
  componentDidMount() { // 初始化
    this.props.onRef(this);
    this.loadHistoryRecord();
  }
  render() {
    // 历史记录面板
    return (
      <Timeline className="historyArea">
        {Object.keys(this.state.historyData).map(timeKey =>
          <Timeline.Item key={timeKey}>
            <div className="historyTitle oneHistory">{timeKey}</div>
            {
              this.state.historyData[timeKey].map((oneRecord, recordIndex) =>
                <div className="oneHistory" key={oneRecord.time} onClick={() => { this.clickHistory(oneRecord, timeKey, recordIndex) }}>
                  <div className="timeTxt">{format(new Date(oneRecord.time), gConfig.hmFormat)}</div>
                  <div className="titleTxt">{oneRecord.text}</div>
                  <DeleteTwoTone onClick={(event) => {
                    event.stopPropagation(); this.deleteHistoryRecord(timeKey, recordIndex)
                  }} />
                </div>
              )
            }
          </Timeline.Item>
        )}
      </Timeline>
    )
  }
  clickHistory = (obj, key, ind) => {
    this.deleteHistoryRecord(key, ind);
    this.props.toHistory(obj);
  }
  deleteHistoryRecord(key, ind) { // 删除某个历史记录
    const oldArr = this.state.historyData;
    oldArr[key].splice(ind, 1);
    if (oldArr[key].length === 0) {
      delete oldArr[key];
    }
    this.setState({
      historyData: oldArr,
    });
    setStorage('historyRecord', oldArr)
  }
  loadHistoryRecord() {
    const hisObj = getStorage('historyRecord');
    let newDataObj = {};
    if (hisObj) {
      const dayArr = Object.keys(hisObj).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
      const lastDate = dayArr.slice(-1)[0]; // 获取最后一位
      if (differenceInDays(new Date(), new Date(lastDate)) > gConfig.maxHistoryDay) {
        dayArr.splice(-1, 1); // 删除最后一位
      }
      dayArr.forEach(dateKey => {
        newDataObj[dateKey] = hisObj[dateKey];
      });
    } else {
      newDataObj = baseData.fakeData;
    }
    this.setState({
      historyData: newDataObj,
    })
  }
  addHistoryRecord(txt) {
    const oldArr = this.state.historyData;
    const daySet = new Set(Object.keys(oldArr));
    const today = format(new Date(), gConfig.ymdFormat);
    if (daySet.has(today)) {
      oldArr[today].unshift({
        time: new Date(),
        text: txt
      })
    } else {
      oldArr[today] = [{
        time: new Date(),
        text: txt
      }]
    }
    this.setState({
      historyData: oldArr,
    });
    setStorage('historyRecord', oldArr);
  }
}