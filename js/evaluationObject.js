new Vue({
    el: '#main',
    data: {
        objectData:"",
        activeSubIndex:-1,
        activeThreeIndex:-1,
        addObject:false,
        systemName:'',
        isDeviceType:false,
        isSelect:false,
        subTxt:'请选择',
        subList: [
            {name: '服务器', id: "server"},
            {name: '数据库', id: "sql"},
            {name: '中间价', id: "tomcat"},
            {name: '物联网设备', id: "internet"},
        ],
        equipmentIndex:'',
        equipmentId:''
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
        /*展示二级目录*/
        showSub(index) {
            this.activeSubIndex = this.activeSubIndex == index ? -1 : index;
        },
        /*展示三级目录*/
        showThree(index) {
            this.activeThreeIndex = this.activeThreeIndex == index ? -1 : index;
        },
        /*展示设备类型弹窗*/
        addSubList(name, index) {
            this.isDeviceType = !this.isDeviceType;
            this.equipmentIndex = index;
        },
        /*选择设备类型下拉框*/
        select() {
            this.isSelect = !this.isSelect
        },
        /*选择具体设备类型*/
        selectEquipment(name,id) {
            this.subTxt = name;
            this.equipmentId=id;
            this.isSelect = false;
        },
        /*获取考评对象*/
        initObject () {
            var param = {url: setting.www_url + "/city/checkObject/getCheckObject?apiKey=" + setting.apiKey};
            this.getAjax(param, (res)=> {
                if (res.code = 200 && res.code_desc == "success") {
                    this.objectData = res.data;
                }
            })
        },
        addObjectFuc() {
            this.addObject = !this.addObject;
        },
        changeObjectFuc(name, index) {
            // this.addObject = !this.addObject;
            // console.log(this.objectData)
        },
        /*保存考评对象*/
        savaObject (data) {
            var param = {
                url: setting.www_url + "/city/checkObject/updateCheckObject?apiKey=" + setting.apiKey ,
                list:JSON.stringify(data)
            };
            this.postAjax(param, (res) => {
                if (res.code = 200 && res.code_desc == "success") {
                    this.addObject = false;
                    this.isDeviceType=false;
                }
            })
        },
        /*保存考评对象系统*/
        submitSystem() {
            let list = {
                "name": this.systemName,
                "information": [
                    {
                        "name":"",
                        "displayName": "",
                        "information": [
                            {"name": "", "displayName": ""},
                        ]
                    }
                ]
            };
            if (this.systemName != "") {
                this.objectData.push(list);
                this.savaObject(this.objectData);
            }
        },
        /*保存考评对象设备类型*/
        submitEquipment() {
            let index = this.objectData[this.equipmentIndex].information.length-1;
            let equipmentList={
                "name": this.equipmentId,
                "displayName": this.subTxt,
                "information": [
                    {"name": "", "displayName": ""},
                ]
            };
            let list = {
                "name": this.objectData[this.equipmentIndex].name,
                "information": equipmentList
            };
            if (this.objectData[this.equipmentIndex].name!=""){
                if (this.subTxt!="请选择"){
                    if (index==0&&this.objectData[this.equipmentIndex].information[index].name == "") {
                        this.objectData[this.equipmentIndex].information[index].name = this.equipmentId;
                        if (this.objectData[this.equipmentIndex].information[index].displayName == "") {
                            this.objectData[this.equipmentIndex].information[index].displayName = this.subTxt
                        }
                        this.savaObject(this.objectData);
                    } else{
                        this.objectData[this.equipmentIndex].information.push(list.information);
                        this.savaObject(this.objectData);
                    }
                }
            }
        },
    },
    mounted(){
        this.initObject();
    },
});