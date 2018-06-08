const app = getApp()
Page({
    data: {
        userInfo: {},
        verify_status: 0, // 0: 未验证 1：审核中 2：已验证
        score: 1000,
        hunting: 0,
        doing: 0
    },
    onLoad: function (options) {
        let that = this;
        if(app.globalData.userInfo) {
            app.reqToServer("tasks/amount/hunter/"+app.globalData.userInfo.openid, "GET", null, (res)=>{
                that.setData({
                    hunting: res["data"]["amount"]
                })
            })
            app.reqToServer("tasks/amount/publisher/" + app.globalData.userInfo.openid, "GET", null, (res) => {
                that.setData({
                    doing: res["data"]["amount"]
                })
            })
            this.setData({
                userInfo: app.globalData.userInfo,
                verify_status: app.globalData.userInfo.verify ? 2 : app.globalData.userInfo.username ? 1 :0
            })
        }
    },
    goVerify: function(e) {
        if(this.data.verify_status == 0){
            wx.navigateTo({
                url: '../uploadImg/uploadImg',
            })
        }
    },
})

/*call `queryByUser`, filter:  { publisher: { publisher_openid: 'oIWTb4pIc8yFk9NZfAwz-50DHq2M' } }
null []*/