<template>
    <div id='shopList'>
        <div class="title clearfix">
            <div class="fl">
                <h4>门店列表</h4>
            </div>
            <div class="fr search sol-sm-12">
                <input type="text" placeholder="请输入门店名称" class="col-sm-10" v-model="search_input"  @keyup.enter="enter_search()">
                <input type="button" value="搜索" class="btn_s sol-sm-2" @click="search_button()">
            </div>
        </div>
        <div class="box" v-if=" userinfo.role_rank == 0">
            <div class="boxs" v-for="(item,index) in box_content" @click="detailedInfo(item)">
                <div>
                    <h5>{{item.storeName}}</h5>
                    <p>门店ID:<span>{{item.storeCode}}</span> </p>
                    <p>地址:<span>{{item.address}}</span> </p>
                    <p>电话:<span>{{item.tel}}</span></p>
                </div>
            </div>
           
        </div>
        <div class="box" v-else>
            <div class="boxs" v-for="(item,index) in box_content.slice( (page.currentPage-1) * page.pageSize  ,  page.currentPage * page.pageSize )" @click="detailedInfo(item)">
                <div>
                    <h5>{{item.storeName}}</h5>
                    <p>门店ID:<span>{{item.storeCode}}</span> </p>
                    <p>地址:<span>{{item.address}}</span> </p>
                    <p>电话:<span>{{item.tel}}</span></p>
                </div>
            </div>
        </div>
        <el-pagination
            background
            layout="prev, pager, next"
            :page-size = "page.pageSize"
            :total= "page.total"
            :current-page = "page.currentPage"
            @current-change="changePage"
            >
        </el-pagination>


    </div>
</template>

<script>
  export default {
    name:"shopList",
    data () {
        return {
            userinfo: {},
            search_input: '',
            page:{
                total: 0,      //总条数
                pageSize: 6,    //1页条数
                currentPage: 1, //当前页面位置
            },
            box_content : [
                // {
                //     "storeName": "朝阳门店",
                //     "storeCode": "245863154",
                //     "address": "北京市朝阳区朝外大街16号楼1层",
                //     "tel": "010-3948764"
                // },
               
            ],
            menuList:[],
            menuoperate: [], //页面操作
        }
    },
    mounted:function ( ) {
        let _this = this;
        _this.userinfo = JSON.parse(sessionStorage.getItem("userinfo"));
        _this.M_List();

        if($(window).width() < 850) {
            $(".box>div").css({"display": "block","marginRight": "0px","width": "100%" });
            $(".box").height($(".box>div").length * ($(".box>div").height() + 15));
        }else {
            $(".box>div").css({ "display": "inline-block", "width":"31%" });
            let marginRight = ($(".box").width()-($(".box>div").width()+2)*3)/2;
            $(".box>div").css("marginRight" , Math.floor(marginRight)  +"px");
            $(".box>div:nth-child(3n)").css("marginRight" , "0px");
            $(".box").height(390);
        }
        window.onresize = function () {
            if($(window).width() < 850) {
                $(".box>div").css({"display": "block","marginRight": "0px","width": "100%" });
                $(".box").height($(".box>div").length * ($(".box>div").height() + 15));
            }else {
                $(".box>div").css({ "display": "inline-block", "width":"31%" });
                let marginRight = ($(".box").width()-($(".box>div").width()+2)*3)/2;
                $(".box>div").css("marginRight" , Math.floor(marginRight)  +"px");
                $(".box>div:nth-child(3n)").css("marginRight" , "0px");
                $(".box").height(390);
            }
        };
        
        
    },
    methods:{
        changePage(val){
            let _this = this;
            if( _this.userinfo.role_rank == 0){ 
                _this.getlist(val);
            }else {
                _this.page.currentPage = val;
            }
            _this.$nextTick(function(){
                let _this = this;
                if($(".box").width() < 600) {
                    $(".box>div").css({"display": "block","marginRight": "0px","width": "100%" });
                    $(".box").height($(".box>div").length * ($(".box>div").height() + 15));
                }else {
                    $(".box>div").css({ "display": "inline-block", "width":"31%" });
                    let marginRight = ($(".box").width()-($(".box>div").width()+2)*3)/2;
                    $(".box>div").css("marginRight" , Math.floor(marginRight)  +"px");
                    $(".box>div:nth-child(3n)").css("marginRight" , "0px");
                    $(".box").height(390);
                }
            });
        },
        detailedInfo(item){
            let _this = this;
            _this.menuoperate.forEach(function(v,i,arr){
                if( v == 7 ){
                    //可以点击
                    _this.$router.push({ name: 'Userpicture',params:{name:item.storeCode}});
                    let obj = item.storeCode;
                    sessionStorage.removeItem("shoplistInfo");
                    sessionStorage.setItem("shoplistInfo", obj);
                    return;
                }
            });
        },
        getlist( n = "1"){
            let _this = this;
            let name = _this.search_input;
            if( _this.userinfo.role_rank == 0 ){
                let json ;
                let url ;
                json = { "vid" : _this.userinfo.store_root_id ,"page": n , "storeName": name};
                url = _this.$url.getStoreMapShow ;
                    let formdata = _this.$config.formData(json); 
                //中心销售数据
                _this.$axios.post( _this.$url.getStoreMapShow , formdata ).then((res)=>{
                    if(res.status == 200 ) {
                        let data = res.data;
                        _this.page.total = data.total;
                        _this.box_content = data.data;
                    }else {
                        _this.page.total = 0;
                        _this.box_content = [];
                    }
                    _this.$nextTick(function(){
                        let _this = this;
                        if($(".box").width() < 600) {
                            $(".box>div").css({"display": "block","marginRight": "0px","width": "100%" });
                            $(".box").height($(".box>div").length * ($(".box>div").height() + 15));
                        }else {
                            $(".box>div").css({ "display": "inline-block", "width":"31%" });
                            let marginRight = ($(".box").width()-($(".box>div").width()+2)*3)/2;
                            $(".box>div").css("marginRight" , Math.floor(marginRight)  +"px");
                            $(".box>div:nth-child(3n)").css("marginRight" , "0px");
                            $(".box").height(390);
                        }
                    });
                });

            }else {
                let json ;
                let url ;
                json = { "vid" : _this.userinfo.store_root_id ,"roleId": _this.userinfo.role_id , "roleRank": _this.userinfo.role_rank , "store_root_id": _this.userinfo.store_root_id};
                url = _this.$url.getStoreMapShow ;
                let formdata = _this.$config.formData(json); 
                //中心销售数据
                _this.$axios.post( _this.$url.getStoreByRole , formdata ).then((res)=>{
                    if(res.status == 200 ) {
                        let data = res.data.data;
                        _this.page.total = data.length;
                        _this.box_content = data;
                    }else {
                        _this.page.total = 0;
                        _this.box_content = [];
                    }
                    _this.$nextTick(function(){
                        let _this = this;
                        if($(".box").width() < 600) {
                            $(".box>div").css({"display": "block","marginRight": "0px","width": "100%" });
                            $(".box").height($(".box>div").length * ($(".box>div").height() + 15));
                        }else {
                            $(".box>div").css({ "display": "inline-block", "width":"31%" });
                            let marginRight = ($(".box").width()-($(".box>div").width()+2)*3)/2;
                            $(".box>div").css("marginRight" , Math.floor(marginRight)  +"px");
                            $(".box>div:nth-child(3n)").css("marginRight" , "0px");
                            $(".box").height(390);
                        }
                    });
                });
            };
        },
        search_button(){
            let _this = this;
            _this.getlist();
        },
        enter_search(){
            let _this = this;
            _this.getlist();
        },
        menu(allmenu,nowmenu){
          let _this = this;
          let operate = {};
          allmenu.forEach(function(v,i,arr) {
              if(v.url === nowmenu){
                  operate = v;
              }
              if(v.children != undefined && v.children.length != 0){
                  _this.menu(v.children,nowmenu)
              }
          });
            return operate;
        },
        M_List(){
            let _this = this;
            // let json1 = {data: JSON.stringify({"id": _this.userinfo.role_id ,"role_rank":_this.userinfo.role_rank  })}
            // let formdata = _this.$config.formData(json1) ; 
            _this.menuList = [] ;
            // _this.$axios.post( _this.$url.querytreedata , formdata).then((res)=>{ 
                // if(res.status == 200){
                    // let data = res.data.data ;
                    // _this.menuList = data ;
                    _this.menuList = JSON.parse( sessionStorage.getItem("menus")) ;
                    let O = _this.menu(_this.menuList, _this.$route.path);
                    _this.menuoperate = O.operate ;
                    _this.getlist();
                // }
            // });
        },
     
    },
    watch: { }
  }
