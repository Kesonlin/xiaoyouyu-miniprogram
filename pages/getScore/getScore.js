// pages/getScore/getScore.js

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      
  },

  toPage(e) {
    let url = e.currentTarget.dataset.url
    wx.redirectTo({
      url
    })
  },

  receiveScore() {
    // console.log(1);
    wx.request({
      url: 'http://112.74.33.254:1201/box/bottleHistory/saveScore',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        token: wx.getStorageSync('token')
      },
      data: {
        uuid: app.globalData.scene
      },
      method: 'POST',
      success: (res) => {
        console.log(res);
        if(res.data.code === 500000) {
           // 将积分累加
           app.globalData.userData.score += app.globalData.userData.receiveScore
          // 将获取的积分变为空
        app.globalData.scene = null
        wx.redirectTo({
          url: '/pages/getScore/getSuccess/getSuccess',
       })
        }
        
      },
      fail: (err) => {

      }
    })
  },

  
})