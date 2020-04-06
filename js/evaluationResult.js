new Vue({
    el: '#main',
    data: {
        resultList:""
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
        initResult(){
            this.postAjax(this.getCheckResult(), (res) => {
                if (res.code = 200 && res.code_desc == "success") {
                    this.resultList = res.data;
                }else if (res.code = 403){
                    delCookie("user");
                    localStorage.clear();
                    window.location.href = "./login.html"
                }else alert(res.code_desc)
            })
        }
    },
    mounted() {
        this.initResult()
    },
});