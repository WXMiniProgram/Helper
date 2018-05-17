const app = getApp();
Page({
    data: {
        file: null
    },
    chooseImg: function (e) {
        var that = this;
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
    uploadImg: function(){
        var that = this;
        wx.uploadFile({
            url: 'https://example.weixin.qq.com/upload', //仅为示例，非真实的接口地址
            filePath: that.data.file,
            name: 'image',
            formData: {
                'username': 'username'
            },
            success: function (res) {
                var data = res.data
                // 跳转到 成功操作页面
                wx.navigateTo({
                    url: '../response/response_success'
                })
            },
            fail: function(err){
                that.setData({
                    file: null
                });
                wx.navigateTo({
                    url: '../response/response_fail'
                });
            }
        })
    },
    formSubmit: function(e){
        var values = e.detail.value,
            that = this;
        var form = {
            id: app.globalData.userInfo["openid"],
            name: values["name"],
            school: values["school"],
            schoolId: values["schoolId"],
        }
        app.reqToServer("verify/", "POST", form, (res)=>{
            var file = that.data.file;
            app.uploadToServer("uploadImg", file, "img", null, (res)=>{
                wx.navigateTo({
                    url: '../response/response_success'
                })
            },
            (res)=>{
                wx.navigateTo({
                    url: '../response/response_fail'
                })
            }
            )
        })
    }
});