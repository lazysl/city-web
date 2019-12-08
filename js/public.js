$(".select").click(function () {
    $(this).find("ul").slideToggle();
});
$(".select ul li").click(function () {
    var name = $(this).children("span").text();
    $(this).parents("ul").siblings("span").empty().html(name + "<i></i>")
});
var setting = {
    /*www_url: "http://api.city.bli7.com",
    www_url: "/cityapi/",
    beiHang_url: '/serverapi/',*/
    www_url: "http://192.168.1.79:8080/",
    beiHang_url:'http://192.168.1.72:8060',
    apiKey: "f997bc19a9410ded2c0eb17f24e0690d"
};
new Vue({
    el: document.getElementById("head")?"#head":'',
});
$(function () {
    var docHeight = window.innerHeight || document.documentElement.clientHeight;
    if (document.getElementById("nav")) document.getElementById("nav").style.minHeight = (docHeight - 142)+"px";
});
function login(data) {
    return {
        url: setting.www_url + "/city/user/login?apiKey=" + setting.apiKey,
        data:data,
        token:""
    }
}
function getWaring(){
    return {
        url: setting.www_url + "/city/waring/getWaring?apiKey=" + setting.apiKey,
        token:""
    }
}
function getCheckModeAnaly(){
    return {
        url: setting.www_url + "/city/checkObjectAnaly/getCheckModeAnaly?apiKey=" + setting.apiKey,
        token:""
    }
}
function listAlarms(){
    return {
        url: setting.www_url + "/city/waring/listAlarms?apiKey=" + setting.apiKey,
        token:""
    }
}
Vue.prototype.getCheckObject = function () {
    return {
        url: setting.www_url + "/city/checkObject/getCheckObject?apiKey=" + setting.apiKey,
        token:""
    }
};
Vue.prototype.checkSqlList = function (num) {
    return {
        url: setting.www_url + "/city/checkSql/getCheckSqlList?apiKey=" + setting.apiKey + "&type=" + num,
        token:""
    }
};
Vue.prototype.updateCheckObject = function (data) {
    return {
        url: setting.www_url + "/city/checkObject/updateCheckObject?apiKey=" + setting.apiKey,
        list: JSON.stringify(data),
        token:""
    }
};
Vue.prototype.getCheckMode = function () {
    return {
        url: setting.www_url + "/city/checkMode/getCheckMode?apiKey=" + setting.apiKey,
        token:""
    };
};
Vue.prototype.updateCheckMode = function (data) {
    return {
        url: setting.www_url + "/city/checkMode/updateCheckMode?apiKey=" + setting.apiKey,
        list: JSON.stringify(data),
        token:""
    }
};
function getCheckPlan() {
    return {
        url: setting.www_url + "/city/checkPlan/getCheckPlan?apiKey=" + setting.apiKey,
        token:""
    }
}
function updateCheckPlan(data) {
    return {
        url: setting.www_url + "/city/checkPlan/updateCheckPlan?apiKey=" + setting.apiKey,
        list: JSON.stringify(data),
        token:""
    }
}
function getEmailProperties() {
    return {
        url: setting.www_url + "/city/email/getEmailProperties?apiKey=" + setting.apiKey,
        token:""
    }
}
function saveEmailProperties(data) {
    return {
        url: setting.www_url + "/city/email/saveEmailProperties?apiKey=" + setting.apiKey,
        data: data,
        token:""
    }
}
Vue.prototype.getUserList=function() {
    return {
        url: setting.www_url + "/city/user/getUserList?apiKey=" + setting.apiKey,
        token:""
    }
}
Vue.prototype.setAuth=function(data) {
    return {
        url: setting.www_url + "/city/user/setAuth?apiKey=" + setting.apiKey,
        data: data,
        token: ""
    }
}
