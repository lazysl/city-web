new Vue({
    el: '#main',
    data: {
        objectName: "",
        infoSecurityList: [],
        deviceTxt: [
            {name: "服务器", id: 1, maxHeight: "", midHeight: "", minHeight: "",},
            {name: "数据库", id: 2, maxHeight: "", midHeight: "", minHeight: "",},
            {name: "中间件", id: 3, maxHeight: "", midHeight: "", minHeight: "",},
        ],
        leakPercent: "",   //安全漏洞比率
        virusPercent: "",   //病毒数比率
        virusNum: "",   //病毒数
        portNum: '',   //端口数
        strongNum: '',   //强力攻击数
        trojanNum: '',   //木马攻击数
        refuseNum: '',   //拒绝访问攻击数
        bufferNum: '',   //缓冲区溢出攻击数
        wormNum: '',   //网络蠕虫攻击数
        ipNum: '',   //IP碎片攻击数
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
            document.getElementById("securityCon").style.maxHeight = (docHeight - 205) + "px"
        },
        urlParams(key) {
            var value = "";
            var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) value = unescape(r[2]);
            return value;
        },
        initInfo() {
            this.getAjax(this.getCheckInfo(), (res) => {
                if (res.code = 200 && res.code_desc == "success") {
                    for (let i in res.data) {
                        if (res.data[i].id == this.urlParams("id")) {
                            this.objectName = res.data[i].name;
                        }
                    }
                }
            })
        },
        cancel() {
            this.leakPercent = "";
            this.virusPercent = "";
            this.virusNum = "";
            this.portNum = "";
            this.strongNum = "";
            this.trojanNum = "";
            this.refuseNum = "";
            this.bufferNum = "";
            this.wormNum = "";
            this.ipNum = "";
            for (let i in this.deviceTxt) {
                this.deviceTxt[i].maxHeight = "";
                this.deviceTxt[i].midHeight = "";
                this.deviceTxt[i].minHeight = "";
            }
        },
        infoSecurity() {
            let deviceData = [];
            for (var i in this.deviceTxt) {
                deviceData.push({
                    maxHeight: this.deviceTxt[i].maxHeight,
                    midHeight: this.deviceTxt[i].midHeight,
                    minHeight: this.deviceTxt[i].minHeight,
                })
            }
            let informationSecurity = [{
                    leakPercent: this.leakPercent,   //安全漏洞比率
                    virusPercent: this.virusPercent,   //病毒数比率
                    virusNum: this.virusNum,   //病毒数
                    portNum: this.portNum,   //端口数
                    strongNum: this.strongNum,   //强力攻击数
                    trojanNum: this.trojanNum,   //木马攻击数
                    refuseNum: this.refuseNum,   //拒绝访问攻击数
                    bufferNum: this.bufferNum,   //缓冲区溢出攻击数
                    wormNum: this.wormNum,   //网络蠕虫攻击数
                    ipNum: this.ipNum,   //IP碎片攻击数
                    deviceTxt: deviceData,
                }];
            let data = {
                id: this.urlParams("id"),
                informationSecurity: JSON.stringify(informationSecurity)
            };
            this.postAjax(this.updateCheckInfoSecurity(data), (res) => {
                if (res.code = 200 && res.code_desc == "success") {
                    this.initInfo();
                } else alert(res.code_desc)
            })
        },
    },
    mounted() {
        this.$nextTick(() => {
            this.docHeight()
        });
        this.initInfo();
    },

})