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

    //获取正在热映
    var dbbase = app.publicApp.doubanBase;
    this.mplaying = dbbase + "/v2/movie/in_theaters?start=0&count=3";
    this.mwilling = dbbase + "/v2/movie/coming_soon?start=0&count=3";
    this.mtop250 = dbbase + "/v2/movie/top250?start=0&count=3";

    //电影url数组
    this.movieApiArr = [this.mplaying, this.mwilling, this.mtop250];

    //获取要渲染的电影数据
    this.movieArr = [];

    this.getMoviesData();

  },
  //获取当前要加载的所有电影数据
  getMoviesData: function () {
    var This = this;

    this.movieApiArr.forEach(function (elem, index, arr) {
      //获取电影数据
      This.getRequest(elem, function (res) {

        This.movieArr.push(res.data);

        //排列数据 - 排列 ： 正在上映 - 即将上映 - top250
        if (This.movieArr.length >= This.movieApiArr.length) {
          This.operateRequestData(This.movieArr);
        }

      });
    });

    //console.log(this.movieArr);
  },
  operateRequestData: function (arr){
    var newArr = [];

    arr.forEach(function (elem) {
      if (elem.title.match('正在上映')) {
        newArr[0] = elem.subjects;
      }
      else if (elem.title.match('即将上映')) {
        newArr[1] = elem.subjects;
      }
      else if (elem.title.match('Top250')) {
        newArr[2] = elem.subjects;
      }
    })  

    this.doRequestData(newArr);  
      
    },
    //处理标题+省略号
    doTitleData : function(str){
        var newStr = '';

        if(str.length > 6)
        {
          newStr = str.substring(0, 6) + '...';
        }
        else
        {
          newStr = str;
        }

        return newStr
    },
    //处理rating
    doRatingData: function(num){
        var newNum = Math.floor(num/2);
        var newArr = [0,0,0,0,0];

        for (var i = 0; i < newNum;i++)
        {
          newArr[i] = 1;
        }

        return newArr;
    },
    //处理分数小数
    doRateNum: function(num){
      var newNum = num.toString();

      if(newNum.match(/\./g)){
        newNum = newNum;
      }
      else
      {
        newNum += '.0';
      }
      
      return newNum;
    },
    //处理数据
    doRequestData : function (arr) {
      var newArr = [];
      var cArr = [];
      var cobj = {};

      for(var i=0;i<arr.length;i++)
      { 
        cArr = [];
        for(var j=0;j<arr[i].length;j++)
        {
          cobj = {
            mId: arr[i][j].id,
            mimage: arr[i][j].images.medium,
            mname: this.doTitleData(arr[i][j].title),
            rate: {
              rates: this.doRatingData(arr[i][j].rating.average),
              rateText: this.doRateNum(arr[i][j].rating.average)
            }
          }

          cArr.push(cobj);
        }

        newArr.push(cArr);
      }
      //console.log(newArr);
      this.setData({
        mvlist: newArr,
        mvTitles : ["正在上映","即将上映","Top250"]
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
    goMorePage: function(ev)
    {
      var obj = ev.currentTarget;
      var id = obj.dataset.listId;

      wx.navigateTo({
        url: './movie-more/movie-more?id=' + id
      })
    }
})