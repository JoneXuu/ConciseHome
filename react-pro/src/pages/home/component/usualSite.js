
import './usualSite.scss';
import React, { Component } from 'react';
import { Collapse, Tag, Timeline, Modal,Input} from 'antd';
import { baseData} from 'common/js/global.js';

// const { Panel } = Collapse; // 可以写这种引出标签，也可以在行内直接点出来
const tagColor = ['magenta', 'red', 'volcano', 'orange',
  'gold', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple']
function getColor(num) {
  const theLen = tagColor.length;
  if (num >= theLen) {
    return tagColor[num % theLen];
  }
  return tagColor[num];
}
export default class UsualSite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: '',
      tagName: '',
      tagUrl: '',
    };
  }
  // componentDidMount() { // 初始化
  // }
  render() {
    return (
      <div>
      {/* Timeline形式请看本页代码底部 */}
      <Collapse className="usualSiteArea " ghost defaultActiveKey={['0']} onChange={this.transChange}>
        {
          baseData.usualWebsite.map((oneType,ind) =>
            <Collapse.Panel header={oneType.name} key={ind}>
              <Tag onClick={ this.showModal}>新增</Tag>
              {
                oneType.data.map((oneSite,childInd) =>
                  <Tag color={getColor(childInd)} key={ind + '-' +childInd}>{oneSite.text}</Tag>
                )
              }
            </Collapse.Panel>
          )
        }
        </Collapse>
        <Modal title="新增标签" visible={this.state.modalVisible} onOk={this.saveSite} onCancel={this.hideModal}>
          <Input style={{ marginBottom: 10 + 'px' }} placeholder="请输入标签名" value={this.state.tagName} onChange={(e) => { this.valChange('tagName', e.target.value) }}/>
          <Input placeholder="请输入标签地址" value={this.state.tagUrl} onChange={(e) => {this.valChange('tagUrl',e.target.value) }}/>
        </Modal> 
      </div>
    )
  }
  showModal = () => {
    this.setState({
      modalVisible: true
    });
  }
  hideModal = () => {
    this.setState({
      modalVisible: false
    });
  }
  valChange(key, val) {
    const obj = {};
    obj[key] = val;
    this.setState(obj);
  }
  saveSite = () => {
    
  }
  transChange = (key) => {
    console.log('切换', key);
  }
  toDetailTranslate() {
    // window.location.href = `https://dict.youdao.com/search?q=` + this.state.translateOrg;
    window.open(`https://dict.youdao.com/search?q=` + this.state.translateOrg);

  }
}
/*
<Timeline className="usualSiteArea timelineStyle">
  {
    baseData.usualWebsite.map((oneType, ind) =>
      <Timeline.Item header={oneType.name} key={ind}>
        <div className="typeTitle ">{oneType.name}</div>
        {
          oneType.data.map((oneSite, childInd) =>
            <Tag color={getColor(childInd)} key={ind + '-' + childInd}>{oneSite.text}</Tag>
          )
        }
      </Timeline.Item>
    )
  }
</Timeline>
*/