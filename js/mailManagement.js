$.extend({
    jsonAjax(options, callbackSuc, callbackErr) {
        options = $.extend(options, {"_r": Math.random()});
        $.ajax({
            type: options.ajaxtype,
            url: options.url,
            async: true,
            data: options.data,
            dataType: "json",
            headers: {'token': options.token},
            success: function (data) {
                if ($.isFunction(callbackSuc)) callbackSuc(data);
            },
            error: function (data) {
                if ($.isFunction(callbackErr)) callbackErr(data);
            }
        });
    },
    getAjax(param, callbackSuc, callbackErr) {
        param = $.extend(param, {"ajaxtype": "GET"});
        this.jsonAjax(param, callbackSuc, callbackErr);
    },
    postAjax(param, callbackSuc, callbackErr) {
        param = $.extend(param, {"ajaxtype": "POST"});
        this.jsonAjax(param, callbackSuc, callbackErr);
    },
    initMail: function () {
        $.postAjax(getEmailProperties(), function (res) {
            if (res.code = 200 && res.code_desc == "success") {
                var data = res.data;
                $("#fromEmail").val(data.fromEmail);
                $("#host").val(data.host);
                $("#username").val(data.username);
                $("#password").val(data.password);
                $("#port").val(data.port)
            }else if (res.code = 403){
                delCookie("user");
                localStorage.clear();
                window.location.href = "./login.html"
            }else alert(res.code_desc)
        })
    },
    saveMail: function () {
        var fromEmail = $("#fromEmail").val(), port = $("#port").val(), host = $("#host").val(), username = $("#username").val(), password = $("#password").val();
        if (host != '' && fromEmail != '' && username != '' && password != '') {
            var data = {
                fromEmail: fromEmail,
                port: port,
                host: host,
                username: username,
                password: password,
            };
            $.postAjax(saveEmailProperties(data), function (res) {
                if (res.code = 200 && res.code_desc == "success") {
                    alert("保存成功")
                }else if (res.code = 403){
                    delCookie("user");
                    localStorage.clear();
                    window.location.href = "./login.html"
                }else alert(res.code_desc)
            })
        }
    }
});