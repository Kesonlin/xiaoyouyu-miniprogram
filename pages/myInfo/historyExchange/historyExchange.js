// pages/myInfo/historyExchange/historyExchange.js
const app = getApp();
const g = app.globalData;
const Url = app.Url;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        loadingEnd: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        wx.showLoading({
            title: '加载中...',
        })
        let url = Url.getGiftRecordByUid;
        wx.request({
            url,
            data: {
                uid: g.userData.id
            },
            method: 'POST',
            success: res => {
                wx.hideLoading()
                console.log(res)
                this.setData({
                    loadingEnd: true,
                    data: res.data.data
                })
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