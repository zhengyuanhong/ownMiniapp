var Bmob = require('../../utils/Bmob-1.1.1.min.js');
var app = getApp();
Page({
  data: {
    hid:false,
    username: "景院用户",
    userimg: "",
    erwei1: "http://www.chanbaowang.com/wp-content/uploads/2018/05/qrcode_for_gh_8ba1ba530ca1_258.jpg"
  },
  onReady: function () {
    console.log("111")
  },
  onLoad: function (options) {
    
    var configs = wx.getStorageSync("imfor");
    console.log(configs)
    if (configs){
      this.setData({
        username: configs.name,
        userimg: configs.img,
        hid:true
      })
    }else{
      this.setData({
        hid: false
      })     
    }
  },
  onGotUserInfo:function(){
    var data = wx.getStorageSync('imfor');
    var that = this;
    if(!data){
      wx.getUserInfo({
        success: function (res){
          var userInfo = res.userInfo
          var imfor = {}
          imfor.name = userInfo.nickName
          imfor.img = userInfo.avatarUrl
          wx.setStorageSync("imfor", imfor);
          that.onLoad()
        }
      });
    }
  },
  das: function () {
    wx.previewImage({
      current: 'http://www.chanbaowang.com/wp-content/uploads/2018/05/BB85D58527B4C587582672F1FA9B310C.png',
      urls: ["http://www.chanbaowang.com/wp-content/uploads/2018/05/BB85D58527B4C587582672F1FA9B310C.png"]
    })
  },
  onReady: function () {

  },

  onShow: function () {

  },
  jilu: function () {
    wx.navigateTo({
      url: '../fuwu/fuwu'
    })
  },
  onHide: function () {

  },

  onUnload: function () {

  },
  onPullDownRefresh: function () {
    this.onLoad();
    wx.stopPullDownRefresh()
  },
  erwei: function () {
    var that = this;
    wx.previewImage({
      current: that.data.erwei1,
      urls: [that.data.erwei1]
    })
  },
  call1: function () {
    wx.navigateTo({
      url: '../logs/logs?data=more',
    })
  },
  call: function (e) {
    console.log(e.target.id)
    var that = this;
    wx.makePhoneCall({
      phoneNumber: "15607972780"
    })
  },
  onReachBottom: function () {

  },

  onShareAppMessage: function () {

  }
})