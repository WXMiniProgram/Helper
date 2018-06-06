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
        wx.showLoading({
            title: '拉取信息中',
            mask: true
        })
        let server = app.globalData.server;
        let that = this;
        if(app.globalData.location) {
            that.setData({
                location: app.globalData.location
            });
            console.log("-----location", that.data.location);
        }
        if (!options.mode || !options.user) {
            that.setData({
                isMyInfo: false
            })
            app.reqToServer("tasks", "GET", null, (data) => {
                let task_list = data["data"]["result"];
                for (let i = 0; i < task_list.length; i++) {
                    /*let La1 = that.data.location.latitude * Math.PI / 180.0;
                    let La2 = task_list[i].taskloc.latitude * Math.PI / 180.0;
                    let La3 = La1 - La2;
                    let Lb3 = that.data.location.longitude * Math.PI / 180.0 - task_list[i].taskloc.longitude * Math.PI / 180.0;
                    let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(La3 / 2), 2) + Math.cos(La1) * Math.cos(La2) * Math.pow(Math.sin(Lb3 / 2), 2)));
                    s = s * 6378.137;//地球半径
                    s = Math.round(s * 10000) / 10000;*/
                    // task_list[i]["distance"] = s;
                    task_list[i]["distance"] = that.calcDistance(task_list[i].taskloc)
                }
                that.setData({
                    taskArray: task_list
                });
                that.taskSort();
                wx.hideLoading();
            })
        } else {
            that.setData({
                isMyInfo: true
            })
            app.reqToServer("tasks/" + options.mode + "/" + options.user, "GET", null, (data) => {
                let task_list = data["data"]["result"]
                for (let i = 0; i < task_list.length; i++) {
                    /*let La1 = that.data.location.latitude * Math.PI / 180.0;
                    let La2 = task_list[i].taskloc.latitude * Math.PI / 180.0;
                    let La3 = La1 - La2;
                    let Lb3 = that.data.location.longitude * Math.PI / 180.0 - task_list[i].taskloc.longitude * Math.PI / 180.0;
                    let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(La3 / 2), 2) + Math.cos(La1) * Math.cos(La2) * Math.pow(Math.sin(Lb3 / 2), 2)));
                    s = s * 6378.137;//地球半径
                    s = Math.round(s * 10000) / 10000;*/
                    
                    // task_list[i]["distance"] = s.toFixed(2);
                    task_list[i]["distance"] = that.calcDistance(task_list[i].taskloc)
                }
                that.setData({
                    taskArray: task_list
                })
                that.taskSort();
                wx.hideLoading();
            })
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
        console.log('picker发送选择改变，携带值为', e.detail.value)
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
        console.log('picker发送选择改变，携带值为', e.detail.value)
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
            complete:function() {

            }
        })
    },
    goMyInfo:function() {
        wx.navigateTo({
            url: '../myInfo/myInfo',
        })
    },
    taskSort:function() {
        if (this.data.sortIndex == 0) {
            console.log("按距离排序");
            for(let i =0; i<this.data.taskArray.length; i++) {
                for(let j = i+1; j<this.data.taskArray.length; j++) {
                    if(this.data.taskArray[i].distance > this.data.taskArray[j].distance) {
                        let temp = this.data.taskArray[i];
                        this.data.taskArray[i] = this.data.taskArray[j];
                        this.data.taskArray[j] = temp;
                    }
                }
            }
            console.log("排序后taskArray", this.data.taskArray);
        } else if(this.data.sortIndex == 1) {
            console.log("按赏金排序");
            for (let i = 0; i < this.data.taskArray.length; i++) {
                for (let j = i + 1; j < this.data.taskArray.length; j++) {
                    if (this.data.taskArray[i].bounty < this.data.taskArray[j].bounty) {
                        let temp = this.data.taskArray[i];
                        this.data.taskArray[i] = this.data.taskArray[j];
                        this.data.taskArray[j] = temp;
                    }
                }
            }
            console.log("排序后taskArray", this.data.taskArray);
        }
        this.setData({
            taskArray: this.data.taskArray
        })
    }
})
