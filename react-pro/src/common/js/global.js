import logo from '../../assets/image/logo.png';
export const fakeData = {
  '2021-08-23': [{
    time: '2021-08-23 13:50:00',
    text: 'json数据在线解析'
  }, {
    time: '2021-08-23 19:50:00',
    text: 'jset单元测试'
  }],
  '2021-08-22': [{
    time: '2021-08-22 13:50:00',
    text: 'scss高端用法'
  }, {
    time: '2021-08-22 19:50:00',
    text: 'node.js搭建后台'
  }],
  '2021-08-16': [{
    time: '2021-08-21 12:50:00',
    text: 'js时间轴',
  }, {
    time: '2021-08-21 11:50:00',
    text: 'vue中文文档'
  }, {
    time: '2021-08-21 13:50:00',
    text: 'angular实现OA系统'
  }, {
    time: '2021-08-21 19:50:00',
    text: 'react搭建'
  }],
};
export const engineData = {
  'default': {
    url: 'https://kaifa.baidu.com/searchPage?wd=',
    img: logo,
  },
  'baidu': {
    url: 'https://www.baidu.com/s?ie=UTF-8&wd=',
    img: 'https://www.baidu.com/favicon.ico',
  },
  'csdn': {
    url: 'https://so.csdn.net/so/search?q=',
    img: 'https://g.csdnimg.cn/static/logo/favicon32.ico',
  },
  'zhihu': {
    url: 'https://www.zhihu.com/search?type=content&q=',
    img: 'https://static.zhihu.com/heifetz/favicon.ico',
  },
  'sifou': {
    url: 'https://segmentfault.com/search?q=',
    img: 'https://z3.ax1x.com/2021/08/24/hFkggA.png',//'https://cdn.segmentfault.com/v-605daa96/global/img/touch-icon.png',
  },
  'jianshu': {
    url: 'https://www.jianshu.com/search?q=',
    img: 'https://img2.baidu.com/it/u=2733887085,1414025318&fm=26&fmt=auto&gp=0.jpg',
  },
}
export const usualWebsite = [{
    text: 'angular zorro',
    url: 'https://ng.ant.design/components/table/zh',
    logo: 'https://ng.ant.design/assets/img/logo.svg',
  }, {
    text: 'ionic',
    url: 'https://ionicframework.com/docs/api',
    logo: 'https://ionicframework.com/docs/assets/img/meta/favicon-16x16.png',
  }, {
    text: '博客主页',
    url: 'https://blog.csdn.net/xj932956499',
    logo: 'https://g.csdnimg.cn/static/logo/favicon32.ico',
  }, {
    text: 'date-fns',
    url: 'https://blog.csdn.net/fsxxzq521/article/details/85715213',
    logo: '',
    style: { color: '#f56a00', backgroundColor: '#fde3cf' },
    alt:'FNS'
  }, {
    text: 'react antd',
    url: 'https://ant.design/components/icon-cn/',
    logo: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
  }, {
    text: '智超Api',
    url: 'http://172.16.1.84:8001/swagger/index.html',
    style: { color: '#000000', backgroundColor: '#85ea2d' },
    alt:'智'
  }, {
    text: 'TDMS+DevAPI',
    url: 'http://dev.api.senruisoft.com/swagger/index.html',
    style: { color: '#ffffff', backgroundColor: '#134796' },
    alt:'TDMS+'
  }, {
    text: '腹透DevAPI',
    url: 'http://pd-dev.api.senruisoft.com/swagger/index.html',
    style: { color: '#f56a00', backgroundColor: '#fde3cf' },
    alt:'腹'
  }, {
    text: '前端发布',
    url: 'http://139.196.191.60:8383/',
    style: { color: '#ffffff', backgroundColor: '#104E8B' },
    alt: '发布'  
}];
  // http://172.16.1.84:8001/swagger/index.html

export const globalConfig = {
  maxHistoryDay: 7,// 保留7天的历史记录
  ymdFormat:'yyyy-MM-dd',
  hmFormat:'HH:mm',
}

export function getStorage(key) {//: object|string
  const dataStr = localStorage.getItem(key);
  let backData;
  if (dataStr) {
    try {
      backData = JSON.parse(dataStr);
    } catch (e) {
      backData = dataStr;
    }
  }
  return backData;
}
export function setStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data))
}
