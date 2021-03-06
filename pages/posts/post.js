var postData = require('../../data/post-data.js');

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

    var newsDataArr = postData;

    //this.data.dataArr = newsDataArr;
    this.setData({
      dataArr : newsDataArr
    });

  },

  openPostDetail : function(ev)
  {
    //获取点击文章的ID
    var pid = ev.currentTarget.dataset.postId;
    //去到文章详情页面
    wx.navigateTo({
      url: '/pages/posts/post-detail/post-detail?pid=' + pid
    });

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //console.log('onReady');
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    ///console.log('onShow');
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
     //console.log('onHide');
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    //console.log('onUnload');
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