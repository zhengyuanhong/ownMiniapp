var Bmob = require('../../utils/Bmob-1.1.1.min.js');
var app = getApp();
Page({
  data: {
    imgurl: "/image/dianzan.png",
    shetuan: [],
  },
  zan: function (e) {
    var that = this;
    console.log(e.target.id)
    const query = Bmob.Query('shetuan');
    var ID = e.target.dataset.f;
    var ID_key = e.target.id;
    var shetuan = wx.getStorageSync("shetuan");
    if (shetuan) {
      var currentId = shetuan[ID_key];
      if (currentId) {
        wx.showToast({
          title: '你已经送过花了',
          icon: 'none',
          duration: 2000
        })
      } else {
        wx.showLoading({
          title: '加载中',
        })
        currentId = !currentId;
        shetuan[ID_key] = currentId;
        query.get(this.data.shetuan[ID].objectId).then(res => {
          console.log(res)
          res.increment("count", 1);
          res.save();
          wx.hideLoading()
          that.onLoad()
        }).catch(err => {
          console.log(err)
        })
        wx.setStorageSync("shetuan", shetuan);
      }
    } else {
      var shetuan = new Object();
      shetuan[ID_key] = true;
      if (shetuan[ID_key]) {
        wx.showLoading({
          title: '加载中',
        })
        query.get(this.data.shetuan[ID].objectId).then(res =>{
          console.log(res)
          res.increment("count", 1);
          res.save();
          wx.hideLoading()
          that.onLoad()
        }).catch(err => {
          console.log(err)
        })
        wx.setStorageSync("shetuan", shetuan);
      }
    }
  },
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    const query = Bmob.Query("shetuan");
    query.order("-count")
    query.find().then(res => {
      console.log(res)
      wx.hideLoading()
      that.setData({
        shetuan: res
      })
    });
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      console.log(res)
    }
    console.log(res)
    return {
      title: '我要你的花花，可以送点我吗',
      path: '/pages/shetuan/shetuan',
      imageUrl: "/image/hua.gif",
    }
  },
})