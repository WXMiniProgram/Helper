//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        isMyInfo: false,
        location: {},
        sortIndex: 0,
        sortArray: ['距离', '赏金', '时间'],
        filterIndex: 0,
        filterArray: ['全部', '取快递', '借东西', '其他'],
        taskArray: []
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
        that.taskSort();
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
        console.log('goCreateTask')
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
            success:function() {

            },
            fail:function() {

            },
            complete:function() {

            }
        })
    },
    taskSort:function() {
        if (this.data.sortIndex == 0) {
            console.log("按距离排序");
            for(var i =0; i<this.data.taskArray.length; i++) {
                for(var j = i+1; j<this.data.taskArray.length; j++) {
                    if(this.data.taskArray[i].distance > this.data.taskArray[j].distance) {
                        var temp = this.data.taskArray[i];
                        this.data.taskArray[i] = this.data.taskArray[j];
                        this.data.taskArray[j] = temp;
                    }
                }
            }
            console.log("排序后taskArray", this.data.taskArray);
        } else if (this.data.sortIndex == 1) {
            console.log("按赏金排序");
            for (var i = 0; i < this.data.taskArray.length; i++) {
                for (var j = i + 1; j < this.data.taskArray.length; j++) {
                    if (this.data.taskArray[i].bounty < this.data.taskArray[j].bounty) {
                        var temp = this.data.taskArray[i];
                        this.data.taskArray[i] = this.data.taskArray[j];
                        this.data.taskArray[j] = temp;
                    }
                }
            }
            console.log("排序后taskArray", this.data.taskArray);
        } else {
            console.log("按时间排序");

        }
        this.setData({
            taskArray: this.data.taskArray
        })
    },
    onLoad: function(options) {
        var server = app.globalData.server;
        var that = this;
        console.log("-----homePage onLoad() app.globalData.location=", app.globalData.location);
        if(app.globalData.location) {
            console.log("-----homePage onLoad() app.globalData.location=", app.globalData.location);
            that.setData({
                location: app.globalData.location
            })
        }
        if (options.mode == undefined || options.user == undefined) {
            console.log("无传入值，homePage页面，获取所有taskList");
            that.setData({
                isMyInfo: false
            })
            app.reqToServer("tasks", "GET", null, (data) => {
                var task_list = data["data"]["result"];
                console.log("tasks:", task_list);
                for (var i = 0; i < task_list.length; i++) {
                    console.log("----------calculateDistance--------------");
                    var La1 = that.data.location.latitude * Math.PI / 180.0;
                    var La2 = task_list[i].taskloc.latitude * Math.PI / 180.0;
                    var La3 = La1 - La2;
                    var Lb3 = that.data.location.longitude * Math.PI / 180.0 - task_list[i].taskloc.longitude * Math.PI / 180.0;
                    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(La3 / 2), 2) + Math.cos(La1) * Math.cos(La2) * Math.pow(Math.sin(Lb3 / 2), 2)));
                    s = s * 6378.137;//地球半径
                    s = Math.round(s * 10000) / 10000;
                    task_list[i]["distance"] = s;
                }
                that.setData({
                    taskArray: task_list
                });
                that.taskSort();
                console.log("taskArray", that.data.taskArray);
            })
        } else {
            console.log("options=", options);
            that.setData({
                isMyInfo: true
            })
            app.reqToServer("tasks/" + options.mode + "/" + options.user, "GET", null, (data) => {
                var task_list = data["data"]["result"]
                that.setData({
                    taskArray: task_list
                })
            })
        }
    },
    calculateDistance: function (e) {
        // la1, lo1, la2, lo2
        
        console.log("location", this.location);
        console.log("e", e);
        var La1 = this.location.latitude * Math.PI / 180.0;
        var La2 = e.latitude * Math.PI / 180.0;
        var La3 = La1 - La2;
        var Lb3 = this.location.longitude * Math.PI / 180.0 - e.longitude * Math.PI / 180.0;
        var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(La3 / 2), 2) + Math.cos(La1) * Math.cos(La2) * Math.pow(Math.sin(Lb3 / 2), 2)));
        s = s * 6378.137;//地球半径
        s = Math.round(s * 10000) / 10;
        console.log(s);
        return s;
    }
})
