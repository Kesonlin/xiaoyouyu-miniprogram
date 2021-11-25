// pages/myInfo/historyBottle/historyBottle.js
const app = getApp();
const g = app.globalData;
const Url = app.Url
Page({

    /**
     * 页面的初始数据
     */
    data: {
        loadingEnd:true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        // wx.showLoading({
        //     title: '加载中...',
        // })
        let url = Url.findRecordByUid;
        wx.request({
            url,
            data: {
                uid: g.userData.id
            },
            method: 'POST',
            success: res => {
                console.log(res)
                wx.hideLoading()
                this.setData({
                    loadingEnd:true,
                    data:res.data.data
                })
            }
        })


        let array = [{
                "uid": 8,
                "score": 20,
                "model": "LFS-101 管委会正门",
                "date": "2020-03-24 19:00:09",
                "type": 1,
                "status": 1
            },
            {
                "uid": 8,
                "score": 20,
                "model": "LFS-101 管委会正门",
                "date": "2020-03-24 19:00:09",
                "type": 1,
                "status": 0
            },
            {
                "uid": 8,
                "score": 20,
                "model": "LFS-101 管委会正门",
                "date": "2020-03-24 19:00:09",
                "type": 0,
                "status": 1
            },
            {
                "uid": 8,
                "score": 20,
                "model": "LFS-101 管委会正门",
                "date": "2020-03-24 19:00:09",
                "type": 1,
                "status": 1
            }
        ]

        


        let url1 = `${g.requestHub.ip.lym}${g.requestHub.projName.bottleProj}/bottleRecord/addRecord.do`
        wx.request({
            url:url1,
            data: array,
            method: 'POST',
            success: res => {
                console.log(res,111111111111111111)
            }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})