var baseEngine = 'https://kaifa.baidu.com/searchPage?wd=',
engineObj = {
  'default':'https://kaifa.baidu.com/searchPage?wd=',
  'baidu':'https://www.baidu.com/s?ie=UTF-8&wd=',
  'csdn':'https://so.csdn.net/so/search?q=',
  'zhihu':'https://www.zhihu.com/search?type=content&q=',
  'sifou':'https://segmentfault.com/search?q=',
},
keyValue = '';

// init 
(function () {
  setTimeout(() => {    
    changeType();
    const inputDom = document.querySelector("#mianSearchInput");
    // setTimeout(() => {
      // document.body.click();
      // alert('获取焦点，只能这样获取浏览器的焦点了，害')
    inputDom.focus();
    // }, 10)
    inputDom.onkeydown = function(e){
      if (e.keyCode == 13) {
        toSearch();
      }
  }
  }, 0);
})();

function loadEngineIcon() {
  
}

function inputListener(event) { // 输入监听
  keyValue = event.value;
}
function toSearch() { // 确认搜索
  if(keyValue){
    location.href = baseEngine + keyValue;
    // window.open(baseEngine + keyValue);
  } else {
    console.error('搜索内容不能为空');
  }
}

function changeType(selDom) {
  let type = localStorage.getItem('baseType') || 'default';
  if (selDom) {
    type = selDom.getAttribute('name');
    localStorage.setItem('baseType', type);
  }
  baseEngine = engineObj[type];
  const engineList = document.querySelector("#engineArea");// childNodes
  for (let i = 0; i < engineList.childElementCount; i++) {
    const oneDom = engineList.children[i];
    oneDom.className = oneDom.classList.value.replace(/active/g, '').trim();
    if (oneDom.getAttribute('name')===type) {
      oneDom.className += ' active';
    }
  }

}

function uploadChange(e) {
  console.log(e.files[0]);
}