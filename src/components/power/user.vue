<template>
    <div id="user">
        <div class="bg">
            <p class="tip">用户管理</p>
            <div class="top">
                <div class="top_left">
                    <el-button :disabled="btn_isdisabled" class="btn_add" size="small" round @click="handleEdit()">新增</el-button>
                    <el-button class="btn_del" size="small" round :disabled="disabled.disabled_del" @click="handleDelete()">删除</el-button>
                    <el-button class="btn_password" size="small" round :disabled="disabled.disabled_password" @click="RestorePassword()">恢复密码</el-button>
                </div>
                <div class="top_right">
                    <el-input placeholder="请输入内容" v-model="SearchInput" class="input-with-select searchinput">
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
                    stripe
                    @selection-change="handleSelectionChange">

                    <el-table-column
                    type="selection"
                    width="40"
                    >
                    </el-table-column>
                    <el-table-column
                    label="序号"
                    :index="typeIndex"
                    type="index"
                    >
                    </el-table-column>
                    <el-table-column
                    label="用户ID"
                    prop="id"
                    >
                    </el-table-column>
                    <el-table-column
                    label="用户名"
                    prop="user_name"
                    sortable
                    >
                    </el-table-column>
                    <el-table-column
                    label="用户角色"
                    prop="role_name"
                    >
                    </el-table-column>
                    <el-table-column
                    label="手机号"
                    prop="phone_num"
                    >
                    </el-table-column>
                    <el-table-column
                    label="创建日期"
                    prop="create_time"
                    sortable
                    >
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <span class="table_todo table_look" @click="handleLook(scope.$index, scope.row)"></span>
                            <span class="table_todo table_write" @click="handleEdit(scope.$index, scope.row)"></span>
                            <span v-if=" scope.row.id == userinfo.id " class="table_todo table_del_no" ></span>
                            <span v-else class="table_todo table_del" @click="handleDelete(scope.$index, scope.row)"></span>
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
            <!-- 查看  S -->
            <el-dialog class="Look" :title="dialog.look.title" :visible.sync="dialog.look.dialogVisible" width="30%" >
                <div class="look_box">
                    <div class="L_B_row">
                        <div class="L_B_R_left">角色：</div>
                        <div class="L_B_R_right"><span v-text="dialog.look.user.role"></span></div>
                    </div>
                    <div class="L_B_row">
                        <div class="L_B_R_left">用户名：</div>
                        <div class="L_B_R_right"><span v-text="dialog.look.user.name"></span></div>
                    </div>
                    <div class="L_B_row">
                        <div class="L_B_R_left">手机号：</div>
                        <div class="L_B_R_right"><span v-text="dialog.look.user.phone"></span></div>
                    </div>
                    <div class="L_B_row">
                        <div class="L_B_R_left">邮箱：</div>
                        <div class="L_B_R_right"><span v-text="dialog.look.user.email"></span></div>
                    </div>
                    <div class="L_B_row">
                        <div class="L_B_R_left">创始人：</div>
                        <div class="L_B_R_right"><span v-text="dialog.look.user.creatpeople"></span></div>
                    </div>
                    <div class="L_B_row">
                        <div class="L_B_R_left">创建时间：</div>
                        <div class="L_B_R_right"><span v-text="dialog.look.user.date"></span></div>
                    </div>
                </div>
                <div class="dialog_footer">
                    <el-button class="goback" size="small" @click="dialog.look.dialogVisible = false">返 回</el-button>
                    <!-- <el-button size="small" type="primary" @click="Look_sure()">确 定</el-button> -->
                </div>
            </el-dialog>
            <!-- 查看 E -->
            <!-- 新建 编辑 S -->
            <el-dialog class="Write" :title="dialog.write.title" :visible.sync="dialog.write.dialogVisible" width="30%" >
                <div class="write_box">
                    <el-form ref="form" :model="dialog.write.user" label-width="80px">
                        <el-form-item label="用户名：">
                            <el-input v-model="dialog.write.user.name" placeholder="请输入用户名"></el-input>
                        </el-form-item>
                        <el-form-item label="邮箱：">
                            <el-input v-model="dialog.write.user.email" placeholder="请输入邮箱"></el-input>
                        </el-form-item>
                        <el-form-item label="手机号：">
                            <el-input v-model="dialog.write.user.phone" placeholder="请输入手机号"></el-input>
                        </el-form-item>
                        <el-form-item label="角色：">
                            <el-select v-model="dialog.write.user.role" placeholder="请选择角色">
                                <el-option :label="item.label" :value="item.value" v-for="(item,index) in dialog.write.user.rolelist"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>                  
                </div>
                <div class="dialog_footer">
                    <el-button class="gosure" size="small" type="primary" @click="Write_sure()">确 定</el-button>
                    <el-button class="goback" size="small" @click="dialog.write.dialogVisible = false">返 回</el-button>
                </div>
            </el-dialog>
            <!-- 新建 编辑 E -->
            <!-- 删除  S -->
            <el-dialog class="Del" :title="dialog.del.title" :visible.sync="dialog.del.dialogVisible" width="30%" >
                <div class="write_box">
                    <p class="del_tit" v-text="dialog.del.content">确认删除此用户吗？</p>
                </div>
                <div class="dialog_footer">
                    <el-button class="gosure" size="small" type="primary" @click="del_sure()">确 定</el-button>
                    <el-button class="goback" size="small" @click="dialog.del.dialogVisible = false">返 回</el-button>
                </div>
            </el-dialog>
            <!-- 删除  E -->
            <!-- 恢复密码  S -->
            <el-dialog class="Password" :title="dialog.Restore.title" :visible.sync="dialog.Restore.dialogVisible" width="30%" >
                <div class="write_box">
                    <p class="del_tit">确认为<span v-text="dialog.Restore.content.name"></span>(<span v-text="dialog.Restore.content.role"></span>)恢复密码？</p>
                    <!-- <p class="del_tit">是否为当前用户恢复密码？</p> -->
                </div>
                <div class="dialog_footer">
                    <el-button class="gosure" size="small" type="primary" @click="Restore_sure()">确 定</el-button>
                    <el-button class="goback" size="small" @click="dialog.Restore.dialogVisible = false">取 消</el-button>
                </div>
            </el-dialog>
            <!-- 恢复密码  E -->
            
        </div>

    </div>
