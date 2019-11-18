new Vue({
    el: '#main',
    data: {
        objectData: "",
        activeSubIndex: -1,
        activeThreeIndex: -1,
        objectIndex: "",
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
        subName:'',
        equipmentIndex: '',
        equipmentId: '',
        isThreePop:false,
        threeList:"",
        threeIndex:'',
        checkedThreeDisName:'',
        checkedThreeName:'',
        checkedThreeIndex:'',
        checkedThreeList:[],
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
        addSubList(index) {
            this.isDeviceType = !this.isDeviceType;
            this.equipmentIndex = index;
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
        addThreeList(indexSub,index, name) {
            this.subName = name;
            this.equipmentIndex = index;
            this.threeIndex = indexSub;
            this.isThreePop = !this.isThreePop;
            let num;
            if(name=="sql") num=1;
            else if(name=="middleware") num=2;
            else if(name=="server") num=3;
            else if(name=="internet") num=4;
            this.getCheckSqlList(num)
        },
        closeThreePop() {
            this.isThreePop = !this.isThreePop;
        },
        checkThreeName(name, id, index) {
            this.checkedThreeDisName = name;
            this.checkedThreeName = id;
            if (index) this.checkedThreeIndex = index;
        },
        addThreeName(){
            let arrData={name:this.checkedThreeName,displayName:this.checkedThreeDisName};
            this.checkedThreeList.push(arrData);
        },
        delThreeName(){
            this.checkedThreeList.splice(this.checkedThreeIndex,1)
        },
        /*获取考评对象*/
        initObject() {
            var param = {url: setting.www_url + "/city/checkObject/getCheckObject?apiKey=" + setting.apiKey};
            this.getAjax(param, (res) => {
                if (res.code = 200 && res.code_desc == "success") {
                    this.objectData = res.data;
                }
            })
        },
        /*获取数据库和中间件设备列表*/
        getCheckSqlList(num) {
            var param = {
                url: setting.www_url + "/city/checkSql/getCheckSqlList?apiKey=" + setting.apiKey + "&type=" + num,
            };
            this.getAjax(param, (res) => {
                if (res.code = 200 && res.code_desc == "success") {
                    this.threeList = res.data;
                }
            })
        },
        /*保存考评对象*/
        savaObject(data) {
            var param = {
                url: setting.www_url + "/city/checkObject/updateCheckObject?apiKey=" + setting.apiKey,
                list: JSON.stringify(data)
            };
            this.postAjax(param, (res) => {
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
                this.objectData[this.equipmentIndex].information.push(equipmentList);
                this.savaObject(this.objectData);
            }
        },
        /*保存考评对象三级目录*/
        submitThree(){
            if (this.checkedThreeList.length>0) {
                this.objectData[this.equipmentIndex].information[this.threeIndex].information = this.checkedThreeList;
                this.savaObject(this.objectData);
            }
        }
    },
    mounted() {
        this.initObject();
    },
});