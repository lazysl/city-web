new Vue({
    el: '#main',
    data: {
        resultList:""
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
            document.getElementById("table").style.maxHeight = (docHeight - 355) + "px"
        },
        initResult(){
            this.postAjax(this.getCheckResult(), (res) => {
                if (res.code == 200 && res.code_desc == "success") {
                    this.resultList = res.data;
                }else if (res.code == 403){
                    delCookie("user");
                    localStorage.clear();
                    window.location.href = "./login.html"
                }else alert(res.code_desc)
            })
        },
        pdfMap() {
            let pdf = new jsPDF('p', 'pt', 'a4');
            pdf.internal.scaleFactor = 1;
            let options = {
                pagesplit: true,
            };
            pdf.addHTML(document.getElementById("tableCon"), options, function() {
                pdf.save('总考评结果.pdf');
            });
        },
    },
    mounted() {
        this.docHeight();
        this.initResult()
    },
});