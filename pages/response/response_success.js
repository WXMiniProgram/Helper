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
        console.log(options);
        var params = options.params,
            that = this;
        that.setData({
            title: params["title"],
            content: params["content"],
        })
    },
    returnHome: function(e){
        wx.redirectTo({
            url: '../homePage/homePage'
        })
    }
})