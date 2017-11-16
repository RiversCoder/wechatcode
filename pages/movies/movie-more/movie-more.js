// pages/movies/movie-more/movie-more.js

var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var This = this;
      this.RequestOnoff = true;
      this.id = options.id ? options.id : 0;
      this.start = 0;
      this.count = 21;
      this.loadNum = 12;

      this.currentData = [];
     

      //进入页面默认加载的数据
      this.loadData(this.start,this.count);
  },
  loadData: function(start,count)
  {
    var This = this;

    this.urlArr = [{
      title: '正在上映',
      url: app.publicApp.doubanBase + '/v2/movie/in_theaters?start=' + start + '&count=' +count
    }, {
      title: '即将上映',
      url: app.publicApp.doubanBase + '/v2/movie/coming_soon?start=' + start + '&count=' + count
    }, {
      title: 'Top250',
      url: app.publicApp.doubanBase + '/v2/movie/top250?start=' +start + '&count=' + count
    }];

    this.getRequest(this.urlArr[this.id].url, function (res) {
      This.operateData(res.data.subjects);
    });
  },
  //请求加载数据
  getRequest: function (url, fn) {
    wx.request({
      url: url,
      method: "GET",
      header: {
        "Content-Type": "application/xml"
      },
      success: function (res) {
        fn && fn(res);
      }
    })
  },
  //上滑加载更多
  scrolltolower: function(){
      
      //防止恶意上滑加载
      if(!this.RequestOnoff)
      {
        this.RequestOnoff = false;
        return;
      }

      //出现加载loading框
      wx.showNavigationBarLoading();
      this.start = this.start + this.count;
      this.count = this.loadNum;
      this.loadData(this.start,this.count);
  },
  //下拉刷新
  onPullDownRefresh: function(){
    //wx.stopPullDownRefresh();
  }, 
  //处理数据发送数据到wxml
  operateData: function(data){

     var newArr = [];
     var cobj = {}; 
     
     for(var i=0;i<data.length;i++)
     {  

        cobj = {
          mId: data[i].id,
          mimage: data[i].images.medium,
          mname: this.doTitleData(data[i].title),
          rate: {
            rates: this.doRatingData(data[i].rating.average),
            rateText: this.doRateNum(data[i].rating.average)
          }
        };

        newArr.push(cobj);
     }

     this.currentData = this.currentData.concat(newArr);
     this.RequestOnoff = true;
     wx.hideNavigationBarLoading();
     this.setData({
       moviesData: this.currentData
     });

  },
  //处理标题+省略号
  doTitleData: function (str) {
    var newStr = '';

    if (str.length > 6) {
      newStr = str.substring(0, 6) + '...';
    }
    else {
      newStr = str;
    }

    return newStr;
  },
  //处理rating
  doRatingData: function (num) {
    var newNum = Math.floor(num / 2);
    var newArr = [0, 0, 0, 0, 0];

    for (var i = 0; i < newNum; i++) {
      newArr[i] = 1;
    }

    return newArr;
  },
  //处理分数小数
  doRateNum: function (num) {
    var newNum = num.toString();

    if (newNum.match(/\./g)) {
      newNum = newNum;
    }
    else {
      newNum += '.0';
    }

    return newNum;
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //动态设置当前页面的标题
    wx.setNavigationBarTitle({
      title: this.urlArr[this.id].title
    })
  }

})