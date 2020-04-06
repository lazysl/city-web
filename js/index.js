$.extend({
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
    initWaring() {
        $.postAjax(getWaring(), function (res) {
            if (res.code = 200 && res.code_desc == "success") {
                var data = res.data;
                var html = '', name, type, pic1 = "icon9", pic2 = "icon10", pic3 = "icon11", explain1 = "严重",
                    explain2 = "一般", explain3 = "正常";
                if (data) {
                    for (var i in data) {
                        var totalRecords = data[i].totalRecords;
                        var clear = data[i].clear;
                        var critical = data[i].critical;
                        var warning = data[i].warning;
                        if (i == 'middleware') {
                            name = '中间件';
                            type = 2;
                        } else if (i == 'server') {
                            name = '服务器';
                            type = 3;
                        } else if (i == 'sql') {
                            name = '数据库';
                            type = 1;
                        } else if (i == 'order') {
                            name = '工单';
                            type = 5;
                            if (JSON.stringify(data[i]) == "{}") {
                                totalRecords = 0;
                                critical = 0;
                                warning = 0;
                                clear = 0
                            } else {
                                totalRecords = data[i].totalRecords;
                                critical = data[i].open;
                                warning = data[i].resolved;
                                clear = data[i].closed;
                            }
                            pic1 = "icon12";
                            pic2 = "icon13";
                            pic3 = "icon14";
                            explain1 = "运行";
                            explain2 = "已解决";
                            explain3 = "已关闭";
                        }
                        html += '<div class="layout">\n' +
                            '         <div class="item">\n' +
                            '               <p onclick="$.getDetail(' + type + ')"><span>' + totalRecords + '</span>' + name + '</p>\n' +
                            '               <img src="images/index/icon-' + i + '.png"/>\n' +
                            '         </div>\n' +
                            '         <div class="item-1">\n' +
                            '              <ul>\n' +
                            '                  <li onclick="$.getDetail(' + type + ',1)"><img src="images/index/' + pic1 + '.png"/><p>' + critical + '</p><em>' + explain1 + '</em></li>\n' +
                            '                  <li onclick="$.getDetail(' + type + ',2)"><img src="images/index/' + pic2 + '.png"/><p>' + warning + '</p><em>' + explain2 + '</em></li>\n' +
                            '                  <li onclick="$.getDetail(' + type + ',3)"><img src="images/index/' + pic3 + '.png"/><p>' + clear + '</p><em>' + explain3 + '</em></li>\n' +
                            '              </ul>\n' +
                            '         </div>\n' +
                            '     </div>';
                    }
                    $("#waring").empty().append(html)
                }
            }else if (res.code = 403){
                delCookie("user");
                localStorage.clear();
                window.location.href = "./login.html"
            }else alert(res.code_desc)
        })
    },
    initModeAnaly() {
        $.postAjax(getCheckModeAnaly(), function (res) {
            if (res.code = 200 && res.code_desc == "success") {
                var data = res.data;
                var html = '', rankHtml = '';
                if (data) {
                    for (var i in data) {
                        if (Object.keys(data[i].information).length < 4) {
                            if (typeof (data[i].information.server) == "undefined") data[i].information.server = "-/-";
                            if (typeof data[i].information.sql == "undefined") data[i].information.sql = "-/-";
                            if (typeof data[i].information.middleware == "undefined") data[i].information.middleware = "-/-";
                            if (typeof data[i].information.internet == "undefined") data[i].information.internet = "-/-";
                        }
                        var serverStyle = (data[i].information.server).indexOf('0/') > -1 || data[i].information.server == "-/-" ? 'green' : 'red';
                        var sqlStyle = (data[i].information.sql).indexOf('0/') > -1 || data[i].information.sql == "-/-" ? 'green' : 'red';
                        var middlewareStyle = (data[i].information.middleware).indexOf('0/') > -1 || data[i].information.middleware == "-/-" ? 'green' : 'red';
                        var internetStyle = (data[i].information.internet).indexOf('0/') > -1 || data[i].information.internet == "-/-" ? 'green' : 'red';
                        html += '<tr>\n' +
                            '       <td>' + data[i].name + '</td>\n' +
                            '       <td><span class="' + serverStyle + '"></span>' + data[i].information.server + '</td>\n' +
                            '       <td><span class="' + sqlStyle + '"></span>' + data[i].information.sql + '</td>\n' +
                            '       <td><span class="' + middlewareStyle + '"></span>' + data[i].information.middleware + '</td>\n' +
                            '       <td><span class="' + internetStyle + '"></span>' + data[i].information.internet + '</td>\n' +
                            '     </tr>';
                        var percent = ((data[i].information.server).indexOf('0/') > -1 || (data[i].information.sql).indexOf('0/') > -1 || (data[i].information.middleware).indexOf('0/') > -1 || (data[i].information.internet).indexOf('0/') > -1) ? "20%" : "0%"
                        rankHtml += '<li>\n' +
                            '       <p>' + data[i].name + '</p>\n' +
                            '       <span><em style="width: ' + percent + '"></em></span>\n' +
                            '       <p>' + percent + '</p>\n' +
                            '      </li>'
                    }
                    $("#table").empty().append(html);
                    $("#rankList ul").empty().append(rankHtml)
                }
            }else if (res.code = 403){
                delCookie("user");
                localStorage.clear();
                window.location.href = "./login.html"
            }else alert(res.code_desc)
        })
    },
    initAlarms() {
        $.postAjax(listAlarms(), function (res) {
            if (res.code = 200 && res.code_desc == "success") {
                var data = res.data;
                var html = '';
                if (data) {
                    for (var i in data) {
                        var severity = data[i].severity;
                        if (data[i].severity.indexOf("危急") > -1) severity = "red";
                        else if (data[i].severity.indexOf("故障") > -1) severity = "orange";
                        else severity = "green";
                        html += '<li>\n' +
                            '        <span>' + (Number(i) + 1) + '</span>\n' +
                            '        <span>' + data[i].modTime + '</span>\n' +
                            '        <span><em class="' + severity + '"></em>' + data[i].message + '</span>\n' +
                            '     </li>'
                    }
                    $("#alarms").empty().append(html)
                }
            }else if (res.code = 403){
                delCookie("user");
                localStorage.clear();
                window.location.href = "./login.html"
            }else alert(res.code_desc)
        })
    },
    getDetail(type, waringType) {
        var html = "", explain, color, waringTypes;
        if (typeof waringType == "undefined") waringTypes = "";
        else {
            if (type == 5) {
                if (waringType == 1) waringTypes = 1;
                if (waringType == 2) waringTypes = 3;
                if (waringType == 3) waringTypes = 2
            } else {
                waringTypes = waringType
            }
        }
        $.postAjax(js_checkSqlList(type, waringTypes), function (res) {
            if (res.code = 200 && res.code_desc == "success") {
                $(".tcHide").show();
                var data = res.data;
                if (data) {
                    if (data.length > 0) {
                        for (var i in data) {
                            if (type == 5) {
                                if (data[i].STATUS == "Resolved") {
                                    explain = "已解决";
                                }
                                if (data[i].STATUS == "Open") {
                                    explain = "运行";
                                }
                                if (data[i].STATUS == "closed") {
                                    explain = "已关闭";
                                }
                                html += '<li><span>' + data[i].SUBJECT + '</span><span>' + data[i].CREATEDBY + '</span><span>' + explain + '</span></li>'
                            } else {
                                if (data[i].status == "critical") {
                                    explain = "严重";
                                    color = "critical"
                                }
                                if (data[i].status == "warning") {
                                    explain = "一般";
                                    color = "warning"
                                }
                                if (data[i].status == "Clear" || data[i].status == "clear") {
                                    explain = "正常";
                                    color = "clear"
                                }
                                if (typeof (data[i].type) == 'undefined') data[i].type = '';
                                else data[i].type = data[i].type;
                                html += '<li><span>' + data[i].displayName + '</span><span>' + data[i].type + '</span><span class="' + color + '">' + explain + '</span></li>'
                            }
                        }
                    } else {
                        html = '<li>暂无数据</li>'
                    }
                    $(".tcHide ul").empty().append(html)
                    if (type == 1) {
                        if (waringTypes == '') {
                            $(".tcHide .tcTit span").empty().append("数据库概览")
                        } else {
                            if (waringTypes == 1) $(".tcHide .tcTit span").empty().append("数据库-严重告警");
                            if (waringTypes == 2) $(".tcHide .tcTit span").empty().append("数据库-一般告警");
                            if (waringTypes == 3) $(".tcHide .tcTit span").empty().append("数据库-正常告警")
                        }
                    }
                    if (type == 2) {
                        if (waringTypes == '') {
                            $(".tcHide .tcTit span").empty().append("中间件概览")
                        } else {
                            if (waringTypes == 1) $(".tcHide .tcTit span").empty().append("中间件-严重告警");
                            if (waringTypes == 2) $(".tcHide .tcTit span").empty().append("中间件-一般告警");
                            if (waringTypes == 3) $(".tcHide .tcTit span").empty().append("中间件-正常告警")
                        }
                    }
                    if (type == 3) {
                        if (waringTypes == '') {
                            $(".tcHide .tcTit span").empty().append("服务器概览")
                        } else {
                            if (waringTypes == 1) $(".tcHide .tcTit span").empty().append("服务器-严重告警");
                            if (waringTypes == 2) $(".tcHide .tcTit span").empty().append("服务器-一般告警");
                            if (waringTypes == 3) $(".tcHide .tcTit span").empty().append("服务器-正常告警")
                        }
                    }
                    if (type == 5) {
                        if (waringTypes == '') {
                            $(".tcHide .tcTit span").empty().append("工单概览")
                        } else {
                            if (waringTypes == 1) $(".tcHide .tcTit span").empty().append("工单-正在运行");
                            if (waringTypes == 2) $(".tcHide .tcTit span").empty().append("工单-已解决");
                            if (waringTypes == 3) $(".tcHide .tcTit span").empty().append("工单-已关闭")
                        }
                    }
                }
            }else if (res.code = 403){
                delCookie("user");
                localStorage.clear();
                window.location.href = "./login.html"
            }else alert(res.code_desc)
        })
    },
});