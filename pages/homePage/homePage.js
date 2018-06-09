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
        options: "",
        taskArray: []
    },
    onLoad: function (options) {
        let that = this;
        that.data.options = options;
        if (!app.globalData.location) {
            app.homePageLoad = ()=>{
                that.setData({
                    location: app.globalData.location
                });
                that.loadTaskArray(options);
            }
        }
        else{
            wx.showLoading({
                title: '拉取信息中',
                mask: true
            })
            that.setData({
                location: app.globalData.location
            })
            that.loadTaskArray(options);
        }
    },
    onPullDownRefresh: function(){
        let that = this;
        wx.showNavigationBarLoading(); 
        app.refreshData(()=>{
            that.setData({
                location: app.globalData.location
            });
            that.loadTaskArray(that.data.options);
        })
    },
    loadTaskArray: function(options) {
        let that = this;
        let hasParam = app.isValid(options) && app.isValid(options.mode) && app.isValid(options.user)
        let url = hasParam ? "tasks/" + options.mode + "/" + options.user : "tasks"
        app.reqToServer(url, "GET", null, (data) => {
            let task_list = data["data"]["result"]
            for (let i = 0; i < task_list.length; i++) {
                task_list[i]["distance"] = that.calcDistance(task_list[i].taskloc)
            }
            that.setData({
                isMyInfo: hasParam,
                taskArray: that.taskSort(task_list, hasParam),
            })
            wx.hideLoading();
            // 隐藏顶部加载框  
            wx.hideNavigationBarLoading();
            // 停止下拉动作  
            wx.stopPullDownRefresh(); 
        })
    },
    calcDistance: function(location){
        let that = this;
        let La1 = that.data.location.latitude * Math.PI / 180.0;
        let La2 = location.latitude * Math.PI / 180.0;
        let La3 = La1 - La2;
        let Lb3 = location.longitude * Math.PI / 180.0 - location.longitude * Math.PI / 180.0;
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
            curtype: that.data.sortArray[i],
            taskArray: that.taskSort(that.data.taskArray)
        });
    },
    bindFilterChange:function(e) {
        let that = this;
        let i = e.detail.value;
        that.setData({
        filterIndex: i,
        curFilter: that.data.filterArray[i]
        });
    },
    goTaskDetail: function(e){
        wx.navigateTo({
            url: '../taskDetail/taskDetail?id='+e.currentTarget.id,
        })
    },
    goCreateTask:function() {
        wx.navigateTo({
            url: '../createTask/createTask',
        })
    },
    goMyInfo:function() {
        wx.navigateTo({
            url: '../myInfo/myInfo',
        })
    },
    taskSort: function (task_list, isMyInfo=false) {
        if(isMyInfo){
            for (let i = 0; i < task_list.length; i++) {
                for (let j = i + 1; j < task_list.length; j++) {
                    if (task_list[i].status > task_list[j].status) {
                        let temp = task_list[i];
                        task_list[i] = task_list[j];
                        task_list[j] = temp;
                    }
                }
            }
        }
        else if (this.data.sortIndex == 0) {
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
        return task_list
    }
})
