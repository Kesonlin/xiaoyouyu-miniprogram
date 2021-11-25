const ip = {
    lym: 'https://www.lizeqiang.top:8088'
}

const project = {
    bottle: '/BottleProject'
}

const requestName = {
    loginByWeChar: '/box/user/loginByWeChat',    //登录接口
    bindCard: '/card/bindCard',  //绑定卡
    getGiftRecordByUid: '/giftRecord/getGiftRecordByUid', //查询兑换记录
    findRecordByUid: '/bottleRecord/findRecordByUid', //投瓶历史
    getGiftList: '/gift/getGiftList', //查看礼物所有信息,
    updateScore: '/box/user/updateScore' //更新积分
}

const Url = {
    loginByWeChar:ip.lym+requestName.loginByWeChar,
    bindCard: ip.lym + project.bottle + requestName.bindCard,
    getGiftRecordByUid: ip.lym + project.bottle + requestName.getGiftRecordByUid,
    findRecordByUid: ip.lym + project.bottle + requestName.findRecordByUid,
    getGiftList: ip.lym + project.bottle + requestName.getGiftList,

}


module.exports={
    loginByWeChar:Url.loginByWeChar,
    bindCard: Url.bindCard,
    getGiftRecordByUid: Url.getGiftRecordByUid,
    findRecordByUid: Url.findRecordByUid,
    getGiftList: Url.getGiftList,
    updateScore:ip.lym + requestName.updateScore
}



