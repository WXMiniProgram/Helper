const app = getApp()
Page({
    data: {
        userInfo: {},
        verify_status: 0, // 0: 未验证 1：审核中 2：已验证
        score: 1000,
        publishedNum: 8,
        huntedNum: 1
    },
    onLoad: function () {
        if(app.globalData.userInfo) {
            //app.reqToServer("tasks/")
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