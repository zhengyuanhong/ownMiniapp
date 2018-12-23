var Bmob = require('/utils/Bmob-1.6.4.min.js');
Bmob.initialize("XXXXXXXXXXXX", "XXXXXXXX");
App({
  data:{
    userImg:""
  },
  onLaunch: function () {
  },
/*
  get_Data: function (tableID,lim,off,callData){
    let query = new wx.BaaS.Query()
    let Product = new wx.BaaS.TableObject(tableID)
    Product.setQuery(query).limit(lim).offset(off).find().then(res => {
      callData(res)
    }, err => {
      wx.showToast({
        title: '加载错误，点击左上角重新加载',
        icon: "none",
        duration: 2000
      })
     })
  },
  get_article:function(callBack){
    var that = this;
    let MyContentGroup = new wx.BaaS.ContentGroup(that.data.GroupId)
    MyContentGroup.limit(100).offset(0).find().then(res => {
      callBack(res.data.objects)
    }, err => {
      wx.showToast({
        title: '加载错误，点击左上角重新加载',
        icon: "none",
        duration: 2000
      })
    })
  },
  get_article_content: function (richTextID,callback){
    var that = this;
    let MyContentGroup = new wx.BaaS.ContentGroup(that.data.GroupId)
    MyContentGroup.getContent(richTextID).then(res => {
      callback(res.data)
    }, err => {
      wx.showToast({
        title: '加载错误，点击左上角重新加载',
        icon:"none",
        duration:2000
      })
    })
  },
*/
  get_Bmob_data: function (tableName,l,s,callback){
    const query = Bmob.Query(tableName);
    query.limit(l);
    query.skip(s);
    query.find().then(res => {
      callback(res)
    });
  },
  get_Bmob_oneData: function (tableName, objectId,result){
    const query = Bmob.Query(tableName);
    query.get(objectId).then(res => {
      result(res)
    }).catch(err => {
      wx.showToast({
        title: '加载错误，点击左上角重新加载',
        icon: "none",
        duration: 2000
      })
    })
  },
  Bmob_denglu: function (username, password,callback,errcall){
    Bmob.User.login(username, password).then(res => {
      callback(res)
      wx.showToast({
        title: '登录成功',
        icon: "success",
        duration: 2000
      })
    }).catch(err => {
      errcall(err)
    });
  },
  upload_image: function (tableName,url){
    const query = Bmob.Query(tableName);
    query.set("photo_url",url)
    query.save().then(res => {
      console.log(res)
      wx.showToast({
        title: '上传成功',
        icon: "success",
        duration: 2000
      })
    }).catch(err => {
      console.log(err)
      wx.showToast({
        title: '上传失败',
        icon: "none",
        duration: 2000
      })
    })
  },
  Bmob_dele: function (tableName, objectId){
    const query = Bmob.Query(tableName);
    query.destroy(objectId).then(res => {
      console.log(res)
      wx.showToast({
        title: '删除成功',
        icon: "success",
        duration: 2000
      })
    }).catch(err => {
      console.log(err)
    })
  },
  photo_dele: function (url, callback){
    const del = Bmob.File();
    const val = [url]
    del.destroy(val).then(res => {
      callback(res)
    }).catch(err => {
      console.log(err)
    }) 
  }
})