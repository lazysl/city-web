$(".select").click(function () {
    $(this).find("ul").slideToggle();
});
$(".select ul li").click(function () {
    var name=$(this).children("span").text();
    $(this).parents("ul").siblings("span").empty().html(name+"<i></i>")
});
var setting={
    www_url:"http://api.city.bli7.com",
    apiKey:"f997bc19a9410ded2c0eb17f24e0690d"
};
$.extend({
    jsonAjax: function (options, callbackSuc, callbackErr) {
        options = $.extend(options, {"_r": Math.random()});
        $.ajax({
            type: options.ajaxtype,
            url: options.url,
            async: true,
            data: options,
            dataType: "json",
            success: function (data) {
                if ($.isFunction(callbackSuc)) callbackSuc(data);
            },
            error: function (data) {
                if ($.isFunction(callbackErr)) callbackErr(data);
            }
        });
    },
    getAjax: function (param, callbackSuc, callbackErr) {
        param = $.extend(param, {"ajaxtype": "GET"});
        $.jsonAjax(param, callbackSuc, callbackErr);
    },
    postAjax: function (param, callbackSuc, callbackErr) {
        param = $.extend(param, {"ajaxtype": "POST"});
        $.jsonAjax(param, callbackSuc, callbackErr);
    },
    initNav: function () {
        var param = {url: setting.www_url + "/public/sys/menu/nav?apiKey=" + setting.apiKey + "&name=" + name};
        $.getAjax(param, function (data) {
        })
    }
})