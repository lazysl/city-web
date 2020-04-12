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
        informationSecurity: ""
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
            this.postAjax(this.getCheckInfo(), (res) => {
                if (res.code = 200 && res.code_desc == "success") {
                    for (const i in res.data) {
                        if (res.data[i].id == this.urlParams("id")) {
                            this.objectName = res.data[i].name;
                            this.informationSecurity = JSON.parse(res.data[i].informationSecurity)
                        }
                    }
                    for (const i in this.informationSecurity) {
                        if (this.informationSecurity[i].id == "leak") {
                            this.leakPercent = this.informationSecurity[i].leakPercent;
                            for (const j in this.deviceTxt) {
                                this.deviceTxt[j].maxHeight = this.informationSecurity[i].deviceTxt[j].maxHeight;
                                this.deviceTxt[j].midHeight = this.informationSecurity[i].deviceTxt[j].midHeight;
                                this.deviceTxt[j].minHeight = this.informationSecurity[i].deviceTxt[j].minHeight;
                            }
                        } else if (this.informationSecurity[i].id == "virus") {
                            this.virusPercent = this.informationSecurity[i].virusPercent;
                            this.virusNum = this.informationSecurity[i].virusNum;
                        } else if (this.informationSecurity[i].id == "port") {
                            this.portNum = this.informationSecurity[i].portNum;
                        } else if (this.informationSecurity[i].id == "strong") {
                            this.strongNum = this.informationSecurity[i].strongNum;
                        } else if (this.informationSecurity[i].id == "trojan") {
                            this.trojanNum = this.informationSecurity[i].trojanNum;
                        } else if (this.informationSecurity[i].id == "refuse") {
                            this.refuseNum = this.informationSecurity[i].refuseNum;
                        } else if (this.informationSecurity[i].id == "buffer") {
                            this.bufferNum = this.informationSecurity[i].bufferNum;
                        } else if (this.informationSecurity[i].id == "worm") {
                            this.wormNum = this.informationSecurity[i].wormNum;
                        } else if (this.informationSecurity[i].id == "ip") {
                            this.ipNum = this.informationSecurity[i].ipNum;
                        }
                    }
                } else if (res.code = 403) {
                    delCookie("user");
                    localStorage.clear();
                    window.location.href = "./login.html"
                } else alert(res.code_desc)
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
            for (let i in this.deviceTxt) {
                deviceData.push({
                    maxHeight: this.deviceTxt[i].maxHeight,
                    midHeight: this.deviceTxt[i].midHeight,
                    minHeight: this.deviceTxt[i].minHeight,
                })
            }
            let informationSecurity = [
                {id: "leak", leakPercent: this.leakPercent, deviceTxt: deviceData},//安全漏洞
                {id: "virus", virusPercent: this.virusPercent, virusNum: this.virusNum},//病毒
                {id: "port", portNum: this.portNum},//端口
                {id: "strong", strongNum: this.strongNum},//强力攻击数
                {id: "trojan", trojanNum: this.trojanNum},//木马攻击数
                {id: "refuse", refuseNum: this.refuseNum},//拒绝访问攻击数
                {id: "buffer", bufferNum: this.bufferNum},//缓冲区溢出攻击数
                {id: "worm", wormNum: this.wormNum},//网络蠕虫攻击数
                {id: "ip", ipNum: this.ipNum},//IP碎片攻击数
            ];
            let data = {
                id: this.urlParams("id"),
                informationSecurity: JSON.stringify(informationSecurity)
            };
            this.postAjax(this.updateCheckInfoSecurity(data), (res) => {
                if (res.code = 200 && res.code_desc == "success") {
                    alert("保存成功");
                    this.initInfo();
                } else if (res.code = 403) {
                    delCookie("user");
                    localStorage.clear();
                    window.location.href = "./login.html"
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