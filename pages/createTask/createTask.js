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
        publisher:null,
        /*
            {
                id: openid,
                username:
                avatar:
            }
         */
        hunter:null
    },
    onLoad: function (options) {
        var params = null;
        var that = this;
        if (options.params) {
            params = JSON.parse(options.params);
            var publisher = params["publisher"];
            that.setData({
                title: params["title"],
                bountyIndex: params["bounty"],
                date: params["date"],
                time: params["time"],
                location: params["location"],
                description: params["bounty"],
                // hiddenMsg 要传吗？？在HTTP层能拿到
                hasPrivate: params["private"] != null,
                status: params["status"],
                isPublisher: params["publisher"]["id"] == app.globalData.userinfo.id,
                // 发布者，且任务未结束的时候才能修改
                canModify: params["publisher"]["id"] == app.globalData.userinfo.id && params["status"] <= 3,
                publisher: params["publisher"],
                hunter: params["hunter"]
            })
        } else {
            that.setData({
                publisher: app.globalData.userInfo
            })
        }
    },
    formSubmit: function(e) {
        console.log("--------------------------------")
        var values = e.detail.value,
            that = this;
        var form = {
            title: values.title,
            bounty: that.data.bountyArray[that.data.bountyIndex],
            date: that.data.date,
            time: that.data.time,
            location: that.data.location,
            description: values.desc,
            hiddenMsg: values.hiddenMsg,
            publisher: that.data.publisher,
            hunter: that.data.hunter
        }
        console.log(form);
        app.reqToServer('tasks/', "POST", form, (res)=>{
            app.openConfirm("确认发布？", "任务完成前仍可随时更改", "发送", "取消", (e)=>{
                if(res.confirm){
                    app.openToast("发布成功");
                    wx.redirectTo({
                        url: "../homePage/homePage"
                    })
                }
            });
            
        })
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