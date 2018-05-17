//app.js
App({
    onLaunch: function () {
        // 展示本地存储能力
        var logs = wx.getStorageSync('logs') || []
        var that = this;
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)

        // 登录
        wx.login({
            success: res => {
                that.reqToServer("http://127.0.0.1:3000/login/"+res.code, "GET", null, (res)=>{
                    that.globalData.userinfo = res.user;
                });
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
            }
        })
    },
    globalData: {
        userInfo: null
        /*
        {
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
        wx.request({
            url: url,
            method: method.toUpperCase(), // 必须为大写
            data: formData,
            //dataType: "json",
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: succfunc,
            fail: errfunc
        })
    },
    uploadToServer: function(url, filePath, fileKey, formData, succfunc, errfunc){
        wx.uploadFile({
            url: url,
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
            confirmText: confitmText,
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