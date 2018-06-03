//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        sortIndex: 0,
        sortArray: ['距离', '赏金', '时间'],
        filterIndex: 0,
        filterArray: ['全部', '取快递', '借东西', '其他'],
        taskArray: [    ]
    },
    onLoad: function (options) {
        wx.showLoading({
            title: '拉取信息中',
            mask: true
        })
        var server = app.globalData.server;
        var that = this;
        // console.log(Object.prototype.toString.call(options));
        if (!options.mode || !options.user) {
            app.reqToServer("tasks", "GET", null, (data) => {
                var task_list = data["data"]["result"];
                console.log("tasks:", task_list);
                that.setData({
                    taskArray: task_list
                })
                wx.hideLoading();
            })
        } else {
            app.reqToServer("tasks/" + options.mode + "/" + options.user, "GET", null, (data) => {
                var task_list = data["data"]["result"]
                that.setData({
                    taskArray: task_list
                })
            })
        }
        // thst.setData 
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
    goTaskDetail: function(e){
        wx.navigateTo({
            url: '../taskDetail/taskDetail?id='+e.currentTarget.id,
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
    
})
