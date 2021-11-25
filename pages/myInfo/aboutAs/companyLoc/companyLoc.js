// pages/map/map.js

// 引入SDK核心类
const QQMapWX = require('../../../../libs/qqmap-wx-jssdk.min.js');
var qqmapsdk;
Page({
    /**
     * 页面的初始数据
     */
    data: {
        //初始坐标(纬度/经度)
        latitude: 23.166268,
        longitude: 113.3468,


        markers: [],
        boxList: [{
            "lng": "113.3468",
            "lat": "23.166268",
            "box_name": "广州传数科技有限公司\n广州市天河区长福路207号4A层01单元",
            "box_image": "/img/BOX.png",
        }],
        //标记名称
        box_name: "",
        //标记图片
        box_img: "",
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        // 实例化API核心类
        qqmapsdk = new QQMapWX({
            key: '7U4BZ-3OEW6-DJLSE-EOYQM-BD7V2-VCFBZ'
        });

        //获取箱子
        this.getboxes();


    },
    //导航去公司
    handleToCompany(){
        
        console.log(1111111111)
        this.setData({
            latitude: 23.166268,
            longitude: 113.3468,
        })
        
    },
    //获取箱子数据
    getboxes() {
        let markers = [];
        for (let i = 0; i < this.data.boxList.length; i++) {
            let marker = this.createMarker(this.data.boxList[i]);
            //把遍历的每个marker存放进去
            markers.push(marker);
        }

        let boxitem = this.data.boxList[0];
        this.setData({
            markers: markers,
            box_image: boxitem.box_image,
            box_name: boxitem.box_name,
        })

    },
    /**
     * 创建marker对象
     */
    createMarker(point) {
        let marker = {
            //每个marker的ID
            id: point || 0,
            //纬度
            latitude: point.lat,
            //经度
            longitude: point.lng,
            //标注点名
            title: point.box_name,
            //显示层级
            // zIndex:num
            //图标地址
            iconPath: "/img/dp.png",
            //旋转角度
            rotate: 0,
            //透明度
            alpha: 1,
            //图标宽度和高度
            width: 30,
            height: 30,
            name: point.box_name || '',
            label: {
                content: ""
            },
            callout: {
                content: point.box_name,
                color: "#00a0ae",
                fontSize: "30rpx",
                borderRadius: "15rpx",
                borderWidth: "6rpx",
                borderColor: "black",
                bgColor: "white",
                padding: "15rpx",
                display: "BYCLICK",
                textAlign: "center",
            }
        };
        return marker;
    },

    /**
     * 点击marker
     */
    markertap(boxitem) {
        console.log("点击盒子获取", boxitem);
        this.setData({
            box_image: boxitem.markerId.box_image,
            box_name: boxitem.markerId.box_name,
        })
    },

})