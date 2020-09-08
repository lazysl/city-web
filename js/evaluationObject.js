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
        deviceIndex: -1,   //设备索引(Deprecated)
		deviceIndexLeft: -1, //左侧栏点选设备的索引，根据鼠标点击动态变化
		deviceIndexRight: -1,//右侧栏点选设备的索引，根据鼠标点击动态变化
        checkedLeftDeviceDisName: '',
        checkedLeftDeviceName: '',
        checkedRightDeviceDisName: '',
        checkedRightDeviceName: '',
        selectedObjectIndex: -1,  //选择考评对象的索引
        deviceType: "",  //设备类型（0:考评对象，1：服务器，2：数据库 3：中间件 6:URL业务监测 8:物联网设备 ）
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
                this.idList = this.objectList[index].checkItems.split(",").map(Number);
                if (this.idList == null || this.idList == "") this.idList = [];
                this.needIdList = this.objectList[index].checkItems.split(",").map(Number);
            }
        },
        autoEvaluation() {
            this.isAutoEvaluation = !this.isAutoEvaluation
        },
        checkButton(ID) {
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
                if (res.code == 200 && res.code_desc == "success") {
                    this.objectList = res.data;
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
        addObjectInfo() {
            let data = {
                "automatic": this.isAutoEvaluation ? 1 : 0,
                "email": this.objectEmail,
                "name": this.objectName,
                "checkItems": this.idList.join(","),
            };
            this.postAjax(this.addCheckInfo(data), (res) => {
                if (res.code == 200 || res.code_desc == "success") {
                    this.initInfo()
                } else if (res.code == 403) {
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
                "checkItems": this.idList.join(","),
                "id": this.objectID,
            };
            this.postAjax(this.updateCheckInfo(data), (res) => {
                if (res.code == 200 && res.code_desc == "success") {
                    this.initInfo()
                } else if (res.code == 403) {
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
                } else if (res.code == 403) {
                    delCookie("user");
                    localStorage.clear();
                    window.location.href = "./login.html"
                } else alert(res.code_desc)
            })
        },
        deviceInfo(obj, type, index, data) {
            this.isDevicePop = !this.isDevicePop;
            if (obj == 0) {
                this.selectedDeviceList = [];
            } else if (obj == 1) {
                this.selectedObjectIndex = index;
                this.deviceType = type;
                this.deviceId = data.id;
                if (data.deviceList[type]) this.selectedDeviceList = JSON.parse(JSON.stringify(data.deviceList[type]));
                else this.selectedDeviceList = [];
                this.deviceList = [];
                this.initDevice(type);
            }
        },
        initDevice(type) {
            this.postAjax(this.getCheckSqlList(type), (res) => {
                if (res.code == 200 && res.code_desc == "success") {
                    let data = JSON.parse(JSON.stringify(res.data));
                    for (var i=0; i<data.length; i++) {
                        for (let j in this.selectedDeviceList) {
                            if (data[i] && (data[i].name == this.selectedDeviceList[j].name)) {
                                data.splice(i,1);
								i = i - 1; //从数组删除元素之后，需要改变循环变量
								break;
                            }
                        }
                    }
                    this.deviceList = data;
                } else if (res.code == 403) {
                    delCookie("user");
                    localStorage.clear();
                    window.location.href = "./login.html"
                } else alert(res.code_desc)
            })
        },
        checkLeftDevice(displayName, name, index) {
            this.checkedLeftDeviceDisName = displayName;
            this.checkedLeftDeviceName = name;
            //this.deviceIndex = index;
			this.deviceIndexLeft = index;
			this.deviceIndexRight = -1; //每次点左边，将右边的已选设备索引重置
        },
        checkRightDevice(displayName, name, index) {
            this.checkedRightDeviceDisName = displayName;
            this.checkedRightDeviceName = name;
            //this.deviceIndex = index;
			this.deviceIndexRight = index;
			this.deviceIndexLeft = -1; //每次点右边，将左边的已选设备索引重置
        },
        addDevice() {
            if (this.checkedLeftDeviceName != '') {
                let arrData = {name: this.checkedLeftDeviceName, displayName: this.checkedLeftDeviceDisName};
                this.selectedDeviceList.push(arrData);
                //this.deviceList.splice(this.deviceIndex, 1);
				this.deviceList.splice(this.deviceIndexLeft, 1); //左侧栏的设备数组删除设备
                this.checkedLeftDeviceName = "";
                this.checkedLeftDeviceDisName = "";
            }
        },
        delDevice() {
            if (this.checkedRightDeviceDisName != '') {
                let arrData = {name: this.checkedRightDeviceName, displayName: this.checkedRightDeviceDisName};
                this.deviceList.push(arrData);
                //this.selectedDeviceList.splice(this.deviceIndex, 1);
				this.selectedDeviceList.splice(this.deviceIndexRight, 1); //右侧栏的设备数组删除设备
                this.checkedRightDeviceName = "";
                this.checkedRightDeviceDisName = "";
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
                "displayName": displayNames,
                "name": names,
                "parentId": this.deviceId,
                "type": this.deviceType,
            };
            this.postAjax(this.addCheckDevice(data), (res) => {
                if (res.code == 200 || res.code_desc == "success") {
                    this.initInfo()
                } else if (res.code == 403) {
                    delCookie("user");
                    localStorage.clear();
                    window.location.href = "./login.html"
                } else alert(res.code_desc)
            })
        },
		delObjectDevice(id) { //删除指定的考评设备
			this.postAjax(this.deleteCheckInfo(id), (res) => {
                if (res.code == 200 || res.code_desc == "success") {
                    this.initInfo(); //后台数据重载;
                } else if (res.code == 403) {
                    delCookie("user");
                    localStorage.clear();
                    window.location.href = "./login.html"
                } else alert(res.code_desc)
            })
		},
        submitDevice() {
			let data = this.objectList[this.selectedObjectIndex].deviceList[this.deviceType]; //data为当前所选考评对象、所选设备类型的原来已关联的设备
			let arrData = []; //原列表中有，新的已选列表中也有的设备
			let newDeviceList = []; //原列表中没有，新选择的设备
			let delDeviceList = []; //原列表中有，现在删除了的设备
            if (this.selectedDeviceList.length > 0) {
				//筛选新增的设备
				for (let i in this.selectedDeviceList) {
					let isNewSelect = true; //指示当前设备是否为新选择的设备
                    for (let k in data) {
                        if (data[k].name == this.selectedDeviceList[i].name) {
							arrData.push(data[k].name); //原列表中有，新的已选列表中也有的设备
							isNewSelect = false;
							break;
						}
                    }
					if (isNewSelect)
						newDeviceList.push(this.selectedDeviceList[i]);
                }
				
				//筛选删除的设备
				for (let i in data) {
					let isNewDelete = true; //指示当前的设备是否需要删除
					for (let j in this.selectedDeviceList) {
						if (this.selectedDeviceList[j].name == data[i].name) {
							isNewDelete = false;
							break;
						}
					}
					if (isNewDelete)
						delDeviceList.push(data[i]);
				}
				
                if (this.deviceType == 6 || this.deviceType == 7) {
                    if (this.objectList[this.selectedObjectIndex].deviceList[this.deviceType] && this.objectList[this.selectedObjectIndex].deviceList[this.deviceType].length == 1) 
						alert("该设备只能添加一条数据");
                    else {
                        if (arrData.length > 0) {
                            alert("请勿添加重复数据");
                        } else {
                            if (this.selectedDeviceList.length > 1) alert("该设备只能添加一条数据");
                            else {
                                this.addObjectDevice(this.selectedDeviceList);
                                this.isDevicePop = false;
                            }
                        }
                    }

                } else {
					//新增设备
					if (newDeviceList.length > 0) {
						this.addObjectDevice(newDeviceList);
					}
					
					//删除设备
					if (delDeviceList.length > 0) {
						for (let i in delDeviceList)
							this.delObjectDevice(delDeviceList[i].id);
					}
					
					this.isDevicePop = false; //折叠所有子项？
					
                    //if (arrData.length > 0) {
                    //    alert("请勿添加重复数据");
                    //} else {
                    //    this.addObjectDevice(this.selectedDeviceList);
                    //    this.isDevicePop = false;
                    //}
                }
            } else {
				//已选列表为空，表明删除了所有设备
				for (let i in data) {
					this.delObjectDevice(data[i].id);
				}
				this.isDevicePop = false; //折叠所有子项？
			}
        },
        startEvaluation(id) {
            this.postAjax(this.startCheck(id), (res) => {
                if (res.code == 200 || res.code_desc == "success") {
                    alert("考评成功");
                    this.initInfo()
                } else if (res.code == 403) {
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