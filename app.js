//app.js
App({
    globalData: {
        userInfo: null,
        location: null,
        server: "https://abc.yhmeng.top/"
    },
    onLaunch: function () {
        wx.showLoading({
            title: '拉取信息中',
            mask: true
        })
        // 展示本地存储能力
        var logs = wx.getStorageSync('logs') || []
        var that = this;
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs);
        that.globalData.userInfo = wx.getStorageSync("userInfo");
        wx.getLocation({
            success: function (res) {
                that.globalData.location = res;
                if (!that.globalData.userInfo) {
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
                                that.globalData.userInfo = res.data;
                                if (that.homePageLoad) {
                                    that.homePageLoad();
                                }
                            });
                        }
                    })
                }else{
                    if (that.homePageLoad) {
                        that.homePageLoad();
                    }
                }
                
            },
        });
        // 登录\
        /*if(!that.globalData.userInfo){
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
                        if (that.getUserInfoCallBack){
                            that.getUserInfoCallBack(data);
                        }
                        that.globalData.userInfo = res.data;
                    });
                }
            })
        }*/
        
    },
     /**
         * openid: ID String
         * username: String,
         * name: String(read name),
         * verify: Boolean,
         * school: String,
         * avatar: URL String,
         * img: URL String,
         * school_id: String
         * 
         */
    
    // 　　const app = getApp()    其他文件 加这句就可以使用app.js里的内容 如app.toServer
    checkVerify(func){
        if(true){
        //if (this.globalData.userInfo.verify){
            func();
        }else{
            this.openConfirm("未认证", "通过认证后方可继续", "去认证", "取消", (res)=>{
                if(res.confirm){
                    wx.navigateTo({
                        url: '../uploadImg/uploadImg',
                    })
                }else{
                    wx.navigateBack({
                        delta: 1
                    })
                }
            })
        }
    },
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