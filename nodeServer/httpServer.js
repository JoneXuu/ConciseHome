var http_sys = require('http');
var axios = require('axios');
var globalResponse = null;
// var url = require('url');
// var fs = require('fs'); // 文件上传
var server = http_sys.createServer(function (inRequest, toResponse) {
  globalResponse = toResponse;
  inRequest.setEncoding('utf-8');
  toResponse.setHeader('access-control-allow-origin', '*');
  toResponse.setHeader("Access-Control-Allow-Headers", "content-type");
  toResponse.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  if (inRequest.method.toLowerCase() == 'options') {
    responseOK('能够ping通');
    return;
  }
  // 遍历设置指定域名允许跨域
  // var orginList = [
  //   "http://www.zhangpeiyue.com",
  //   "http://www.alibaba.com",
  // ]
  // if (orginList.includes(inRequest.headers.origin.toLowerCase())) {
  //   res.header("Access-Control-Allow-Origin", req.headers.origin);
  // }
  try {
    const [requestUrl, requestParams] = inRequest.url.split('?'); // 问号切割路由、参数
    const routerArr = requestUrl.split('/');
    const paramsObj = getParamsObj(requestParams); // get类请求的参数
    let postObj = '';
    inRequest.on('data', function (chunk) { // 监听到post类型请求参数
      postObj = chunk;
      if (/^\[|^\{/g.test(postObj)) {
        postObj = JSON.parse(postObj);
      }
    });
    if (routerArr.length > 1) { // 有路由
      inRequest.on('end', function () { //error、finish
        var [baseEmpty, firstRouter, secondRouter] = routerArr;
        if (firstRouter === 'test') {
          responseOK('测试成功');
        } else if (firstRouter === 'translate') {
          getTranslate(postObj.text, res => {
            responseOK(res);
          })
        } else {
          responseOK('未查询到接口' + firstRouter);
        }
      });
    } else {
      responseError('访问出错');
    }
    // console.log('有请求进入', requestUrl, paramsObj, postObj);
    // url.parse(requestUrl)
    
  } catch (e) {
    responseError(e)
  }
  // toResponse.end();
}).listen(8888, function () {
  console.log('服务启动--开始监听');
});

function getParamsObj(routerStr) {
  const paramsObj = {};
  if (routerStr) { // 有路由参数
    routerStr.split('&').forEach(strQuery => {
      const [key, val] = strQuery.split('=');
      paramsObj[key] = decodeURIComponent(val);
    });
  }
  return paramsObj
}
function responseError(error, body = '内部错误') {
  console.log('错误日志----', error);
  globalResponse.writeHead(500, { 'Content-Type': 'text/html;charset=utf-8' });//设置response编码为utf-8
  globalResponse.write(
    `<h1>Node服务器连接成功</h1>
    <div style="background-color: #efecec;
      padding: 10px;
    }"> ` +
    JSON.stringify({
      code: 500,
      data: body,
      message: error
    }) +
    `</div>`
  );
  globalResponse.end();
};
function responseOK(body) {
  globalResponse.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });//设置response编码为utf-8
  globalResponse.write(JSON.stringify({
    code: 200,
    data: body,
    message: ''
  }));
  globalResponse.end();
};

function toHttpRequest(reqUrl, reqData, met = 'get') {
  const axiosConfig = {
    url: reqUrl,
    method: met,
    json: true,
    headers: {
      "content-type": "application/json",
    },
    data: {},
    params: {}
  }
  if (met && met.toLocaleLowerCase() === 'get') {
    axiosConfig.params = reqData; // 这里可能存在坑，空格变加号类似的，目前没必要处理
  } else {
    axiosConfig.data = reqData;
  }
  return new Promise((resolve, reject) => {
    axios(axiosConfig).then(function (res) {
      // console.log('http结果', res);
      if (res.status === 200) {
        resolve(res);
      } else {
        reject(false);
      }
    });
  })
}

function getTranslate(word, cb) {
  if (typeof (word) ==='undefined') {
    cb({
      origin: word,
      result: '翻译内容为空'
    });
    return
  }
  toHttpRequest('http://fanyi.youdao.com/translate', {
    type: 'auto',
    doctype: 'json',
    i: word
  }).then(res => {
    const objTrans = res.data.translateResult[0][0];
    cb({
      origin: word,
      result: objTrans.tgt
    })
  })
  // ZH_CN2EN 中文　»　英语
  // ZH_CN2JA 中文　»　日语
  // ZH_CN2KR 中文　»　韩语
  // ZH_CN2FR 中文　»　法语
  // ZH_CN2RU 中文　»　俄语
  // ZH_CN2SP 中文　»　西语
  // EN2ZH_CN 英语　»　中文
  // JA2ZH_CN 日语　»　中文
  // KR2ZH_CN 韩语　»　中文
  // FR2ZH_CN 法语　»　中文
  // RU2ZH_CN 俄语　»　中文
  // SP2ZH_CN 西语　»　中文
}
