// pages/createTask/createTask.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeIndex: 0,

    typeArray: ['全部','取快递', '借东西', '帮带东西', '其他'],
    bountyArray:["0", "1", "2", "3", "4", "5"],
    bountyIndex: 0,
    defaultPick: '请选择',
    date: util.formatDate(new Date()),
    time: util.formatTime(new Date(), false),
    hasPrivate: false,
    task_status: 4, // 0：新任务 1：待领取 2：已领取 3：进行中 4：已完成
    isPublisher: false, // 临时加的 判断是不是当前用户创建的这个任务
    location:{
        "name": "任意",
        "address":"",
        "latitude":0,
        "longitude":0
    },
    username: 'Cuttlefish',
    publisher:[{
      name: "i",
      attrs:{
        style: "color:blue"
      },
      children:[{
        type: "text",
        text: "cuttlefish"
      }]
    }],
    hunter_info:null
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
  bindSwitchChange: function(e) {
    var that = this;
    var i = e.detail.value;
    that.setData({
      hasPrivate: i,
    });
  },
  bindBountyChange: function (e) {
      var that = this;
      var i = e.detail.value;
      that.setData({
          bountyIndex: i,
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
        var loc = {
            "name": res.name,
            "address": res.address,
            "latitude": res.latitude,
            "longitude": res.longitude 
        }
        that.setData({
          location:loc
        })
      }
    });
  },
  gotoPublisher: function(){
    wx.navigateTo({
        url: '../myInfo/myInfo',
    })
  }
})