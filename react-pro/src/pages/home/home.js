
import './home.scss';
import React, { Component} from 'react';
import { Card, Avatar, Tag} from 'antd';
// import * as Icon from "@ant-design/icons";
import { baseData, setStorage, ifStorageSet, notice} from 'common/js/global.js';
import History from './component/history.js';
import Translate from './component/translate';

export default class Home extends Component {  // 类名  继承  react组件
  constructor(props) {
    super(props);
    this.state = {
      keyValue: '',
      baseEngine: 'baidu',
    };
  }
  componentDidMount() { // 初始化
    this.setState({
      baseEngine: ifStorageSet('baseEngine', this.state.baseEngine)
    });
  }
  render() {
    // 搜索框的引擎图标
    const EngineList = Object.keys(baseData.engineData).map(key =>
      <div className={this.state.baseEngine === key ? 'oneEngine active' : 'oneEngine'}
        name={key} key={key} onClick={() => { this.changeEngine(key) }} >
        <img alt={key} className="logoImg" src={baseData.engineData[key].img} />
      </div>
    );

    // 常用网站面板
    const UsualWebList = baseData.usualWebsite.map(web =>
      <Card.Grid className="oneWeb JFlex " key={web.url} onClick={ this.toUrl.bind(this,web.url)}>
        <Avatar size="large" src={web.logo} style={web.style}>{web.alt}</Avatar>
        <div className="webName">{web.text}</div>
      </Card.Grid>
    );

    // 固定网站板块
    return (
      <div className="globalContent JFlex">
        <header>
        </header>
        <div className="topFloatContent">
          <History toHistory={this.toHistory} onRef={(ref) => { this.$Child = ref }} />
          <Card size="small" title="Common WebSite" className="usualWebArea">
            {UsualWebList}
            {/* <Card.Grid className="oneWeb JFlex " onClick={this.addNewUsual}>
              <PlusOutlined />
            </Card.Grid> */}
          </Card>
          
          <div>
            <Tag color="magenta">固定</Tag>
            <Tag color="red">记事本</Tag>
            <Tag color="volcano">工作任务</Tag>
            {/* <Tag color="orange">orange</Tag>
            <Tag color="gold">gold</Tag>
            <Tag color="lime">lime</Tag>
            <Tag color="green">green</Tag>
            <Tag color="cyan">cyan</Tag>
            <Tag color="blue">blue</Tag>
            <Tag color="geekblue">geekblue</Tag>
            <Tag color="purple">purple</Tag> */}
          </div>
          
        </div>
        
        <section className="globalMiddleCont JFlex">
          <div className="engineArea JFlex" id="engineArea">
            {EngineList}
          </div>
          <div className="mianSearchArea JFlex">
            <input className="sInput" value={this.state.keyValue} onChange={this.inputChange}
              id="mianSearchInput" placeholder={'输入关键字，使用'+ baseData.engineData[this.state.baseEngine].desc + '搜索'} onKeyUp={this.onEnterSure}  />
            <div className="JBtn searchBtn bgGradualTheme" data-size="xl" onClick={this.toSearch}>搜索</div>
          </div>
        </section>

        <div className="bottomFloatContent">
          <Translate />
        </div>
      </div>
    )
  }
  changeEngine(type) {
    this.setState({
      baseEngine: type
    });
    setStorage('baseEngine', type);
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
  toHistory = (obj) => {
    this.setState({
      keyValue: obj.text
    }, () => {
      this.toSearch();
    });
  }
  toSearch = () => { // 前往搜索
    const txt = this.state.keyValue;
    // console.log(txt);
    if (txt !== '') {
      // setTimeout(() => {
      this.$Child.addHistoryRecord(txt); // 加到历史记录组件中去
      this.toUrl(baseData.engineData[this.state.baseEngine].url +txt)
      // }, 2000);
    } else {
      notice('搜索内容不能为空');   
    }
  }
}