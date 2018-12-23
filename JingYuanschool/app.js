var Bmob = require('/utils/Bmob-1.1.1.min.js');
Bmob.initialize("xxxxxx", "xxxxxx");
App({
  onLaunch: function () {

  },
  randomWord: function (randomFlag, min, max) {
    let str = "",
      pos = "",
      range = min,
      arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
        'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
        'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    if (randomFlag) {
      range = Math.round(Math.random() * (max - min)) + min;
    }
    for (let i = 0; i < range; i++) {
      pos = Math.round(Math.random() * (arr.length - 1));
      str += arr[pos];
    }
    return str;
  },
  up_number: function (objectId, call) {
    const query1 = Bmob.Query('user');
    query1.get(objectId).then(res => {
      call(res);
    }).catch(err => {
      console.log(err)
    })
  },
  getUser: function (tablename, name, call) {
    const query = Bmob.Query(tablename);
    query.equalTo("username", "==", name);
    query.find().then(res => {
      console.log(res)
      call(res)
    });
  },
  getData:function(){
    console.log(Date())
    var data = Date();
    console.log(data.split(" "))
    var arr = data.split(" ")
    return arr;
  },
  sortNumber:function(val){
    return function(a,b){
      var value1 = a[val];
      var value2 = b[val];
      return value2-value1;
    }
  }
})