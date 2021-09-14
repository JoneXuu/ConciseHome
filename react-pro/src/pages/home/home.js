
import './home.scss';
import React from 'react';
import { notification, Timeline ,Card, Avatar} from 'antd';
// import * as Icon from "@ant-design/icons";
import { DeleteTwoTone,PlusOutlined } from "@ant-design/icons";

import { format,differenceInDays } from 'date-fns';
import { fakeData,engineData,usualWebsite,setStorage,getStorage,globalConfig } from '../../common/js/global.js';


export default class Home extends React.Component {  // 类名  继承  react组件
  constructor(props) {
    super(props);
    this.state = {
      keyValue: '',
      baseEngine: 'default',
      historyData: {},
    };
  }
  componentWillMount() {
    this.loadHistoryRecord();
  }
  render() {
    const EngineList = Object.keys(engineData).map(key =>
      <div className={this.state.baseEngine === key ? 'oneEngine active' : 'oneEngine'}
        name={key} key={key} onClick={() => { this.changeEngine(key) }} >
        <img alt={key} className="logoImg" src={engineData[key].img} />
      </div>
    );
    const HistoryList = Object.keys(this.state.historyData).map(timeKey =>
      <Timeline.Item key={timeKey}>
        <div className="historyTitle oneHistory">{timeKey}</div>
        {
          this.state.historyData[timeKey].map((oneRecord,recordIndex) => 
            <div className="oneHistory" key={oneRecord.time} onClick={() => {this.toHistory(oneRecord,timeKey,recordIndex)}}>
              <div className="timeTxt">{format(new Date(oneRecord.time), globalConfig.hmFormat)}</div>
              <div className="titleTxt">{oneRecord.text}</div>
              <DeleteTwoTone onClick={(event) => {event.stopPropagation();this.deleteHistoryRecord(timeKey,recordIndex)}}/>
            </div>
          )
        }
      </Timeline.Item>
    );
    const UsualWebList = usualWebsite.map(web =>
      <Card.Grid className="oneWeb JFlex " key={web.url} onClick={ this.toUrl.bind(this,web.url)}>
        <Avatar size="large" src={web.logo} style={web.style}>{web.alt}</Avatar>
        <div className="webName">{web.text}</div>
      </Card.Grid>
    );
    return (
      <div className="globalContent JFlex">
        <header>
        </header>
        <div className="floatContent">
          <Timeline className="historyArea">
            {HistoryList}
          </Timeline>
          <Card size="small" title="Common WebSite" className="usualWebArea">
            {UsualWebList}
            {/* <Card.Grid className="oneWeb JFlex " onClick={this.addNewUsual}>
              <PlusOutlined />
            </Card.Grid> */}
          </Card>
        </div>
        
        <section className="globalMiddleCont JFlex">
          <div className="engineArea JFlex" id="engineArea">
            {EngineList}
          </div>
          <div className="mianSearchArea JFlex">
            <input className="sInput" value={this.state.keyValue} onChange={this.inputChange}
              id="mianSearchInput" placeholder="输入关键字" onKeyUp={this.onEnterSure}  />
            <div className="JBtn searchBtn bgGradualTheme" data-size="xl" onClick={this.toSearch}>搜索</div>
          </div>
        </section>
      </div>
    )
  }
  changeEngine(type) {
    this.setState({
      baseEngine: type
    });
  }
  inputChange = (event) => { // 实现双向绑定
    this.setState({
      keyValue: event.target.value
    });
  }
  onEnterSure = (e) => {
    if(e.keyCode === 13) {
      this.toSearch();
    }
  }
  addNewUsual() {
    
  }
  toUrl = (url) => {
    // console.log(url);
    window.location.href = url;
    // window.open(url);
  }
  toHistory = (obj, key, ind) => {
    this.deleteHistoryRecord(key,ind);
    this.setState({
      keyValue: obj.text
    }, this.toSearch());// 这个callback执行假的，查查为啥
  }
  toSearch = () => { // 前往搜索
    const txt = this.state.keyValue;
    // console.log(txt);
    if (txt!=='') {
      // setTimeout(() => {
      this.addHistoryRecord();
      this.toUrl(engineData[this.state.baseEngine].url +txt)
      // }, 2000);
    } else {
      notification.error({ message: '提示', description: '搜索内容不能为空' });
    }
  }
  deleteHistoryRecord(key,ind) {
    const oldArr = this.state.historyData;
    oldArr[key].splice(ind, 1);
    if (oldArr[key].length===0) {
      delete oldArr[key];
    }
    this.setState({
      historyData: oldArr,
    });
    setStorage('historyRecord',oldArr)
  }
  loadHistoryRecord() {
    const hisObj = getStorage('historyRecord');
    let newDataObj = {};
    if (hisObj) {
      const dayArr = Object.keys(hisObj).sort((a,b)=>new Date(b).getTime() - new Date(a).getTime() );
      const lastDate = dayArr.slice(-1)[0]; // 获取最后一位
      if (differenceInDays(new Date(), new Date(lastDate)) > globalConfig.maxHistoryDay) {
        dayArr.splice(-1, 1); // 删除最后一位
      }
      dayArr.map(dateKey => {
        newDataObj[dateKey] = hisObj[dateKey];
      });
    } else {
      newDataObj = fakeData;
    }
    this.setState({
      historyData: newDataObj,
    })
  }
  addHistoryRecord() {
    const txt = this.state.keyValue;
    const oldArr = this.state.historyData;
    const daySet = new Set(Object.keys(oldArr));
    const today = format(new Date(), globalConfig.ymdFormat);
    if (daySet.has(today)) {
      oldArr[today].unshift({
        time: new Date(),
        text: txt
      })
    } else {
      oldArr[today]=[{
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