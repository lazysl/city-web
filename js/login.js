$.extend({
    jsonAjax: function (options, callbackSuc, callbackErr) {
        options = $.extend(options, {"_r": Math.random()});
        $.ajax({
            type: options.ajaxtype,
            url: options.url,
            async: true,
            data: options.data,
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
    initLogin:function (obj) {
        var data;
        if (getQueryString("code") != '' && getQueryString("code") != null && typeof getQueryString("code") != "undefined") {
            data = obj
        } else {
            data = {
                userName: obj.userName,
                password: obj.password,
            };
        }
        $.postAjax(login(data), function (res) {
            if (res.code = 200){
                localStorage.setItem("token",res.code_desc);
                $.cookie("user", res.data.username,{ expires: 1, path: '/' });
                window.location.href="./homepage.html"
            }else $(".submit span").show();
        });
    },
});