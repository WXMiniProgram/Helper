//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    sortIndex: 0,
    sortArray: ['综合', '距离', '赏金'],
    filterIndex: 0,
    filterArray: ['全部', '取快递', '借东西', '其他'],
    taskArray: [
      {
        latitude: 23.099794,
        longitude: 113.324520,
        posDes: "上海市人民广场",
        picUrl: '../../images/bg01.jpg',
        userId: "Cuttlefish",
        userUrl: "../../images/img01.jpg",
        srvDistance: 2,
        srvTime: "今天 12:00",
        srvTitle: "取快递",
        srvDesc: "如题，求帮忙去快递如题，求帮忙去快递如题，求帮忙去快递如题，求帮忙去快递如题，求帮忙去快递如题，求帮忙去快递如题，求帮忙去快递~谢谢啦",
        srvCost: 500,
        taskId: "00001"
      }, {
        latitude: 23.099794,
        longitude: 113.324520,
        posDes: "上海市人民广场",
        picUrl: '../../images/bg01.jpg',
        userId: "For Smurf's Sake",
        userUrl: "../../images/img01.jpg",
        srvDistance: 2,
        srvTime: "今天 12:00",
        srvTitle: "西北门取快递",
        srvDesc: "如题，求帮忙去快递如题，求帮忙去快递如题，求帮忙去快递如题，求帮忙去快递如题，求帮忙去快递如题，求帮忙去快递如题，求帮忙去快递~谢谢啦",
        srvCost: 500,
        taskId: "00001"
      }, {
        latitude: 31.2398060000,
        longitude: 121.6695800000,
        posDes: "上海市浦东新区顾唐路1699号",
        picUrl: '../../images/bg02.jpg',
        userId: "October_-",
        userUrl: "../../images/img02.jpg",
        srvDistance: 3,
        srvTime: "18/5/5 12:00",
        srvTitle: "求带材料去总部",
        srvDesc: "求带材料去总部~谢谢啦",
        srvCost: 1000,
        taskId: "00002"
      },
      {
        latitude: 23.099794,
        longitude: 113.324520,
        posDes: "上海迪士尼乐园",
        picUrl: '../../images/bg01.jpg',
        userId: "Jesuslessness",
        userUrl: "../../images/img01.jpg",
        srvDistance: 2,
        srvTime: "今天 12:00",
        srvTitle: "求拼车去地铁站",
        srvDesc: "如题，大家快快行动起来~",
        srvCost: 500,
        taskId: "00003"

      },
      {
        latitude: 31.2398060000,
        longitude: 121.6695800000,
        posDes: "上海唐镇地铁站",
        picUrl: '../../images/bg02.jpg',
        userId: "For Smurf's Sake",
        userUrl: "../../images/img02.jpg",
        srvDistance: 3,
        srvTime: "今天 12:00",
        srvTitle: "求介绍附近靠谱的房子~",
        srvDesc: "本人由于近期要来这里工作，所以需要租个房子。。。",
        srvCost: 1000,
        taskId: "00004"
      }
    ]
  },
  //事件处理函数
  bindSortChange:function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var that = this;
    var i = e.detail.value;
    that.setData({
      sortIndex: i,
      curtype: that.data.sortArray[i]
    });
    console.log("bindSortChange")
  },
  bindFilterChange:function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var that = this;
    var i = e.detail.value;
    that.setData({
      filterIndex: i,
      curFilter: that.data.filterArray[i]
    });
    console.log("bindFilterChange")
  },
  goCreateTask:function() {
    wx.navigateTo({
      url: '../createTask/createTask',
      success:function() {
      
      },
      fail:function() {
      
      },
      complete:function() {

      }
    })
  },
  goMyInfo:function() {
    wx.navigateTo({
      url: '../myInfo/myInfo',
      success:function() {

      },
      fail:function() {

      },
      complete:function() {

      }
    })
  }
})
