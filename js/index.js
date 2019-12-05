$.extend({
    jsonAjax(options, callbackSuc, callbackErr) {
        options = $.extend(options, {"_r": Math.random()});
        $.ajax({
            type: options.ajaxtype,
            url: options.url,
            async: true,
            data: options,
            dataType: "json",
            headers: {'token': ''},
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
    initWaring(){
        $.getAjax(getWaring(),function (res) {
            if (res.code = 200 && res.code_desc == "success") {
                var data = res.data;
                var html='';
                if (data) {
                    for (var i in data) {
                        var totalRecords = data[i].totalRecords ? data[i].totalRecords : "--";
                        var clear = data[i].clear/* ? data[i].clear : "--"*/;
                        var critical = data[i].critical/* ? data[i].critical : "--"*/;
                        var warning = data[i].warning/* ? data[i].warning : "--"*/;
                        var name;
                        if (i == 'middleware') name = '中间件';
                        else if (i == 'server') name = '服务器';
                        else if (i == 'sql') name = '数据库';
                        html += '<div class="layout">\n' +
                            '         <div class="item">\n' +
                            '               <p><span>' + (clear + critical + warning) + '</span>' + name + '</p>\n' +
                            '               <img src="images/index/icon-' + i + '.png"/>\n' +
                            '         </div>\n' +
                            '         <div class="item-1">\n' +
                            '              <ul>\n' +
                            '                  <li><img src="images/index/icon9.png"/><p>' + critical + '</p></li>\n' +
                            '                  <li><img src="images/index/icon10.png"/><p>' + warning + '</p></li>\n' +
                            '                  <li><img src="images/index/icon11.png"/><p>' + clear + '</p></li>\n' +
                            '              </ul>\n' +
                            '         </div>\n' +
                            '     </div>';
                    }
                    html = html + '<div class="layout">\n' +
                        '                    <div class="item">\n' +
                        '                        <p><span>153</span>工单</p>\n' +
                        '                        <img src="images/index/icon4.png"/>\n' +
                        '                    </div>\n' +
                        '                    <div class="item-1">\n' +
                        '                        <ul>\n' +
                        '                            <li><img src="images/index/icon12.png"/><p>10</p></li>\n' +
                        '                            <li><img src="images/index/icon13.png"/><p>3</p></li>\n' +
                        '                            <li><img src="images/index/icon14.png"/><p>140</p></li>\n' +
                        '                        </ul>\n' +
                        '                    </div>\n' +
                        '                </div>'
                    $("#waring").append(html)
                }
            }
        })
    },
    initModeAnaly() {
        $.getAjax(getCheckModeAnaly(), function (res) {
            if (res.code = 200 && res.code_desc == "success") {
                var data = res.data;
                var html = '';
                if (data) {
                    for (var i in data) {
                        if (data[i].information != {} && data[i].information.server && data[i].information.sql && data[i].information.middleware && data[i].information.internet) {
                            var serverStyle = (data[i].information.server).indexOf('0/') > -1 ? 'green' : 'red';
                            var sqlStyle = (data[i].information.sql).indexOf('0/') > -1 ? 'green' : 'red';
                            var middlewareStyle = (data[i].information.middleware).indexOf('0/') > -1 ? 'green' : 'red';
                            var internetStyle = (data[i].information.internet).indexOf('0/') > -1 ? 'green' : 'red';
                            html += '<tr>\n' +
                                '       <td>' + data[i].name + '</td>\n' +
                                '       <td><span class="' + serverStyle + '"></span>' + data[i].information.server + '</td>\n' +
                                '       <td><span class="' + sqlStyle + '"></span>' + data[i].information.sql + '</td>\n' +
                                '       <td><span class="' + middlewareStyle + '"></span>' + data[i].information.middleware + '</td>\n' +
                                '       <td><span class="' + internetStyle + '"></span>' + data[i].information.internet + '</td>\n' +
                                '     </tr>'
                        }
                    }
                    $("#table").empty().append(html)
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
                        if (data[i].severity.indexOf("服务停止") > -1) severity = "red";
                        else if (data[i].severity.indexOf("危急") > -1) severity = "orange";
                        else severity = "green";
                        html += '<tr>\n' +
                            '        <td>' + (Number(i) + 1) + '</td>\n' +
                            '        <td>' + data[i].modTime + '</td>\n' +
                            '        <td><span class="' + severity + '"></span>' + data[i].message + '</td>\n' +
                            '     </tr>'
                    }
                    $("#alarms").empty().append(html)
                }
            }
        })
    },
});