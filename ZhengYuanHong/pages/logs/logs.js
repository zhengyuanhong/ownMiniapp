var app = getApp();
var Bmob = require('../../utils/Bmob-1.6.4.min.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    richText:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.showLoading({
      title: "加载中...",
    })
    app.get_Bmob_oneData("article",options.data,function article_content(res){
      console.log(res)
        that.setData({
          richText: res
        })
        wx.hideLoading()
    })
  },

  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
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