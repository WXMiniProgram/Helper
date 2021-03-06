const app = getApp();
Page({
    data: {
        file: null,
        avatarURL: "",
        nickname: ""
    },
    chooseImg: function (detail) {
        let userInfo = detail["detail"]["userInfo"];
        let that = this;
        this.setData({
            nickname: userInfo["nickName"],
            avatarURL: userInfo["avatarUrl"]
        })
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            success: function (res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                that.setData({
                    file: res.tempFilePaths[0]
                });
            }
        })
    },
    formSubmit: function(detail){
        let values = detail["detail"]["value"];
        let that = this;
        let openid = app.globalData.userInfo["openid"];
        var form = {
            openid: openid,
            name: values["name"],
            school: values["school"],
            school_id: values["schoolId"],
            avatar: that.data.avatarURL,
            username: that.data.nickname
        }
        app.uploadToServer("user/uploadImg/" + openid, that.data.file, "img", null, (res)=>{
            let result = res.data.result;
        },(err)=>{
            that.setData({
                file: null,
                userInfo: result
            });
            wx.reLaunch({
                url: '../response/response_fail'
            });
        })
        app.reqToServer("user/verify/"+openid, "POST", form, (res)=>{
            let result = res.data.result;
            wx.setStorage({
                key: 'userInfo',
                data: result,
            })
            app.globalData.userInfo = result;
            that.setData({
                userInfo: result
            })
            console.log(app.globalData.userInfo);
            wx.navigateTo({
                url: '../response/response_success?title="上传成功"&content="请耐心等待审核"',
                
            })
        }, ()=>{})
    }
});