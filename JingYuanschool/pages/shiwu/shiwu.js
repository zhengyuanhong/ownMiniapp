var Bmob = require('../../utils/Bmob-1.1.1.min.js');
Page({

  data: {
    xinyuan: [],
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '主人我等你好久了'
    })
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    const query = Bmob.Query("shi_wu");
    query.order("-createdAt");
    query.find().then(res => {
      console.log(res)
      wx.hideLoading();
      if (res == '') {
        wx.showToast({
          title: '没有人丢东西是好事呀^_^',
          icon: 'none',
          duration: 2000
        })
      }
      that.setData({
        shiwu: res
      })
    })
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

  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      console.log(res)
    }
    console.log(res)
    return {
      title: '有件事很纠结，能帮我下决定吗',
      path: '/pages/xinyuan/xinyuan',
      imageUrl: "/image/xinyuan.jpg",
    }
  },
  onPullDownRefresh: function () {
    this.onLoad();
  }
})