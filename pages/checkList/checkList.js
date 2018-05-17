const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
    data: {
        cardArray:[{
            id:"userid",
            username: "cuttlefish",
            name: "赵欣璇",
            school: "南开大学",
            schoolId: "1511509",
            phone: "15032002730",
            src:"../../images/bg01.jpg",
            succURL: "http://127.0.0.1/checkUser/pass/userid",
            rejectURL: "http://127.0.0.1/checkUser/reject/userid"
        }]
    },
    bindImageTap: function(e){
        const dataset = e.currentTarget.dataset;
        const cur_img = dataset.current;
        const url = dataset.url;
        wx.previewImage({
            current: cur_img,
            urls: [cur_img],
        })
    },
    bindPassTap: function(e) { // 使用 hypermedia
        const index = e.currentTarget.dataset.index;
        const card = this.data.cardArray[index];
        // 后台发送请求, 刷新界面
        app.reqToServer(card.succURL);
    },
    bindRejectTap: function(e) {
        const index = e.currentTarget.dataset.index;
        const card = this.data.cardArray[index];
        // 后台发送请求, 刷新界面
        app.reqToServer(card.rejectURL);
    }
  
})