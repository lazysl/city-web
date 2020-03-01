new Vue({
    el: '#main',
    data: {
        isObjectInfoPop:true,
        objectName:"",
        objectEmail:"",
        objectList: [
            {
                firstName: "业务考评",
                id: "1",
                secList: [
                    {
                        secName: "业务健康度",
                        id: "1",
                        thirdList: [
                            {thirdName: '页面可用性', id: '1'},
                            {thirdName: '页面健康度', id: '2'},
                            {thirdName: '数据质量', id: '3'},
                            {thirdName: '数据共享', id: '4'},
                        ]
                    },
                    {secName: "信息安全", id: "2"},
                    {secName: "物联设备状态", id: "3"},
                ]
            },
            {
                firstName: "技术考评",
                id: "2",
                secList: [
                    {secName: '服务器', id: '1'},
                    {secName: '数据库', id: '2'},
                    {secName: '中间件', id: '3'},
                    {secName: '网络设备', id: '4'},
                ]
            },
        ],
        isAutoEvaluation:false,
        isFirstCheck:-1,
        isSecCheck:-1,
        isThirdCheck:-1,
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
            document.getElementById("table").style.maxHeight = (docHeight - 205) + "px"
        },
        objectInfo(obj) {
            this.isObjectInfoPop = !this.isObjectInfoPop;
            if (obj==1) this.addObjectInfo();
        },
        autoEvaluation() {
            this.isAutoEvaluation = !this.isAutoEvaluation
        },
        checkButton(){},
        addObjectInfo() {
            this.postAjax(this.addCheckDevice(), (res) => {
                if (res.code = 200 && res.code_desc == "success") {
                }
            })
        },
    },
    mounted() {
        this.$nextTick(() => {
            this.docHeight()
        })
        console.log(this.objectList)
    },
});