//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        sortIndex: 0,
        sortArray: ['距离', '赏金', '时间'],
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
            taskId: "00000"
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
    goTaskDetail: function(){
        wx.navigateTo({
            url: '../taskDetail/taskDetail?id=1',
            success: function () {
                console.log('success')
            },
            fail: function () {
                console.log('fail')
            },
            complete: function () {

            }
        })
    },
    goCreateTask:function() {
        wx.navigateTo({
            url: '../createTask/createTask',
            success:function() {
                console.log('success')
            },
            fail:function() {
                console.log('fail')
            },
            complete:function() {

            }
        })
    },
    goMyInfo:function() {
        wx.navigateTo({
            url: '../myInfo/myInfo',
        })
    },
    onLoad: function(options) {
        var server = app.globalData.server;
        var that = this;
        // console.log(Object.prototype.toString.call(options));
        if (options.mode == undefined || options.user == undefined) {
            app.reqToServer("tasks", "GET", null, (data) => {
                var task_list = data["data"]["result"];
                console.log("tasks:", task_list);
                that.setData({
                    taskArray: task_list
                })
            })
        } else {
            console.log("tasks/" + options.mode + "/" + options.user);
            app.reqToServer("tasks/" + options.mode + "/" + options.user, "GET", null, (data) => {
                var task_list = data["data"]["result"]
                that.setData({
                taskArray: task_list
                })
            })
        }
        // thst.setData 
    }
})
