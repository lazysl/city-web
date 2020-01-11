new Vue({
    el: '#main',
    data: {
        isPop: false,
        name: '',
        num:'',
        dayIndex: 0,
        tabList: [
            {name: "日评模型", id: "1"},
            {name: "周评模型", id: "2"},
            {name: "月评模型", id: "3"},
            {name: "年评模型", id: "4"}
        ],
        dayId: 1,
        //可用性
        usability: {
            total: "--",
            project: {server: "--", middleware: "--", sql: "--", internet: "--"}
        },
        //性能告警
        capability: {
            total: "--",
            project: {
                server: {
                    total: '--',
                    level: {critical: '--', malfunction: '--'}
                },
                middleware: {
                    total: '--',
                    level: {critical: '--', malfunction: '--'}
                },
                sql: {
                    total: '--',
                    level: {critical: '--', malfunction: '--'}
                }
            }
        },
        //数据质量
        quality: {total: "--", complex: '--'},
        //信息安全
        information: {
            total: "--",
            project: {
                server: {
                    total: '--',
                    level: {critical: '--', malfunction: '--'}
                },
                middleware: {
                    total: '--',
                    level: {critical: '--', malfunction: '--'}
                },
                sql: {
                    total: '--',
                    level: {critical: '--', malfunction: '--'}
                }
            }
        },
        changeTxt:'',
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
        tabClick(obj, index) {
            this.dayIndex = index;
            this.dayId = obj.id;
            this.initMode(this.dayId)
        },
        /*改变百分比*/
        changePercent(num,val) {
            this.isPop = !this.isPop;
            if (num != 0) {
                this.name = val;
                this.num = num;
            }
        },
        /*保存改变的百分比*/
        savePercent(num) {
            if (this.changeTxt && this.changeTxt != '') {
                this.isPop = false;
                if (num == 1) this.usability.total = this.changeTxt;
                if (num == 1_0) this.usability.project.server = this.changeTxt;
                if (num == 1_1) this.usability.project.middleware = this.changeTxt;
                if (num == 1_2) this.usability.project.sql = this.changeTxt;
                if (num == 1_3) this.usability.project.internet = this.changeTxt;
                if (num == 2) this.capability.total = this.changeTxt;
                if (num == 2_0) this.capability.project.server.total = this.changeTxt;
                if (num == 2_0_0) this.capability.project.server.level.critical = this.changeTxt;
                if (num == 2_0_1) this.capability.project.server.level.malfunction = this.changeTxt;
                if (num == 2_1) this.capability.project.middleware.total = this.changeTxt;
                if (num == 2_1_0) this.capability.project.middleware.level.critical = this.changeTxt;
                if (num == 2_1_1) this.capability.project.middleware.level.malfunction = this.changeTxt;
                if (num == 2_2) this.capability.project.sql.total = this.changeTxt;
                if (num == 2_2_0) this.capability.project.sql.level.critical = this.changeTxt;
                if (num == 2_2_1) this.capability.project.sql.level.malfunction = this.changeTxt;
                if (num == 3) this.quality.total = this.changeTxt;
                if (num == 3_0) this.quality.complex = this.changeTxt;
                if (num == 4) this.information.total = this.changeTxt;
                if (num == 4_0) this.information.project.server.total = this.changeTxt;
                if (num == 4_0_0) this.information.project.server.level.critical = this.changeTxt;
                if (num == 4_0_1) this.information.project.server.level.malfunction = this.changeTxt;
                if (num == 4_1) this.information.project.middleware.total = this.changeTxt;
                if (num == 4_1_0) this.information.project.middleware.level.critical = this.changeTxt;
                if (num == 4_1_1) this.information.project.middleware.level.malfunction = this.changeTxt;
                if (num == 4_2) this.information.project.sql.total = this.changeTxt;
                if (num == 4_2_0) this.information.project.sql.level.critical = this.changeTxt;
                if (num == 4_2_1) this.information.project.sql.level.malfunction = this.changeTxt;
            }
        },
        /*初始化*/
        initMode(dayId) {
            this.postAjax(this.getCheckMode(), (res) => {
                if (res.code = 200 && res.code_desc == "success") {
                    let data = res.data;
                    let rule = data[dayId].rule;
                    if (rule && rule != "{}" && rule != "") {
                        if (dayId == 1) {
                            this.usability.total = rule.usability.total;
                            this.usability.project.server = rule.usability.project.server;
                            this.usability.project.middleware = rule.usability.project.middleware;
                            this.usability.project.sql = rule.usability.project.sql;
                            this.usability.project.internet = rule.usability.project.internet;
                        }
                        if (dayId == 2) {
                            this.capability.total = rule.capability.total;
                            this.capability.project.server.total = rule.capability.usability.project.server.total;
                            this.capability.project.server.level.critical = rule.capability.project.server.level.critical;
                            this.capability.project.server.level.malfunction = rule.capability.project.server.level.malfunction;
                            this.capability.project.middleware.total = rule.capability.project.middleware.total;
                            this.capability.project.middleware.level.critical = rule.capability.project.middleware.level.critical;
                            this.capability.project.middleware.level.malfunction = rule.capability.project.middleware.level.malfunction;
                            this.capability.project.sql.total = rule.capability.project.sql.total;
                            this.capability.project.sql.level.critical = rule.capability.project.sql.level.critical;
                            this.capability.project.sql.level.malfunction = rule.capability.project.sql.level.malfunction;
                        }
                        if (dayId == 3) {
                            this.quality.total = rule.quality.total;
                            this.quality.complex = rule.quality.complex;
                        }
                        if (dayId == 4) {
                            this.information.total = rule.information.total;
                            this.information.project.server.total = rule.information.usability.project.server.total;
                            this.information.project.server.level.critical = rule.information.project.server.level.critical;
                            this.information.project.server.level.malfunction = rule.information.project.server.level.malfunction;
                            this.information.project.middleware.total = rule.information.project.middleware.total;
                            this.information.project.middleware.level.critical = rule.information.project.middleware.level.critical;
                            this.information.project.middleware.level.malfunction = rule.information.project.middleware.level.malfunction;
                            this.information.project.sql.total = rule.information.project.sql.total;
                            this.information.project.sql.level.critical = rule.information.project.sql.level.critical;
                            this.information.project.sql.level.malfunction = rule.information.project.sql.level.malfunction;
                        }
                    }
                }
            })
        },
        /*保存*/
        saveMode(dayId) {
            let data;
            if (dayId == 1){
                data = {
                    id: dayId,
                    status: 1,
                    rule: {
                        usability: {
                            total: this.usability.total,
                            project: {
                                server: this.usability.project.server,
                                middleware: this.usability.project.middleware,
                                sql: this.usability.project.sql,
                                internet: this.usability.project.internet
                            }
                        }
                    }
                };
            }
            if (dayId == 2){
                data = {
                    id: dayId,
                    status: 1,
                    rule: {
                        capability: {
                            total: this.capability.total,
                            project: {
                                server: {
                                    total: this.capability.project.server.total,
                                    level: {
                                        critical: this.capability.project.server.level.critical,
                                        malfunction: this.capability.project.server.level.malfunction
                                    }
                                },
                                middleware: {
                                    total: this.capability.project.middleware.total,
                                    level: {
                                        critical: this.capability.project.server.level.critical,
                                        malfunction: this.capability.project.server.level.malfunction
                                    }
                                },
                                sql: {
                                    total: this.capability.project.sql.total,
                                    level: {
                                        critical: this.capability.project.server.level.critical,
                                        malfunction: this.capability.project.server.level.malfunction
                                    }
                                }
                            }
                        },
                    }
                };
            }
            if (dayId == 3){
                data = {
                    id: dayId,
                    status: 1,
                    rule: {
                        quality: {total: this.quality.total, complex: this.quality.complex},
                    }
                };
            }
            if (dayId == 4){
                data = {
                    id: dayId,
                    status: 1,
                    rule: {
                        information: {
                            total: this.information.total,
                            project: {
                                server: {
                                    total: this.information.project.sql.total,
                                    level: {
                                        critical: this.information.project.server.level.critical,
                                        malfunction: this.information.project.server.level.malfunction
                                    }
                                },
                                middleware: {
                                    total: this.information.project.sql.total,
                                    level: {
                                        critical: this.information.project.server.level.critical,
                                        malfunction: this.information.project.server.level.malfunction
                                    }
                                },
                                sql: {
                                    total: this.information.project.sql.total,
                                    level: {
                                        critical: this.information.project.server.level.critical,
                                        malfunction: this.information.project.server.level.malfunction
                                    }
                                }
                            }
                        },
                    }
                };
            }
            /*data = {
                id: this.dayId,
                status: 1,
                rule: {
                    usability: {
                        total: this.usability.total,
                        project: {
                            server: this.usability.project.server,
                            middleware: this.usability.project.middleware,
                            sql: this.usability.project.sql,
                            internet: this.usability.project.internet
                        }
                    },
                    capability: {
                        total: this.capability.total,
                        project: {
                            server: {
                                total: this.capability.project.server.total,
                                level: {
                                    critical: this.capability.project.server.level.critical,
                                    malfunction: this.capability.project.server.level.malfunction
                                }
                            },
                            middleware: {
                                total: this.capability.project.middleware.total,
                                level: {
                                    critical: this.capability.project.server.level.critical,
                                    malfunction: this.capability.project.server.level.malfunction
                                }
                            },
                            sql: {
                                total: this.capability.project.sql.total,
                                level: {
                                    critical: this.capability.project.server.level.critical,
                                    malfunction: this.capability.project.server.level.malfunction
                                }
                            }
                        }
                    },
                    quality: {total: this.quality.total, complex: this.quality.complex},
                    information: {
                        total: this.information.total,
                        project: {
                            server: {
                                total: this.information.project.sql.total,
                                level: {
                                    critical: this.information.project.server.level.critical,
                                    malfunction: this.information.project.server.level.malfunction
                                }
                            },
                            middleware: {
                                total: this.information.project.sql.total,
                                level: {
                                    critical: this.information.project.server.level.critical,
                                    malfunction: this.information.project.server.level.malfunction
                                }
                            },
                            sql: {
                                total: this.information.project.sql.total,
                                level: {
                                    critical: this.information.project.server.level.critical,
                                    malfunction: this.information.project.server.level.malfunction
                                }
                            }
                        }
                    },
                }
            };*/
            this.postAjax(this.updateCheckMode(data), (res) => {
                if (res.code = 200 && res.code_desc == "success") {
                    alert("保存成功")
                } else alert("保存失败")
            })
        },
    },
    mounted() {
        this.initMode(this.dayId);
    },
});