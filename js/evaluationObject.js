new Vue({
    el: '#main',
    data: {
        isObjectInfoPop:false,
        objectName:"",
        objectEmail:"",
        objectNavList: [],   //考评菜单
        isAutoEvaluation:false,
        idList:[],   //考评菜单ID
        needIdList:[],   //需要的考评菜单ID
        objectList: [],   //考评对象
        isEdit:true,
        objectID:'',
        objectIndex:'',
        activeSubIndex: -1,
        activeThreeIndex: -1,
        activeFourIndex: -1,
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
            document.getElementById("ulHeight").style.maxHeight = (docHeight - 320) + "px"
        },
        urlParams(key) {
            var value = "";
            var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) value = unescape(r[2]);
            return value;
        },
        /*展示二级目录*/
        showSub(index) {
            this.activeSubIndex = this.activeSubIndex == index ? -1 : index;
        },
        /*展示三级目录*/
        showThree(index) {
            this.activeThreeIndex = this.activeThreeIndex == index ? -1 : index;
        },
        /*展示四级目录*/
        showFour(index,isLast) {
            if (isLast==0) this.activeFourIndex = this.activeFourIndex == index ? -1 : index;
        },
        objectInfo(obj, index, id) {
            if (obj == 0) {
                this.isAutoEvaluation = false;
                this.isObjectInfoPop = !this.isObjectInfoPop;
                this.objectEmail = "";
                this.objectName = "";
                this.isAutoEvaluation = 0;
                this.needIdList = this.idList
            } else if (obj == 1) {
                this.isEdit = false;
                this.isObjectInfoPop = !this.isObjectInfoPop;
                this.objectEmail = this.objectList[index].email;
                this.objectName = this.objectList[index].name;
                this.isAutoEvaluation = this.objectList[index].automatic == 0 ? false : true;
                this.objectID = id;
                this.objectIndex = index;
                this.idList = JSON.parse(this.objectList[index].checkItems);
                if (this.idList == null || this.idList == "") this.idList = [];
                this.needIdList = JSON.parse(this.objectList[index].checkItems);
            }
        },
        autoEvaluation() {
            this.isAutoEvaluation = !this.isAutoEvaluation
        },
        checkButton(ID, index) {
            let id = document.getElementById(ID);
            if (id.className == 'checkbox item-check') {
                id.className = 'checkbox item-check checked';
                this.idList.push(ID);
            } else {
                id.className = 'checkbox item-check';
                for (let i in this.idList) {
                    if (this.idList[i] == ID) {
                        this.idList.splice(i, 1);
                    }
                }
            }
        },
        initInfo() {
            this.getAjax(this.getCheckInfo(), (res) => {
                if (res.code = 200 && res.code_desc == "success") {
                    this.objectList = res.data;
                }
            })
        },
        objectMenu() {
            this.getAjax(this.getCheckMenu(), (res) => {
                if (res.code = 200 && res.code_desc == "success") {
                    this.objectNavList = res.data;
                    for (let i in res.data){
                        this.idList.push(res.data[i].id)
                    }
                }
            })
        },
        addObjectInfo() {
            let data={
                "automatic":this.isAutoEvaluation?1:0,
                "email":this.objectEmail,
                "name":this.objectName,
                "checkItems":JSON.stringify(this.idList),
            };
            this.postAjax(this.addCheckInfo(data), (res) => {
                if (res.code == 200 || res.code_desc == "success") {
                    this.initInfo()
                }else alert(res.code_desc);
            })
        },
        saveObjectInfo(){
            if (this.objectName != '') {
                this.isEdit=true;
                this.isObjectInfoPop = false;
                this.addObjectInfo();
            } else this.isObjectInfoPop = true;
        },
        changeObjectInfo(){
            this.isObjectInfoPop = false;
            let data={
                "automatic":this.isAutoEvaluation?1:0,
                "email":this.objectEmail,
                "name":this.objectName,
                "checkItems":JSON.stringify(this.idList),
                "id":this.objectID,
            };
            this.postAjax(this.updateCheckInfo(data), (res) => {
                if (res.code == 200 && res.code_desc == "success") {
                    this.objectList[this.objectIndex].name=this.objectName;
                    this.objectList[this.objectIndex].email=this.objectEmail;
                    this.objectList[this.objectIndex].automatic=this.isAutoEvaluation?1:0;
                    this.initInfo()
                }else alert(res.code_desc);
            })
        },
        delObjectInfo(id,index){
            this.postAjax(this.deleteCheckInfo(id), (res) => {
                if (res.code == 200 && res.code_desc == "success") {
                    this.objectList.splice(index,1)
                    this.initInfo()
                }else alert(res.code_desc);
            })
        },
    },
    mounted() {
        this.$nextTick(() => {
            this.docHeight()
        });
        this.objectMenu();
        this.initInfo();
    },
});