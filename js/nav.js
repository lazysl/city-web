Vue.component('common-head',{
    template: '<div>' +
        '           <div id="header">' +
        '               <div class="logo">' +
        '                   <a href="./index.html">' +
        '                       <p></p>' +
        '                       <span>智能考评管理子系统</span>' +
        '                   </a>' +
        '               </div>' +
        '               <div class="quit"><a href="./homepage.html"><img src="images/template/icon-home.png"/></a></div>' +
        '           </div>' +
        '           <div id="nav">' +
        '               <ul>' +
        '                   <li v-for="item in meanList"><a :href="item.href"><div class="first"><span :class="\'icon\'+item.sort"></span>{{item.name}}</div></a></li>' +
        '               </ul>' +
        '           </div>' +
        '       </div>',
    data() {
        return {
            meanList: []
        }
    },
    methods:{
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
        initMeanList() {
            this.postAjax(this.getMenuListByUser(), (res) => {
                if (res.code == 200 && res.code_desc == "success") {
                    for (let i in res.data.menu) {
                        if (res.data.menu[i].type == 0) {
                            this.meanList.push(res.data.menu[i])
                        }
                    }
                    this.meanList.sort((a,b)=>{return a.sort - b.sort})
                } else if (res.code == 403) {
                    delCookie("user");
                    localStorage.clear();
                    window.location.href = "./login.html"
                } else alert(res.code_desc)
            })
        },
    },
    mounted(){
        this.initMeanList()
    }
});