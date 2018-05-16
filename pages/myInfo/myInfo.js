// pages/myInfo/myInfo.js

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
    data: {
        userInfo: {},
        verify_status: 0, // 0: 未验证 1：审核中 2：已验证
        score: 1000,
        loading: true, //是否正在上传
        publishedNum: 8,
        huntedNum: 1
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if(app.globalData.userInfo) {
        this.setData({
            userInfo: app.globalData.userInfo,
        })
        } else {
        wx.getUserInfo({
            success:res => {
            app.globalData.userInfo = res.userInfo
            this.setData({
                userInfo: res.userInfo,
            })
            }
        })
        }
    },

    getUserInfo: function(e) {
        console.log(e)
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
        userInfo: e.detail.userInfo,
        })
    },
    goVerify: function(e) {
        wx.navigateTo({
            url: '../uploadImg/uploadImg',
        })
    },
    bindVerifyTap: function(e) {
        var that = this;
        wx.chooseImage({
        count:1,
        success: function(tempPath, tempFiles) {
            that.setData({
            loading: true // 按钮置于加载状态
            })
            wx.uploadFile({
            url: that.globalData.server_url,
            filePath: tempPath,
            name: 'img',
            formData: {
                "user_id":" app.globalData.userinfo.id"
            },
            success: (e)=>{
                that.setData({
                loading: false // 恢复按钮状态
                })
            }
            })
        },
        })
    },
})