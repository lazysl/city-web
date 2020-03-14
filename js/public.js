var setting = {
    // www_url: "http://localhost:8080",
    www_url: "/cityapi",
    beiHang_url: '/serverapi',
    // www_url: "http://192.168.1.75:8080",
    // beiHang_url:'http://192.168.1.72:8060',
    apiKey: "f997bc19a9410ded2c0eb17f24e0690d",
};
document.write("<script type='text/javascript' src='js/jquery.cookie.min.js'></script>");
$(".select").click(function () {
    $(this).find("ul").slideToggle();
});
$(".select ul li").click(function () {
    var name = $(this).children("span").text();
    $(this).parents("ul").siblings("span").empty().html(name + "<i></i>")
});
new Vue({
    el: document.getElementById("head")?"#head":'',
});
function pageScale() {
    var winH = $(window).width();
    var myScale = (winH) / 1366;
    if (myScale <= 1) {
        $('#circle').css({'transform': 'scale(.7)'});
    }
}
pageScale();
$(window).resize(function () {
    pageScale();
});
$(function () {
    var docHeight = window.innerHeight || document.documentElement.clientHeight;
    var docWidth = window.innerWidth || document.documentElement.clientWidth;
    if (docWidth <= 1366) {
        if (document.getElementById("nav")) document.getElementById("nav").style.minHeight = (docHeight - 102)+"px";
    }else {
        if (document.getElementById("nav")) document.getElementById("nav").style.minHeight = (docHeight - 142)+"px";
    }
});
function login(data) {
    return {
        url: setting.www_url + "/city/user/login?apiKey=" + setting.apiKey,
        data:data,
    }
}
function getWaring(){
    return {
        url: setting.www_url + "/city/waring/getWaring?apiKey=" + setting.apiKey,
        token:localStorage.getItem("token")
    }
}
function getCheckModeAnaly(){
    return {
        url: setting.www_url + "/city/checkObjectAnaly/getCheckModeAnaly?apiKey=" + setting.apiKey,
        token:localStorage.getItem("token")
    }
}
function listAlarms(){
    return {
        url: setting.www_url + "/city/waring/listAlarms?apiKey=" + setting.apiKey,
        token:localStorage.getItem("token")
    }
}
function urlParams(key) {
    var value = "";
    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) value = unescape(r[2]);
    return value;
}
/*获取考评菜单*/
Vue.prototype.getCheckMenu = function (data) {
    return {
        url: setting.www_url + "/city/checkMenu/getCheckMenu?apiKey=" + setting.apiKey,
        token:localStorage.getItem("token")
    }
};
/*新增考评设备*/
Vue.prototype.addCheckInfo = function (data) {
    return {
        url: setting.www_url + "/city/checkInfo/addCheckInfo?apiKey=" + setting.apiKey,
        data: data,
        token:localStorage.getItem("token")
    }
};
/*获取考评对象信息*/
Vue.prototype.getCheckInfo = function () {
    return {
        url: setting.www_url + "/city/checkInfo/getCheckInfo?apiKey=" + setting.apiKey,
        token:localStorage.getItem("token")
    }
};
/*修改考评对象信息*/
Vue.prototype.updateCheckInfo = function (data) {
    return {
        url: setting.www_url + "/city/checkInfo/updateCheckInfo?apiKey=" + setting.apiKey,
        data: data,
        token:localStorage.getItem("token")
    }
};
/*删除考评对象信息或考评设备*/
Vue.prototype.deleteCheckInfo = function (id) {
    return {
        url: setting.www_url + "/city/checkInfo/deleteCheckInfo?apiKey=" + setting.apiKey+"&id="+id,
        token:localStorage.getItem("token")
    }
};





Vue.prototype.checkSqlList = function (num) {
    return {
        url: setting.www_url + "/city/checkSql/getCheckSqlList?apiKey=" + setting.apiKey + "&type=" + num,
        token:localStorage.getItem("token")
    }
};
function js_checkSqlList(type, waringType) {
    return {
        url: setting.www_url + "/city/checkSql/getCheckSqlList?apiKey=" + setting.apiKey + "&type=" + type + "&waringType=" + waringType,
        token: localStorage.getItem("token")
    }
};
Vue.prototype.updateCheckObject = function (data) {
    return {
        url: setting.www_url + "/city/checkObject/updateCheckObject?apiKey=" + setting.apiKey,
        list: JSON.stringify(data),
        token:localStorage.getItem("token")
    }
};
Vue.prototype.getCheckMode = function () {
    return {
        url: setting.www_url + "/city/checkMode/getCheckMode?apiKey=" + setting.apiKey,
        token:localStorage.getItem("token")
    };
};
Vue.prototype.updateCheckMode = function (data) {
    return {
        url: setting.www_url + "/city/checkMode/updateCheckMode?apiKey=" + setting.apiKey,
        data: data,
        token:localStorage.getItem("token")
    }
};
function getCheckPlan() {
    return {
        url: setting.www_url + "/city/checkPlan/getCheckPlan?apiKey=" + setting.apiKey,
        token:localStorage.getItem("token")
    }
}
function updateCheckPlan(data) {
    return {
        url: setting.www_url + "/city/checkPlan/updateCheckPlan?apiKey=" + setting.apiKey,
        list: JSON.stringify(data),
        token:localStorage.getItem("token")
    }
}
function getEmailProperties() {
    return {
        url: setting.www_url + "/city/email/getEmailProperties?apiKey=" + setting.apiKey,
        token:localStorage.getItem("token")
    }
}
function saveEmailProperties(data) {
    return {
        url: setting.www_url + "/city/email/saveEmailProperties?apiKey=" + setting.apiKey,
        data: data,
        token:localStorage.getItem("token")
    }
}
Vue.prototype.getUserList=function() {
    return {
        url: setting.www_url + "/city/user/getUserList?apiKey=" + setting.apiKey,
        token:localStorage.getItem("token")
    }
}
Vue.prototype.setAuth=function(data) {
    return {
        url: setting.www_url + "/city/user/setAuth?apiKey=" + setting.apiKey,
        data: data,
        token: localStorage.getItem("token")
    }
}
function getCookie(name) {
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}

function delCookie(name) {
    var cval = getCookie(name);
    if (cval != null) {
        $.cookie("user", null, {expires: -1, path: '/'});
    }
}
var href = window.location.href;
if (href.indexOf("login.html") < 0) {
    if (getCookie("user") == null) {
        window.location.href = "./login.html"
    }
}
