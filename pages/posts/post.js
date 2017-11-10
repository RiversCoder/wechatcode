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

  	var newsDataArr = [
  		{
	    	nimgs : {
	    		avator : '/images/avator/avator01.jpg',
	    		post : '/images/post/post01.jpg'
	    	},
	    	date : '2017年11月10日',
	    	ntitle : '比利·林恩的中场故事',
	    	nintro : '秋风萧萧，叶落飘飘，漫漫日长，种下一朵期望，在寂静中含苞待放，等待五十九秒的相思，换回 一秒的重逢!深爱过，方知酒浓，等待着，五百次的回眸，换回一次的相逢!',
	    	chatnum : 92,
	    	viewnum : 88
	    },
	    {
	    	nimgs : {
	    		avator : '/images/avator/avator02.jpg',
	    		post : '/images/post/post02.jpg'
	    	},
	    	date : '2017年11月12日',
	    	ntitle : '比利·林恩的中场故事',
	    	nintro : '秋风萧萧，叶落飘飘，漫漫日长，种下一朵期望，在寂静中含苞待放，等待五十九秒的相思，换回 一秒的重逢!深爱过，方知酒浓，等待着，五百次的回眸，换回一次的相逢!',
	    	chatnum : 88,
	    	viewnum : 99
	    }
  	];


    this.setData({
    	dataArr : newsDataArr
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