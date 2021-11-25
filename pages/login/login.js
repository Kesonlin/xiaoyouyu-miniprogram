import md5 from 'js-md5';
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

        //测试----------***********************

        let reqName = 'yct.base.card.acct.balance'
        let reqIp = '/gw/base'

        let selfObj = {
            card_num:'8540830717'
        }

        let reqData = this.handleReqObj(selfObj, reqName);
        console.log(reqData)
        wx.request({
            url: 'http://wxtest.gzyct.com:8000' + reqIp,
            data: reqData,
            method: 'POST',
            dataType: 'json',
            success: (res) => {
                console.log('收到的请求为:', res);
            },
            fail: (res) => {

            },
            complete: (res) => {},
        })










        //测试----------***********************


        //-----------------------------------
        // let test = md5("aaaa");
        // console.log(test)
        // let obj = {
        //     bb: 'aa',
        //     ba: 'bb',
        //     a: 'cc',
        // }
        // let newObj = this.sort_ASCII(obj);
        // console.log(newObj)
        //-------------------------------------

        wx.checkSession({
            success() {
                //session_key 未过期，并且在本生命周期一直有效
                console.log('SK未过期!');

            },
            fail() {
                // session_key 已经失效，需要重新执行登录流程
                //小程序登录
                wx.login({
                    success(res) {
                        //向后台发送code
                        let code = res.code;
                        let rh = app.globalData.requestHub;
                        let url = `${rh.ip.lym}${rh.projName.bottleProj}${rh.interfaceName.wxLogin}`;

                        //请求后台
                        wx.request({
                            url: url,
                            method: "get",
                            data: {
                                code
                            },
                            success: (res) => {
                                console.log(res);

                                

                            }
                        })
                    }
                })
            }
        })
    },
    //获取手机号
    getPhone(e) {
        console.log(e)
        wx.request({
            url: '',
            data: {},
            method: 'GET',
            success: (res) => {

                //获取id和token
                wx.setStorageSync('token', result.data.token);
                wx.setStorageSync('user_id', result.data.user_id);
            },

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

    },
    //ASCII 对象排序
    // sort_ASCII(obj) {
    //     var arr = new Array();
    //     var num = 0;
    //     for (var i in obj) {
    //         arr[num] = i;
    //         num++;
    //     }
    //     var sortArr = arr.sort();
    //     var sortObj = {};
    //     for (var i in sortArr) {
    //         sortObj[sortArr[i]] = obj[sortArr[i]];
    //     }
    //     return sortObj;
    // },


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

        console.log('请求对象',publicReq)

        //----------------------------//
        //待签名字符串: (1. 排序 2. 加&)
        let sortObj = this.objKeySort(publicReq); //键值对排序
        console.log('获取的待签名字符串为:', sortObj);

        //MD5签名,获取sign

        let key = 'abc' //MD5的秘钥key

        //待签名字符串 + MD5秘钥
        let tempMd5 = sortObj + '&key=' + key;

        //let sign = md5(tempMd5).toUpperCase();
        let sign = 'F0F052B80C4731133374010FC89BD7C0';

        console.log('获得的最终sign签名', sign);

        // 写成最终待发送数据
        let finalData = publicReq;
        finalData.sign = sign;

        return finalData;

    },


})