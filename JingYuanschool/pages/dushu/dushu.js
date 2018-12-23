var Bmob = require('../../utils/Bmob-1.1.1.min.js');
Page({

  data: {
    flag: "1",
    user_img: "",
    user_name: "",
    shu: [],
    suibi: [],
    value: ""
  },
  das: function () {
    wx.previewImage({
      current: 'http://www.chanbaowang.com/wp-content/uploads/2018/05/BB85D58527B4C587582672F1FA9B310C.png',
      urls: ["http://www.chanbaowang.com/wp-content/uploads/2018/05/BB85D58527B4C587582672F1FA9B310C.png"]
    })
  },
  look: function () {
    wx.navigateTo({
      url: '../tupian/tupian?data=xin',
    })
  },
  onLoad: function (options) {
    console.log(options.value)
    this.setData({
      value: options.value
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
  jixin: function (e) {
    var that = this;
    var send_name = e.detail.value.name;
    var regPartton = /1[3-8]+\d{9}/;
    var send_tel = e.detail.value.tel;
    var accept_name = e.detail.value.name1;
    var accept_tel = e.detail.value.tel1;
    var accept_adress = e.detail.value.adress;
    var content = e.detail.value.textarea;
    if (content && accept_adress && regPartton.test(accept_tel) && accept_name && regPartton.test(send_tel) && send_name) {
      wx.showModal({
        title: '提示',
        content: '发送成功后会自动返回首页',
        success: function (res) {
          if (res.confirm) {
            const query = Bmob.Query('xinfeng');
            query.set("send_name", send_name)
            query.set("send_tel", send_tel)
            query.set("accept_name", accept_name)
            query.set("accept_tel", accept_tel)
            query.set("color", that.data.value)
            query.set("accept_adress", accept_adress)
            query.set("content", content)
            query.save().then(res => {
              wx.hideLoading()
              wx.showToast({
                title: '发送成功',
                icon: 'success',
                duration: 2000
              })
              wx.navigateBack({
                delta: 2
              })
            }).catch(err => {

            })
            console.log('用户点击确定')
          }
        }
      })
    } else {
      wx.showToast({
        title: '信息不完整或者是电话号码格式错了^_^',
        icon: 'none',
        duration: 2000
      })

    }

  },
  onShow: function () {

  },


  onHide: function () {

  },

  onUnload: function () {

  },


  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
  },

  onReachBottom: function () {

  },

  onShareAppMessage: function () {

  }
})