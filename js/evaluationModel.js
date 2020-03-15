new Vue({
    el: '#main',
    data: {
        objectTotal:100,
        deviceTxt: [
            {name: "服务器", id: 1, maxHeight: "", midHeight: "", minHeight: "",},
            {name: "数据库", id: 2, maxHeight: "", midHeight: "", minHeight: "",},
            {name: "中间件", id: 3, maxHeight: "", midHeight: "", minHeight: "",},
        ],
        activeSubIndex: -1,
        activeThreeIndex: -1,
        activeFourIndex: -1,
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
        docHeight() {
            let docHeight = window.innerHeight || document.documentElement.clientHeight;
            document.getElementById("content").children[0].style.height = (docHeight - 142) + "px";
            document.getElementById("modelCon").style.maxHeight = (docHeight - 205) + "px"
        },
        /*展示二级目录*/
        showSub(index) {
            this.activeSubIndex = this.activeSubIndex == index ? -1 : index;
        },
        /*展示三级目录*/
        showThree(index) {
            this.activeThreeIndex = this.activeThreeIndex == index ? -1 : index;
        },
        /*展示四级目录*/
        showFour(index) {
            this.activeFourIndex = this.activeFourIndex == index ? -1 : index;
        },

    },
    mounted() {
        this.$nextTick(() => {
            this.docHeight()
        });
    },
});