</script>
<style scoped>
    #shopList{
        /* height: 100% ; */
        text-align: left;
        overflow: hidden;
        background: rgba(255,255,255,0.1);
        border-radius:10px;
    }
    .title  {
        margin: 20px 20px;
    }
    .title h4 {
        font-size: 24px;
        font-weight: 400;
    }
    .search input:first-child {
        width: 300px;
        height: 30px;
        border-radius: 5px;
        border: solid 1px #91a2eb;
        background: rgba(255,255,255,0);
        padding-left: 10px;
        margin-right: 10px;
        color:#fff;
    }
    input {
        outline: 0;
    }
    .search .btn_s {
        width: 84px;
        height: 32px;
        background-color: #91a2eb;
        border-radius: 4px;
        vertical-align: middle;
        border: 0;
        color: #fff;
    }
    .btn_s:hover {
        background-color: #889df8
    }
    .search .btn_s:active {
        opacity: 0.8;
    }
    .box {
        font-size: 0;
        margin: 0 20px;
        cursor: pointer;
    }
    .box>div {
        font-size: 14px;
        width: 31%;
        display: inline-block;
        vertical-align: middle;
        height: 180px;
        border-radius: 10px 10px 10px 10px;
        border: solid 1px #91a2eb;
        margin-bottom: 15px;
        box-sizing: border-box;
        background: rgba(255,255,255,0.1);
        color: #c9c7c7;
    }
    .box>div:hover {
        background: rgba(255,255,255,0);
        color: #fff;
        border: solid 1px #00c7ff;
    }
    .boxs>div {
        padding-top: 30px;
        padding-left: 20px;
    }
    .boxs>div h5 {
        font-size: 18px;
        font-weight: 400;
        color: #5de3e1;
        margin-bottom: 15px;
    }
    .boxs>div p {
        margin-bottom: 10px;
    }
    .boxs:active {
        opacity: 0.8;
    }
</style>