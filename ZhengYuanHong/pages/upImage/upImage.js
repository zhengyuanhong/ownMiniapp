var Bmob = require('../../utils/Bmob-1.6.4.min.js');
var app = getApp();
Page({

  data: {
    pic_url:[]
  },
  upload:function(e){
    var that = this;
    var imgname = e.detail.value.Imagename;
    console.log(imgname)
    if(imgname!=''){
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: function (res) {
          console.log(res)
          var tempFilePaths = res.tempFilePaths[0]
          var file;
          var fileName = imgname + '.jpg'
          file = Bmob.File(fileName, tempFilePaths);
          file.save().then(res => {
            console.log(res.length);
            console.log(res);
            app.upload_image("photo", res[0].url)
            that.onLoad();
          })
        }
      })
    }else{
      wx.showToast({
        title: '必须给图片取名字',
        icon: "none",
        duration: 2000
      })   
    }
  },
  preImage: function (e) {
    var that = this;
    var ID = e.currentTarget.id;
    wx.previewImage({
      urls: [that.data.pic_url[ID].photo_url],
    })
  },
  shanchu:function(e){
    var that = this;
    console.log(e.currentTarget.id)
    var ID = e.currentTarget.id;
    var objectID = this.data.pic_url[ID].objectId;
    var phtoturl = this.data.pic_url[ID].photo_url;
    app.photo_dele(phtoturl,function dele_url(res){
      console.log(res)
      app.Bmob_dele("photo",objectID);
    })
  },
  onLoad: function (options) {
    var that = this;
    app.get_Bmob_data("photo", 10, 0, function getPhoto(res) {
      console.log(res)
      if(res.length){
        that.setData({
          pic_url: res
        })
      }
    })
  },
  shua:function(){
    wx.showLoading({
      title: '加载中'
    })
    this.onLoad();
    wx.hideLoading();
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