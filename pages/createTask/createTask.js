// pages/createTask/createTask.js
var util = require('../../utils/util.js');
const app = getApp();
Page({
    data: {
        title:"",
        bountyArray:["0", "1", "2", "3", "4", "5"],
        bountyIndex: 0,
        date: util.formatDate(new Date()),
        time: util.formatTime(new Date(), false),
        location: {
            "name": "任意",
            "address": "",
            "latitude": 0,
            "longitude": 0
        },
        description:"",
        hasPrivate: false,
        hiddenMsg: "",
        status: 0, // 0：新任务 1：待领取 2：已领取 3：进行中 4：已完成
        isPublisher: true, // 临时加的 判断是不是当前用户创建的这个任务
        canModify: true,
        publisher: {
            "openid": null,
            "username": null,
            "avatar": null,
        },
        hunter: {
            "openid": null,
            "username": null,
            "avatar": null,
        }
    },
    onLoad: function (options) {
        var that = this;
        console.log("option", options);
        if (options["query"]) {
            let params = JSON.parse(options.query);
            let task_id = params["task_id"];
            app.reqToServer('task/'+task_id, "GET", null, (detail)=>{
                let publisher = detail["publisher"];
                that.setData({
                    title: detail["title"],
                    bountyIndex: detail["bounty"],
                    date: detail["date"],
                    time: detail["time"],
                    location: detail["location"],
                    description: detail["description"],
                    // hiddenMsg 要传吗？？在HTTP层能拿到
                    hasPrivate: detail["private"] != null,
                    status: detail["status"],
                    isPublisher: publisher["id"] == app.globalData.userinfo.id,
                    // 发布者，且任务未结束的时候才能修改
                    canModify: publisher["id"] == app.globalData.userinfo.id && detail["status"] <= 3,
                    publisher: params["publisher"],
                    hunter: params["hunter"]
                })
            })
            let publisher = params["publisher"];
        } else {
            let publisher = app.globalData.userInfo;
            console.log("publisher", publisher);
            that.setData({
                publisher: {
                    "openid": publisher["openid"],
                    "username": publisher["username"],
                    "avatar": publisher["avatar"]
                }
            });
        }
    },
    formSubmit: function(e) {
        var values = e.detail.value,
            that = this;
        console.log("values", values);
        var form = {
            title: values.title,
            bounty: that.data.bountyArray[that.data.bountyIndex],
            date: that.data.date,
            time: that.data.time,
            location: that.data.location,
            description: values.desc,
            hiddenMsg: values.hiddenMsg,
            publisher: that.data.publisher.openid,
            hunter: that.data.hunter.openid
        }
        console.log(form);
        app.openConfirm("确认发布？", "任务完成前仍可随时更改", "发送", "取消", (e) => {
            if(e.confirm){
                app.reqToServer('tasks/', "POST", form, (res) => {
                    console.log(res)
                    if(res["statusCode"] == 200){
                        console.log(res);
                        app.openToast("发布成功");
                        wx.reLaunch({
                            url: "../homePage/homePage"
                        });
                    }else{
                        app.openToast("表单不完整")
                    }
                })
            }
        });
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
    },
    bindDateChange: function (e) {
        this.setData({
            date: e.detail.value
        })
    },
    bindTimeChange: function (e) {
        this.setData({
            time: e.detail.value
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
    /*gotoPublisher: function(){
        wx.navigateTo({
            url: '../myInfo/myInfo',
        })
    },*/

})