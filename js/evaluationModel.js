new Vue({
    el: '#main',
    data: {
        objectTotal: 100,
        technology: [
            {name: "服务器", id: 0, maxHeight: "", minHeight: "",},
            {name: "数据库", id: 1, maxHeight: "", minHeight: "",},
            {name: "中间件", id: 2, maxHeight: "", minHeight: "",},
        ],
        business: {
            health: [
                {id: 0, qualification: "正常"},
                {id: 1, qualification: "正常"},
                {id: 2, qualification: ""},
                {id: 3, qualification: "正常"},
            ],
            security: [
                {id: 0, percent: "", maxHeight: "", midHeight: "", minHeight: ""},
                {id: 1, percent: "", num: ""},
                {id: 2, num: ""},
                {id: 3, num: ""},
                {id: 4, num: ""},
                {id: 5, num: ""},
                {id: 6, num: ""},
                {id: 7, num: ""},
                {id: 8, num: ""},
            ],
            internet: [
                {id: 0, num: ""},
                {id: 1, num: ""},
                {id: 2, num: ""},
                {id: 3, num: ""},
                {id: 4, num: ""},
                {id: 5, num: ""},
                {id: 6, num: ""},
                {id: 7, num: ""},
                {id: 8, num: ""},
                {id: 9, num: ""},
                {id: 10, num: ""},
            ],
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
                            for (let i in rule.business.health) {
                                this.business.health[i].qualification = rule.business.health[i].qualification;
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
                            }
                            for (let h in rule.business.internet) {
                                this.business.internet[h].num = rule.business.internet[h].num;
                            }
                            for (let k in rule.technology) {
                                this.technology[k].maxHeight = rule.technology[k].maxHeight;
                                this.technology[k].minHeight = rule.technology[k].minHeight;
                            }
                        }
                    }
                }else alert(res.code_desc)
            })
        },
        saveModel() {
            let data, rule;
            let healthData = [], securityData = [], internetData = [], technologyData = [];
            for (let i in this.business.health) {
                healthData.push({
                    id: i,
                    qualification: this.business.health[i].qualification,
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
                    })
                } else if (j == 1) {
                    securityData.push({
                        id: j,
                        percent: this.business.security[j].percent,
                        num: this.business.security[j].num,
                    })
                } else {
                    securityData.push({
                        id: j,
                        num: this.business.security[j].num,
                    })
                }

            }
            for (let h in this.business.internet) {
                internetData.push({
                    id: h,
                    num: this.business.internet[h].num,
                })
            }
            for (let k in this.technology) {
                technologyData.push({
                    id: k,
                    maxHeight: this.technology[k].maxHeight,
                    minHeight: this.technology[k].minHeight,
                })
            }
            rule = {
                business: {
                    health: healthData,
                    security: securityData,
                    internet: internetData
                },
                technology: technologyData,
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