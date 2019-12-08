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
    initLogin:function (userName,password) {
        var data = {
            userName: userName,
            password: password,
            // code: "",
        };
        $.postAjax(login(data), function (data) {
            if (res.code = 200 && res.code_desc == "success"){
                var user = data.username;
                $.cookie("user", user,{ expires: 1, path: '/' });
                window.location.href="./index.html"
            }else $(".submit span").show();
        });
    },
});