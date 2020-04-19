new Vue({
    el: '#main',
    data: {
        resultList: "",
        objectName: "",
        objectResult: "",
    },
    methods: {
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
        urlParams(key) {
            var value = "";
            var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) value = unescape(r[2]);
            return value;
        },
        initResult() {
            this.postAjax(this.getCheckResult(), (res) => {
                if (res.code = 200 && res.code_desc == "success") {
                    for (let i in res.data) {
                        if (this.urlParams("checkId") == res.data[i].checkId) {
                            this.resultList = res.data[i];
                            this.objectName = res.data[i].name;
                            this.objectResult = res.data[i].result;
                        }
                    }
                    console.log(this.resultList )
                } else if (res.code = 403) {
                    delCookie("user");
                    localStorage.clear();
                    window.location.href = "./login.html"
                } else alert(res.code_desc)
            })
        }
    },
    mounted() {
        this.initResult()
    },
});