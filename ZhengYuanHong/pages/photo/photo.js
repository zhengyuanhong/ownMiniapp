var app = getApp();
var Bmob = require('../../utils/Bmob-1.6.4.min.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
      pic_url:[],
      ye_shu:0,
      data_shu:30
  },
  onLoad: function (options) {
    var yeshu = this.data.ye_shu;
    var Datashu = this.data.data_shu;
    wx.showLoading({
      title: '加载中'
    })
    var that=this;
    app.get_Bmob_data("photo", Datashu, yeshu, function getPhoto(res) {
      console.log(res)
      that.setData({
        pic_url: res
      })
      wx.hideLoading()
    })
  },
  jiazai: function () {
    var that = this;
    var yeshu = this.data.ye_shu;
    var Datashu = this.data.data_shu;
    var data = this.data.pic_url;
    yeshu++;
    var pianyi = yeshu*Datashu;
    wx.showLoading({
      title: '加载中'
    })
    app.get_Bmob_data("photo",Datashu,pianyi, function getPhoto(res) {
      if (res.length){
        that.setData({
          pic_url: data.concat(res),
          ye_shu: yeshu
        })
        wx.hideLoading()
      } else {
        wx.showToast({
          title: "我是有底线的！",
          icon: "none"
        })
      }
    })
  },  
  onReady: function () {

  },
  preImage: function (e) {
    var that = this;
    var ID = e.currentTarget.id;
    wx.previewImage({
      urls: [that.data.pic_url[ID].photo_url],
    })
  },
  onReady: function () {

  },

  onShow: function () {

  },

  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})