new Vue({
    el: '#main',
    data: {
        isObjectInfoPop:true,
        objectName:"",
        objectEmail:"",
        objectList: [
            {
                firstName: "业务考评",
                id: "1",
                secList: [
                    {
                        secName: "业务健康度",
                        id: "health",
                        thirdList: [
                            {thirdName: '页面可用性', id: 'pageUsability'},
                            {thirdName: '页面健康度', id: 'pageHealth'},
                            {thirdName: '数据质量', id: 'quality'},
                            {thirdName: '数据共享', id: 'shared'},
                        ]
                    },
                    {secName: "信息安全", id: "security"},
                    {secName: "物联设备状态", id: "things"},
                ]
            },
            {
                firstName: "技术考评",
                id: "2",
                secList: [
                    {secName: '服务器', id: 'server'},
                    {secName: '数据库', id: 'sql'},
                    {secName: '中间件', id: 'middleware'},
                    {secName: '网络设备', id: 'Internet'},
                ]
            },
        ],
        isAutoEvaluation:false,
    },
    computed:{
        firstCheckArr:{
            get(){
                let firstCheckData = [];
                for (let i in this.objectList) {
                    firstCheckData.push(i);
                }
                return firstCheckData
            }
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
            document.getElementById("table").style.maxHeight = (docHeight - 205) + "px"
        },
        objectInfo(obj) {
            this.isObjectInfoPop = !this.isObjectInfoPop;
            if (obj==1) this.addObjectInfo();
        },
        autoEvaluation() {
            this.isAutoEvaluation = !this.isAutoEvaluation
        },
        firstCheckButton(index) {
            let indx = this.firstCheckArr.indexOf(index.toString());
            if (this.$refs.liFirst[indx].className == 'checkbox item-first') {
                this.$refs.liFirst[indx].className = 'checkbox item-first checked';
            } else {
                this.$refs.liFirst[indx].className = 'checkbox item-first';
            }
        },
        /*展示二级目录*/
        secCheckButton(secIndex, index) {
            let id = document.getElementById(index + "_" + secIndex);
            if (id.className == 'checkbox item-sec') {
                id.className = 'checkbox item-sec checked';
            } else {
                id.className = 'checkbox item-sec';
            }
        },
        /*展示三级目录*/
        thirdCheckButton(thirdIndex, secIndex, index) {
            let id = document.getElementById(index + "_" + secIndex + '_' + thirdIndex);
            if (id.className == 'checkbox item-third') {
                id.className = 'checkbox item-third checked';
            } else {
                id.className = 'checkbox item-third';
            }
        },
        addObjectInfo() {
            let data={}
            this.postAjax(this.addCheckDevice(data), (res) => {
                if (res.code = 200 && res.code_desc == "success") {
                }
            })
        },
    },
    mounted() {
        this.$nextTick(() => {
            this.docHeight()
        })
    },
});