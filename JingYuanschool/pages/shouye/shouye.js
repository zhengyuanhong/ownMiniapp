var Bmob = require('../../utils/Bmob-1.1.1.min.js');
Page({
  data: {
    indicatorDots: false,
    ID:"3",
    erwei1: "http://www.chanbaowang.com/wp-content/uploads/2018/05/qrcode_for_gh_8ba1ba530ca1_258.jpg",
    autoplay: false,
    interval: 5000,
    duration: 1000,
    interval1: 2000,
    duration1: 1000
  },
  bindchange:function(e){
      console.log(e.detail.current)
      this.setData({
        ID: e.detail.current
      })
  },
  meantab:function(e){
      console.log(e.target.dataset.current)
      this.setData({
        ID: e.target.dataset.current
      })
  },
  onLoad: function (options) {

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