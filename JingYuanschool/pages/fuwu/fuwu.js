var Bmob = require('../../utils/Bmob-1.1.1.min.js');
var app = getApp();
Page({

  data: {
    yanse: true,
    a: "1",
    user_img: "",
    user_name: "",
    shiwu: []
  },
  dele: function (e) {
    var that = this
    console.log(e)
    var id = e.target.id;
    console.log(id)
    const query = Bmob.Query('shi_wu');
    query.destroy(this.data.shiwu[id].objectId).then(res => {
      const del = Bmob.File();
      const val = [that.data.shiwu[id].img1]
      del.destroy(val).then(res1 => {
        that.onLoad();
        console.log("删除成功");
        wx.showToast({
          title: '删除成功',
          icon: 'success',
          duration: 1500
        })
      }).catch(err => {
        console.log(err)
      })
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  },
  onLoad: function (options) {
    this.shouquan();
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    const query = Bmob.Query("shi_wu");
    query.equalTo("user_name", "==", this.data.user_name);
    query.find().then(res => {
      console.log(res)
      if (res == '') {
        wx.showToast({
          title: '暂时没有你的记录',
          icon: 'none',
          duration: 2000
        })
      }
      wx.hideLoading()
      that.setData({
        shiwu: res
      })
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
          } else{
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
    this.onLoad();
    wx.stopPullDownRefresh()
  }
})