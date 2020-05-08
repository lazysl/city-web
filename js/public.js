var setting = {
    // www_url: "http://localhost:8080",
    www_url: "/cityapi",
    beiHang_url: '/serverapi',
    // www_url: "http://192.168.1.75:8080",
    // beiHang_url:'http://192.168.1.72:8060',
    apiKey: "f997bc19a9410ded2c0eb17f24e0690d",
    jc_login_url: "http://192.168.1.75:8060/LoginPage.do?",
    cz_login_url: "http://192.168.1.73:8080/?",
    envDeviceName: "172.17.1.67"
};

document.write("<script type='text/javascript' src='js/jquery.cookie.min.js'></script>");

$(".select").click(function () {
    $(this).find("ul").slideToggle();
});

$(".select ul li").click(function () {
    var name = $(this).children("span").text();
    $(this).parents("ul").siblings("span").empty().html(name + "<i></i>")
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
        if (document.getElementById("nav")) document.getElementById("nav").style.minHeight = (docHeight - 102) + "px";
    } else {
        if (document.getElementById("nav")) document.getElementById("nav").style.minHeight = (docHeight - 142) + "px";
    }
});

function login(data) {
    return {
        url: setting.www_url + "/city/user/login?apiKey=" + setting.apiKey,
        data: data,
    }
}

function getWaring() {
    return {
        url: setting.www_url + "/city/waring/getWaring?apiKey=" + setting.apiKey,
        token: localStorage.getItem("token")
    }
}

function getCheckModeAnaly() {
    return {
        url: setting.www_url + "/city/checkObjectAnaly/getCheckModeAnaly?apiKey=" + setting.apiKey,
        token: localStorage.getItem("token")
    }
}

function listAlarms() {
    return {
        url: setting.www_url + "/city/waring/listAlarms?apiKey=" + setting.apiKey,
        token: localStorage.getItem("token")
    }
}

function urlParams(key) {
    var value = "";
    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) value = unescape(r[2]);
    return value;
}

function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
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
    /*if (getCookie("user") == null) {
        window.location.href = "./login.html"
    }*/
    if (localStorage.getItem("user") == null) {
        window.location.href = "./login.html"
    }
}

/*首页-获取设备列表(服务器，中间件，数据库，互联网设备，工单)*/
function js_checkSqlList(type, waringType) {
    return {
        url: setting.www_url + "/city/checkSql/getCheckSqlList?apiKey=" + setting.apiKey + "&type=" + type + "&waringType=" + waringType,
        token: localStorage.getItem("token")
    }
};
/*获取考评菜单*/
Vue.prototype.getCheckMenu = function (data) {
    return {
        url: setting.www_url + "/city/checkMenu/getCheckMenu?apiKey=" + setting.apiKey,
        token: localStorage.getItem("token")
    }
};
/*新增考评对象信息*/
Vue.prototype.addCheckInfo = function (data) {
    return {
        url: setting.www_url + "/city/checkInfo/addCheckInfo?apiKey=" + setting.apiKey,
        data: data,
        token: localStorage.getItem("token")
    }
};
/*获取考评对象信息*/
Vue.prototype.getCheckInfo = function () {
    return {
        url: setting.www_url + "/city/checkInfo/getCheckInfo?apiKey=" + setting.apiKey,
        token: localStorage.getItem("token")
    }
};
/*修改考评对象信息*/
Vue.prototype.updateCheckInfo = function (data) {
    return {
        url: setting.www_url + "/city/checkInfo/updateCheckInfo?apiKey=" + setting.apiKey,
        data: data,
        token: localStorage.getItem("token")
    }
};
/*删除考评对象信息或考评设备*/
Vue.prototype.deleteCheckInfo = function (id) {
    return {
        url: setting.www_url + "/city/checkInfo/deleteCheckInfo?apiKey=" + setting.apiKey + "&id=" + id,
        token: localStorage.getItem("token")
    }
};
/*获取设备列表(服务器，中间件，数据库，互联网设备，工单)*/
Vue.prototype.getCheckSqlList = function (type) {
    return {
        url: setting.www_url + "/city/checkSql/getCheckSqlList?apiKey=" + setting.apiKey + "&type=" + type,
        token: localStorage.getItem("token")
    }
};
/*新增考评设备*/
Vue.prototype.addCheckDevice = function (data) {
    return {
        url: setting.www_url + "/city/checkInfo/addCheckDevice?apiKey=" + setting.apiKey,
        data: data,
        token: localStorage.getItem("token")
    }
};
/*编辑考评对象信息安全*/
Vue.prototype.updateCheckInfoSecurity = function (data) {
    return {
        url: setting.www_url + "/city/checkInfo/updateCheckInfoSecurity?apiKey=" + setting.apiKey,
        data: data,
        token: localStorage.getItem("token")
    }
};
/*手动考评*/
Vue.prototype.startCheck = function (id) {
    return {
        url: setting.www_url + "/city/checkResult/startCheck?apiKey=" + setting.apiKey + "&id=" + id,
        token: localStorage.getItem("token")
    }
};
/*获取考评计划*/
Vue.prototype.getCheckPlan_v = function () {
    return {
        url: setting.www_url + "/city/checkInfo/getCheckPlan?apiKey=" + setting.apiKey,
        token: localStorage.getItem("token")
    }
};

/*获取考评计划*/
function getCheckPlan() {
    return {
        url: setting.www_url + "/city/checkInfo/getCheckPlan?apiKey=" + setting.apiKey,
        token: localStorage.getItem("token")
    }
}

