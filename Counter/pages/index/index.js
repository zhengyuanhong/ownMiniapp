
Page({
  leftmove:0,
  rightmove:0,
  data:{
    src: '/sound/9360.wav',
    actionSheetItems: [],
    actionSheetHidden:true,
    leftTime:'0',
    rightTime:'0',
    title:"",
    dsc:"",
    voice:'',
    rightAnimationData:{},
    leftAnimationData: {},
  },
  actionSheetTap:function(e){
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  actionSheetChange:function(e){
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  bindItemTap:function(e){//这是一个上菜单栏，当用户点击其中一个菜单栏时，获取自定义好的缓冲数据，然后再之行相应的逻辑
    this.leftStop();
    this.rightStop();
    var id = e.target.id;
    var configs = wx.getStorageSync('configs');
    var config = configs[id];
    var desc = config.desc.replace(/@/g, config.time + "秒")//使用正则表达式
    this.setData({ title: config.name, dsc:desc, actionSheetHidden:true,rightTime:config.time,leftTime:config.time,voice:config.voice});

  },
  onShow:function(){                                 //当进入到改页面时，会自动之行该函数里的缓冲，判断，
    var configs = wx.getStorageSync('configs'); //获取缓存数据
    var actionSheetItems=[];               //创建一个数据，用来装缓存中的值
    var first = true;
    for(var key in configs){             //边里configs对象中的值
        var config = configs[key];                //把configs中的键值传给configs
        if(config.state){                    //判断switch组件是否为真{改判断语句是下动态菜单栏}
            if(first){//获取菜单栏中confgs中state为真的数据
              var desc = config.desc.replace(/@/g,config.time+"秒")//正则表达式
              this.setData({ title: config.name, dsc: desc, rightTime: config.time, leftTime: config.time,voice:config.voice});
              first= false;
            }
          actionSheetItems.push({name:config.name,id:config.id});  //把缓存中的值放到actionsheetItem中，实现动态菜单栏
        }
    }
    this.setData({ actionSheetItems: actionSheetItems})
  },

  leftStop: function () {//停止定时器
    clearInterval(this.leftInterval);//清楚定时器的值
    this.audioPause();//停止音乐播放
    this.leftInterval = 0;
  },

  //左边开始计时
  leftStart:function(){
    this.rightStop();//让对方计时器停止（右边）
    if (this.leftInterval && this.leftInterval != 0) {//让定时器停止工作
      this.leftStop();
      return;
    }

    var self = this;
      var animation = wx.createAnimation({//创建动画
        duration:1000,
        timingFunction:'ease',
      })
        animation.rotate(this.leftmove+=100).step();//之行动画
        this.setData({
          leftAnimationData:animation.export()
        });
    //定时器使用
    var leftInterval =  setInterval(function () {//让动画以一秒的速率直执行下去
      if (self.data.leftTime <= 0) {//当设定的时间值小于等于零时，让音乐暂停，同时定时器也停止
        self.audioPause();
        self.leftStop();
        return;
      }
      if(self.data.leftTime<=self.data.voice){//判断设定的时间值小于声音控制时间的值时，音乐开始播放
        self.audioPlay();
      }
      animation.rotate(self.leftmove += 100).step();
      self.setData({
        leftAnimationData: animation.export()
      })
      self.setData({leftTime:self.data.leftTime-1});
      },1000);
    this.leftInterval = leftInterval;
  },

  /**********************右边定时器*************************************************************** */
  rightStop:function(){
        clearInterval(this.rightInterval);
        this.audioPause();
        this.rightInterval=0;
  },
  rightStart:function(){
    this.leftStop();//让对方计时器停止（左边）
    if(this.rightInterval&&this.rightInterval!=0){
      this.rightStop();
      return;
    }
    var self = this;
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    })
    animation.rotate(this.rightmove += 100).step();
    this.setData({
      rightAnimationData: animation.export()
    })

    var rightInterval = setInterval(function(){
      if (self.data.rightTime<=0){
        self.rightStop();
        return;
      }
      if (self.data.rightTime <= self.data.voice) {
        self.audioPlay();
      }
      animation.rotate(self.rightmove += 100).step();
      self.setData({
          rightAnimationData: animation.export()
        })
      self.setData({ rightTime: self.data.rightTime - 1 });
    },1000);
    this.rightInterval = rightInterval;
  },
  /************音乐播放，暂停区***********/
  onReady:function(){
    this.audioCtx = wx.createAudioContext('myAudio');
  },
  audioPlay: function () {
    this.audioCtx.play()
  },
  audioPause: function () {
    this.audioCtx.pause()
  }
})
