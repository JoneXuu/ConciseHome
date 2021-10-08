import axios from "axios";
import { notice, gConfig } from "./global";

export function postHttp(url, sendData) {
  return httpServer(url, {
    method : 'POST',
    data : sendData
  })
}

export function getHttp(url, params) {
  url += '?' // 拼接参数
  Object.keys(params).map(key => {
    url += `${key}=${encodeURIComponent(params[key])}&`
  })
  url = url.substring(0, url.length - 1) // 删除最后一个&字符
  return httpServer(url, {
    method : 'GET',
    // params : params // 默认写进去会把空格转加号
  })
}

/**
 *  接口请求数据时执行的方法
 *  接受参数为请求的路径apiUrl、请求接口配置参数configObj
 *
 * @param {String} apiUrl            用户传入的请求路径
 * @param {Object} configObj        用户传入的接口参数
 */
export function httpServer(apiUrl, configObj = {}) {
  //用户传入的接口配置参数
  let {
    method = 'GET',
    params = {},
    data = {},
    timeout = 1000 * 30
  } = configObj;
  return new Promise(function (resolve, reject) {
    axios({
      url: gConfig.domain + apiUrl,
      method: method,
      params: params,
      data: data,
      timeout: timeout,
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'text/plain;charset=UTF-8'
        // 'token': window.sessionStorage.getItem('token') || ''
      }
    }).then(function (response) {
      // console.log('全局http接收成功', response);
      if (response) {
        if (response.data && response.data.code) {
          resolve(response.data);
        } else {
          notice('返回的数据格式有误','error');
          resolve(response);
        }
      } else {
        //处理特殊的情况就是response返回什么也没有
        notice('服务器错误', 'error');
        resolve(response);
      }
    }).catch(function (error) {
      notice('网络异常,请稍后重试', 'error');
      reject(error);
    })
  })
}