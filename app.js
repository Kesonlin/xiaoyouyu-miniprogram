//app.js
const yy = require('./utils/Promise.js')
const Url = require('./utils/Request.js')
App({
    onLaunch: function(options) {
        console.log(options, 'optin')
        let { scene } = options.query
        if (scene) {
          this.globalData.scene = scene
        }
        // 1.进入时判断小程序用户的信息是否授权过 userInfo
        yy.getSetting({})
            .then(res => {
                console.log(res);
                //1.-->1.如果用户已经授权了则直接调用userInfo,发送数据给后台
                if (res.authSetting['scope.userInfo']) {
                    //获取code
                    return yy.login({
                        
                    })


                } else {
                    //没有授权UserInfo,则转至授权界面,弹出授权窗口
                    //切换到手机授权界面
                    wx.navigateTo({
                        url: '/pages/getInfo/getInfo?getInfo=0'
                    })
                    throw 'err'
                }
            })

            .then(res => {
                // console.log(res);
                //保存code
                this.globalData.other.code = res.code;

                return yy.getUserInfo({})
            })

            .then(res => {
                console.log(res);
                //保存微信用户开放信息
                this.globalData.userInfo = res.userInfo;
                this.globalData.isGetInfo = true;
                if (this.getInfoReadyCallback) {
                    this.getInfoReadyCallback(res);
                }
                let url = Url.loginByWeChar;
                //发送给后台,判断用户是否注册过,若有则获得信息,若无则获得提示
                return yy.request({
                    url,
                    data: {
                        code: this.globalData.other.code,
                        iv: res.iv,
                        data: res.encryptedData
                    },
                    method: "POST",
                })
            })


            .then(res => {

                //如果用户没注册但授权,则弹至手机按钮注册界面
                if (res.data.code == 1) {
                    wx.navigateTo({
                        url: '/pages/getInfo/getInfo?getInfo=1',
                    })
                } else { //否则 ->用户已经注册了!获取到了用户信息,写入到全局变量中
                    wx.setStorageSync('token', res.data.data.token)
                    console.log(res,'ressssssssssssssssss');
                    if (this.globalData.scene) {
                        yy.request({
                            url:Url.updateScore,
                            header: {
                                token:wx.getStorageSync('token'),
                            },
                            data:
                                Number(this.globalData.scene)
                            ,
                            method:'post'
                        }).then((res) => {
                            if (res.data.code === 400001) {
                                wx.navigateTo({
                                    url: '/pages/getInfo/getInfo?getInfo=0',
                                })
                            } else {
                                this.globalData.userData.score += Number(this.globalData.scene)
                                this.globalData.scene = 0

                            }
                        })
                    }
                    // this.globalData.userData = res.data.data;
                    // this.globalData.isGetData = true;
                    // this.globalData.isLogin = true;
                    if (this.getDataReadyCallback) {
                        
                        this.getDataReadyCallback(res);
                    }
                }


            })

    },
    globalData: {
        userInfo: null,
        requestHub: {
            ip: {
                lym: 'https://www.gdutcatming.top'
            },
            projName: {
                bottleProj: '/BottleProject'
            },
            interfaceName: {
                wxLogin: '/user/loginByWeChar.do',
                bindCard: '/card/bindCard.do',
                getGiftRecordByUid: '/giftRecord/getGiftRecordByUid.do', //查询兑换记录
                findRecordByUid: '/bottleRecord/findRecordByUid.do', //投瓶历史
                getGiftLis: '/gift/getGiftLis.do' //查看礼物所有信息


            }
        },
        other: {
            code: ''
        },
        userData: null,
        isGetData: false,
        isGetInfo: false,
        isLogin: false,
    },
    yy,
    Url,


})