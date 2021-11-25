// pages/map/childCpns/yy-search/yy-search.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        searchTip:{
            //类型
            type:String,
            //默认值
            value:"搜索"
        },
        dataList:{
            type:Array,
            value:[],
            observer:function (newVal,oldVal) {
                this.setData({
                    dataList:newVal,
                })
                console.log("组件中的dataList数据",this.data)
            }
        }


    },

    /**
     * 组件的初始数据
     */
    data: {
        inputShowed: false,
        inputVal: "",
        dataList:[],
    },

    /**
     * 组件的方法列表
     */
    methods: {
        showInput: function() {
            this.setData({
                inputShowed: true
            });
        },
        hideInput: function() {
            this.setData({
                inputVal: "",
                inputShowed: false
            });
        },
        clearInput: function() {
            this.setData({
                inputVal: ""
            });
        },
        inputTyping: function(text) {
            this.setData({
                inputVal: text.detail.value
            });
            this.triggerEvent("searchText", {text},{})
        },
        addSelect(e){
            console.log("选中",e);
            let temp = e.target.dataset.index;
            let num = this.data.dataList[temp];
            this.triggerEvent("orderNum", { num }, {});
            // 清空输入框
            this.clearInput();
        }

    }
})