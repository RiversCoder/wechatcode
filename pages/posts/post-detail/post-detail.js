var postDetails = require('../../../data/post-details.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPaused : true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var This = this; 
    //获取传递过来的文章ID值
    this.postId = options.pid;
    var currentDetail = this.getPostDetail(this.postId);

    //设置收藏本地缓存的前缀
    this.collect = 'collect_';
    //设置当前页面是否收藏的缓存变量
    this.colledName = this.collect + this.postId;

    //设置当前页是否为收藏变量
    this.isCollected = false;  

    //传递给页面进行数据绑定
    this.setData({
      cdetail: currentDetail,
      isCollected: wx.getStorageSync(this.colledName)
    });

    //监听音乐
    this.listenMusicState();

    //刚进入页面时加载判断后台音乐是否播放 如果正在播放就找出这首音乐属于哪个页面 然后就传递播放状态到(对应ID)页面  - 1
    /*wx.getBackgroundAudioPlayerState({
      success: function (res) {

        //判断当前ID页面的对应的dataUrl和当前播放的音乐dataUrl 是否相等
        if (res.dataUrl == This.getPostDetail(This.postId).music.dataUrl){
          This.setData({
            isPaused: false
          })
        }

      }
    })*/

    //刚进入页面时加载判断后台音乐是否播放 如果正在播放就找出这首音乐属于哪个页面 然后就传递播放状态到(对应ID)页面  - 2
    this.checkPlayState();

  },
   //判断当前页面是否进入播放状态
  checkPlayState: function()
  {
    var state = app.publicApp.musicState;

    if(state)
    {
      if (this.postId == app.publicApp.musicId)
      {
        this.setData({
          isPaused: false
        })
      }
    }  
    
  }, 
  //获取当前页面ID对应渲染的内容
  getPostDetail: function(id){

    var celem = null;
    postDetails.forEach(function(elem,index,arr){
      if (elem.postId == id)
      {
        celem = elem;
      }
    });

    return celem;
  },

  //点击收藏  出现toast弹出层
  collectionTap: function(ev)
  {   
      var ckey = this.colledName;
      
      if (wx.getStorageSync(ckey))
      { 

        //取消收藏提示  
        this.showToast('取消成功', 1000);

        this.isCollected = false;
        wx.setStorageSync(ckey, false);
      }
      else
      {

        //收藏成功提示
        this.showToast('收藏成功', 1000);

        this.isCollected = true;
        wx.setStorageSync(ckey, true);
      }  

      //页面再次指定数据渲染
      this.setData({
        isCollected: this.isCollected
      });
  },
  //显示Toast框
  showToast : function(message,time)
  {
    wx.showToast({
      title: message,
      icon: 'success',
      duration: time
    })
  },
  //显示模态窗口
  showModal : function(titles,text,successfn,failfn)
  {
    wx.showModal({
      title: titles,
      content: text,
      success: function (res) {
        if (res.confirm) {
          successfn&&successfn();
        } else if (res.cancel) {
          failfn&&failfn();
        }
      }
    })
  },
  //点击分享
  shareTap : function()
  {
    var This = this;
    var arr = ['分享到微信好友', '分享到朋友', '分享到QQ', '分享到微博'];
    //显示分享选项
    wx.showActionSheet({
      itemList: arr,
      success: function (res) {
        This.showModal(arr[res.tapIndex],'确定？',function(){
          //console.log('执行确定分享后的操作');
        },function(){
          console.log('执行取消分享后的操作');
        });
      },
      fail: function (res) {
        console.log('分享设置失败');
      }
    })
  },
  //点击音乐播放按钮图标
  onMusicTap : function()
  {   
      var isPausedState = this.data.isPaused;
      var This = this;

      //获取当前详情页的音乐数据
      var music = this.getPostDetail(this.postId).music;

      //播放音乐
      if (isPausedState)
      {
        wx.playBackgroundAudio({
          dataUrl: music.dataUrl,
          title: music.title,
          coverImgUrl: music.coverImgUrl,
          success: function(){
            changeState();
          }
        })
      }
      else
      {
          wx.pauseBackgroundAudio();
          changeState();
      }

      //改变播放状态
      function changeState()
      {
        isPausedState = !isPausedState

        This.setData({
          isPaused: isPausedState
        })
      }
  },
  //监听音乐
  listenMusicState : function(){
    var This = this;
    //监听音乐播放时
    wx.onBackgroundAudioPlay(function(){
      app.publicApp.musicState = true;
      app.publicApp.musicId = This.postId;
      This.setData({
          isPaused: false
        });
    });

    //监听音乐暂停时
    wx.onBackgroundAudioPause(function(){
      app.publicApp.musicState = false;
      app.publicApp.musicId = This.postId;
      This.setData({
        isPaused: true
      });
    });
  }

})