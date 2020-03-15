var checkStartTime = "", checkEndTime = "";
$.extend({
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
    dateFormatFull(longTypeDate) {
        var dateType = "";
        var date = new Date();
        date.setTime(longTypeDate);
        dateType = date.getFullYear() + "-" + this.getFullPart(date.getMonth() + 1) + "-" + this.getFullPart(date.getDate());
        return dateType;
    },
    getFullPart(day) {
        return day < 10 ? "0" + day : day;
    },
    initTime(startDate, endDate) {
        var locale = {
            "format": 'YYYY-MM-DD',
            "separator": " ~ ",
            "applyLabel": "确定",
            "cancelLabel": "取消",
            "fromLabel": "起始时间",
            "toLabel": "结束时间'",
            "customRangeLabel": "自定义",
            "weekLabel": "W",
            "daysOfWeek": ["日", "一", "二", "三", "四", "五", "六"],
            "monthNames": ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
            "firstDay": 1
        };
        $('#demo').daterangepicker({
            'locale': locale,
            ranges: {
                '今日': [moment(), moment()],
                '昨日': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                '最近7日': [moment().subtract(6, 'days'), moment()],
                '最近30日': [moment().subtract(29, 'days'), moment()],
                '本月': [moment().startOf('month'), moment().endOf('month')],
                '上月': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
            },
            "alwaysShowCalendars": true,
            "startDate": startDate,
            "endDate": endDate,
            "opens": "right",
        }, function (start, end, label) {
            checkStartTime = new Date(start.format('YYYY/MM/DD')).getTime();
            checkEndTime = new Date(end.format('YYYY/MM/DD')).getTime();
        });
    },
    initPlan() {
        $.getAjax(getCheckPlan(), function (res) {
            if (res.code = 200 && res.code_desc == "success") {
                var data = res.data, checkPlan = "", cronExpression, time = "", day = "", startDate, endDate;
                if (data) {
                    for (var i in data) {
                        if (data[i].id == urlParams("id")) {
                            $("#objectName p").empty().append(data[i].name);
                            checkStartTime = $.dateFormatFull(data[i].checkStartTime);
                            checkEndTime = $.dateFormatFull(data[i].checkEndTime);
                            if (data[i].checkPlan != null && data[i].checkPlan != '') {
                                checkPlan = data[i].checkPlan.split(",")
                            }
                            for (var j in checkPlan) {
                                cronExpression = checkPlan[j];
                                if (cronExpression != "" && cronExpression != " ") {
                                    time = cronExpression.slice(0, cronExpression.indexOf("?"));
                                    day = cronExpression.slice(cronExpression.indexOf("?") + 2, cronExpression.lastIndexOf("*"));
                                    time = time.split(" ");
                                    day = day.split(" ");
                                    if (j == 0) {
                                        $("#day")[0].checked = true;
                                        $("#dayInput").val(data[i].email);
                                        $("#dayTime").val(time[2] + ':' + time[1] + ':' + time[0]);
                                    } else if (j == 1) {
                                        $("#week")[0].checked = true;
                                        $("#weekInput").val(data[i].email);
                                        $("#weekTime").val(time[2] + ':' + time[1] + ':' + time[0]);
                                        $(".radio").eq(Number(day[1]) - 1)[0].checked = true;
                                    } else if (j == 2) {
                                        $("#mount")[0].checked = true;
                                        $("#mountInput").val(data[i].email);
                                        $("#mountTime").val(time[2] + ':' + time[1] + ':' + time[0]);
                                        $("#mountDay").val(time[3]);
                                    }
                                }
                            }
                            $.initTime(new Date(checkStartTime), new Date(checkEndTime));
                        }
                    }
                }
            }
        })
    },
    savePlan() {
        if ($("#day")[0].checked == true || $("#week")[0].checked == true || $("#mount")[0].checked == true) {
            let list = [], checkPlans = '';
            if ($("#day")[0].checked == true) {
                var dayList = "", dayTime = "", checkboxTime = "1-7", dayCronExpression = "";
                dayTime = $("#dayTime").val();
                dayTime = dayTime.split(":");
                if (dayTime.length == 3) dayTime = dayTime;
                else {
                    dayTime.push("00")
                }
                if (dayTime.length > 2) {
                    dayCronExpression = '' + dayTime[2] + ' ' + dayTime[1] + ' ' + dayTime[0] + ' ? * ' + checkboxTime + ' *';
                } else {
                    dayCronExpression = " "
                }
                dayList = {
                    checkPlan: dayCronExpression,
                };
                list.push(dayList);
            } else {
                dayCronExpression = " ";
                dayList = {
                    checkPlan: dayCronExpression,
                };
                list.push(dayList);
            }
            if ($("#week")[0].checked == true) {
                var weekList = "", weekTime, radioTime, weekCronExpression;
                weekTime = $("#weekTime").val();
                weekTime = weekTime.split(":");
                if (weekTime.length == 3) weekTime = weekTime;
                else {
                    weekTime.push("00")
                }
                radioTime = $('[name="time"]:checked').val();
                if (weekTime.length > 2 && typeof radioTime != "undefined") {
                    weekCronExpression = '' + weekTime[2] + ' ' + weekTime[1] + ' ' + weekTime[0] + ' ? * ' + radioTime + ' *';
                } else {
                    weekCronExpression = " "
                }
                weekList = {
                    checkPlan: weekCronExpression,
                };
                list.push(weekList)
            } else {
                weekCronExpression = " ";
                weekList = {
                    checkPlan: weekCronExpression,
                };
                list.push(weekList);
            }
            if ($("#mount")[0].checked == true) {
                var mountList = "", mountTime, mountDay, mountCronExpression;
                mountTime = $("#mountTime").val();
                mountTime = mountTime.split(":");
                if (mountTime.length == 3) mountTime = mountTime;
                else {
                    mountTime.push("00")
                }
                mountDay = $("#mountDay").val();
                if (mountTime.length > 2 && mountDay != '') {
                    mountCronExpression = '' + mountTime[2] + ' ' + mountTime[1] + ' ' + mountTime[0] + ' ' + mountDay + ' * ? *';
                } else {
                    mountCronExpression = " "
                }
                mountList = {
                    checkPlan: mountCronExpression,
                };
                list.push(mountList)
            } else {
                mountCronExpression = " ";
                mountList = {
                    checkPlan: mountCronExpression,
                };
                list.push(mountList);
            }
            for (let i in list) {
                checkPlans += list[i].checkPlan + ",";
            }
            checkPlans = checkPlans.slice(0, checkPlans.length - 1);
            let data = {
                checkPlan: checkPlans,
                id: urlParams("id"),
                checkStartTime: new Date(checkStartTime).getTime(),
                checkEndTime: new Date(checkEndTime).getTime()
            };
            $.postAjax(updateCheckPlan(data), function (res) {
                if (res.code = 200 && res.code_desc == "success") {
                    alert("保存成功")
                } else alert("保存失败")
            })
        }
    },
});