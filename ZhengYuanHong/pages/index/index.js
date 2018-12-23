var app = getApp();
var Bmob = require('../../utils/Bmob-1.6.4.min.js');
Page({

  data: {
      viewshow:false,
    photo: ["/image/11.png", "/image/4.png", "/image/2.png", "/image/5.png", "/image/3.png", "/image/6.png"],
      pic_url:[],
      article:[],
      personal:{}
  },
  shuaxin:function(){
      this.onLoad();
  },
  onLoad: function (options){
    var that = this;
    wx.showLoading({
      title: "加载中...",
    })
    app.get_Bmob_data("zheng",1,0,function getPerson(res){
      console.log(res[0])
      that.setData({
        personal: res[0]
      })
      app.data.userImg = res[0].touxiang_photo
    })
    app.get_Bmob_data("photo",10,0,function getPhoto(res){
      console.log(res)
      that.setData({
        pic_url: res
      })
      wx.hideLoading()
    })
    app.get_Bmob_data("article",100,0,function getArticle(res){
      console.log(res)
      that.setData({
        article:res
      })
    })
  },
  denglu:function(e){
    wx.navigateTo({
      url: '../denglu/denglu',
    })
  },
  preImage:function(e){
    var that = this;
    console.log(e.currentTarget.id)
    var ID = e.currentTarget.id;
    wx.previewImage({
      urls: [that.data.pic_url[ID].photo_url],
    })
  },
  tiao_photo:function(){
    wx.navigateTo({
      url: '../photo/photo',
    })
  },
  showimfor:function(){
      this.setData({viewshow:true})
  },
  hiddenimfor:function(){
    this.setData({viewshow:false})
  },

  title_content:function(e){
    var that = this;
    var ID = e.currentTarget.id;
    console.log(e.currentTarget.id)
    wx.navigateTo({
      url: '../logs/logs?data=' + that.data.article[ID].objectId
    })
  },
  onReady: function (){
    
  },

  onShow: function () {
    
  },
  goto:function(){
    wx.navigateTo({
      url: '../logs/logs',
    })
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
  onShareAppMessage: function (ops) {
    if (ops.from === 'button') {
      // 来自页面内转发按钮
      console.log(ops.target)
    }
    return {
      title: '嘿！交个朋友吧^_^',
      imageUrl: '/image/share.jpg',
      path: 'page/index/index'
    }

  }
})