var app = getApp();
var Bmob = require('../../utils/Bmob-1.6.4.min.js');
Page({
  data: {
    username:"",
    password:""
  },

  onLoad: function (options) {
    this.setData({
      userImg: app.data.userImg,
    })
  },
  bindFormSubmit:function(e){
      console.log(e)
      var username = e.detail.value.username;
      var password = e.detail.value.password;
      console.log(username,password)
      if(username!='' && password!=''){
        app.Bmob_denglu(username, password, function deng(res) {
          console.log(res)
          wx.navigateTo({
            url: '../upImage/upImage',
          })
        }, function error(err) {
          wx.showToast({
            title: '登录失败',
            icon: "fail",
            duration: 2000
          })
        })  
      }else{
        wx.showToast({
          title: '不能为空哦',
          icon: "none",
          duration: 2000
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