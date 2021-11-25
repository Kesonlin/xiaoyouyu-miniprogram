// pages/bindCard/bindCard.js
const app = getApp();
const rh = app.globalData.requestHub;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        cardNum: ''

    },
    getCardNum(e) {
        this.setData({
            cardNum: e.detail.value
        })
    },
    bindCard() {
        let cardNum = this.data.cardNum;
        let re = /^\d{10}$/;
        if (!re.test(cardNum)){
            wx.showToast({
                title: '请输入正确的羊城通卡号!',
                icon: 'none',
            })
            return;
        }


        let url = `${rh.ip.lym}${rh.projName.bottleProj}${rh.interfaceName.bindCard}`
        wx.request({
            url: 'https://www.gdutcatming.top/BottleProject/card/bindCard.do',
            data: {
                user_id: app.globalData.userData.id.toString(),
                user_type:'1',
                card_number: cardNum.toString()
            },
            method: 'post',
            success: (res) => {
                if (res.data.code == 0) {
                    wx.showToast({
                        title: '绑定成功',
                    })

                    wx.navigateBack({
                        delta: 1
                    });

                } else {
                    wx.showToast({
                        title: '绑定失败,请稍后再试!',
                        icon: 'none'
                    })
                }
            },
        })
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {


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