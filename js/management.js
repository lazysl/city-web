new Vue({
    el: '#main',
    data: {
        tabList: [
            {name: "用户", id: "1"},
            {name: "部门", id: "2"},
            {name: "角色", id: "3"},
            // {name: "资源", id: "4"}
            {name: "邮箱", id: "5"},
        ],
        typeIndex: 0,
        typeId: '',  //tab的ID
        usernameKey: "",  //用户信息-用户名称刷选
        userKey: "",  //用户信息-登录名刷选
        userList: '',  //用户
        organizationList: '',  //部门
        organizationKey: "",  //部门-部门名称刷选
        roleList: '',  //角色
        roleNameKey: "",  //角色-角色名称刷选
        roleIdKey: "",  //角色-角色ID刷选
        maxHeight: "",
        allChecked: false,  //全选
        idList: [],   //考评菜单ID
        userType: "",   //用户类型，1为可删除
        userLength: false,  //是否有可删除用户信息
        isUserPop: false,   //用户信息弹窗
        userName: "",  //用户名称
        account: "",  //登录名
        password: "",  //密码
        userInfoId: "",  //用户信息ID
        userRoleId: "",  //用户角色ID
        isEdit: true,
        isRolePop: false,   //角色弹窗
        meanList: [],  //菜单
        roleName: "",  //角色名称
        roleRemark: "",  //角色备注
        needIdList: "",
        roleId: "",
        email:{
            host:"",
            port:"",
            fromEmail:"",
            username:"",
            password:""
        }
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
            this.maxHeight = (docHeight - 380) + "px"
        },
        checkButton(ID) {
            let id = document.getElementById(ID);
            if (id.className == 'checkbox item-check') {
                id.className = 'checkbox item-check checked';
                if (ID == "allUser") {
                    this.allChecked = true;
                    for (let i in this.userList) {
                        if (this.userList[i].type == 1) {
                            this.idList.push(this.userList[i].id);
                        }
                    }
                } else if (ID == "roleUser") {
                    this.allChecked = true;
                    for (let i in this.roleList) {
                        this.idList.push(this.roleList[i].id);
                    }
                } else {
                    this.idList.push(Number(ID.toString().replace("_", "")));
                }
            } else {
                id.className = 'checkbox item-check';
                if (ID == "allUser" || ID == "roleUser") {
                    this.allChecked = false;
                    this.idList = [];
                } else {
                    for (let i in this.idList) {
                        if (this.idList[i] == Number(ID.toString().replace("_", ""))) {
                            this.idList.splice(i, 1);
                        }
                    }
                }
            }
        },
        checkRadio(id) {
            this.userRoleId = id;
        },
        tabClick(obj, index) {
            this.typeIndex = (obj.id-1);
            this.typeId = obj.id;
            this.allChecked = false;
            this.idList = [];
            this.isEdit = true;
        },
        getUserInfo(data) {
            this.postAjax(this.getUserList(data), (res) => {
                if (res.code == 200 && res.code_desc == "success") {
                    this.userList = res.data;
                    for (let i in this.userList) {
                        if (this.userList[i].type == 1) {
                            this.userLength = true
                        }
                    }
                } else if (res.code == 403) {
                    delCookie("user");
                    localStorage.clear();
                    window.location.href = "./login.html"
                } else alert(res.code_desc)
            })
        },
        initUserList() {
            this.getUserInfo();
        },
        userInfoPop(type, id) {
            this.isUserPop = !this.isUserPop;
            if (type == 1) {
                this.isEdit = false;
                this.userInfoId = id;
                for (let i in this.userList) {
                    if (this.userList[i].id == id) {
                        this.userName = this.userList[i].username;
                        this.account = this.userList[i].user;
                        this.password = "";
                        for (let j in this.roleList) {
                            if (this.roleList[j].id == this.userList[i].auth) {
                                this.userRoleId = this.roleList[j].id;
                            }
                        }

                    }
                }
            }
        },
        addUserInfo() {
            let data = {
                auth: this.userRoleId,
                user: this.userName,
                username: this.account,
                password: this.password,
            };
            this.postAjax(this.addUser(data), (res) => {
                if (res.code == 200 && res.code_desc == "success") {
                    alert("新增成功");
                    this.isUserPop = false;
                    this.initUserList();
                } else if (res.code == 403) {
                    delCookie("user");
                    localStorage.clear();
                    window.location.href = "./login.html"
                } else alert(res.code_desc)
            })
        },
        changeUserInfo() {
            let data = {
                id: this.userInfoId,
                auth: this.userRoleId,
                user: this.userName,
                username: this.account,
                password: this.password,
            };
            this.postAjax(this.updateUser(data), (res) => {
                if (res.code == 200 && res.code_desc == "success") {
                    alert("修改成功");
                    this.isUserPop = false;
                    this.initUserList();
                } else if (res.code == 403) {
                    delCookie("user");
                    localStorage.clear();
                    window.location.href = "./login.html"
                } else alert(res.code_desc)
            })
        },
        delUser() {
            if (this.idList.length > 0) {
                this.postAjax(this.deleteUser(this.idList.join(",")), (res) => {
                    if (res.code == 200 && res.code_desc == "success") {
                        alert("删除成功");
                        this.initUserList();
                    } else if (res.code == 403) {
                        delCookie("user");
                        localStorage.clear();
                        window.location.href = "./login.html"
                    } else alert(res.code_desc)
                })
            }
        },
        brushUserInfo() {
            let data = {
                user: this.userKey,
                username: this.usernameKey
            };
            this.getUserInfo(data);
        },
        getOrganizationInfo(data) {
            this.postAjax(this.getOrganization(data), (res) => {
                if (res.code == 200 && res.code_desc == "success") {
                    this.organizationList = res.data;
                } else if (res.code == 403) {
                    delCookie("user");
                    localStorage.clear();
                    window.location.href = "./login.html"
                } else alert(res.code_desc)
            })
        },
        initOrganization() {
            this.getOrganizationInfo()
        },
        brushOrganization() {
            let data = {
                organization: this.organizationKey,
            };
            this.getOrganizationInfo(data);
        },
        getRoleInfo(data) {
            this.postAjax(this.getRoleList(data), (res) => {
                if (res.code == 200 && res.code_desc == "success") {
                    this.roleList = res.data;
                } else if (res.code == 403) {
                    delCookie("user");
                    localStorage.clear();
                    window.location.href = "./login.html"
                } else alert(res.code_desc)
            })
        },
        initRoleList() {
            this.getRoleInfo();
        },
        brushRole() {
            let data = {
                name: this.roleNameKey,
                id: this.roleIdKey,
            };
            this.getRoleInfo(data);
        },
        initMeanList() {
            this.postAjax(this.getMeanList(), (res) => {
                if (res.code == 200 && res.code_desc == "success") {
                    for (let i in res.data) {
                        if (res.data[i].type == 0) {
                            this.meanList.push(res.data[i])
                        }
                    }
                } else if (res.code == 403) {
                    delCookie("user");
                    localStorage.clear();
                    window.location.href = "./login.html"
                } else alert(res.code_desc)
            })
        },
        roleInfoPop(type, id) {
            this.isRolePop = !this.isRolePop;
            this.idList = [];
            if (type == 1) {
                this.isEdit = false;
                this.roleId = id;
                for (let i in this.roleList) {
                    if (this.roleList[i].id == id) {
                        this.roleName = this.roleList[i].name;
                        this.roleRemark = this.roleList[i].remark;
                        this.needIdList = this.roleList[i].auth.split(",").map(Number)
                    }
                }
            }
        },
        addRoleInfo() {
            let data = {
                auth: this.idList.join(","),
                name: this.roleName,
                remark: this.roleRemark,
            };
            this.postAjax(this.addRole(data), (res) => {
                if (res.code == 200 && res.code_desc == "success") {
                    alert("新增成功");
                    this.isRolePop = false;
                    this.initRoleList();
                } else if (res.code == 403) {
                    delCookie("user");
                    localStorage.clear();
                    window.location.href = "./login.html"
                } else alert(res.code_desc)
            })
        },
        changeRoleInfo() {
            let data = {
                auth: this.idList.join(","),
                name: this.roleName,
                remark: this.roleRemark,
                id: this.roleId,
            };
            this.postAjax(this.updateRole(data), (res) => {
                if (res.code == 200 && res.code_desc == "success") {
                    alert("修改成功");
                    this.isRolePop = false;
                    this.initRoleList();
                } else if (res.code == 403) {
                    delCookie("user");
                    localStorage.clear();
                    window.location.href = "./login.html"
                } else alert(res.code_desc)
            })
        },
        delRole() {
            if (this.idList.length > 0) {
                this.postAjax(this.deleteRole(this.idList.join(",")), (res) => {
                    if (res.code == 200 && res.code_desc == "success") {
                        alert("删除成功");
                        this.initRoleList();
                    } else if (res.code == 403) {
                        delCookie("user");
                        localStorage.clear();
                        window.location.href = "./login.html"
                    } else alert(res.code_desc)
                })
            }
        },
        initMail() {
            this.postAjax(getEmailProperties(), (res) => {
                if (res.code == 200 && res.code_desc == "success") {
                    var data = res.data;
                    this.email.fromEmail = data.fromEmail;
                    this.email.host = data.host;
                    this.email.username = data.username;
                    this.email.password = data.password;
                    this.email.port = data.port;
                } else if (res.code == 403) {
                    delCookie("user");
                    localStorage.clear();
                    window.location.href = "./login.html"
                } else alert(res.code_desc)
            })
        },
        saveMail() {
            if (this.email.host != '' && this.email.fromEmail != '' && this.email.username != '' && this.email.password != '') {
                var data = {
                    fromEmail: this.email.fromEmail,
                    port: this.email.port,
                    host: this.email.host,
                    username: this.email.username,
                    password: this.email.password,
                };
                this.postAjax(saveEmailProperties(data), (res) => {
                    if (res.code == 200 && res.code_desc == "success") {
                        alert("保存成功")
                    } else if (res.code == 403) {
                        delCookie("user");
                        localStorage.clear();
                        window.location.href = "./login.html"
                    } else alert(res.code_desc)
                })
            }
        }
    },
    mounted() {
        this.docHeight();
        this.initUserList();
        this.initOrganization();
        this.initRoleList();
        this.initMeanList();
        this.initMail();
    },
});