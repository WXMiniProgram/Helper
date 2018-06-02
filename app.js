//app.js
App({
    onLaunch: function () {
        // 展示本地存储能力
        var logs = wx.getStorageSync('logs') || []
        var that = this;
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs);
        that.globalData.userInfo = wx.getStorageSync("userInfo");
        // 登录\
        if(!that.globalData.userInfo){
        //if(true){
            wx.login({
                success: res => {
                    that.reqToServer("user/login/" + res.code, "GET", null, (res) => {
                        let data = res["data"]["result"];
                        console.log("userData", data);
                        wx.setStorage({
                            key: 'userInfo',
                            data: data,
                        })
                        that.globalData.userinfo = res.data;
                    });
                }
            })
        }
    },
    globalData: {
        userInfo: null,
        server: "https://abc.yhmeng.top/"
        /*
        {
            _id: unique,
            openid: unique,
            username:String
            avatar:url String
            score:number
            verify:boolean
        }
         */
    },
    // 　　const app = getApp()    其他文件 加这句就可以使用app.js里的内容 如app.toServer
    
    reqToServer: function(url, method="GET", formData=null, succfunc=function(){}, errfunc=function(){}){
        var that = this;
        wx.request({
            url: that.globalData.server + url,
            method: method.toUpperCase(), // 必须为大写
            data: formData,
            // dataType: "json",
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: succfunc,
            fail: errfunc
        })
    },
    uploadToServer: function(url, filePath, fileKey, formData, succfunc, errfunc){
        let that = this;
        wx.uploadFile({
            url: that.globalData.server + url,
            filePath: filePath,
            name: fileKey,
            formData: formData,
            success: succfunc, // success(res) res.data
            fail: errfunc
        })
    },
    openConfirm: function (title, content, confirmText, cancelText, func) {
        wx.showModal({
            title: title,
            content: content,
            confirmText: confirmText,
            cancelText: cancelText,
            success: func
            /*success: function (res) {
                console.log(res);
                if (res.confirm) {
                    console.log('用户点击主操作')
                } else {
                    console.log('用户点击辅助操作')
                }
            }*/
        });
    },
    openToast: function(title, duration = 3000){
        wx.showToast({
            title: title,
            icon: 'success',
            duration: duration
        });
    }
})