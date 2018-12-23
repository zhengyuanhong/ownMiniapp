var Bmob = require('../../utils/Bmob-1.1.1.min.js');
var app = getApp();
Page({

  data: {
    jianzhi: {}
  },
  call: function () {
    var that = this;
    wx.makePhoneCall({
      phoneNumber: that.data.jianzhi.tel
    })
  },
  onLoad: function (options) {
    console.log(options)
    var that = this;
    const query = Bmob.Query('jianzhi');
    query.get(options.id).then(res => {
      console.log(res)
      that.setData({
        jianzhi: res
      })
    }).catch(err => {
      console.log(err)
    })
    this.shouquan()
  },
  shouquan: function () {
    var imfor = wx.getStorageSync("imfor")
    if (imfor) {
      this.setData({
        user_img: imfor.img,
        user_name: imfor.name
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '请返回到用户页面进行授权',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.switchTab({
              url: '../wode/wode',
            })
          } else {
            wx.switchTab({
              url: '../wode/wode',
            })
          }
        }
      })
    }
  }, 
  onReady: function () {

  },


  onShow: function () {

  },

  onHide: function () {

  },

  onUnload: function () {

  },

  onPullDownRefresh: function () {

  },

  onReachBottom: function () {

  },

  onShareAppMessage: function () {

  }
})