
import './translate.scss';
import React, { Component } from 'react';
import { Input, Button } from 'antd';
import { getHttp } from 'common/js/http';

const { TextArea } = Input;
let translateTimer = null;

export default class Translate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      translateRes: '', // 翻译完的结果
    };
  }
  // componentDidMount() { // 初始化
  // }
  render() {
    return (
      <div className="translateArea JFlex justStart">
        <TextArea onChange={this.transChange} placeholder="请输入要翻译的内容" onResize={false} allowClear autoSize />
        <Button type="primary" onClick={() => { this.toTranslate() }}>翻译</Button>
        {
          this.state.translateRes ?
            (<TextArea className=" resultInput" value={this.state.translateRes} placeholder="翻译结果" autoSize />) :
            ''
        }
      </div>
    )
  }
  transChange = (event) => {
    const text = event.target.value;
    this.setState({
      translateOrg: text
    });
    if (translateTimer) { clearTimeout(translateTimer) }
    translateTimer = setTimeout(() => {
      this.toTranslate();
    }, 500);
  }
  toTranslate() {
    if (translateTimer) { clearTimeout(translateTimer) }
    if (this.state.translateOrg) {
      getHttp('translate', {
        text: this.state.translateOrg,
      }).then(res => {
        this.setState({
          translateRes: res.data.result
        });
      });
    } else {
      this.setState({
        translateRes: ''
      });
    }
  }
}