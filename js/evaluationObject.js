new Vue({
    el: '#main',
    data: {
        objectData: "",
        activeSubIndex: -1,
        activeThreeIndex: -1,
        objectIndex: "",
        subIndex: "",
        addObject: false,
        systemName: '',
        isDeviceType: false,
        isSelect: false,
        subTxt: '请选择',
        subList: [
            {name: '服务器', id: "server"},
            {name: '数据库', id: "sql"},
            {name: '中间件', id: "middleware"},
            {name: '物联网设备', id: "internet"},
        ],
        equipmentIndex: '',
        equipmentId: '',
        isThreePop: false,
        threeList: "",
        threeIndex: '',
        checkedThreeLeftDisName: '',
        checkedThreeLeftName: '',
        checkedThreeIndex: -1,
        checkedThreeRightDisName: '',
        checkedThreeRightName: '',
        checkedThreeList: [],
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
        docHeight() {
            let docHeight = window.innerHeight || document.documentElement.clientHeight;
            document.getElementById("content").children[0].style.height = (docHeight - 142) + "px";
            document.getElementById("table").style.height = (docHeight - 205) + "px"
        },
    },
    mounted() {
        this.$nextTick(() => {
            this.docHeight()
        })
    },
});