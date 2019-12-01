$(".select").click(function () {
    $(this).find("ul").slideToggle();
});
$(".select ul li").click(function () {
    var name = $(this).children("span").text();
    $(this).parents("ul").siblings("span").empty().html(name + "<i></i>")
});
var setting = {
    // www_url:"http://api.city.bli7.com",
    www_url: "http://localhost:8080",
    beiHang_url:'http://192.168.1.72:8060',
    apiKey: "f997bc19a9410ded2c0eb17f24e0690d"
};
new Vue({
    el: "#head"
});
function getWaring(){
    return {url: setting.www_url + "/city/waring/getWaring?apiKey=" + setting.apiKey}
}
function getCheckModeAnaly(){
    return {url: setting.www_url + "/city/checkObjectAnaly/getCheckModeAnaly?apiKey=" + setting.apiKey}
}
function listAlarms(){
    return {url: setting.www_url + "/city/waring/listAlarms?apiKey=" + setting.apiKey}
}
Vue.prototype.getCheckObject = function () {
    return {url: setting.www_url + "/city/checkObject/getCheckObject?apiKey=" + setting.apiKey}
};
Vue.prototype.checkSqlList = function (num) {
    return {url: setting.www_url + "/city/checkSql/getCheckSqlList?apiKey=" + setting.apiKey + "&type=" + num}
};
Vue.prototype.updateCheckObject = function (data) {
    return {
        url: setting.www_url + "/city/checkObject/updateCheckObject?apiKey=" + setting.apiKey,
        list: JSON.stringify(data)
    }
};
Vue.prototype.getCheckMode = function () {
    return {url: setting.www_url + "/city/checkMode/getCheckMode?apiKey=" + setting.apiKey};
};
Vue.prototype.updateCheckMode = function (data) {
    return {
        url: setting.www_url + "/city/checkMode/updateCheckMode?apiKey=" + setting.apiKey,
        list: JSON.stringify(data)
    }
};
function getCheckPlan() {
    return {url: setting.www_url + "/city/checkPlan/getCheckPlan?apiKey=" + setting.apiKey}
}
function updateCheckPlan(data) {
    return {
        url: setting.www_url + "/city/checkPlan/updateCheckPlan?apiKey=" + setting.apiKey,
        list: JSON.stringify(data)
    }
}
function getEmailProperties() {
    return {url: setting.www_url + "/city/email/getEmailProperties?apiKey=" + setting.apiKey}
}
function saveEmailProperties(fromEmail,port,host,username,password) {
    return {
        url: setting.www_url + "/city/email/saveEmailProperties?apiKey=" + setting.apiKey+'&fromEmai='+fromEmail+'&port='+port+'&host='+host+'&username='+username+'&password='+password,
    }
}
