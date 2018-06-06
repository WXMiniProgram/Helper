//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        isMyInfo: false,
        location: {},
        sortIndex: 0,
        sortArray: ['距离', '赏金'],
        filterIndex: 0,
        filterArray: ['全部', '取快递', '借东西', '其他'],
        taskArray: []
    },
    onLoad: function (options) {
        let server = app.globalData.server;
        let that = this;
        if (!app.globalData.location) {
            app.homePageLoad = (datas)=>{
                that.setData({
                    location: app.globalData.location
                });
                if (!options.mode || !options.user) {
                    that.setData({
                        isMyInfo: false
                    })
                    app.reqToServer("tasks", "GET", null, (data) => {
                        if (app.globalData.location) {
                            that.setData({
                                location: app.globalData.location
                            });
                        }
                        let task_list = data["data"]["result"];
                        for (let i = 0; i < task_list.length; i++) {
                            task_list[i]["distance"] = that.calcDistance(task_list[i].taskloc)
                        }
                        /*that.setData({
                            taskArray: task_list
                        });*/
                        that.taskSort(task_list);
                        wx.hideLoading();
                    })
                } else {
                    that.setData({
                        isMyInfo: true
                    })
                    app.reqToServer("tasks/" + options.mode + "/" + options.user, "GET", null, (data) => {
                        let task_list = data["data"]["result"]
                        for (let i = 0; i < task_list.length; i++) {
                            task_list[i]["distance"] = that.calcDistance(task_list[i].taskloc)
                        }
                        that.setData({
                            taskArray: task_list
                        })
                        that.taskSort();
                        wx.hideLoading();
                    })
                }
            }
        }
    },
    calcDistance: function(location){
        let that = this;
        let La1 = that.data.location.latitude * Math.PI / 180.0;
        let La2 = location.latitude * Math.PI / 180.0;
        let La3 = La1 - La2;
        let Lb3 = that.data.location.longitude * Math.PI / 180.0 - location.longitude * Math.PI / 180.0;
        let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(La3 / 2), 2) + Math.cos(La1) * Math.cos(La2) * Math.pow(Math.sin(Lb3 / 2), 2)));
        s = s * 6378.137;//地球半径
        s = Math.round(s * 10000) / 10000;
        return s.toFixed(2)
    },
    //事件处理函数
    bindSortChange:function(e) {
        let that = this;
        let i = e.detail.value;
        that.setData({
            sortIndex: i,
            curtype: that.data.sortArray[i]
        });
        console.log("bindSortChange")
        that.taskSort();
    },
    bindFilterChange:function(e) {
        let that = this;
        let i = e.detail.value;
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
        })
    },
    goMyInfo:function() {
        wx.navigateTo({
            url: '../myInfo/myInfo',
        })
    },
    taskSort: function (task_list) {
        if (this.data.sortIndex == 0) {
            for (let i = 0; i < task_list.length; i++) {
                for (let j = i + 1; j < task_list.length; j++) {
                    if (task_list[i].distance > task_list[j].distance) {
                        let temp = task_list[i];
                        task_list[i] = task_list[j];
                        task_list[j] = temp;
                    }
                }
            }
        } else if(this.data.sortIndex == 1) {
            for (let i = 0; i < task_list.length; i++) {
                for (let j = i + 1; j < task_list.length; j++) {
                    if (task_list[i].bounty < task_list.bounty) {
                        let temp = task_list[i];
                        task_list[i] = task_list[j];
                        task_list[j] = temp;
                    }
                }
            }
        }
        this.setData({
            taskArray: task_list
        })
    }
})
