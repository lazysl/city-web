new Vue({
    el: '#main',
    data: {
        planList: "",
        weekList: ["周日", "周二", "周三", "周四", "周五", "周六", "周一",]
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
            var docHeight = window.innerHeight || document.documentElement.clientHeight;
            document.getElementById("content").children[0].style.height = (docHeight - 142) + "px";
            document.getElementById("table").style.maxHeight = (docHeight - 205) + "px"
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
        cronExpression(data) {
            let time = "", day = "", txt = "", txtDay = "", txtWeek = "", txtMount = "";
            if (data == null || data == "") txt = "--";
            else {
                data = data.split(",");
                for (let i in data) {
                    time = data[i].slice(0, data[i].indexOf("?"));
                    day = data[i].slice(data[i].indexOf("?") + 2, data[i].lastIndexOf("*"));
                    time = time.split(" ");
                    day = day.split(" ");
                    if (i == 0) {
                        if (data[i] == "" || data == null || data == " ") txtDay = "";
                        else txtDay = "每日" + time[2] + ":" + time[1] + ":" + time[0]
                    } else if (i == 1) {
                        if (data[i] == "" || data == null || data == " ") txtWeek = "";
                        else txtWeek = "每" + this.weekList[day[1] - 1] + time[2] + ":" + time[1] + ":" + time[0]
                    } else if (i == 2) {
                        if (data[i] == "" || data == null || data == " ") txtMount = "";
                        else txtMount = "每月" + time[3] + "日" + time[2] + ":" + time[1] + ":" + time[0]
                    }
                    txt = txtDay + "，" + txtWeek + "，" + txtMount;
                    txt = txt.slice(0, txt.length - 1)
                }
            }
            return txt
        },
        initPlan() {
            this.getAjax(this.getCheckPlan_v(), (res) => {
                if (res.code = 200 && res.code_desc == "success") {
                    this.planList = res.data;
                }else if (res.code = 403){
                    delCookie("user");
                    localStorage.clear();
                    window.location.href = "./login.html"
                }else alert(res.code_desc)
            })
        },

    },
    mounted() {
        this.$nextTick(() => {
            this.docHeight()
        });
        this.initPlan();
    },
})