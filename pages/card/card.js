// pages/card/card.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tempCard: '',
        cards: [],
        userData: {},


    },

    //点击卡片进入充值界面并传递参数
    to(event) {
        

        wx.showToast({
            title: '该功能暂未开放,敬请期待',
            icon: 'none',

        })
        // wx.navigateTo({
        //     url: event.currentTarget.dataset.path,
        // })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

        //初始化数据
        this.setData({
            userData: app.globalData.userData,
            cards: app.globalData.userData.cards
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
    onShow: function(e) {
        
        //获取用户的绑定的羊城通卡号
        wx.request({
            url: 'https://www.gdutcatming.top/BottleProject/card/searchCard.do',
            data: {
                user_id : this.data.userData.id.toString(),
                user_type: '1'
            },
            method: 'POST',
            success: (res)=> {
                this.setData({
                    cards:res.data.data
                })
            },
        })

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