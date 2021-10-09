import logo from 'assets/image/logo.png';
export const gBaseData = {
  fakeData: {
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
  },
  engineData: {
    'default': {
      url: 'https://kaifa.baidu.com/searchPage?wd=',
      desc: '百度开发者',
      img: logo,
    },
    'baidu': {
      url: 'https://www.baidu.com/s?ie=UTF-8&wd=',
      desc: '百度',
      img: 'https://www.baidu.com/favicon.ico',
    },
    'csdn': {
      url: 'https://so.csdn.net/so/search?q=',
      desc: 'CSDN博客',
      img: 'https://g.csdnimg.cn/static/logo/favicon32.ico',
    },
    'zhihu': {
      url: 'https://www.zhihu.com/search?type=content&q=',
      desc: '知乎',
      img: 'https://static.zhihu.com/heifetz/favicon.ico',
    },
    'sifou': {
      url: 'https://segmentfault.com/search?q=',
      desc: '思否',
      img: 'https://z3.ax1x.com/2021/08/24/hFkggA.png',//'https://cdn.segmentfault.com/v-605daa96/global/img/touch-icon.png',
    },
    'jianshu': {
      url: 'https://www.jianshu.com/search?q=',
      desc: '简书',
      img: 'https://img2.baidu.com/it/u=2733887085,1414025318&fm=26&fmt=auto&gp=0.jpg',
    },
  },
  fixedWebsite: [{
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
    text: '正则在线',
    url: 'https://c.runoob.com/front-end/854/',
    logo: '',
    style: { color: '#7cb305', backgroundColor: '#fcffe6', border: '1px solid #eaff8f'},
    alt: '正则'
  }, {
    text: 'react antd',
    url: 'https://ant.design/components/icon-cn/',
    logo: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
  }, {
    text: '智超Api',
    url: 'http://172.16.1.84:8001/swagger/index.html',
    style: { color: '#ffffff', backgroundColor: '#ffc107' },
    alt: '智'
  }, {
    text: '血透API',
    url: 'http://dev.api.senruisoft.com/swagger/index.html',
    style: { color: '#ffffff', backgroundColor: '#134796' },
    alt: 'TDMS'
  }, {
    text: '腹透API',
    url: 'http://pd-dev.api.senruisoft.com/swagger/index.html',
    style: { color: '#d4380d', backgroundColor: '#fff2e8' },
    alt: '腹'
  }, {
    text: '前端发布',
    url: 'http://139.196.191.60:8383/',
    style: {color: '#096dd9', background: '#e6f7ff', border: '1px solid #91d5ff'},
    alt: '发布'
  }, {
    text: '占位',
    url: '',
    style: { backgroundColor: '#dddddd' },
    alt: '占'
  }, {
    text: '血透Pad',
    url: 'http://dev.pad.senruisoft.com',
    style: { color: '#c41d7f', backgroundColor: '#fff0f6' },
    alt: '血透'
  }, {
    text: '血透Pc',
    url: 'http://dev.pc.senruisoft.com',
    style: { color: '#cf1322', backgroundColor: '#fff1f0' },
    alt: 'PC'
  }, {
    text: '腹透Pad',
    url: 'http://pd-dev.pad.senruisoft.com',
    style: { color: '#d4380d', backgroundColor: '#fff2e8' },
    alt: 'PD'
  }],
  
  usualWebsite: [{ // 暂时没用
    name: '测试阶段',
    data: [{
      text: 'angular zorro',
      url: 'https://ng.ant.design/components/table/zh',
    }, {
      text: 'ionic',
      url: 'https://ionicframework.com/docs/api',
    }, {
      text: '博客主页',
      url: 'https://blog.csdn.net/xj932956499',
    }, {
      text: 'date-fns',
      url: 'https://blog.csdn.net/fsxxzq521/article/details/85715213',
    }, {
      text: 'react antd',
      url: 'https://ant.design/components/icon-cn/',
    }, {
      text: '测试',
    }, {
      text: '测试',
    }, {
      text: '测试',
    }, {
      text: '测试',
    }, {
      text: '测试',
    }, {
      text: '测试',
    }, {
      text: '测试',
    }, {
      text: '测试',        
    }]
  },{
    name: '公司',
    data: [{
      text: '智超Api',
      url: 'http://172.16.1.84:8001/swagger/index.html',
    }, {
      text: 'TDMS+DevAPI',
      url: 'http://dev.api.senruisoft.com/swagger/index.html',
    }, {
      text: '腹透DevAPI',
      url: 'http://pd-dev.api.senruisoft.com/swagger/index.html',
    }, {
      text: '前端发布',
      url: 'http://139.196.191.60:8383/',
    }]
  }
  ]
}
