// pages/response/response_success.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        title: "",
        content: "",
    },
    onLoad: function(options){
        this.setData({
            title: options["title"],
            content: options["content"],
        })
    },
    returnHome: function(e){
        wx.redirectTo({
            url: '../homePage/homePage'
        })
    }
})