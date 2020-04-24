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
                //alert("登录成功");
                localStorage.setItem("token",res.code_desc);
                // $.cookie("user", res.data.username,{ expires: 1, path: '/' });
                localStorage.setItem("user", res.data.username);
				
				//Add by paple for SSO test @2020.04.15
				localStorage.setItem("pw", window.btoa($("#password").val()));
				
                window.location.href="./homepage.html"
            }else $(".submit span").show();
        });
    },
});