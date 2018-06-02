const app = getApp()
Page({
    data: {
        userInfo: {},
        verify_status: 0, // 0: 未验证 1：审核中 2：已验证
        score: 1000,
        loading: true, //是否正在上传
        publishedNum: 8,
        huntedNum: 1
    },
    onLoad: function () {
      if(app.globalData.userInfo) {
        this.setData({
            userInfo: app.globalData.userInfo,
        })
      } else {
        // TODO:
        }
        // console.log(score);
    },
    goVerify: function(e) {
        wx.navigateTo({
            url: '../uploadImg/uploadImg',
        })
    },
})