
import './translate.scss';
import React, { Component } from 'react';
import { Input, Button } from 'antd';
import { getHttp, postHttp } from 'common/js/http';

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
      <div className="translateArea ">
        <div className="JFlex justStart alignStart">
          <TextArea onChange={this.transChange} placeholder="请输入要翻译的内容" onResize={false} allowClear autoSize={{ minRows: 1, maxRows: 10 }} />
          <Button type="primary" onClick={() => { this.toTranslate() }}>翻译</Button>
        </div>
        
        {
          this.state.translateRes ?
            (<div>
              <div className="moreTxt" onClick={() => { this.toDetailTranslate() }}>更多详情&gt;&gt;</div>
                <TextArea className=" resultInput"
                  value={this.state.translateRes} placeholder="翻译结果"
                autoSize={{ minRows: 1, maxRows: 10 }} />
            </div>
            ):''
        }
      </div>
    )
  }
  transChange = (event) => {
    const text = event.target.value;
    this.setState({
      translateOrg: text.replace(/\n/g, '')
    });
    if (translateTimer) { clearTimeout(translateTimer) }
    translateTimer = setTimeout(() => {
      this.toTranslate();
    }, 500);
  }
  toTranslate() {
    if (translateTimer) { clearTimeout(translateTimer) }
    if (this.state.translateOrg+''!=='') {
      postHttp('translate', {
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
  toDetailTranslate() {
    // window.location.href = `https://dict.youdao.com/search?q=` + this.state.translateOrg;
    window.open(`https://dict.youdao.com/search?q=` + this.state.translateOrg);

  }
}