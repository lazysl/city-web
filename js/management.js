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
        userList:'',  //用户
        organizationList:'',  //部门
        roleList:'',  //角色
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
        initUserList(){
            this.getAjax(this.getUserList(), (res) => {
                if (res.code = 200 && res.code_desc == "success") {
                    this.userList = res.data;
                }else if (res.code = 403){
                    delCookie("user");
                    localStorage.clear();
                    window.location.href = "./login.html"
                }else alert(res.code_desc)
            })
        },
        initOrganization(){
            this.postAjax(this.getOrganization(), (res) => {
                if (res.code = 200 && res.code_desc == "success") {
                    this.organizationList = res.data;
                }else if (res.code = 403){
                    delCookie("user");
                    localStorage.clear();
                    window.location.href = "./login.html"
                }else alert(res.code_desc)
            })
        },
        initRoleList(){
            this.getAjax(this.getRoleList(), (res) => {
                if (res.code = 200 && res.code_desc == "success") {
                    this.roleList = res.data;
                }else if (res.code = 403){
                    delCookie("user");
                    localStorage.clear();
                    window.location.href = "./login.html"
                }else alert(res.code_desc)
            })
        }
    },
    mounted() {
        this.initUserList();
        this.initOrganization();
        this.initRoleList();
    },
});