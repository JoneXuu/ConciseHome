
import { gBaseData } from './baseData'
import { globalConfig } from './baseConfig'

import { notification } from 'antd';

export const baseData = gBaseData;
export const gConfig = globalConfig

notification.config({//写配置//一些参你也可以配置到动态的，看个人需要
  placement: 'topRight',
  top: '50px',
  duration: 3,
  // onClick,
  // onClose,
});

export function notice(cont, config = {}) {
  /* 四种调用方式，第二个参如果是关键字，则视为类型，否则就是title,或者是配置对象
  notice('内容');
  notice('内容', 'error'); notice('内容', '注意');
  notice('内容', { tpye: 'error', title: '注意' })
  */
  if (typeof (config) === 'object') {
    let {
      type = 'info', // success/error/warning 
      title = '提示',
    } = config;
    notification[type]({ message: title, description: cont });
  } else {
    let type = 'info', title = config;
    if (/^(error|success|warning)$/.test(config)) {
      type = config;
      title = '提示';
    }
    notification[type]({ message: title, description: cont });
  }
}


export function ifStorageSet(key, defaultVal=undefined) { // 是否有这个缓存，没有则用默认值
  const val = getStorage(key);
  // const defVal = typeof (defaultVal) === 'object' ? JSON.parse(JSON.stringify(defaultVal)) : defaultVal;
  return val === undefined ? defaultVal : val;
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
  const save = typeof (data) === 'string' ? data : JSON.stringify(data);
  localStorage.setItem(key, save)
}
