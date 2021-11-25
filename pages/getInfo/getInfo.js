// pages/getInfo/getInfo.js
//获取app
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        //是否有了用户的信息
        hasUserInfo: false,
        //用户信息
        userInfo: {},
        //检测是否可以使用getUserInfo API
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        //授权按钮状态
        flag: false,

        code: '',

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (option) {
        //更改按钮状态
        this.login()
        if (option.status == 1) { //有授权但没注册
            this.setData({
                flag: true
            })

        } else {
            this.setData({ //没授权
                flag: false
            })
        }
    },
    login() {
        wx.login({
            timeout: 1000,
            success: res => {
                this.setData({
                    code: res.code
                })
            },
            fail: res => {
                console.log('login',res);
            }
          })
    },
    //获取手机号(现在都是授权了没有注册)
    getPhone(e) {
        //let rh = app.globalData.requestHub;
        //let url = `${rh.ip.lym}${rh.projName.bottleProj}${rh.interfaceName.wxLogin}`;
        let code = this.data.code

        wx.request({
            url: 'https://www.lizeqiang.top:8088/box/user/loginByWeChat',
            data: {
                iv: e.detail.iv,
                data: e.detail.encryptedData,
                code
            },
            method: 'POST',
            success: (res) => {
                console.log(res);
                //注册成功!获取用户数据
                wx.setStorageSync('token', res.data.data.token)
                app.globalData.userData = res.data.data;
                app.globalData.isLogin = true;
                wx.login({
                    timeout: 1000,
                    success: res => {
                        this.setData({
                            code: res.code
                        })
                    },
                    fail: res => {
                        console.log('login',res);
                    }
                  })

                  wx.showToast({
                    title: '注册成功!',
                })

                if (app.globalData.scene) {
                    // app.globalData.scene?
                    console.log(1);
                    // app.yy.request({
                    //     url: app.Url.updateScore,
                    //     header: {
                    //         token: wx.getStorageSync('token'),

                    //     },
                    //     data: Number(app.globalData.scene),
                    //     method: 'post'
                    // }).then((res) => {
                    //     if (res.code === 400001) {

                    //     } else {
                    //         app.globalData.userData.score += app.globalData.scene
                    //         app.globalData.scene = 0
                    //     }
                    // })

                    wx.request({
                      url: 'http://112.74.33.254:1201/box/bottleHistory/getNewScoreInfo',
                      method: 'POST',
                      data: {
                          uuid: ''
                      },
                      success: (res) => {
                        if(res.code === 50000) {
                           
                            // app.globalData.userData.receiveScore 用户此次扫描得到的积分
                            app.globalData.userData.receiveScore = res.data
                            wx.redirectTo({
                                url: '/pages/getScore/getScore',
                             })
                        }
                      },
                      fail: (err) => {

                      }
                    })
                    
                    // 积分使用后要记得清除
                    // 有积分则的返回领取积分页面
                    
                       
                   

                }
              



                wx.navigateBack({
                    delta: 1,
                })
            },

        })
        //获取code
        // wx.login({
        //     success: res => {
        //         console.log(res);
        //         wx.request({
        //             url: 'https://www.lizeqiang.top:8088/box/user/loginByWeChat',
        //             data: {
        //                 iv: e.detail.iv,
        //                 data: e.detail.encryptedData,
        //                 code: res.code
        //             },
        //             method: 'POST',
        //             success: (res) => {
        //                 //注册成功!获取用户数据
        //                 wx.setStorageSync('token', res.data.data.token)
        //                 app.globalData.userData = res.data.data;
        //                 app.globalData.isLogin = true;
        //                 if (app.globalData.scene) {
        //                     app.yy.request({
        //                         url:app.Url.updateScore,
        //                         header: {
        //                             token:wx.getStorageSync('token'),

        //                         },
        //                         data:
        //                             Number(app.globalData.scene)
        //                         ,
        //                         method:'post'
        //                     }).then((res) => {
        //                         if (res.code === 400001) {

        //                         } else { 
        //                             app.globalData.userData.score += app.globalData.scene
        //                             app.globalData.scene = 0
        //                         }
        //                     })
        //                 }
        //                 wx.showToast({
        //                     title: '注册成功!',
        //                 })

        //                 wx.navigateBack({
        //                     delta: 1,
        //                 })
        //             },

        //         })
        //     }
        // })
    },
    //没授权则-->授权回调
    getUserInfo: function (e) {
        console.log('get userinfo',e);
        //获取用户数据
        app.globalData.userInfo = e.detail.userInfo;
        //获取code
        let code = this.data.code
        console.log(code, 'code');
        wx.request({
            url: `https://www.lizeqiang.top:8088/box/user/loginByWeChat`,
            data: {
                iv: e.detail.iv,
                data: e.detail.encryptedData,
                code
            },
            method: 'POST',
            success: (res) => {
                console.log(res);
                //如果已经注册了----->
                if (res.data.code == '0') {
                    console.log(11111111);
                    app.globalData.isLogin = true;
                    app.globalData.userData = res.data.data;
                    //返回   返回上一个页面
                    wx.navigateBack({
                        delta: 1,
                    })
                } else { //没注册!则进行下一步:手机登录
                    this.setData({
                        flag: true
                    })
                }
                wx.login({
                    timeout: 1000,
                    success: res => {
                        this.setData({
                            code: res.code
                        })
                    },
                    fail: res => {
                        console.log('login',res);
                    }
                  })
            },
            fail: res => {
                console.log('faill', res);
            }

        })
        //已经授权,判断是否注册
        // wx.login({
        //     success: res => {
        //         console.log(res);
        //         wx.request({
        //             url: `https://www.lizeqiang.top:8088/box/user/loginByWeChat`,
        //             data: {
        //                 iv: e.detail.iv,
        //                 data: e.detail.encryptedData,
        //                 code: res.code
        //             },
        //             method: 'POST',
        //             success: (res) => {
        //                 //如果已经注册了----->
        //                 if (res.data.code == '0') {
        //                     app.globalData.isLogin = true;
        //                     app.globalData.userData = res.data.data;
        //                     //返回
        //                     wx.navigateBack({
        //                         delta: 1,
        //                     })
        //                 } else { //没注册!则进行下一步:手机登录
        //                     this.setData({
        //                         flag: true
        //                     })
        //                 }
        //             },
        //             fail: res => {
        //                 console.log('faill', res);
        //             }

        //         })
        //     },
        //     fail: res => {
        //         console.log('fail', res);
        //     }
        // })



    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },





    //排序并用URL键值对的格式
    objKeySort(arys) {
        //先用Object内置类的keys方法获取要排序对象的属性名数组，再利用Array的sort方法进行排序
        var newkey = Object.keys(arys).sort();
        console.log('newkey=' + newkey);
        var newObj = ''; //创建一个新的对象，用于存放排好序的键值对
        for (var i = 0; i < newkey.length; i++) {
            //遍历newkey数组
            newObj += [newkey[i]] + '=' + arys[newkey[i]] + '&';
        }
        return newObj.substring(0, newObj.length - 1);
    },
    //获取当前日期，并转化为时间格式“YYYY-MM-DD HH:MM:SS”
    getDate() {
        var date = new Date();
        var seperator1 = "-";
        var seperator2 = ":";
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (day >= 0 && day <= 9) {
            day = "0" + day;
        }
        if (hours >= 0 && hours <= 9) {
            hours = "0" + hours;
        }
        if (minutes >= 0 && minutes <= 9) {
            minutes = "0" + minutes;
        }
        if (seconds >= 0 && seconds <= 9) {
            seconds = "0" + seconds;
        }
        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + day + " " + hours + seperator2 + minutes + seperator2 + seconds;
        console.log(currentdate)
        return currentdate;
    },
    handleReqObj(selfObj, reqName) {

        //公共请求参数
        let publicReq = {
            version: '1.0', //接口版本
            service: reqName, //接口名称
            channel_code: '70000024', //商户编号  华为吸卡
            user_id: '1', //用户ID
            timestamp: this.getDate(), //发起请求的时间
            charset: 'UTF-8', //参数编码
            sign_type: 'MD5', //签名方式
        }

        Object.assign(publicReq, selfObj);

        //----------------------------//
        //待签名字符串: (1. 排序 2. 加&)
        let sortObj = this.objKeySort(publicReq); //键值对排序
        console.log('获取的待签名字符串为:', sortObj);

        //MD5签名,获取sign

        let key = 'abc' //MD5的秘钥key

        //待签名字符串 + MD5秘钥
        let tempMd5 = sortObj + '&key=' + key;

        let sign = md5(tempMd5).toUpperCase();

        console.log('获得的最终sign签名', sign);

        // 写成最终待发送数据
        let finalData = publicReq;
        finalData.sign = sign;

        return finalData;

    },
})