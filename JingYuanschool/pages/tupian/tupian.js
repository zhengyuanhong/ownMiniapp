var Bmob = require('../../utils/Bmob-1.1.1.min.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tupian: [],
  },

  onLoad: function (options) {
    wx.showShareMenu({
      withShareTicket: true
    })
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    console.log(options)
      const query = Bmob.Query("tupian");
      query.find().then(res => {
        console.log(res)
        wx.hideLoading()
        that.setData({
          tupian: res,
        })
        wx.setNavigationBarTitle({
          title: '选择你想用的信封'
        })
      });
      console.log("信封")
  },
  img: function (e) {
    console.log(e.target.id)
    var that = this;
    var value = this.data.tupian[e.target.id].tupian_value
    wx.navigateTo({
      url: '../dushu/dushu?value=' + value,
    })
  },
  img1: function (e) {
    console.log(e.target.id)
    var that = this;
    wx.previewImage({
      content: that.data.tupian[e.target.id].tupian_url,
      urls: [that.data.tupian[e.target.id].tupian_url]
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
      title: 'ta等你好久了，还不去回信吗',
      path: '/pages/tupian/tupian?data=xin',
      imageUrl: "/image/xiexin.jpg",
    }
  }
})