new Vue({
    el: '#main',
    data: {
        ableStatus: 0,   //可用性状态
        logictatus: 0,   //逻辑状态
        natureStatus: 0,   //性能状态
        qualityStatus: 0,   //数据质量状态
    },
    methods: {
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
        initMode() {
            this.getAjax(this.getCheckMode(), (res) => {
                if (res.code = 200 && res.code_desc == "success") {
                    let day = res.data[0], week = res.data[1], mount = res.data[1], year = res.data[1];
                }
            })
        },
        savaMode() {
            let data = {};
            this.postAjax(this.updateCheckMode(data), (res) => {
                if (res.code = 200 && res.code_desc == "success") {
                }
            })
        },
    },
    mounted() {
        this.initMode();
    },
});