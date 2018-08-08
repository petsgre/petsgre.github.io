
/**
  自已定封装ajax
  时间:2018.8.7
  作者:张啸
  @默认为异步
  @简单理解callback函数:
  就是，把A函数当作参数传给一个执行函数，你可以执行A，也可以不执行A，A这就叫做回调函数
*/

var myAjax = function (args) {
  var xhr = new XMLHttpRequest();
  var type = args.type
  var url = args.url
  var data = args.data
  var callback = args.callback
  xhr.open(type, url, true)
  xhr.send(data)
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var res
      try {
        res = JSON.parse(xhr.response)
        callback(true, res)
      } catch (e) {
        res = xhr.response
        callback(true, res)
        console.warn('JSON格式不正确!');
      }
    }
    if (xhr.status !== 200 && xhr.readyState === 4) {
      callback(false, res)
    }
    if (xhr.readyState === 4) {
      xhr = null
    }
  }
}
/**
  使用简例=========
  myAjax({
    type:'post',
    url:'./base_data.json',
    data:"传的数据",
    callback:function (succeeded,data) {
      if(succeeded){
        console.log(data);
      }else {
        console.log('失败');
      }
    }
  })
*/