</template>
<script>
export default {
    name:"User",
    data(){
        return{
            userinfo:{},
            SearchInput:'',
            disabled:{
                disabled_del: true,
                disabled_password: true,
            },
            table:{
                tableData: [ ],
                multipleSelection: []
            },
            page:{
                total: 0,      //总条数
                pageSize: 8,    //1页条数
                currentPage: 1, //当前页面位置
                allPages: 1, 
            },
            dialog: {
                look: {
                    title: "查看",
                    dialogVisible: false,
                    user:{
                        role: "",
                        name:"",
                        phone:"",
                        creatpeople:"",
                        date: "",
                        email:"",
                    }   
                },
                write: {
                    title: "用户",
                    dialogVisible: false,
                    user:{
                        lineinfo:{},
                        name:"",
                        phone:"",
                        email: "",
                        role: "",
                        rolelist : {},                        
                    }   
                },
                del: {
                    title: "删除用户",
                    dialogVisible: false,   
                    id:"",
                    listid:[],
                },
                Restore:{
                    all_index: 0,
                    title: "恢复密码",
                    dialogVisible: false,   
                    content:{
                        name: '',
                        role:"",
                    }
                }
            },
            btn_isdisabled: false,
            menuList:[],
            menuoperate: [], //页面操作
        }
    },
    methods:{
        typeIndex(index) {
            return index + (this.page.currentPage - 1) * 8 + 1;
        },
        RestorePassword(){
            let _this = this;
            // _this.all_password(_this.table.multipleSelection)
            if(_this.table.multipleSelection.length == 1){
                _this.dialog.Restore.dialogVisible = true;  //显示模态框
                let data = _this.table.multipleSelection[0];
                _this.dialog.Restore.content.name = data.user_name ;
                _this.dialog.Restore.content.role = data.role_name;
            }else {
                this.$message({
                    message: '只能为一个用户恢复密码',
                    type: 'warning'
                });
            }
        },
        Restore_sure(){
            let _this = this;
            _this.table.multipleSelection[0].pass_word = "123456";
            
            let  json = _this.table.multipleSelection[0] ;
            let formdata = _this.$config.formData(json); 
            _this.$axios.post( _this.$url.User_upt , formdata).then((res)=>{ 
                if(res.status == 200){
                    if(res.data.infocode == 1){
                        _this.getTable(_this.page.currentPage);
                        _this.$message.success(res.data.message);
                        _this.dialog.Restore.dialogVisible = false;
                    }
                }else {
                    _this.$message.error(res.data.message);
                }
            });
        },
        //表格 复选框
        handleSelectionChange(val) {
            let _this = this;
            this.table.multipleSelection = val;
        },
        //表格打开查看
        handleLook(index, row){
            let _this = this;
            _this.dialog.look.dialogVisible = true;
            _this.dialog.look.user.role = row.role_name ;
            _this.dialog.look.user.name = row.user_name ;
            _this.dialog.look.user.phone = row.phone_num ;
            _this.dialog.look.user.creatpeople = row.create_pepole ;
            _this.dialog.look.user.date = row.create_time ;
            _this.dialog.look.user.email = row.mailbox ;
        },
        //角色列表
        User_role(){
            let _this = this;
            let json = {data: JSON.stringify({'id' : _this.userinfo.role_id })};
            let formdata = _this.$config.formData(json); 
            _this.$axios.post( _this.$url.User_role , formdata).then((res)=>{ 
                if(res.status ==200){
                    let data = res.data ;
                    _this.dialog.write.user.rolelist = [];
                    let Arr = [] ;
                    data.forEach(function(v,i,arr){
                        let val = {};
                        val["label"] = v.role_name ;
                        val["value"] = v.id.toString() ;
                        val["role_rank"] = v.role_rank ;
                        Arr.push(val);
                    });
                    _this.dialog.write.user.rolelist = Arr;
                }
            });
        },
        //表格打开编辑
        handleEdit(index, row) {
            let _this = this;
            //undefined 为新增用户
            _this.User_role();
            _this.$nextTick(()=>{
                if(index == undefined){
                    let xz ;
                    _this.menuoperate.forEach(function(v,i,arr){
                        if(v == 2 ){
                            xz = v;
                            return;
                        }
                    });
                    if(xz == 2){
                        _this.dialog.write.dialogVisible = true;
                        _this.dialog.write.title = "新增用户";
                        _this.dialog.write.user.lineinfo = {};
                        _this.dialog.write.user.name = "";
                        _this.dialog.write.user.role = "";
                        _this.dialog.write.user.phone = "";
                        _this.dialog.write.user.email = "";
                    }
                    
                }else {
                    let bj ;
                    _this.menuoperate.forEach(function(v,i,arr){
                        if(v == 3 ){
                            bj = v;
                            return;
                        }
                    });
                    if(bj == 3){
                        if( _this.userinfo.id == row.id ){
                            _this.$message.warning("不能编辑自己");
                            _this.dialog.write.dialogVisible = false;
                        }else {
                            _this.dialog.write.dialogVisible = true;
                            _this.dialog.write.title = "编辑用户";
                            _this.dialog.write.user.lineinfo = row ;
                            _this.dialog.write.user.name = row.user_name;
                            _this.dialog.write.user.phone = row.phone_num ;
                            _this.dialog.write.user.email = row.mailbox  ;
                            _this.dialog.write.user.role = row.role_id.toString() ;
                        }
                    }
                } 
            });
        },
        Write_sure(){
            let _this = this;
            let title = _this.dialog.write.title ;
            let obj = {};
            obj = _this.dialog.write.user.rolelist.find((item)=>{
                if( item.value === _this.dialog.write.user.role ){
                    return item ;
                }
            });
            let Email_Reg = /^([\.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
            let phone_Reg = /^1[34578]\d{9}$/ ;

            if( _this.dialog.write.user.name != "" && _this.dialog.write.user.role != "" &&
                _this.dialog.write.user.phone != "" && _this.dialog.write.user.email != ""
            ){
                let flag = false;
                
                if( !Email_Reg.test(_this.dialog.write.user.email) ){
                    _this.$message.error("请填写正确邮箱信息！");
                }else if( !phone_Reg.test(_this.dialog.write.user.phone) ){
                    _this.$message.error("请填写正确手机号！");
                }else {
                    flag = true;
                }
                if(flag == true){
                    let json;
                    let url;
                    if(title == "新增用户"){
                        url = _this.$url.User_add ;
                        json = {
                            "role_name": obj.label ,
                            "role_id": obj.value,
                            "role_rank": obj.role_rank ,
                            "phone_num": _this.dialog.write.user.phone , //label值
                            "user_name": _this.dialog.write.user.name , //value值
                            "pass_word": "123456" ,
                            "mailbox" : _this.dialog.write.user.email ,
                            "create_pepole" : _this.userinfo.user_name ,
                            "create_pepole_id" : _this.userinfo.id ,
                            "create_pepole_rank" : _this.userinfo.role_rank ,
                            "create_role_id" : _this.userinfo.role_id ,
                            "create_role_name" : _this.userinfo.role_name ,
                            "store_name" :  _this.userinfo.store_name,
                            "store_root_id" : _this.userinfo.store_root_id
                        };
                    }else {
                        url = _this.$url.User_upt ;
                        json = {
                            "id" : _this.dialog.write.user.lineinfo.id ,
                            "role_name": obj.label ,
                            "role_id": obj.value,
                            "role_rank": obj.role_rank ,
                            "phone_num": _this.dialog.write.user.phone , //label值
                            "user_name": _this.dialog.write.user.name , //value值
                            "pass_word": _this.dialog.write.user.lineinfo.pass_word ,
                            "mailbox" : _this.dialog.write.user.email ,
                            "create_pepole" : _this.userinfo.user_name ,
                            "create_pepole_id" : _this.userinfo.id ,
                            "create_pepole_rank" : _this.userinfo.role_rank ,
                            "create_role_id" : _this.userinfo.role_id ,
                            "create_role_name" : _this.userinfo.role_name ,
                            "store_name" :  _this.userinfo.store_name,
                            "store_root_id" : _this.userinfo.store_root_id
                        };
                    }
                    let formdata = _this.$config.formData(json); 
                    _this.$axios.post( url , formdata).then((res)=>{ 
                        if(res.status == 200){
                            if(res.data.infocode == 1){
                                _this.getTable(_this.page.currentPage);
                                _this.$message.success(res.data.message);
                                _this.dialog.write.dialogVisible = false;
                            }else if(res.data.infocode == 3){
                                _this.$message.error(res.data.message);
                            }else if (res.data.infocode == 4){
                                _this.$message.error(res.data.message);
                            }else if (res.data.infocode == 5){
                                _this.$message.error(res.data.message);
                            }else {
                                _this.$message.error(res.data.message);
                            }
                        }else {
                            _this.$message.error(res.data.message);
                        }
                    });
                }
            
            }else {
                _this.$message.error("请填写完整信息！");
            }
        },
        // 表格打开删除
        handleDelete(index, row) {
            let _this = this;
            let sc ;
            _this.menuoperate.forEach(function(v,i,arr){
                if(v == 4 ){
                    sc = v ;
                    return;
                }
            });
            if(sc == 4){
                _this.dialog.del.dialogVisible = true;
                if(index != undefined){
                    if(row.role_rank == 0){
                        _this.dialog.del.dialogVisible = false;
                    }else {
                        _this.dialog.del.dialogVisible = true;
                        _this.dialog.del.content = "确认删除用户吗？" ;
                        _this.dialog.del.id = row.id ;
                    }
                }else {
                    _this.dialog.del.content = "确认删除选中用户吗？" ;
                    _this.dialog.del.listid = [];
                    
                    let del_notme = true ;
                    _this.table.multipleSelection.forEach(function(v,i,arr){
                        if(_this.userinfo.id == v.id){
                            _this.$message.error("选中用户中不能包含自己！");
                            del_notme = false;
                            return;
                        }else {
                            if(v.role_rank != 0 ){
                                // 0为不可删除
                                _this.dialog.del.listid.push(v.id);
                            }
                        }
                    });
                    if(del_notme == false){
                        _this.dialog.del.dialogVisible = false;
                    }else {
                        _this.dialog.del.dialogVisible = true;
                    }
                }
            };
            
        },
        //表格删除
        del_sure(){
            let _this = this;
            let json;
            let url;
            if (_this.dialog.del.content == "确认删除用户吗？" ){
                json = {"id" :  _this.dialog.del.id } ;
                url  = _this.$url.User_del ;
            }else {
                json = {data: JSON.stringify( {"ids" : _this.dialog.del.listid })} ;
                url  = _this.$url.User_listdel ;
            }
            let formdata = _this.$config.formData(json); 
            _this.$axios.post( url , formdata).then((res)=>{ 
                if( res.status == 200){
                    if( res.data.infocode == 1){
                        _this.$message.success(res.data.message);
                        _this.getTable(_this.page.currentPage);
                        _this.dialog.del.dialogVisible = false;
                    }else {
                        _this.$message.error(res.data.message);
                    }
                }else {
                    _this.$message.error(res.data.message);
                }
            }).catch((err)=>{
                 _this.$message.error("删除失败！");
            });
            _this.$refs.multipleTable.clearSelection();
            
        },
        //改变页码
        changePage(val){
            let _this = this;
            _this.getTable(val);
        },
        // 查看模态框 确认
        Look_sure(){
            let _this = this;
            _this.dialog.look.dialogVisible = false;
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
            _this.getTable(num);
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
                url = _this.$url.Usermanagelike ;
            }else {
                json = {data: JSON.stringify({'page' : ""+page+ "" , 'id' : _this.userinfo.role_id})};
                url = _this.$url.Usermanagelist ;
            }
            let formdata = _this.$config.formData(json); 
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
            //     if(res.status == 200){
                    // let data = res.data.data ;
                    // _this.menuList = data ;
                    _this.menuList = JSON.parse( sessionStorage.getItem("menus")) ;

                    _this.menu_test(_this.menuList,_this.$route.path);
                    // 恢复密码 S
                    let all_pw ;
                    _this.menuoperate.forEach(function(v,i,arr){
                        if(v == 8 ){
                            all_pw = v ;
                            return;
                        }else {
                        }
                    });
                    if(all_pw == 8){
                        _this.disabled.disabled_password = false;
                    }else {
                        _this.disabled.disabled_password = true;
                    }
                    // 恢复密码 E
                    
                    
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
        'table.multipleSelection': {
            handler: function(val,oldval){
                let _this = this;

                // //多选删除  S
                let all_sc ;
                _this.menuoperate.forEach(function(v,i,arr){
                    if(v == 4 ){
                        all_sc = v ;
                        return;
                    }
                });
                if(all_sc == 4){
                    // _this.disabled.disabled_del = false;
                    if(val.length != 0){
                        _this.disabled.disabled_del = false;

                    }else {
                        _this.disabled.disabled_del = true;    

                    }
                }else {
                    _this.disabled.disabled_del = true;
                }
                // //多选删除  E


                
            },
            deep: true
        }
    }
}
</script>
<style scoped>
    #user{
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
    #user .el-button {
        border: none;
        height: 34px;
    }
    #user .top_left .el-button+.el-button {
        margin-left: 10px;
    }
    #user .el-dialog__wrapper .el-button+.el-button {
        margin-left: 50px;
    }
    .table_look {
        background: url("../../assets/images/look_hover.png") no-repeat;
        background-size: 100% 100%;
    }
    .table_write {
        background: url("../../assets/images/write_hover.png") no-repeat;
        background-size: 100% 100%;
    }
    .table_write_no {
         background: url("../../assets/images/write.png") no-repeat;
        background-size: 100% 100%;
    }
    .table_del {
        background: url("../../assets/images/del_hover.png") no-repeat;
        background-size: 100% 100%;
    }
    .table_del_no {
        background: url("../../assets/images/del.png") no-repeat;
        background-size: 100% 100%;
    }
    .L_B_row{
        font-size: 0;
        color:  #bdc0d4;
        margin: 10px 0px;
    }
    .L_B_row>div {
        display: inline-block;
    }
    .L_B_row>div:first-child {
        width: 35%;
        font-size: 16px;
        text-align: right;
    }
    .L_B_row>div:last-child {
        width: 65%;
        font-size: 16px;
        padding-left: 40px;
        box-sizing: border-box; 
    }
    .goback {
        width: 120px;
        height: 38px;
        background-color: #6477c8;
        border-radius: 6px;
        color: #fff;
    }
    .write_box {
        color: #fff;
        margin-top: 6px;
    }
    #user .write_box  .el-input{
        width: 100%;
    }
    #user .write_box  .el-select>.el-input{
        width: 100% !important;
    }
    .gosure {
        width: 120px;
        height: 38px;
        background-color: #2f67c2;
        border-radius: 6px;
    }
    .write_box .goback {
        margin-left: 55px;
    }
    #user .dialog_footer {
        margin-bottom: 20px;
    }
    .del_tit {
        text-align: center;
        font-size: 16px;
        margin: 22px 0 40px;
    }
    /* .Password .goback {
        margin-left: 55px;
    } */
</style>
