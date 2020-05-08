new Vue({
    el: '#main',
    data: {
        reportList: "",
        objectNavList: '',
        idList: [],
        needIdList: '',
        isReportPop: false,
        isTime: false,
        timeTxt: "当天",
        timeData: [
            {name: "当天", id: "0"},
            {name: "最近1天", id: "1"},
            {name: "最近7天", id: "7"},
            {name: "最近30天", id: "30"},
        ],
        timeList: new Date().getTime(),
        objectList: "",
        objectIdList: [],
        objectNeedIdList: '',
        isEdit: true,
        objectName: "",
        objectID: ""
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
        urlParams(key) {
            var value = "";
            var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) value = unescape(r[2]);
            return value;
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
            dateType = date.getFullYear() + "-" + this.getFullPart(date.getMonth() + 1) + "-" + this.getFullPart(date.getDate()) + " " + this.getFullPart(date.getHours()) + ":" + this.getFullPart(date.getMinutes());
            return dateType;
        },
        getFullPart(day) {
            return day < 10 ? "0" + day : day;
        },
        /*获取最近1天*/
        getLast1Day() {
            let curDate = new Date();
            return new Date(curDate.getTime() - 24 * 60 * 60 * 1000)
        },
        /*获取最近7天*/
        getLast1Week(days) {
            var now = new Date();
            var milliseconds = now.getTime() + 1000 * 60 * 60 * 24 * days;
            now.setTime(milliseconds);
            var year = now.getFullYear();
            var month = now.getMonth() + 1;
            var day = now.getDate();
            if (parseInt(month) < 10) {
                month = "0" + month;
            }
            if (parseInt(day) < 10) {
                day = "0" + day;
            }
            return year + "-" + month + "-" + day;
        },
        /*获取最近30天*/
        getLast1Month() {
            let now = new Date();
            let year = now.getFullYear();
            let month = now.getMonth() + 1;//0-11表示1-12月
            let day = now.getDate();
            let dateObj = {};
            if (parseInt(month) < 10) {
                month = "0" + month;
            }
            if (parseInt(day) < 10) {
                day = "0" + day;
            }

            dateObj.endTime = year + '-' + month + '-' + day;

            if (parseInt(month) == 1) {//如果是1月份，则取上一年的10月份
                dateObj.beginTime = (parseInt(year) - 1) + '-12-' + day;
                return dateObj;
            }

            var preSize = new Date(year, parseInt(month) - 1, 0).getDate();//开始时间所在月的总天数
            if (preSize < parseInt(day)) {
                // 开始时间所在月的总天数<本月总天数，比如当前是5月30日，在2月中没有30，则取下个月的第一天(3月1日)为开始时间
                let resultMonth = parseInt(month) < 10 ? ('0' + parseInt(month)) : (parseInt(month));
                dateObj.beginTime = year + '-' + resultMonth + '-01';
                return dateObj;
            }

            if (parseInt(month) <= 10) {
                dateObj.beginTime = year + '-0' + (parseInt(month) - 1) + '-' + day;
                return dateObj;
            } else {
                dateObj.beginTime = year + '-' + (parseInt(month) - 1) + '-' + day;
                return dateObj;
            }
        },
        selectTime() {
            this.isTime = !this.isTime
        },
        selectTimeType(obj) {
            this.timeTxt = obj.name;
            this.isTime = false;
            if (obj.id == 0) this.timeList = new Date().getTime();
            else if (obj.id == 1) this.timeList = this.getLast1Day().getTime() + "/" + new Date().getTime();
            else if (obj.id == 7) this.timeList = new Date(this.getLast1Week(-6)).getTime() + "/" + new Date().getTime();
            else if (obj.id == 30) this.timeList = new Date(this.getLast1Month().beginTime).getTime() + "/" + new Date(this.getLast1Month().endTime).getTime();
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
        initInfo() {
            this.postAjax(this.getCheckInfo(), (res) => {
                if (res.code == 200 && res.code_desc == "success") {
                    this.objectList = res.data;
                    for (let i in res.data) {
                        this.objectIdList.push(res.data[i].id)
                    }
                } else if (res.code == 403) {
                    delCookie("user");
                    localStorage.clear();
                    window.location.href = "./login.html"
                } else alert(res.code_desc)
            })
        },
        initReport() {
            this.postAjax(this.getCheckReport(), (res) => {
                if (res.code == 200 && res.code_desc == "success") {
                    this.reportList = res.data;
                } else if (res.code == 403) {
                    delCookie("user");
                    localStorage.clear();
                    window.location.href = "./login.html"
                } else alert(res.code_desc)
            })
        },
        objectMenu() {
            this.postAjax(this.getCheckMenu(), (res) => {
                if (res.code == 200 && res.code_desc == "success") {
                    this.objectNavList = res.data;
                    for (let i in res.data) {
                        this.idList.push(res.data[i].id)
                    }
                } else if (res.code == 403) {
                    delCookie("user");
                    localStorage.clear();
                    window.location.href = "./login.html"
                } else alert(res.code_desc)
            })
        },
        checkButton(ID, type) {
            if (type == 0) {
                let id = document.getElementById(ID);
                if (id.className == 'checkbox item-check') {
                    id.className = 'checkbox item-check checked';
                    this.idList.push(ID);
                } else if (id.className == 'checkbox item-check checked') {
                    id.className = 'checkbox item-check';
                    for (let i in this.idList) {
                        if (this.idList[i] == ID) {
                            this.idList.splice(i, 1);
                        }
                    }
                }
            } else if (type == 1) {
                let id = document.getElementById("_"+ID);
                if (id.className == 'checkbox itemCheck') {
                    id.className = 'checkbox itemCheck checked';
                    this.objectIdList.push(ID);
                } else if (id.className == 'checkbox itemCheck checked') {
                    id.className = 'checkbox itemCheck';
                    for (let i in this.objectIdList) {
                        if (this.objectIdList[i] == ID) {
                            this.objectIdList.splice(i, 1);
                        }
                    }
                }
            }
        },
        reportInfo(obj, index, id) {
            if (obj == 0) {
                this.isReportPop = !this.isReportPop;
                this.needIdList = this.idList;
                this.objectNeedIdList = this.objectIdList;
            } else if (obj == 1) {
                this.isEdit = false;
                this.objectID = id;
                this.isReportPop = !this.isReportPop;
                this.objectName = this.reportList[index].name;

                let checkTime, days, time;
                checkTime = this.reportList[index].checkTime.split("/");
                days = checkTime[1] - checkTime[0];
                time = parseInt(days / (1000 * 60 * 60 * 24));
                if (time == NaN) this.timeTxt = "当天";
                else if (time == 1) this.timeTxt = "最近1天";
                else if (time == 6) this.timeTxt = "最近7天";
                else if (time >= 27) this.timeTxt = "最近30天";
                this.timeList = this.reportList[index].checkTime;

                this.idList = this.reportList[index].checkItems.split(",").map(Number);
                if (this.idList == null || this.idList == "") this.idList = [];
                this.needIdList = this.reportList[index].checkItems.split(",").map(Number);
                if (this.needIdList == null || this.needIdList == "") this.needIdList = [];

                this.objectIdList = JSON.parse(this.reportList[index].checkObjectIdList);
                if (this.objectIdList == null || this.objectIdList == "") this.objectIdList = [];
                this.objectNeedIdList = JSON.parse(this.reportList[index].checkObjectIdList);
                if (this.objectNeedIdList == null || this.needIdList == "") this.objectNeedIdList = [];
            }
        },
        addReportInfo() {
            let data = {
                "name": this.objectName,
                "checkItems": this.idList.join(","),
                "checkObjectIdList": this.objectIdList.join(","),
                "checkTime": this.timeList
            };
            this.postAjax(this.addCheckReport(data), (res) => {
                if (res.code == 200 || res.code_desc == "success") {
                    this.initReport()
                } else if (res.code == 403) {
                    delCookie("user");
                    localStorage.clear();
                    window.location.href = "./login.html"
                } else alert(res.code_desc)
            })
        },
        changeReportInfo() {
            this.isReportPop = false;
            let data = {
                "name": this.objectName,
                "checkItems": this.idList.join(","),
                "checkObjectIdList": this.objectIdList.join(","),
                "checkTime": this.timeList,
                "id": this.objectID,
            };
            this.postAjax(this.updateReportList(data), (res) => {
                if (res.code == 200 && res.code_desc == "success") {
                    this.initReport()
                } else if (res.code == 403) {
                    delCookie("user");
                    localStorage.clear();
                    window.location.href = "./login.html"
                } else alert(res.code_desc)
            })
        },
        saveReportInfo() {
            if (this.objectName != '') {
                this.isEdit = true;
                this.isReportPop = false;
                this.addReportInfo();
            } else this.isReportPop = true;
        },
        delReportInfo(id, index) {
            this.postAjax(this.deleteReportList(id), (res) => {
                if (res.code == 200 && res.code_desc == "success") {
                    this.initReport()
                } else if (res.code == 403) {
                    delCookie("user");
                    localStorage.clear();
                    window.location.href = "./login.html"
                } else alert(res.code_desc)
            })
        },
    },
    mounted() {
        this.docHeight();
        this.initReport();
        this.objectMenu();
        this.initInfo();
    },
});