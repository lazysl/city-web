/*获取机房动力环境信息*/
Vue.prototype.getEnvDataParam = function () {
    return {
        url: setting.beiHang_url + "/api/json/device/getAssociatedMonitors?apiKey="+setting.apiKey + "&name=" + setting.envDeviceName
    }
};

new Vue({
    el: '#main',
    data: {
		multiFuncSensors: "",
		leakSensor: "正常",
		pdu1: "",
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
            dateType = date.getFullYear() + "-" + this.getFullPart(date.getMonth() + 1) + "-" + this.getFullPart(date.getDate()) + " " + this.getFullPart(date.getHours()) + ":" + this.getFullPart(date.getMinutes());
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
            this.postAjax(this.getEnvDetailParam(), (res) => {
                if (res.code = 200 && res.code_desc == "success") {
                    this.planList = res.data;
                }else if (res.code = 403){
                    delCookie("user");
                    localStorage.clear();
                    window.location.href = "./login.html"
                }else alert(res.code_desc)
            })
        },
		
		initEnvData() {
			this.multiFuncSensors = [
				{"id": 1, "name": "多功能传感器1","temp": 25, "humd": 35, "smoke": "正常"},
				{"id": 2, "name": "多功能传感器2","temp": 27, "humd": 36, "smoke": "正常"},
				{"id": 3, "name": "多功能传感器UPS室","temp": 29, "humd": 75, "smoke": "正常"}
			];
			
			this.pdu1 = [
				{"name":"电压", "unit":"V", "L1":224, "L2":225, "L3":223},
				{"name":"电流", "unit":"A", "L1":9, "L2":6, "L3":5},
				{"name":"有功功率", "unit":"W", "L1":1134, "L2":1326, "L3":1286},
				{"name":"视在功率", "unit":"VA", "L1":1650, "L2":1500, "L3":1700},
				{"name":"无功功率", "unit":"var", "L1":1000, "L2":1100, "L3":1200}
			];
			// this.getAjax(this.getEnvDataParam(), (data) => {
				// if (data && data.performanceMonitors && data.performanceMonitors.monitors) {
					// var monitors = data.performanceMonitors.monitors;
					// for (var i in monitors) {
						// switch (monitors[i].name) {
							// case "HwIDCSensor1Temp":
								// if (monitors[i].data && monitors[i].data[0] && monitors[i].data[0].value)
									// multiFuncSensors[0].temp = monitors[i].data[0].value;
								// break;
							
							
						// }
					// }
				// }
			// });
			
			//console.log(this.envData);
			//this.multiFuncSensors = sensors;
		},

    },
    mounted() {
        this.$nextTick(() => {
            this.docHeight()
        });
        //this.initPlan();
		this.initEnvData();
    },
})