var Bmob = require('../../utils/Bmob-1.1.1.min.js');
Page({

  data: {
    jianzhi: [],
  },
  onLoad: function (options){
    wx.showShareMenu({
      withShareTicket: true
    })
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    var page_max = this.data.page_max;
    var pages = this.data.page;
    const query = Bmob.Query("jianzhi");
    query.order("-createdAt");
    query.limit(1000);
    query.find().then(res => {
      console.log(res)
      wx.hideLoading()
      if (res == '') {
        wx.showToast({
          title: '工作人员正在加班整理',
          icon: 'none',
          duration: 2000
        })
      }
      that.setData({
        jianzhi: res
      })
    })
  },
  call: function (e) {
    console.log(e.target.id)
    var that = this;
    wx.makePhoneCall({
      phoneNumber: that.data.jianzhi[e.target.id].tel
    })
  },
  onReady: function () {

  },
  jian: function (e) {
    console.log(e.currentTarget.id)
    var id = e.currentTarget.id;
    var obId = this.data.jianzhi[id].objectId;
    wx.navigateTo({
      url: '../guanyu/guanyu?id=' + obId,
    })
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
      title: '何以解忧，唯有暴富',
      path: '/pages/jianzhi/jianzhi',
      imageUrl: "/image/jianzhi.jpg",
    }
  },
})