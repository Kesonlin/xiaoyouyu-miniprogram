/**
 * 
 * Promise化接口
 * 
 * 
 */
// let CryptoJS = require('./encrypt.js');


function wxPromise(functionName, params) {
    return new Promise(function(resolve, reject) {
        wx[functionName]({
            ...params,
            success: resolve,
            fail: reject
        })
    })
}



function login(params = {}) {
    return wxPromise('login', params);
}


function getSetting(params = {}) {
    return wxPromise('getSetting', params);
}


function getUserInfo(params = {}) {
    return wxPromise('getUserInfo', params);
}

function request(params = {}) {
    // if (params.method && (params.method === 'POST' || params.method === 'post')){
    //     params.data = CryptoJS.EncryptData(params.data)
    // }
    return wxPromise('request', params);
}

function requestSubscribeMessage(params = {}) {
    return wxPromise('requestSubscribeMessage', params);
}

function showToast(params = {}) {
    return wxPromise('showToast', params);
}

function showModal(params = {}) {
    return wxPromise('showModal', params);
}

function reLaunch(params = {}) {
    return wxPromise('reLaunch', params);
}

function switchTab(params = {}) {
    return wxPromise('switchTab', params);
}

function showLoading(params = {}){
    return wxPromise('showLoading',params);
}


function hideLoading(params = {}) {
    return wxPromise('hideLoading', params);
}


module.exports = {
    login,
    getSetting,
    getUserInfo,
    request,
    requestSubscribeMessage,
    showToast,
    showModal,
    reLaunch,
    switchTab,
    showLoading,
    hideLoading
}