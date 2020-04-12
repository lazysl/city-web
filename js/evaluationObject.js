new Vue({
    el: '#main',
    data: {
        isObjectInfoPop: false,
        objectName: "",
        objectEmail: "",
        objectNavList: [],   //考评菜单
        isAutoEvaluation: false,
        idList: [],   //考评菜单ID
        needIdList: [],   //需要的考评菜单ID
        objectList: [],   //考评对象
        isEdit: true,
        objectID: '',
        activeSubIndex: -1,
        activeThreeIndex: -1,
        activeFourIndex: -1,
        activeFiveIndex: -1,
        isDevicePop: false,
        objectDeviceList: [],   //考评对象设备
        deviceList: [],   //考评设备
        selectedDeviceList: [],   //选中考评设备
        deviceIndex: -1,   //设备索引
        checkedLeftDeviceDisName: '',
        checkedLeftDeviceName: '',
        checkedRightDeviceDisName: '',
        checkedRightDeviceName: '',
        selectedObjectIndex: -1,  //选择考评对象的索引
        deviceType: "",
        deviceId: "",
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
            let docHeight = window.innerHeight || document.documentElement.clientHeight;
            document.getElementById("content").children[0].style.height = (docHeight - 142) + "px";
            document.getElementById("ulHeight").style.maxHeight = (docHeight - 320) + "px"
        },
        urlParams(key) {
            var value = "";
            var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) value = unescape(r[2]);
            return value;
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
        /*展示二级目录*/
        showSub(index) {
            this.activeThreeIndex = -1;
            this.activeFourIndex = -1;
            this.activeFiveIndex = -1;
            this.activeSubIndex = this.activeSubIndex == index ? -1 : index;
        },
        /*展示三级目录*/
        showThree(index) {
            this.activeThreeIndex = this.activeThreeIndex == index ? -1 : index;
        },
        /*展示四级目录*/
        showFour(index, isLast, type, device) {
            if (isLast == 0 || (type != 0 && device && device.length > 0)) this.activeFourIndex = this.activeFourIndex == index ? -1 : index;
        },
        /*展示五级目录*/
        showFive(index, device) {
            if (device && device.length > 0) this.activeFiveIndex = this.activeFiveIndex == index ? -1 : index;
        },
        objectInfo(obj, index, id) {
            if (obj == 0) {
                this.isAutoEvaluation = false;
                this.isObjectInfoPop = !this.isObjectInfoPop;
                this.objectEmail = "";
                this.objectName = "";
                this.isAutoEvaluation = 0;
                this.needIdList = this.idList
            } else if (obj == 1) {
                this.isEdit = false;
                this.isObjectInfoPop = !this.isObjectInfoPop;
                this.objectEmail = this.objectList[index].email;
                this.objectName = this.objectList[index].name;
                this.isAutoEvaluation = this.objectList[index].automatic == 0 ? false : true;
                this.objectID = id;
                this.idList = JSON.parse(this.objectList[index].checkItems);
                if (this.idList == null || this.idList == "") this.idList = [];
                this.needIdList = JSON.parse(this.objectList[index].checkItems);
            }
        },
        autoEvaluation() {
            this.isAutoEvaluation = !this.isAutoEvaluation
        },
        checkButton(ID, index) {
            let id = document.getElementById(ID);
            if (id.className == 'checkbox item-check') {
                id.className = 'checkbox item-check checked';
                this.idList.push(ID);
            } else {
                id.className = 'checkbox item-check';
                for (let i in this.idList) {
                    if (this.idList[i] == ID) {
                        this.idList.splice(i, 1);
                    }
                }
            }
        },
        initInfo() {
            this.postAjax(this.getCheckInfo(), (res) => {
                if (res.code = 200 && res.code_desc == "success") {
                    this.objectList = res.data;
                } else if (res.code = 403) {
                    delCookie("user");
                    localStorage.clear();
                    window.location.href = "./login.html"
                } else alert(res.code_desc)
            })
        },
        objectMenu() {
            this.postAjax(this.getCheckMenu(), (res) => {
                if (res.code = 200 && res.code_desc == "success") {
                    this.objectNavList = res.data;
                    for (let i in res.data) {
                        this.idList.push(res.data[i].id)
                    }
                } else if (res.code = 403) {
                    delCookie("user");
                    localStorage.clear();
                    window.location.href = "./login.html"
                } else alert(res.code_desc)
            })
        },
        addObjectInfo() {
            let data = {
                "automatic": this.isAutoEvaluation ? 1 : 0,
                "email": this.objectEmail,
                "name": this.objectName,
                "checkItems": JSON.stringify(this.idList),
            };
            this.postAjax(this.addCheckInfo(data), (res) => {
                if (res.code == 200 || res.code_desc == "success") {
                    this.initInfo()
                } else if (res.code = 403) {
                    delCookie("user");
                    localStorage.clear();
                    window.location.href = "./login.html"
                } else alert(res.code_desc)
            })
        },
        saveObjectInfo() {
            if (this.objectName != '') {
                this.isEdit = true;
                this.isObjectInfoPop = false;
                this.addObjectInfo();
            } else this.isObjectInfoPop = true;
        },
        changeObjectInfo() {
            this.isObjectInfoPop = false;
            let data = {
                "automatic": this.isAutoEvaluation ? 1 : 0,
                "email": this.objectEmail,
                "name": this.objectName,
                "checkItems": JSON.stringify(this.idList),
                "id": this.objectID,
            };
            this.postAjax(this.updateCheckInfo(data), (res) => {
                if (res.code == 200 && res.code_desc == "success") {
                    this.initInfo()
                } else if (res.code = 403) {
                    delCookie("user");
                    localStorage.clear();
                    window.location.href = "./login.html"
                } else alert(res.code_desc)
            })
        },
        delObjectInfo(id, index) {
            this.postAjax(this.deleteCheckInfo(id), (res) => {
                if (res.code == 200 && res.code_desc == "success") {
                    this.objectList.splice(index, 1);
                    this.initInfo()
                } else if (res.code = 403) {
                    delCookie("user");
                    localStorage.clear();
                    window.location.href = "./login.html"
                } else alert(res.code_desc)
            })
        },
        deviceInfo(obj, type, index, id) {
            this.isDevicePop = !this.isDevicePop;
            if (obj == 0) this.selectedDeviceList = [];
            else if (obj == 1) {
                this.selectedObjectIndex = index;
                this.deviceType = type;
                this.deviceId = id;
                this.deviceList = [];
                this.initDevice(type);
            }
        },
        initDevice(type) {
            this.postAjax(this.getCheckSqlList(type), (res) => {
                if (res.code = 200 && res.code_desc == "success") {
                    this.deviceList = res.data;
                } else if (res.code = 403) {
                    delCookie("user");
                    localStorage.clear();
                    window.location.href = "./login.html"
                } else alert(res.code_desc)
            })
        },
        checkLeftDevice(name, id, index) {
            this.checkedLeftDeviceDisName = name;
            this.checkedLeftDeviceName = id;
            this.deviceIndex = index;
        },
        checkRightDevice(name, id, index) {
            this.checkedRightDeviceDisName = name;
            this.checkedRightDeviceName = id;
            this.deviceIndex = index;
        },
        addDevice() {
            if (this.checkedLeftDeviceName != '') {
                let arrData = {name: this.checkedLeftDeviceName, displayName: this.checkedLeftDeviceDisName};
                this.selectedDeviceList.push(arrData);
                this.deviceList.splice(this.deviceIndex, 1);
                this.checkedLeftDeviceName = "";
                this.checkedLeftDeviceDisName = ""
            }
        },
        delDevice() {
            if (this.checkedRightDeviceDisName != '') {
                let arrData = {name: this.checkedRightDeviceName, displayName: this.checkedRightDeviceDisName};
                this.deviceList.push(arrData);
                this.selectedDeviceList.splice(this.deviceIndex, 1);
                this.checkedRightDeviceName = "";
                this.checkedRightDeviceDisName = ""
            }
        },
        addObjectDevice(deviceData) {
            let names = "", displayNames = "";
            for (let i in deviceData) {
                names += deviceData[i].name + ",";
                displayNames += deviceData[i].displayName + ","
            }
            names = names.slice(0, names.length - 1);
            displayNames = displayNames.slice(0, displayNames.length - 1);
            let data = {
                "displayName": names,
                "name": displayNames,
                "parentId": this.deviceId,
                "type": this.deviceType,
            };
            this.postAjax(this.addCheckDevice(data), (res) => {
                if (res.code == 200 || res.code_desc == "success") {
                    this.initInfo()
                } else alert(res.code_desc);
            })
        },
        submitDevice() {
            if (this.selectedDeviceList.length > 0) {
                let data = this.objectList[this.selectedObjectIndex].deviceList[this.deviceType], arrData = [];
                for (let i in this.selectedDeviceList) {
                    for (let k in data) {
                        if (data[k].name == this.selectedDeviceList[i].name) arrData.push(data[k].name)
                    }
                }
                if (this.deviceType == 6 || this.deviceType == 7) {
                    if (arrData.length > 0) {
                        alert("请勿添加重复数据");
                    } else {
                        if (data.length > 1) alert("该设备只能添加一条数据");
                        else {
                            this.addObjectDevice(this.selectedDeviceList);
                            this.isDevicePop = false;
                        }
                    }
                } else {
                    if (arrData.length > 0) {
                        alert("请勿添加重复数据");
                    } else {
                        this.addObjectDevice(this.selectedDeviceList);
                        this.isDevicePop = false;
                    }
                }
            }
        },
        startEvaluation(id) {
            this.postAjax(this.startCheck(id), (res) => {
                if (res.code == 200 || res.code_desc == "success") {
                    alert("考评成功");
                    this.initInfo()
                } else if (res.code = 403) {
                    delCookie("user");
                    localStorage.clear();
                    window.location.href = "./login.html"
                } else alert(res.code_desc)
            })
        },
    },
    mounted() {
        this.$nextTick(() => {
            this.docHeight()
        });
        this.objectMenu();
        this.initInfo();
    },
});