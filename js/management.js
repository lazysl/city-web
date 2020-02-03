new Vue({
    el: '#main',
    data: {
        tabList: [
            {name: "用户", id: "1"},
            {name: "部门", id: "2"},
            {name: "角色", id: "3"},
            {name: "资源", id: "4"}
        ],
        typeIndex:0,
        typeId:'',
        userList: "",
        userIndex: -1,
        userId: '',
        user: '',
        adminList: "",
        adminIndex: -1,
        adminId: '',
        admin: '',
        generalList: "",
        generalIndex: -1,
        generalId: '',
        general: '',
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
        tabClick(obj, index) {
            this.typeIndex = index;
            this.typeId = obj.id;
        },
        initUserList() {
            this.getAjax(this.getUserList(), (res) => {
                if (res.code = 200 && res.code_desc == "success") {
                    let arrUser = [], arrAdmin = [], arrGeneral = [];
                    for (let i in res.data) {
                        if (res.data[i].auth == 0) arrUser.push(res.data[i]);
                        if (res.data[i].auth == 1) arrAdmin.push(res.data[i]);
                        if (res.data[i].auth == 2) arrGeneral.push(res.data[i]);
                    }
                    this.userList = arrUser;
                    this.adminList = arrAdmin;
                    this.generalList = arrGeneral;
                }
            })
        },
        checkUser(id, index, data) {
            this.userId = id;
            this.userIndex = index;
            this.user = data;
        },
        checkAdmin(id, index, data) {
            this.adminId = id;
            this.adminIndex = index;
            this.admin = data
        },
        checkGeneral(id, index, data) {
            this.generalId = id;
            this.generalIndex = index;
            this.general = data
        },
        addUser(auth) {
            if (this.userIndex > -1) {
                this.userList.splice(this.userIndex, 1);
                if (auth == 1) this.adminList.push(this.user);
                if (auth == 2) this.generalList.push(this.user)
                this.setUserAuth(auth, this.userId)
            }
            this.userIndex = -1;
        },
        delAdminUser(auth) {
            if (auth == 1) {
                if (this.adminIndex > -1) {
                    this.userList.push(this.admin);
                    this.adminList.splice(this.adminIndex, 1);
                    this.setUserAuth(0, this.adminId)
                }
                this.adminIndex = -1;
            } else if (auth == 2) {
                if (this.generalIndex > -1) {
                    this.userList.push(this.general);
                    this.generalList.splice(this.generalIndex, 1);
                    this.setUserAuth(0, this.generalId)
                }
                this.generalIndex = -1;
            }
        },
        setUserAuth(auth, id) {
            var data = {
                auth: auth,
                id: id
            };
            this.getAjax(this.setAuth(data), (res) => {
                if (res.code = 200 && res.code_desc == "success") {
                    alert("保存成功")
                } else alert("保存失败")
            })
        },
        flashData(){
            this.initUserList()
        },
    },
    mounted() {
        this.initUserList()
    },
});