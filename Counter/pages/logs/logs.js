Page({
  data:{
  configs:{}
  },
  switchChange:function(e){//获取switch的值，存入conf对象中，并存入缓存里
    var id = e.target.id;
    var conf = this.data.configs;
    var co = conf[id];

    if(!co){
      co = new Object();
      conf[id] = co;  
    }
    co.state = e.detail.value;
    this.setData({configs:conf});
    wx.setStorageSync('configs', conf);//存入configs缓存中
  },
  sliderChange: function (e) {//获取slider的值，存入conf对象中，并存入缓存里
    var id = e.target.id;
    var conf = this.data.configs;
    var co = conf[id];

    if (!co) {
      co = new Object();
      conf[id] = co;
    }
    co.time = e.detail.value;
    this.setData({ configs: conf });
    wx.setStorageSync('configs', conf);
  },
  radioChange: function (e) {//获取radio的值，存入conf对象中，并存入缓存里
    var id = e.target.id;
    var conf = this.data.configs;
    var co = conf[id];

    if (!co) {
      co = new Object();
      conf[id] = co;
    }
    co.voice = e.detail.value;
    this.setData({ configs: conf});
    wx.setStorageSync('configs', conf);
  },
  onLoad:function(){//进入该页面，自动获取缓冲，并覆盖上面组件的值
    var configs = wx.getStorageSync("configs");

    this.setData({
      configs:configs
    })
  }
})
