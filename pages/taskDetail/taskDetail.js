// pages/createTask/createTask.js
var util = require('../../utils/util.js');
const app = getApp();
Page({
    data: {
        id: "",
        userInfo: {},
        title: "",
        bounty: 0,
        date: util.formatDate(new Date()),
        time: util.formatTime(new Date(), false),
        location: {
            "name": "任意",
            "address": "",
            "latitude": 0,
            "longitude": 0
        },
        description: "",
        hasPrivate: false,
        hiddenMsg: "",
        status: 0, // 0：新任务 1：待领取 2：已领取 3：进行中 4：已完成
        canAccess: false, // 是否是领取者
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
        app.checkVerify(() => {
            var that = this;
            if (options["id"]) { // 查看详情
                let task_id = options["id"];
                app.reqToServer('tasks/' + task_id, "GET", null, (detail) => { // 用传来的task_id申请获取任务详情
                    detail = detail["data"]["result"];
                    let publisher = {
                        "openid": detail["publisher"]["publisher_openid"],
                        "username": detail["publisher"]["publisher_username"],
                        "avatar": detail["publisher"]["publisher_avatar"]
                    };
                    let hunter = detail["hunter"] ?{
                        "openid": detail["hunter"]["hunter_openid"],
                        "username": detail["hunter"]["hunter_username"],
                        "avatar": detail["hunter"]["hunter_avatar"]
                    } : {
                        "id": "",
                        "username": "待领取",
                        "avatar": "" // TODO: 设为default
                    };
                    let canAccess = false;
                    let canModify = false;
                    if(detail["status"]<=3){ // 任务未结束
                        if (publisher["publisher_openid"] == app.globalData.userInfo.openid){ // 是发布者
                            canAccess = canModify = true;
                        } else if (hunter && hunter["hunter_openid"] == app.globalData.userInfo.openid){
                            // 是领取者
                            canAccess = true;
                        }
                    }
                    console.log("detail:", detail, canAccess, canModify);
                    that.setData({
                        id: detail["id"],
                        title: detail["caption"],
                        bounty: detail["bounty"],
                        location: detail["taskloc"],
                        description: detail["description"],
                        hasPrivate: detail["hiddenMsg"] != null,
                        hiddenMsg: detail["hiddenMsg"],
                        status: detail["status"],
                        // 发布者，且任务未结束的时候才能修改
                        canModify: canModify,
                        canAccess: canAccess,
                        publisher: publisher,
                        hunter: hunter,
                    });
                    console.log("after...", that.data);
                })
            }
        });
    },
    formSubmit: function (e) {
        var values = e.detail.value,
            that = this;
        console.log("values", values);
        var form = {
            caption: values.title,
            bounty: that.data.bountyArray[that.data.bountyIndex],
            date: that.data.date,
            time: that.data.time,
            taskloc: that.data.location,
            description: values.desc,
            hiddenMsg: values.hiddenMsg,
            publisher: {
                publisher_openid: that.data.publisher.openid,
                publisher_username: that.data.publisher.username,
                publisher_avatar: that.data.publisher.avatar,
            },
        }
        app.openConfirm("确认发布？", "任务完成前仍可随时更改", "发送", "取消", (e) => {
            if (e.confirm) {
                app.reqToServer('tasks/', "POST", form, (res) => {
                    console.log("submit response", res);
                    if (res["statusCode"] == 200) {
                        app.openToast("发布成功");
                        wx.reLaunch({
                            url: "../homePage/homePage"
                        });
                    } else {
                        app.openToast("表单不完整")
                    }
                })
            }
        });
    },
    bindSwitchChange: function (e) {
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
    getTask: function(e){
        let that = this;
        let hunter = {
            "hunter_openid": app.globalData.userInfo.openid,
            "hunter_username": app.globalData.userInfo.username,
            "hunter_avatar": app.globalData.userInfo.avatar
        }
        let form = {
            "verb": "get",
            "hunter": hunter,
            "status": 3
        }
        app.reqToServer("tasks/"+that.data.id, "POST", form, (res)=>{
            console.log(res);
            app.openToast("领取成功!");
            wx.reLaunch({
                url: '../homePage/homePage',
            })
        });
    },
    showLocation: function () {
        var that = this;
        wx.openLocation({
            latitude: that.data.location.latitude,
            longitude: that.data.location.longitude,
        })
    }
})