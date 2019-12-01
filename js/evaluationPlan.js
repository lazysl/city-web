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
    initPlan() {
        $.getAjax(getCheckPlan(), function (res) {
            if (res.code = 200 && res.code_desc == "success") {
                var data = res.data;
                var time="",day="";
                if (data) {
                    for (var i in data) {
                        if (data[i].type) {
                            var type = data[i].type;
                            var cronExpression = data[i].cronExpression;
                            time = cronExpression.slice(0, cronExpression.indexOf("?"));
                            day = cronExpression.slice(cronExpression.indexOf("?")+2, cronExpression.lastIndexOf("*"));
                            time = time.split(" ");
                            day = day.split(" ");
                            if(time[2]<10) time[2]="0"+time[2];
                            if(time[1]<10) time[1]="0"+time[1];
                            if(time[0]<10) time[0]="0"+time[0];
                            if (type == 1) {
                                $("#day")[0].checked = true;
                                $("#dayInput").val(data[i].email);
                                $("#dayTime").val(time[2] + ':' + time[1] + ':' + time[0]);
                                if (day[1]=="1-7"){
                                    $("#Saturday")[0].checked = true;
                                    $("#Sunday")[0].checked = true;
                                }else if(day[1]=="1-6"){
                                    $("#Sunday")[0].checked = true;
                                }else if(day[1]=="2-7"){
                                    $("#Saturday")[0].checked = true;
                                }
                            }else if (type == 2) {
                                $("#week")[0].checked = true;
                                $("#weekInput").val(data[i].email);
                                $("#weekTime").val(time[2] + ':' + time[1] + ':' + time[0]);
                                $(".radio").eq(Number(day[1])-1)[0].checked = true;
                            }else if (type == 3) {
                                $("#mount")[0].checked = true;
                                $("#mountInput").val(data[i].email);
                                $("#mountTime").val(time[2] + ':' + time[1] + ':' + time[0]);
                                $("#mountDay").val(time[3]);
                            }
                        }
                    }
                }
            }
        })
    },
    savePlan() {
        if ($("#day")[0].checked == true || $("#week")[0].checked == true || $("#mount")[0].checked == true) {
            let list=[];
            if ($("#day")[0].checked == true) {
                var dayList = "", dayTime, checkboxTime, dayInput, dayCronExpression;
                dayTime = $("#dayTime").val();
                dayTime = dayTime.split(":");
                if (dayTime.length == 3) dayTime = dayTime;
                else {
                    dayTime.push("00")
                }
                if ($("#Saturday")[0].checked == true && $("#Sunday")[0].checked == true) checkboxTime = "1-7";
                else if ($("#Saturday")[0].checked == true) checkboxTime = "2-7";
                else if ($("#Sunday")[0].checked == true) checkboxTime = "1-6";
                dayInput = $("#dayInput").val();
                dayCronExpression = '' + dayTime[2] + ' ' + dayTime[1] + ' ' + dayTime[0] + ' ? * ' + checkboxTime + ' *';
                dayList = {
                    type: 1,
                    cronExpression: dayCronExpression,
                    email: dayInput
                };
                list.push(dayList);
            }
            if ($("#week")[0].checked == true) {
                var weekList = "", weekTime, radioTime, weekInput, weekCronExpression;
                weekTime = $("#weekTime").val();
                weekTime = weekTime.split(":");
                if (weekTime.length == 3) weekTime = weekTime;
                else {
                    weekTime.push("00")
                }
                radioTime = $('[name="time"]:checked').val();
                weekInput = $("#weekInput").val();
                weekCronExpression = '' + weekTime[2] + ' ' + weekTime[1] + ' ' + weekTime[0] + ' ? * ' + radioTime + ' *';
                weekList = {
                    type: 2,
                    cronExpression: weekCronExpression,
                    email: weekInput
                };
                list.push(weekList)
            }
            if ($("#mount")[0].checked == true) {
                var mountList = "", mountTime, mountInput, mountDay, mountCronExpression;
                mountTime = $("#mountTime").val();
                mountTime = mountTime.split(":");
                if (mountTime.length == 3) mountTime = mountTime;
                else {
                    mountTime.push("00")
                }
                mountDay = $("#mountDay").val();
                mountInput = $("#mountInput").val();
                mountCronExpression = '' + mountTime[2] + ' ' + mountTime[1] + ' ' + mountTime[0] + ' ' + mountDay + ' * ? *';
                mountList = {
                    type: 3,
                    cronExpression: mountCronExpression,
                    email: mountInput
                };
                list.push(mountList)
            }
            $.postAjax(updateCheckPlan(list), function (res) {
                if (res.code = 200 && res.code_desc == "success") {
                    alert("保存成功")
                }else alert("保存失败")
            })
        }
    }
});