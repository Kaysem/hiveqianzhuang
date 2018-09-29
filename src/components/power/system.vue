<template>
    <div id="system">
        <div class="bg">
            <p class="tip">系统日志</p>
            <div class="top">
                <div class="top_right">
                    <el-input :disabled="btn_isdisabled" placeholder="请输入内容" v-model="SearchInput" class="input-with-select searchinput">
                        <el-button slot="append" icon="el-icon-search" @click="SearchBtn()"></el-button>
                    </el-input>
                </div>
            </div>
            <!-- 表格 S -->
            <div>
                <el-table
                    ref="multipleTable"
                    :data="table.tableData"
                    style="width: 100%"
                    stripe>

                    </el-table-column>
                    <el-table-column
                    label="序号"
                    :index="typeIndex"
                    type="index"
                    >
                    </el-table-column>
                    <el-table-column
                    label="用户ID"
                    prop="user_id"
                    >
                    </el-table-column>
                    <el-table-column
                    label="用户名"
                    prop="user_name"
                    >
                    </el-table-column>
                    <el-table-column
                    label="角色名"
                    prop="role_name"
                    >
                    </el-table-column>
                    <el-table-column
                    label="IP"
                    prop="ip_addr"
                    >
                    </el-table-column>
                    <el-table-column
                    label="在线时间"
                    prop="online_time"
                    >
                    </el-table-column>
                    <el-table-column
                    label="最后访问时间"
                    prop="last_time"
                    >
                    </el-table-column>
                    <el-table-column
                    label="状态"
                    >
                        <template slot-scope="scope">
                                <span v-if="scope.row.state == 1 ">在线</span>
                                <span v-else>离线</span>
                        </template>
                    </el-table-column>

                </el-table>
            </div>
            <!-- 表格 E -->

           <!-- 分页 S -->
            <div class="add_pages">
                <span @click="tochagePage('L')">首页</span>
                <el-pagination
                    background
                    layout="prev, pager, next"
                    :page-size = "page.pageSize"
                    :total= "page.total"
                    :current-page = "page.currentPage"
                    @current-change="changePage"
                    >
                </el-pagination>
                <span @click="tochagePage('R')">尾页</span>
            </div>
            <!-- 分页 E -->
   
            
        </div>

    </div>
</template>
<script>
export default {
    name:"System",
    data(){
        return{
            userinfo: {},
            SearchInput: "",
            table:{
                tableData: [ ],
            },
            page:{
                total: 0,      //总条数
                pageSize: 8,    //1页条数
                currentPage: 1, //当前页面位置
                allPages: 1,
            },
            btn_isdisabled: true,
            menuList:[],
            menuoperate: [], //页面操作
        }
    },
    methods:{
        typeIndex(index) {
            return index + (this.page.currentPage - 1) * 8 + 1;
        },
        //改变页码
        changePage(val){
            let _this = this;
            _this.getTable(val);
        },
        //首页
        tochagePage(type){
            let _this = this;
            let num = 1;
            if(type == "L"){
                num = 1;
            }else {
                num = _this.page.allPages;
            }
            _this.getTable(num)
        },
        // 搜索
        SearchBtn(){
            let _this = this ;
            _this.getTable();
        },
        //表格数据
        getTable(page="1"){
            let _this = this;
            let json ;
            let url ;
            if( _this.SearchInput != "") {
                json = {data: JSON.stringify({'page' : ""+page+ "" , 'id' : _this.userinfo.role_id , 'like' : _this.SearchInput})};
                url = _this.$url.likelogmanagelist ;
            }else {
                json = {data: JSON.stringify({'page' : ""+page+ "" , 'id' : _this.userinfo.role_id})};
                url = _this.$url.logmanagelist ;
            }
            let formdata = _this.$config.formData(json); 
            _this.table.tableData = [];
            _this.$axios.post( url , formdata).then((res)=>{ 
                if(res.status == 200){
                    let data = res.data;
                    _this.page.total = data.totalCount ; //总条数
                    _this.page.currentPage = data.curPage ; //当前页数
                    _this.page.allPages = data.allPages; //总页数
                    let table = data.datas;
                    table.forEach(function(v,i,arr) {
                        v['page_index'] = (_this.page.currentPage-1) * 8 + (i+1);
                    });
                    _this.table.tableData = table;
                }
            });
        },
        menu_test(list,chk){
            let _this = this;
            $.each(list,function(i,d){
                if(d.url == chk){
                        _this.menuoperate =  k.operate;
                    return ;
                }else{
                    if(d.children != undefined) {
                        $.each(d.children,function(j,k){
                            if(k.url == chk){
                                _this.menuoperate =  k.operate;
                                return;
                            }
                        });
                    }
                }
            });
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

                    _this.menu_test(_this.menuList,_this.$route.path);
                    let btns ;
                    _this.menuoperate.forEach(function(v,i,arr){
                        if(v == 6){
                            btns = v;
                            return ;
                        } 
                    });
                    if( btns == 6){
                        _this.btn_isdisabled = false;
                    }else {
                        _this.btn_isdisabled = true;
                    }
                    _this.getTable(_this.page.currentPage);
                    
                // }
            // });
        },

    },
    mounted: function() {
        let _this = this;
        _this.userinfo = sessionStorage.getItem('userinfo') != "" ? JSON.parse(sessionStorage.getItem('userinfo')) : "" ;
        _this.M_List();
    },
    watch: {
      
    }
}
</script>
<style scoped>
    #system{
        /* height: 100% ; */
        text-align: left;
        overflow: hidden;
        background: rgba(255,255,255,0.1);
        border-radius:10px;
    }
    .bg {
        padding:0px 20px;
    }
    .tip {
        font-size: 24px;
        margin-top: 20px;
    }
    .el-button+.el-button {
        margin-left: 0px;
    }
    .top {
        position: relative;
        height: 34px;
        margin: 20px 0px 30px
    }
    .top_left {
        top: 0 ;
        left: 0;
        position: absolute;
    }
    .top_right {
        top: 0 ; 
        right: 0;
        position: absolute;
        width: 270px;
    } 
    .top_right>.el-input {
        width: 100%;
    }
    .el-input-group__append {
        border-top-right-radius: 16px;
        border-bottom-right-radius: 16px;
    }
    .dialog_footer {
        text-align: center;
    }
    .add_pages{
        text-align: right;
        margin-top: 20px;  
        margin-bottom: 30px;
    }
    .add_pages>span {
        display: inline-block;
        width: 28.5px;
        height: 28px;
        background: rgba(255,255,255,0.2);
        color: #fff;
        font-size: 10px;
        text-align: center;
        line-height: 28px;
        border-radius: 5px; 
        vertical-align: text-top;
        cursor: pointer;
    }
    .add_pages>span:hover{
        background: #91a2eb;
    }
    .add_pages>span:last-child {
        margin-left: -5px;
    }
    .table_todo {
        display: inline-block;
        width: 16px;
        height: 18px;
        margin: 0 5px;
        vertical-align: middle;

    }
    .btn_add {
        background-color: #6477c8;
        color: #fff;
        width: 80px;
        font-size: 14px;
    }
    .btn_del {
        background-color: #d88350;
        color: #fff;
        width: 80px;  
        font-size: 14px;      
    }
    .btn_password {
        background-color: #4e7cc8;
        color: #fff;
        width: 100px;
        font-size: 14px;      
    }
    #system .el-button {
        border: none;
        height: 34px;
    }
    #system .top_left .el-button+.el-button {
        margin-left: 10px;
    }
    #system .el-dialog__wrapper .el-button+.el-button {
        margin-left: 50px;
    }

    

   

</style>
