var Bmob = require('../../utils/Bmob-1.1.1.min.js');

var app = getApp();
Page({
  data: {
    shiwu: [],
    flag: "",
    erwei: "http://www.chanbaowang.com/wp-content/uploads/2018/05/qrcode_for_gh_8ba1ba530ca1_258.jpg",
    user_name: "",
    user_img: ""
  },
  erwei: function (e) {
    var that = this;
    wx.previewImage({
      current: that.data.erwei,
      urls: [that.data.erwei],
    })
  },
  call: function (e) {
    console.log(e.target.id)
    var that = this;
    wx.makePhoneCall({
      phoneNumber: that.data.shiwu[e.target.id].tel
    })
  },
  img: function (e) {
    console.log(e.target.id)
    var that = this;
    wx.previewImage({
      current: that.data.shiwu[e.target.id].img1,
      urls: [that.data.shiwu[e.target.id].img1],
    })
  },
  onLoad: function (e) {
    wx.showShareMenu({
      withShareTicket: true
    })
    if (e.data == "shiwu") {

    } else {
      wx.setNavigationBarTitle({
        title: '反馈我们'
      })
    }
    console.log(e.data)
    this.setData({
      flag: e.data
    })
this.shouquan();
  },
  fabu: function () {
    wx.navigateTo({
      url: '../fabu/fabu?bi=2',
    })
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
  bindFormSubmit: function (e) {
    console.log(e)
    console.log(e.detail.value.textarea)
    var that = this;
    if (e.detail.value.textarea) {

      wx.showModal({
        title: '提示',
        content: '提交成功后将自动返回首页',
        showCancel: false,
        success: function (res) {
          console.log(e.detail.value.textarea)
          const query = Bmob.Query('fankui');
          query.set("user_img", that.data.user_img)
          query.set("user_name", that.data.user_name)
          query.set("content", e.detail.value.textarea)
          query.save().then(res => {
            wx.navigateBack({
              delta: 1
            })
            console.log("-成功-")
          }).catch(err => {
            console.log(err)
          })
        }
      })

    } else {
      wx.showToast({
        title: '你就不给点建议嘛',
        icon: 'none',
        duration: 2000
      })
    }
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      console.log(res)
    }
    console.log(res)
    return {
      title: '请问，这是谁掉的',
      path: '/pages/logs/logs?data=shiwu',
      imageUrl: "/image/shiwu.gif",
    }
  }
})
