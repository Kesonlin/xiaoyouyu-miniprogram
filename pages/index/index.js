//index.js
//获取应用实例
const app = getApp()

Page({
    data: {

        //用户个人信息
        userInfo: {
            nickName:'请登录'
        },
        //登录获取状态
        hasUserInfo: false,
        //用户其他信息
        userData: {
            score: '请登录',
            bottleCount: 0,
        },

        //扫码结果
        result: "",
        nowTime:'早上好'

    },
    //解析链接参数 方法
    getQueryString: function(url, name) {
        var reg = new RegExp('(^|&|/?)' + name + '=([^&|/?]*)(&|/?|$)', 'i');
        var r = url.substr(1).match(reg);
        if (r != null) {
            // console.log("r = " + r)
            // console.log("r[2] = " + r[2])
            return r[2];
        }
        return null;
    },
    getScancode() {
        // 调用扫码，允许从相机和相册扫码
        wx.scanCode({
            //若扫码出结果
            success: (res) => {
                //获取信息
                // let result = res.result;
                // URI解码
                console.log(res);
                let result = decodeURIComponent(res.result);
                console.log(result);

                let score = this.getQueryString(result, "score");
                console.log('score:',score);

                wx.navigateTo({
                    url: "../score/score?score=" + score,
                })
                // 存入当前data
                this.setData({
                    result: result,
                })

            },
            fail: (res) => {
                // console.log(res);
                wx.showToast({
                    title: '失败，请重试！',
                })
            }
        })


    },
    to(event) {
        wx.navigateTo({
            url: event.currentTarget.dataset.path,
        })
    },

    onLoad: function(e) {

        let hour = new Date().getHours()
        if (hour < 6) {
            this.setData({
                nowTime:'凌晨好'
            })
        } else if (hour < 9) {
            this.setData({
                nowTime: '早上好'
            })
        } else if (hour < 12) {
            this.setData({
                nowTime: '上午好'
            })
        } else if (hour < 14) {
            this.setData({
                nowTime: '中午好'
            })
        } else if (hour < 17) {
            this.setData({
                nowTime: '下午好'
            })
        } else if (hour < 19) {
            this.setData({
                nowTime: '傍晚好'
            })
        } else if (hour < 22) {
            this.setData({
                nowTime: '晚上好'
            })
        } else {
            this.setData({
                nowTime: '夜里好'
            })
        }
        // console.log(app.globalData);
        // app.globalData.a = 1
        // console.log(app.globalData);
        if (app.globalData.isGetData) { } else {
            app.getDataReadyCallback = res => {

                console.log(app.globalData)
                this.setData({
                    'userData.pointsCount': app.globalData.userData.score
                })
            }
        }

        if (app.globalData.isGetInfo) { } else {
            app.getInfoReadyCallback = res => {
                this.setData({
                    userInfo: app.globalData.userInfo
                })
            }
        }





    },
    onReady() {


    },
    onShow(){

        this.setData({
            userInfo:app.globalData.userInfo,
            userData:app.globalData.userData
        })
        if (app.globalData.isGetData) { } else {
            app.getDataReadyCallback = res => {

                console.log(app.globalData)
                this.setData({
                    userData: app.globalData.userData
                })
            }
        }

        if (app.globalData.isGetInfo) { } else {
            app.getInfoReadyCallback = res => {
                this.setData({
                    userInfo: app.globalData.userInfo
                })
            }
        }

        console.log('index--show--userData',app.globalData.userData)
        console.log(this.data.userData)
    },

    onShareAppMessage() {

    }
})