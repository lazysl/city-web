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
        $.getAjax(getWaring(), function (res) {
            if (res.code = 200 && res.code_desc == "success") {
                var data = res.data;
                var html = '', name, pic1 = "icon9", pic2 = "icon10", pic3 = "icon11",explain1="严重",explain2="一般",explain3="正常";
                if (data) {
                    for (var i in data) {
                        var totalRecords = data[i].totalRecords;
                        var clear = data[i].clear;
                        var critical = data[i].critical;
                        var warning = data[i].warning;
                        if (i == 'middleware') {
                            name = '中间件';
                        } else if (i == 'server') {
                            name = '服务器';
                        } else if (i == 'sql') {
                            name = '数据库';
                        } else if (i == 'order') {
                            name = '工单';
                            critical = data[i].open;
                            warning = data[i].resolved;
                            clear = data[i].closed;
                            pic1 = "icon12";
                            pic2 = "icon13";
                            pic3 = "icon14";
                            explain1 = "运行";
                            explain2 = "已解决";
                            explain3 = "已关闭";
                        }
                        html += '<div class="layout">\n' +
                            '         <div class="item">\n' +
                            '               <p><span>' + totalRecords + '</span>' + name + '</p>\n' +
                            '               <img src="images/index/icon-' + i + '.png"/>\n' +
                            '         </div>\n' +
                            '         <div class="item-1">\n' +
                            '              <ul>\n' +
                            '                  <li><img src="images/index/' + pic1 + '.png"/><p>' + critical + '</p><em>'+explain1+'</em></li>\n' +
                            '                  <li><img src="images/index/' + pic2 + '.png"/><p>' + warning + '</p><em>'+explain2+'</em></li>\n' +
                            '                  <li><img src="images/index/' + pic3 + '.png"/><p>' + clear + '</p><em>'+explain3+'</em></li>\n' +
                            '              </ul>\n' +
                            '         </div>\n' +
                            '     </div>';
                    }
                    $("#waring").empty().append(html)
                }
            }
        })
    },
    initModeAnaly() {
        $.getAjax(getCheckModeAnaly(), function (res) {
            if (res.code = 200 && res.code_desc == "success") {
                var data = res.data;
                var html = '',rankHtml='';
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
                        var percent = ((data[i].information.server).indexOf('0/') > -1 || (data[i].information.sql).indexOf('0/') > -1 || (data[i].information.middleware).indexOf('0/') > -1 || (data[i].information.internet).indexOf('0/') > -1)?"20%":"0%"
                        rankHtml += '<li>\n' +
                            '       <p>' + data[i].name + '</p>\n' +
                            '       <span><em style="width: '+percent+'"></em></span>\n' +
                            '       <p>'+percent+'</p>\n' +
                            '      </li>'
                    }
                    $("#table").empty().append(html);
                    $("#rankList ul").empty().append(rankHtml)
                }
            }
        })
    },
    initAlarms() {
        $.getAjax(listAlarms(), function (res) {
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
            }
        })
    },
});