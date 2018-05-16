// pages/response/response_fail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  returnHome: function(e) {
    wx.navigateTo({
      url: '../homePage/homePage'
    })
  }
})