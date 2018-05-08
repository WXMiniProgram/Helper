// pages/createTask/createTask.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeIndex: 0,
    typeArray: ['取快递', '借东西', '帮带东西', '其他'],
    curtype: '请选择',
    date: "2018-05-07",
    time: "12:01",
    location: "选择我的位置",
    username: 'Cuttlefish',
  },

  bindTypeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var that = this;
    var i = e.detail.value;
    that.setData({
      typeIndex: i,
      curtype: that.data.typeArray[i]
    });
    console.log("bindSortChange")
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  chooseLocation: function () {
    var that = this;
    wx.chooseLocation({
      type: 'wgs84',
      success: function (res) {
        var latitudeCur = res.latitude;
        var longitudeCur = res.longitude;
        var name = res.name;
        var address = res.address;
        console.log(name);
        that.setData({
          location: name,
          latitude: latitudeCur,
          longitude: longitudeCur
        })
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
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