var Bmob = require('../../utils/Bmob-1.1.1.min.js');
Page({
  data: {
    index:"",
    indicatorDots: false,
    erwei1: "http://www.chanbaowang.com/wp-content/uploads/2018/05/qrcode_for_gh_8ba1ba530ca1_258.jpg",
    autoplay: true,
    interval: 5000,
    duration: 1000,
    interval1: 2000,
    duration1: 1000
  },
  onLoad: function (options) {
    wx.showShareMenu({
      withShareTicket: true
    })
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    const query = Bmob.Query("index");
    query.find().then(res => {
      console.log(res)
      wx.hideLoading()
      that.setData({
        index: res
      })
    });
  },
  guanzhu:function(){
    this.onLoad();
    var that = this
    wx.previewImage({
      current: that.data.erwei1,
      urls: [that.data.erwei1]
    })
  },
  but: function (e) {
    console.log(e);
  },

  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      console.log(res)
    }
    console.log(res)
    return {
      title: '我就静静的看着你',
      path: '/pages/index/index',
      imageUrl: "/image/shouye.jpg",
    }
  },
  onPullDownRefresh:function(){
    this.onLoad();
  }
})
