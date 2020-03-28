new Vue({
    el: '#main',
    data: {
        objectTotal: 100,
        technologyTotal: 60,
        technology: [
            {name: "服务器", id: 0, maxHeight: "", minHeight: "",},
            {name: "数据库", id: 1, maxHeight: "", minHeight: "",},
            {name: "中间件", id: 2, maxHeight: "", minHeight: "",},
        ],
        business: {
            businessTotal: 40,
            health: [
                {id: 0, qualification: "正常", fraction: 2},
                {id: 1, qualification: "正常", fraction: 2},
                {id: 2, qualification: "", fraction: 4},
                {id: 3, qualification: "正常", fraction: 2},
            ],
            healthTotal: 10,
            security: [
                {id: 0, percent: "", maxHeight: "", midHeight: "", minHeight: "", fraction: 1},
                {id: 1, percent: "", num: "", fraction: 1},
                {id: 2, num: "", fraction: 3},
                {id: 3, num: "", fraction: 2},
                {id: 4, num: "", fraction: 1},
                {id: 5, num: "", fraction: 1},
                {id: 6, num: "", fraction: 3},
                {id: 7, num: "", fraction: 2},
                {id: 8, num: "", fraction: 1},
            ],
            securityTotal: 15,
            internet: [
                {id: 0, num: "", fraction: 1},
                {id: 1, num: "", fraction: 2},
                {id: 2, num: "", fraction: 2},
                {id: 3, num: "", fraction: 1},
                {id: 4, num: "", fraction: 1},
                {id: 5, num: "", fraction: 3},
                {id: 6, num: "", fraction: 1},
                {id: 7, num: "", fraction: 1},
                {id: 8, num: "", fraction: 1},
                {id: 9, num: "", fraction: 1},
                {id: 10, num: "", fraction: 1},
            ],
            internetTotal: 15,
        },
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
        initMode() {
            this.postAjax(this.getCheckMode(), (res) => {
                if (res.code = 200 && res.code_desc == "success") {
                    for (let i in res.data) {
                        let rule = "";
                        if (res.data[i].id == 1) {
                            rule = JSON.parse(res.data[i].rule);
                            console.log(rule)
                            this.objectTotal = rule.objectTotal;
                            this.technologyTotal = rule.technologyTotal;
                            this.business.businessTotal = rule.business.businessTotal;
                            this.business.healthTotal = rule.business.healthTotal;
                            this.business.securityTotal = rule.business.securityTotal;
                            this.business.internetTotal = rule.business.internetTotal;
                            for (let i in rule.business.health) {
                                this.business.health[i].qualification = rule.business.health[i].qualification;
                                this.business.health[i].fraction = rule.business.health[i].fraction;
                            }
                            for (let j in rule.business.security) {
                                if (j == 0) {
                                    this.business.security[j].percent = rule.business.security[j].percent;
                                    this.business.security[j].maxHeight = rule.business.security[j].maxHeight;
                                    this.business.security[j].midHeight = rule.business.security[j].midHeight;
                                    this.business.security[j].minHeight = rule.business.security[j].minHeight;
                                } else if (j == 1) {
                                    this.business.security[j].percent = rule.business.security[j].percent;
                                    this.business.security[j].num = rule.business.security[j].num;
                                } else {
                                    this.business.security[j].num = rule.business.security[j].num;
                                }
                                this.business.security[j].fraction = rule.business.security[j].fraction;
                            }
                            for (let h in rule.business.internet) {
                                this.business.internet[h].num = rule.business.internet[h].num;
                                this.business.internet[h].fraction = rule.business.internet[h].fraction;
                            }
                            for (let k in rule.technology) {
                                this.technology[k].maxHeight = rule.technology[k].maxHeight;
                                this.technology[k].minHeight = rule.technology[k].minHeight;
                            }
                        }
                    }
                } else alert(res.code_desc)
            })
        },
        saveModel() {
            let data, rule;
            let healthData = [], securityData = [], internetData = [], technologyData = [];
            for (let i in this.business.health) {
                healthData.push({
                    id: i,
                    qualification: this.business.health[i].qualification,
                    fraction: this.business.health[i].fraction,
                })
            }
            for (let j in this.business.security) {
                if (j == 0) {
                    securityData.push({
                        id: j,
                        percent: this.business.security[j].percent,
                        maxHeight: this.business.security[j].maxHeight,
                        midHeight: this.business.security[j].midHeight,
                        minHeight: this.business.security[j].minHeight,
                        fraction: this.business.security[j].fraction,
                    })
                } else if (j == 1) {
                    securityData.push({
                        id: j,
                        percent: this.business.security[j].percent,
                        num: this.business.security[j].num,
                        fraction: this.business.security[j].fraction,
                    })
                } else {
                    securityData.push({
                        id: j,
                        num: this.business.security[j].num,
                        fraction: this.business.security[j].fraction,
                    })
                }

            }
            for (let h in this.business.internet) {
                internetData.push({
                    id: h,
                    num: this.business.internet[h].num,
                    fraction: this.business.internet[h].fraction,
                })
            }
            for (let k in this.technology) {
                technologyData.push({
                    id: k,
                    maxHeight: this.technology[k].maxHeight,
                    minHeight: this.technology[k].minHeight,
                    fraction: this.technology[k].fraction,
                })
            }
            rule = {
                business: {
                    businessTotal: this.business.businessTotal,
                    health: healthData,
                    healthTotal: this.business.healthTotal,
                    security: securityData,
                    securityTotal: this.business.securityTotal,
                    internet: internetData,
                    internetTotal: this.business.internetTotal,
                },
                technology: technologyData,
                technologyTotal: this.technologyTotal,
                objectTotal: this.objectTotal
            };
            data = {
                id: 1,
                rule: JSON.stringify(rule)
            };
            this.postAjax(this.updateCheckMode(data), (res) => {
                if (res.code = 200 && res.code_desc == "success") {
                    alert("保存成功")
                } else alert(res.code_desc)
            })
        },
    },
    mounted() {
        this.$nextTick(() => {
            this.docHeight()
        });
        this.initMode();
    },
});