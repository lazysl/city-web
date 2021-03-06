new Vue({
    el: '#main',
    data: {
        objectData: "",
        activeSubIndex: -1,
        activeThreeIndex: -1,
        objectIndex: "",
        subIndex: "",
        addObject: false,
        systemName: '',
        isDeviceType: false,
        isSelect: false,
        subTxt: '请选择',
        subList: [
            {name: '服务器', id: "server"},
            {name: '数据库', id: "sql"},
            {name: '中间件', id: "middleware"},
            {name: '物联网设备', id: "internet"},
        ],
        equipmentIndex: '',
        equipmentId: '',
        isThreePop: false,
        threeList: "",
        threeIndex: '',
        checkedThreeLeftDisName: '',
        checkedThreeLeftName: '',
        checkedThreeIndex: -1,
        checkedThreeRightDisName: '',
        checkedThreeRightName: '',
        checkedThreeList: [],
    },
    methods: {
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
        docHeight() {
            let docHeight = window.innerHeight || document.documentElement.clientHeight;
            document.getElementById("content").children[0].style.height = (docHeight - 142) + "px";
            document.getElementById("navTree").style.height = (docHeight - 205) + "px"
        },
        addObjectFuc(index) {
            this.objectIndex = index;
            this.addObject = !this.addObject;
        },
        /*展示二级目录*/
        showSub(index) {
            this.activeSubIndex = this.activeSubIndex == index ? -1 : index;
        },
        /*展示三级目录*/
        showThree(index) {
            this.activeThreeIndex = this.activeThreeIndex == index ? -1 : index;
        },
        /*展示设备类型弹窗*/
        addSubList(indexSub, index, type) {
            this.isDeviceType = !this.isDeviceType;
            this.equipmentIndex = index;
            this.threeIndex = indexSub;
            this.subIndex = type;
            this.isSelect = false;
        },
        /*删除系统*/
        delList(index) {
            this.objectData.splice(index, 1);
            this.savaObject(this.objectData)
        },
        /*删除设备类型*/
        delSubList(indexSub, index) {
            this.objectData[index].information.splice(indexSub, 1);
            this.savaObject(this.objectData)
        },
        /*删除数据*/
        delThreeList(indexThree, indexSub, index) {
            this.objectData[index].information[indexSub].information.splice(indexThree, 1);
            this.savaObject(this.objectData)
        },
        /*选择设备类型下拉框*/
        select() {
            this.isSelect = !this.isSelect
        },
        /*选择具体设备类型*/
        selectEquipment(name, id) {
            this.subTxt = name;
            this.equipmentId = id;
            this.isSelect = false;
        },
        /*展示三级菜单弹窗*/
        addThreeList(indexSub, index, name) {
            this.checkedThreeIndex = -1;
            this.checkedThreeList = [];
            this.equipmentIndex = index;
            this.isThreePop = !this.isThreePop;
            this.threeIndex = indexSub;
            let num;
            if (name == "sql") num = 1;
            else if (name == "middleware") num = 2;
            else if (name == "server") num = 3;
            else if (name == "internet") num = 4;
            this.getCheckSqlList(num)
        },
        closeThreePop() {
            this.isThreePop = !this.isThreePop;
            this.checkedThreeList = [];
            this.checkedThreeIndex = -1;
        },
        checkThreeLeftName(name, id, index) {
            this.checkedThreeLeftDisName = name;
            this.checkedThreeLeftName = id;
            this.checkedThreeIndex = index;
        },
        checkThreeRightName(name, id, index) {
            this.checkedThreeRightDisName = name;
            this.checkedThreeRightName = id;
            this.checkedThreeIndex = index;
        },
        addThreeName() {
            if (this.checkedThreeLeftName != '') {
                let arrData = {name: this.checkedThreeLeftName, displayName: this.checkedThreeLeftDisName};
                this.checkedThreeList.push(arrData);
                this.threeList.splice(this.checkedThreeIndex, 1);
                this.checkedThreeLeftName = "";
                this.checkedThreeLeftDisName = ""
            }
        },
        delThreeName() {
            if (this.checkedThreeRightName != '') {
                let arrData = {name: this.checkedThreeRightName, displayName: this.checkedThreeRightDisName};
                this.threeList.push(arrData);
                this.checkedThreeList.splice(this.checkedThreeIndex, 1);
                this.checkedThreeRightName = "";
                this.checkedThreeRightDisName = ""
            }
        },
        /*获取考评对象*/
        initObject() {
            this.getAjax(this.getCheckObject(), (res) => {
                if (res.code = 200 && res.code_desc == "success") {
                    this.objectData = res.data;
                }
            })
        },
        /*获取数据库和中间件设备列表*/
        getCheckSqlList(num) {
            this.getAjax(this.checkSqlList(num), (res) => {
                if (res.code = 200 && res.code_desc == "success") {
                    this.threeList = res.data;
                }
            })
        },
        /*保存考评对象*/
        savaObject(data) {
            for (let i in data) {
                if (!data[i].displayName || data[i].displayName == "") data[i].displayName = data[i].name;
            }
            this.postAjax(this.updateCheckObject(data), (res) => {
                if (res.code = 200 && res.code_desc == "success") {
                    this.addObject = false;
                    this.isDeviceType = false;
                }
            })
        },
        /*保存考评对象系统*/
        submitSystem() {
            let list = {
                "name": this.systemName,
                "information": []
            };
            if (this.systemName != "") {
                if (this.objectIndex == -1) {
                    list.displayName = this.systemName;
                    this.objectData.push(list);
                    this.savaObject(this.objectData);
                } else {
                    this.objectData = JSON.parse(JSON.stringify(this.objectData).replace(this.objectData[this.objectIndex].name, this.systemName));
                    this.savaObject(this.objectData);
                }
            }
        },
        /*保存考评对象设备类型*/
        submitEquipment() {
            let equipmentList = {
                "name": this.equipmentId,
                "displayName": this.subTxt,
                "information": []
            };
           if (this.subTxt != "请选择") {
               if (this.subIndex == 0) {
                   let arrData = [], data = this.objectData[this.equipmentIndex].information;
                   for (let i in data) {
                       if (data[i].name == this.equipmentId) arrData.push(data[i].name)
                   }
                   if (arrData.indexOf(this.equipmentId) > -1) alert("请勿添加重复数据");
                   else {
                       this.objectData[this.equipmentIndex].information.push(equipmentList);
                       this.savaObject(this.objectData);
                   }
               } else if (this.subIndex == 1) {
                   this.objectData = JSON.parse(JSON.stringify(this.objectData).replace(this.objectData[this.equipmentIndex].information[this.threeIndex].displayName, this.subTxt));
                   this.objectData = JSON.parse(JSON.stringify(this.objectData).replace(this.objectData[this.equipmentIndex].information[this.threeIndex].name, this.equipmentId));
                   this.savaObject(this.objectData);
               }
            }
        },
        /*保存考评对象三级目录*/
        submitThree() {
            if (this.checkedThreeList.length > 0) {
                let data = this.objectData[this.equipmentIndex].information[this.threeIndex].information, arrData = []
                for (let i in this.checkedThreeList) {
                    for (let k in data) {
                        if (data[k].name == this.checkedThreeList[i].name) arrData.push(data[k].name)
                    }
                }
                if (arrData.length > 0) alert("请勿添加重复数据");
                else {
                    for (let j in this.checkedThreeList) {
                        this.objectData[this.equipmentIndex].information[this.threeIndex].information.push(this.checkedThreeList[j])
                    }
                    this.savaObject(this.objectData);
                    this.isThreePop = false;
                }
            }
        }
    },
    mounted() {
        this.initObject();
        this.$nextTick(() => {
            this.docHeight()
        })
    },
});