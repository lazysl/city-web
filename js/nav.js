Vue.component('common-head',{
    template: '<div>' +
        '           <div id="header">' +
        '               <div class="logo">' +
        '                   <a href="./index.html">' +
        '                       <p></p>' +
        '                       <span></span>' +
        '                   </a>' +
        '               </div>' +
        '               <div class="quit" id="quit" onclick="quit"><img src="images/template/icon-quit.png"/></div>' +
        '           </div>' +
        '           <div id="nav">' +
        '               <ul>' +
        '                   <li><a href="evaluationObject.html"><div class="first"><span class="ic1"></span>考评对象</div></a></li>' +
        '                   <li><a href="evaluationModel.html"><div class="first"><span class="ic2"></span>考评模型</div></a></li>' +
        '                   <li><a href="evaluationPlan.html"><div class="first"><span class="ic3"></span>考评计划</div></a></li>' +
        '                   <li><a href="report.html"><div class="first"><span class="ic6"></span>报表</div></a></li>' +
        // '                   <li><a href="mailManagement.html"><div class="first"><span class="ic5"></span>邮件管理</div></a></li>' +
        '                   <li><a href="management.html"><div class="first"><span class="ic4"></span>管理</div></a></li>' +
        '               </ul>' +
        '           </div>' +
        '       </div>',
    method:{
        quit(){
            this.$nextTick(function () {
                delCookie("user");
                localStorage.clear();
                window.location.href = "./login.html"
            })
        }
    }
});