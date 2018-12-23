var Bmob1 = require('../../utils/bmob.js');
var Bmob = require('../../utils/Bmob-1.1.1.min.js');
var app = getApp();
Bmob1.initialize("8c0e241e6378d1ca8d10db7666b2f89b", "a4380dafaf6afb938c115f02873fc91a");
Page({

  data: {
    img3: [],
    date:[],
    tel:"",
    content:"",
    im1:'',
    im2:'',
    user_img: "",
    user_name: "",
    usrinfo: []

  },
  reset:function(){
    this.setData({
      img3:[]
    })
  },
submitshiwu: function (e){
    this.shouquan();
    var that = this;
    var regPartton = /1[3-8]+\d{9}/;
    console.log(e.detail.value.tel)
    var phone = e.detail.value.tel;
    var riqi = this.data.date[3] + this.data.date[1]+"\\" + this.data.date[2] + this.data.date[4];
    console.log(e.detail.value.content)
    if (e.detail.value.tel && regPartton.test(phone) && e.detail.value.content && this.data.img3.length > 0) {
      wx.showModal({
        title: '提示',
        content: '发送成功后会自动返回首页',
        success: function (res) {
          if (res.confirm) {
            wx.showLoading({
              title: '发送中',
            })
            var name = riqi+"\\shi_wu.jpg";
            var file = new Bmob1.File(name, that.data.img3);
            file.save().then(function (res1) {
              const query = Bmob.Query('shi_wu');
              query.set("user_img", that.data.user_img)
              query.set("user_name", that.data.user_name)
              query.set("content", e.detail.value.content)
              query.set("tel", e.detail.value.tel)
              query.set("img1", res1.url())
              query.save().then(res => {
                wx.hideLoading();
                that.setData({
                      img3:[],
                      tel:"",
                      content:""
                })
                wx.showToast({
                  title: '发送成功',
                  icon: 'success',
                  duration: 2000
                })
              }).catch(err => {
              })
            })
          }
        }
      })
    } else {
      wx.showToast({
        title: '你好像漏填了唉,或者是电话号码写错了',
        icon: 'none',
        duration: 2000
      })
    }
  },
tianjia: function () {
  var that = this;
  wx.chooseImage({
    success: function (res) {
      console.log(res)
      that.setData({
        img3: res.tempFilePaths
      })
    },
  })
},
  onLoad: function (options) {
    console.log(app.getData())
    console.log(options)
    this.setData({
      date: app.getData()
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
          } else {
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

  }
})