new Vue({
    el: '#main',
    data: {
        objectName: "",
        reportList: [],
        reportNavList: "",
        weekList: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
        title: [
            {"bixianshebeiCondition": "避险设备达标条件"},
            {"bixianshebeiStatus": "避险设备达标状态"},
            {"bixianshebeiVaule": "避险设备当前值"},
            {"businessCondition": "业务可用性达标条件"},
            {"businessStatus": "业务可用性达标状态"},
            {"businessVaule": "业务可用性当前值"},
            {"checkId": "考评对象id"},
            {"dataQualityCondition": "数据质量达标条件"},
            {"dataQualityStatus": "数据质量达标状态"},
            {"dataQualityVaule": "数据质量当前值"},
            {"dataSharingCondition": "数据共享达标条件"},
            {"dataSharingStatus": "数据共享达标状态"},
            {"dataSharingVaule": "数据共享当前值"},
            {"deniedAttackCondition": "拒绝访问达标条件"},
            {"deniedAttackStatus": "拒绝访问达标状态"},
            {"deniedAttackVaule": "拒绝访问当前值"},
            {"duijiangjiCondition": "对讲机达标条件"},
            {"duijiangjiStatus": "对讲机达标状态"},
            {"duijiangjiVaule": "对讲机当前值"},
            {"forceAttackCondition": "强力攻击达标条件"},
            {"forceAttackStatus": "强力攻击达标状态"},
            {"forceAttackVaule": "强力攻击当前值"},
            {"gcyitijiCondition": "公厕一体机达标条件"},
            {"gcyitijiStatus": "公厕一体机达标状态"},
            {"gcyitijiVaule": "公厕一体机当前值"},
            {"gkxjianceyiCondition": "果壳箱监测仪达标条件"},
            {"gkxjianceyiStatus": "果壳箱监测仪达标状态"},
            {"gkxjianceyiVaule": "果壳箱监测仪当前值"},
            {"health": "业务健康度"},
            {"huanweicheCondition": "环卫车达标条件"},
            {"huanweicheStatus": "环卫车达标状态"},
            {"huanweicheVaule": "环卫车当前值"},
            {"hwgongpaiCondition": "环卫工牌达标条件"},
            {"hwgongpaiStatus": "环卫工牌达标状态"},
            {"hwgongpaiVaule": "环卫工牌当前值"},
            {"id": "id"},
            {"internet": "互联网设备"},
            {"iot": "物联网设备"},
            {"ipAttackCondition": "ip碎片达标条件"},
            {"ipAttackStatus": "ip碎片达标状态"},
            {"ipAttackVaule": "ip碎片当前值"},
            {"lvhuacheCondition": "绿化车达标条件"},
            {"lvhuacheStatus": "绿化车达标状态"},
            {"lvhuacheVaule": "绿化车当前值"},
            {"middleware": "中间件"},
            {"middlewareCondition": "中间件达标条件"},
            {"middlewareVaule": "中间件当前值"},
            {"name": "考评对象名称"},
            {"portScanCondition": "端口扫描达标条件"},
            {"portScanStatus": "端口扫描达标状态"},
            {"portScanVaule": "端口扫描当前值"},
            {"qtjianceyiCondition": "气体监测仪达标条件"},
            {"qtjianceyiStatus": "气体监测仪达标状态"},
            {"qtjianceyiVaule": "气体监测仪当前值"},
            {"responseCondition": "业务监测达标条件"},
            {"responseStatus": "业务监测达标状态"},
            {"responseVaule": "业务监测当前值"},
            {"result": "考评结果"},
            {"safe": "信息安全"},
            {"score": "考评分数"},
            {"securityBreachCondition": "安全漏洞达标条件"},
            {"securityBreachStatus": "安全漏洞达标状态"},
            {"securityBreachVaule": "安全漏洞当前值"},
            {"serverCondition": "服务器达标条件"},
            {"serverDevice": "服务器设备"},
            {"serverVaule": "服务器当前值"},
            {"shexiangtouCondition": "摄像头达标条件"},
            {"shexiangtouStatus": "摄像头达标状态"},
            {"shexiangtouVaule": "摄像头当前值"},
            {"sqlCondition": "数据库达标条件"},
            {"sqlDevice": "数据库"},
            {"sqlVaule": "数据库当前值"},
            {"time": "考评时间"},
            {"trojanAttackCondition": "木马攻击达标条件"},
            {"trojanAttackStatus": "木马攻击达标状态"},
            {"trojanAttackVaule": "木马攻击当前值"},
            {"type": "考评类型"},
            {"virusAttackCondition": "病毒攻击达标条件"},
            {"virusAttackStatus": "病毒攻击达标状态"},
            {"virusAttackVaule": "病毒攻击当前值"},
            {"wormAttackCondition": "蠕虫攻击达标条件"},
            {"wormAttackStatus": "蠕虫攻击达标状态"},
            {"wormAttackVaule": "蠕虫攻击当前值"},
            {"zhifacheCondition": "执法车达标条件"},
            {"zhifacheStatus": "执法车达标状态"},
            {"zhifacheVaule": "执法车当前值"},
            {"zhifayiCondition": "执法仪达标条件"},
            {"zhifayiStatus": "执法仪达标状态"},
            {"zhifayiVaule": "执法仪当前值"},
            {"zoneAttackCondition": "缓冲区溢出达标条件"},
            {"zoneAttackStatus": "缓冲区溢出达标状态"},
            {"zoneAttackVaule": "缓冲区溢出当前值"}
        ],
        titleData: []
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
        docHeight() {
            var docHeight = window.innerHeight || document.documentElement.clientHeight;
            document.getElementById("content").children[0].style.height = (docHeight - 142) + "px";
            document.getElementById("table").style.maxHeight = (docHeight - 205) + "px"
        },
        dateFormatFull(longTypeDate) {
            var dateType = "";
            var date = new Date();
            date.setTime(longTypeDate);
            dateType = date.getFullYear() + "-" + this.getFullPart(date.getMonth() + 1) + "-" + this.getFullPart(date.getDate()) + " " + this.getFullPart(date.getHours()) + ":" + this.getFullPart(date.getMinutes());
            return dateType;
        },
        getFullPart(day) {
            return day < 10 ? "0" + day : day;
        },
        initReportResult() {
            let startTime, endTime;
            if (this.urlParams("time").indexOf("/") > -1) {
                startTime = this.urlParams("time").split("/")[0];
                endTime = this.urlParams("time").split("/")[1];
            } else {
                startTime = this.urlParams("time");
                endTime = this.urlParams("time");
            }
            let data = {
                id: this.urlParams("id"),
                startTime: startTime,
                endTime: endTime
            };
            this.postAjax(this.checkResult(data), (res) => {
                if (res.code == 200) {
                    let flag = true;
                    this.reportList = res.data.records;
                    let data = JSON.parse(JSON.stringify(res.code_desc.split(",")));
                    for (const i in data) {
                        if (data[i] != "name") flag = false;
                        for (const i in data) {
                            if (data[i] == "type") {
                                let obj = data[i];
                                data.splice(i, 1)
                                data.splice(0, 0, obj)
                            }
                        }
                    }
                    let data1 = JSON.parse(JSON.stringify(data));
                    for (const i in data1) {
                        if (data1[i] == "time") {
                            let obj = data1[i];
                            data1.splice(i, 1)
                            data1.splice(0, 0, obj)
                        }
                    }
                    let data2 = JSON.parse(JSON.stringify(data1));
                    for (const i in data2) {
                        if (data2[i] == "checkId") {
                            let obj = data2[i];
                            data2.splice(i, 1)
                            data2.splice(0, 0, obj)
                        }
                    }
                    let data3 = JSON.parse(JSON.stringify(data2));
                    for (const i in data3) {
                        if (data3[i] == "id") {
                            let obj = data3[i];
                            data3.splice(i, 1)
                            data3.splice(0, 0, obj)
                        }
                    }
                    if (!flag) data3.splice(0, 0, "name");
                    this.reportNavList = data3;
                    for (const i in this.reportNavList) {
                        for (const j in this.title) {
                            if (typeof this.title[j][this.reportNavList[i]] !== "undefined") {
                                this.titleData.push({
                                    name: this.title[j][this.reportNavList[i]],
                                    id: this.reportNavList[i]
                                })
                            }
                        }
                    }
                } else if (res.code == 403) {
                    delCookie("user");
                    localStorage.clear();
                    window.location.href = "./login.html"
                } else alert(res.code_desc)
            })
        },
        initReport() {
            this.postAjax(this.getCheckReport(), (res) => {
                if (res.code == 200 && res.code_desc == "success") {
                    for (let i in res.data) {
                        if (this.urlParams("id") == res.data[i].id) {
                            this.objectName = res.data[i].name;
                        }
                    }
                } else if (res.code == 403) {
                    delCookie("user");
                    localStorage.clear();
                    window.location.href = "./login.html"
                } else alert(res.code_desc)
            })
        },
        pdfMap(name) {
            let pdf = new jsPDF('p', 'pt', 'a4');
            pdf.internal.scaleFactor = 1;
            let options = {
                pagesplit: true,
            };
            pdf.addHTML(document.getElementById("tableCon"), options, function () {
                pdf.save(name + '.pdf');
            });
        },
    },
    mounted() {
        this.docHeight();
        this.initReportResult();
        this.initReport()
    },
});