/*修改考评计划(全局配置时id传0)*/
function updateCheckPlan(data) {
    return {
        url: setting.www_url + "/city/checkInfo/updateCheckPlan?apiKey=" + setting.apiKey,
        data: data,
        token: localStorage.getItem("token")
    }
}

/*获取考评模型*/
Vue.prototype.getCheckMode = function () {
    return {
        url: setting.www_url + "/city/checkMode/getCheckMode?apiKey=" + setting.apiKey,
        token: localStorage.getItem("token")
    };
};
/*保存考评模型*/
Vue.prototype.updateCheckMode = function (data) {
    return {
        url: setting.www_url + "/city/checkMode/updateCheckMode?apiKey=" + setting.apiKey,
        data: data,
        token: localStorage.getItem("token")
    }
};
/*获取考评结果*/
Vue.prototype.getCheckResult = function () {
    return {
        url: setting.www_url + "/city/checkResult/getCheckResult?apiKey=" + setting.apiKey,
        token: localStorage.getItem("token")
    }
};
/*获取所有部门*/
Vue.prototype.getOrganization = function (data) {
    return {
        url: setting.www_url + "/city/organization/getOrganization?apiKey=" + setting.apiKey,
        data: data,
        token: localStorage.getItem("token")
    }
};
/*获取所有用户*/
Vue.prototype.getUserList = function (data) {
    return {
        url: setting.www_url + "/city/user/getUserList?apiKey=" + setting.apiKey,
        data: data,
        token: localStorage.getItem("token")
    }
};
/*新增用户信息*/
Vue.prototype.addUser = function (data) {
    return {
        url: setting.www_url + "/city/user/addUser?apiKey=" + setting.apiKey,
        data: data,
        token: localStorage.getItem("token")
    }
};
/*更改用户信息*/
Vue.prototype.updateUser = function (data) {
    return {
        url: setting.www_url + "/city/user/updateUser?apiKey=" + setting.apiKey,
        data: data,
        token: localStorage.getItem("token")
    }
};
/*删除用户信息*/
Vue.prototype.deleteUser = function (id) {
    return {
        url: setting.www_url + "/city/user/deleteUser?apiKey=" + setting.apiKey + "&ids=" + id,
        token: localStorage.getItem("token")
    }
};
/*获取所有角色*/
Vue.prototype.getRoleList = function (data) {
    return {
        url: setting.www_url + "/city/role/getRoleList?apiKey=" + setting.apiKey,
        data: data,
        token: localStorage.getItem("token")
    }
};
/*获取所有菜单*/
Vue.prototype.getMeanList = function () {
    return {
        url: setting.www_url + "/city/menu/getMeanList?apiKey=" + setting.apiKey,
        token: localStorage.getItem("token")
    }
};
/*获取用户对应的菜单*/
Vue.prototype.getMenuListByUser = function (id) {
    return {
        url: setting.www_url + "/city/menu/getMenuListByUser?apiKey=" + setting.apiKey,
        token: localStorage.getItem("token")
    }
};
/*新增角色*/
Vue.prototype.addRole = function (data) {
    return {
        url: setting.www_url + "/city/role/addRole?apiKey=" + setting.apiKey,
        data: data,
        token: localStorage.getItem("token")
    }
};
/*修改角色*/
Vue.prototype.updateRole = function (data) {
    return {
        url: setting.www_url + "/city/role/updateRole?apiKey=" + setting.apiKey,
        data: data,
        token: localStorage.getItem("token")
    }
};
/*删除角色*/
Vue.prototype.deleteRole = function (id) {
    return {
        url: setting.www_url + "/city/role/deleteRole?apiKey=" + setting.apiKey + "&ids=" + id,
        token: localStorage.getItem("token")
    }
};
/*获取考评报表列表*/
Vue.prototype.getCheckReport = function () {
    return {
        url: setting.www_url + "/city/checkReport/getCheckReport?apiKey=" + setting.apiKey,
        token: localStorage.getItem("token")
    }
};
/*新建考评报表列表*/
Vue.prototype.addCheckReport = function (data) {
    return {
        url: setting.www_url + "/city/checkReport/addCheckReport?apiKey=" + setting.apiKey,
        data: data,
        token: localStorage.getItem("token")
    }
};
/*编辑考评报表列表*/
Vue.prototype.updateReportList = function (data) {
    return {
        url: setting.www_url + "/city/checkReport/updateReportList?apiKey=" + setting.apiKey,
        data: data,
        token: localStorage.getItem("token")
    }
};
/*删除考评报表列表*/
Vue.prototype.deleteReportList = function (id) {
    return {
        url: setting.www_url + "/city/checkReport/deleteReportList?apiKey=" + setting.apiKey + "&id=" + id,
        token: localStorage.getItem("token")
    }
};
/*审批考评结果*/
Vue.prototype.updateCheckResult = function (filed, id, result) {
    return {
        url: setting.www_url + "/city/checkResult/updateCheckResult?apiKey=" + setting.apiKey + "&filed=" + filed + "&id=" + id + "&result=" + result,
        token: localStorage.getItem("token")
    }
};


/*获取邮箱服务配置*/
function getEmailProperties() {
    return {
        url: setting.www_url + "/city/email/getEmailProperties?apiKey=" + setting.apiKey,
        token: localStorage.getItem("token")
    }
}

/*保存邮箱服务配置*/
function saveEmailProperties(data) {
    return {
        url: setting.www_url + "/city/email/saveEmailProperties?apiKey=" + setting.apiKey,
        data: data,
        token: localStorage.getItem("token")
    }
}

new Vue({
    el: document.getElementById("head") ? "#head" : '',
});