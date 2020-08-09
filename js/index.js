let circleRange = 0;
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
            if (res.code == 200 && res.code_desc == "success") {
                var data = res.data;
                var html = '', name, type, pic1 = "icon9", pic2 = "icon10", pic3 = "icon11", explain1 = "严重",
                    explain2 = "故障", explain3 = "正常";
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
                            explain1 = "打开";
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
            } else if (res.code == 403) {
                delCookie("user");
                localStorage.clear();
                window.location.href = "./login.html"
            } else alert(res.code_desc)
        })
    },
    initModeAnaly() {
        $.postAjax(getCheckModeAnaly(), function (res) {
            if (res.code == 200 && res.code_desc == "success") {
                var data = res.data;
                var html = '', rankHtml = '';
                var score = 0;
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
                            '       <span><em style="width: ' + score + '%"></em></span>\n' +
                            '       <p>' + score + '</p>\n' +
                            '      </li>'
                    }
                    $("#table").empty().append(html);
                    //$("#rankList ul").empty().append(rankHtml);
                }
            } else if (res.code == 403) {
                delCookie("user");
                localStorage.clear();
                window.location.href = "./login.html"
            } else alert(res.code_desc)
        })
    },
    initKpScore() {
        $.postAjax(getKpScoreURL(), function (res) {
            if (res.code == 200 && res.code_desc == "success") {
                var data = res.data;
                var html = '';
                var score = 0;

                if (data) {
                    //按考评得分降序排序
                    data.sort(checkScoreDesc);
                    for (var i in data) {
                        score = data[i].score < 100 ? data[i].score : 100;
                        score = score > 0 ? score : 0;
                        console.log(score);
                        html += '<li>\n' +
                            '       <p>' + data[i].name + '</p>\n' +
                            '       <span><em style="width: ' + score + '%"></em></span>\n' +
                            '       <p>' + score + '</p>\n' +
                            '      </li>';

                    }

                    $("#rankList ul").empty().append(html);
                }
            } else if (res.code == 403) {
                delCookie("user");
                localStorage.clear();
                window.location.href = "./login.html";
            } else alert(res.code_desc);
        });
    },
    initAlarms() {
        $.postAjax(listAlarms(), function (res) {
            if (res.code == 200 && res.code_desc == "success") {
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
            } else if (res.code == 403) {
                delCookie("user");
                localStorage.clear();
                window.location.href = "./login.html"
            } else alert(res.code_desc)
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
            if (res.code == 200 && res.code_desc == "success") {
                $(".tcHide").show();
                var data = res.data;
                if (data) {
                    if (data.length > 0) {
                        for (var i in data) {
                            if (type == 5) {
                                if (data[i].STATUS == "Resolved") {
                                    explain = "已解决";
                                    color = "resolved";
                                } else if (data[i].STATUS == "Open") {
                                    explain = "打开";
                                    color = "open";
                                } else if (data[i].STATUS == "Closed") {
                                    explain = "已关闭";
                                    color = "closed";
                                } else if (data[i].STATUS == "Onhold") {
                                    explain = "已搁置";
                                    color = "onhold";
                                } else {
                                    explain = "--";
                                }
                                html += '<li><span>' + data[i].SUBJECT + '</span><span>' + data[i].CREATEDBY + '</span><span class="' + color + '">' + explain + '</span></li>'
                            } else {
                                if (data[i].status == "Critical" || data[i].status == "critical") {
                                    explain = "严重";
                                    color = "critical";
                                } else if (data[i].status == "Warning" || data[i].status == "warning") {
                                    explain = "故障";
                                    color = "warning";
                                } else if (data[i].status == "Clear" || data[i].status == "clear") {
                                    explain = "正常";
                                    color = "clear";
                                } else if (data[i].status == "Unknown" || data[i].status == "unknown") {
                                    explain = "未知";
                                    color = "critical";
                                } else {
                                    explain = "--";
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
            } else if (res.code == 403) {
                delCookie("user");
                localStorage.clear();
                window.location.href = "./login.html"
            } else alert(res.code_desc)
        })
    },

    //获取物联网设备信息
    getIotDeviceInfo() {
        $.postAjax(getIotInfoUrl(), function (res) {
            if (res && res.code == 200) {
                var datas = res.data;
                var html = "";
                var totalCount = 0;
                var totalOnline = 0;
                for (var i in datas) {
                    var onlineRate = 0;
                    if (datas[i].count > 0 && datas[i].normal) {
                        totalCount += datas[i].count;
                        totalOnline += datas[i].normal;
                        onlineRate = Math.round(datas[i].normal / datas[i].count * 100); //计算在线率，四舍五入取整
                    }
                    html += "<li>\
                                <p>" + datas[i].type + "</p>\
                                <span title=\"在线：" + datas[i].normal + " 总数：" + datas[i].count + "\"><em style=\"width: " + onlineRate + "%;\"></em></span>\
                                <p>" + onlineRate + "%</p>\
                            </li>";
                }
                circleRange = Number(((totalCount - totalOnline) / totalOnline * 100).toFixed(2));
                $("#txtIotDeviceTotal").html(totalCount);
                $("#txtIotOnlineOffline").html("在线/离线：<em>" + totalOnline + "</em>/" + (totalCount - totalOnline));
                $("#listIotDevice").html(html);
                $.initCircle(circleRange)
            }

        });
    },
    initCircle(circleRange) {
        let canvas = document.getElementById("circle");
        let ctx = canvas.getContext("2d");
        let oRange = circleRange;
        let M = Math;
        let Sin = M.sin;
        let Cos = M.cos;
        let Sqrt = M.sqrt;
        let Pow = M.pow;
        let PI = M.PI;
        let Round = M.round;
        let oW = canvas.width = 260;
        let oH = canvas.height = 260;
        let lineWidth = 1; // 线宽
        let r = (oW / 2); // 大半径
        let cR = r - 10 * lineWidth;
        ctx.beginPath();
        ctx.lineWidth = lineWidth;

        // 水波动画初始参数
        let axisLength = 2 * r - 16 * lineWidth;// Sin 图形长度
        let unit = axisLength / 9; // 波浪宽
        let range = .4; // 浪幅
        let nowrange = range;
        let xoffset = 8 * lineWidth; // x 轴偏移量
        let data = oRange / 100; // 数据量
        let sp = 0; // 周期偏移量
        let nowdata = 0;
        let waveupsp = 0.006;// 水波上涨速度

        // 圆动画初始参数
        let arcStack = []; // 圆栈
        let bR = r - 8 * lineWidth;
        let soffset = -(PI / 2); // 圆动画起始位置
        let circleLock = true; // 起始动画锁

        // 获取圆动画轨迹点集
        for (var i = soffset; i < soffset + 2 * PI; i += 1 / (8 * PI)) {
            arcStack.push([
                r + bR * Cos(i),
                r + bR * Sin(i)
            ])
        }
        // 圆起始点
        let cStartPoint = arcStack.shift();
        ctx.strokeStyle = "#fd6123";
        ctx.moveTo(cStartPoint[0], cStartPoint[1]);
        // 开始渲染
        render();

        function drawSine() {
            ctx.beginPath();
            ctx.save();
            var Stack = []; // 记录起始点和终点坐标
            for (var i = xoffset; i <= xoffset + axisLength; i += 20 / axisLength) {
                var x = sp + (xoffset + i) / unit;
                var y = Sin(x) * nowrange;
                var dx = i;
                var dy = 2 * cR * (1 - nowdata) + (r - cR) - (unit * y);
                ctx.lineTo(dx, dy);
                Stack.push([dx, dy])
            }
            // 获取初始点和结束点
            var startP = Stack[0]
            var endP = Stack[Stack.length - 1]
            ctx.lineTo(xoffset + axisLength, oW);
            ctx.lineTo(xoffset, oW);
            ctx.lineTo(startP[0], startP[1])
            var my_gradient = ctx.createLinearGradient(0, 0, 0, 250);
            my_gradient.addColorStop(0, "#fbc5af");
            my_gradient.addColorStop(1, "#fd6123");
            ctx.fillStyle = my_gradient;
            ctx.fill();
            ctx.restore();
        }

        /*文案*/
        function drawText() {
            ctx.globalCompositeOperation = 'source-over';
            var size = 0.4 * cR;
            ctx.font = 'bold ' + size + 'px Microsoft Yahei';
            let txt = (nowdata.toFixed(2) * 100).toFixed(0) + '%';
            var fonty = r + size / 2;
            var fontx = r - size * 0.8;
            ctx.fillStyle = "#fd6123";
            ctx.textAlign = 'center';
            ctx.fillText(txt, r + 5, r + 20)
        }

        //底圈
        function grayCircle() {
            ctx.beginPath();
            ctx.lineWidth = 5;
            ctx.strokeStyle = '#fd6123';
            ctx.arc(r, r, cR - 5, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.restore();
            ctx.beginPath();
        }

        //中间水圈
        function clipCircle() {
            ctx.beginPath();
            ctx.arc(r, r, cR - 4, 0, 2 * Math.PI, false);
            ctx.clip();
        }

        //渲染canvas
        function render() {
            ctx.clearRect(0, 0, oW, oH);
            //最外面圈
            // drawCircle();
            //底圈
            grayCircle();
            //进度圈
            //orangeCircle();
            //中间水圈
            clipCircle();
            // 控制波幅
            if (data >= 0.85) {
                if (nowrange > range / 4) {
                    var t = range * 0.01;
                    nowrange -= t;
                }
            } else if (data <= 0.1) {
                if (nowrange < range * 1.5) {
                    var t = range * 0.01;
                    nowrange += t;
                }
            } else {
                if (nowrange <= range) {
                    var t = range * 0.01;
                    nowrange += t;
                }
                if (nowrange >= range) {
                    var t = range * 0.01;
                    nowrange -= t;
                }
            }
            if ((data - nowdata) > 0) {
                nowdata += waveupsp;
            }
            if ((data - nowdata) < 0) {
                nowdata -= waveupsp
            }
            sp += 0.2;
            // 开始水波动画
            drawSine();
            // 写字
            drawText();
            requestAnimationFrame(render)
        }
    },
});

//考评得分降序排序
var checkScoreDesc = function (x, y) {
    return (x["score"] < y["score"]) ? 1 : -1
};