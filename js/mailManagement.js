$.extend({
    jsonAjax(options, callbackSuc, callbackErr) {
        options = $.extend(options, {"_r": Math.random()});
        $.ajax({
            type: options.ajaxtype,
            url: options.url,
            async: true,
            data: options,
            dataType: "json",
            headers: {'token': ''},
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
    initMail:function () {
        $.getAjax(getEmailProperties(),function () {
            if (res.code = 200 && res.code_desc == "success"){

            }
        })
    },
    saveMail: function () {
        if ($("#host").val() != '' && $("#fromEmail").val() != '' && $("#username").val() != '' && $("#password").val() != '') {
            var fromEmail = $("#fromEmail").val(), port = $("#port").val(), host = $("#host").val(), username = $("#username").val(), password = $("#password").val();
            $.getAjax(saveEmailProperties(fromEmail, port, host, username, password), function () {
                if (res.code = 200 && res.code_desc == "success") {
                    alert("保存成功")
                } else alert("保存失败")
            })
        }
    }
});