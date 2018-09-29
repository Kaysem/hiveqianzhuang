<template>
    <div id="role">
        <div class="bg">
            <p class="tip">角色管理</p>
            <div class="top">
                <div class="top_left">
                    <el-button class="btn_add" size="small" round @click="handleEdit()">新增</el-button>
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
                    >

                    <el-table-column
                    label="序号"
                    :index="typeIndex"
                    type="index"
                    >
                    </el-table-column>
                    <el-table-column
                    label="角色ID"
                    prop="id"
                    >
                    </el-table-column>
                    <el-table-column
                    label="角色名称"
                    prop="role_name"
                    sortable
                    >
                    </el-table-column>
                    <el-table-column
                    label="创建人"
                    prop="create_pepole"
                    sortable
                    >
                    </el-table-column>
                    <el-table-column
                    label="创建时间"
                    prop="create_date"
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
            <!-- <el-dialog class="Look" :title="dialog.look.title" :visible.sync="dialog.look.dialogVisible" width="30%" >
               
                <div class="dialog_footer">
                    <el-button class="goback" size="small" @click="dialog.look.dialogVisible = false">返 回</el-button>
                </div>
            </el-dialog> -->
            <!-- 查看 E -->
            <!-- 新建 编辑 S -->
            <el-dialog class="Write" :title="dialog.write.title" :visible.sync="dialog.write.dialogVisible" width="30%" >
                <div  v-if="dialog.write.istip">
                    <div class="write_box write_tip">
                        <p>编辑角色会导致角色中所有用户使用权限改变</p>
                        <p>是否确认要进行编辑？</p>        
                    </div>
                    <div class="dialog_footer">
                        <el-button class="gosure" size="small" type="primary" @click="writeTip()">确 定</el-button>
                        <el-button class="goback" size="small" @click="dialog.write.dialogVisible = false">返 回</el-button>
                    </div>
                </div>
                <div v-else>
                    <div class="write_box">
                        <div  v-if="dialog.write.content.isdisabled == false">
                            <div class="w_c_title">
                                <div class="left">
                                    <div>角色名称：</div>
                                    <el-input  v-model="dialog.write.content.rolename" placeholder="请输入内容"></el-input>
                                </div>
                                <div class="right">
                                    <div>角色等级：</div>
                                    <el-select  v-model="dialog.write.content.select" placeholder="请选择">
                                        <el-option
                                            v-for="item in dialog.write.content.selectvalue"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                                <div class="m_top">
                                    <div>父级：</div>
                                    <el-select  v-model="dialog.write.content.father_select" placeholder="请选择">
                                        <el-option
                                            v-for="item in dialog.write.content.father_selectvalue"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                            </div>
                            
                        </div>
                        
                        <div v-else>
                            <el-row>
                                <el-col :span="8" class="row_top">
                                    <div class="grid-content">
                                        角色名称： <i v-text="dialog.write.content.rolename"></i>
                                    </div>
                                </el-col>
                                <el-col :span="8" class="row_top">
                                    <div class="grid-content">
                                        创建人： <i v-text="dialog.write.content.creatpeople"></i>
                                    </div>
                                </el-col>
                                <el-col :span="8">
                                    <div class="grid-content">
                                        角色等级：
                                        <el-select :disabled="dialog.write.content.isdisabled" v-model="dialog.write.content.select" placeholder="请选择">
                                            <el-option
                                            v-for="item in dialog.write.content.selectvalue"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </div>
                                </el-col>
                                
                            </el-row>
                            <div class="m_top">
                                父级：
                                <el-select  :disabled="dialog.write.content.isdisabled" v-model="dialog.write.content.father_select" placeholder="请选择">
                                    <el-option
                                        v-for="item in dialog.write.content.father_selectvalue"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>

                        <!-- 层级权限 S-->
                            <div class="hierarch">
                                <el-collapse v-model="dialog.write.content.hierarch.activeNames" @change="handlehierarch">
                                    <el-collapse-item title="层级权限" name="1">
                                        <el-tree
                                            :data="dialog.write.content.hierarch.treedata"
                                            :show-checkbox = "dialog.write.content.show_checkbox"
                                            default-expand-all
                                            node-key="id"
                                            ref="W_H_tree"
                                            highlight-current
                                            :props="dialog.write.content.hierarch.defaultProps">
                                        </el-tree>
                                    </el-collapse-item>                           
                                </el-collapse>
                            </div>
                            <!-- 管理权限 S-->
                            <div class="administration">
                                <el-collapse v-model="dialog.write.content.administration.activeNames" @change="handleadministration">
                                    <el-collapse-item title="管理权限" name="2">
                                        <el-tree
                                            :data="dialog.write.content.administration.treedata"
                                            :show-checkbox = "dialog.write.content.show_checkbox"
                                            default-expand-all
                                            node-key="id"
                                            ref="W_A_tree"
                                            highlight-current
                                            :props="dialog.write.content.administration.defaultProps">
                                        </el-tree>
                                    </el-collapse-item>                           
                                </el-collapse>
                            </div>
                            <!-- 目录权限 S-->
                            <div class="catalog">
                                <el-collapse v-model="dialog.write.content.catalog.activeNames" @change="handlecatalog">
                                    <el-collapse-item title="目录权限" name="3">
                                        <el-tree
                                            :data="dialog.write.content.catalog.treedata"
                                            :show-checkbox = "dialog.write.content.show_checkbox"
                                            default-expand-all
                                            node-key="id"
                                            ref="W_C_tree"
                                            highlight-current
                                            :props="dialog.write.content.catalog.defaultProps">
                                        </el-tree>
                                    </el-collapse-item>                           
                                </el-collapse>
                            </div>

                    </div>
                    <div class="dialog_footer"  v-if="dialog.write.content.isdisabled == false">
                        <el-button class="gosure" size="small" type="primary" @click="Write_sure()">确 定</el-button>
                        <el-button class="goback" size="small"  @click="writeback()">返 回</el-button>
                    </div>
                    <div class="dialog_footer" v-else>
                        <el-button class="gosure" size="small" type="primary" @click="Look_sure()">确 定</el-button>
                    </div>


                </div>
                    
            </el-dialog>
            <!-- 新建 编辑 E -->
            <!-- 删除  S -->
            <el-dialog class="Del" :title="dialog.del.title" :visible.sync="dialog.del.dialogVisible" width="30%" >
                <div v-if="dialog.del.deleted == true">
                    <div class="write_box">
                        <p class="del_tit">确认删除该角色吗？</p>
                    </div>
                    <div class="dialog_footer">
                        <el-button class="gosure" size="small" type="primary" @click="del_sure()">确 定</el-button>
                        <el-button class="goback" size="small" @click="dialog.del.dialogVisible = false">返 回</el-button>                    
                    </div>
                </div>
                <div v-else>
                    <div class="write_box">
                        <p class="del_tit">该角色中存在用户，不可删除</p>
                    </div>
                    <div class="dialog_footer">
                        <el-button class="gosure" size="small" type="primary" @click="dialog.del.dialogVisible = false">确 定</el-button>
                        <!-- <el-button class="goback" size="small" @click="dialog.del.dialogVisible = false">返 回</el-button>                     -->
                    </div>
                </div>
                
            </el-dialog>
            <!-- 删除  E -->
            
        </div>

    </div>
</template>
<script>
export default {
    name:"Role",
    data(){
        return{
            userinfo: {},
            SearchInput:'',
            disabled:{
                disabled_del: true,
                // disabled_password: true,
            },
            table:{
                tableData: [ ],
                multipleSelection: []
            },
            page:{
                total: 0,      //总条数
                pageSize: 8,    //1页条数
                currentPage: 1, //当前页面位置
                allPages: 1, //一共多少页  用于尾页
                // type: "",
            },
            dialog: {
                look: {
                    title: "查看",
                    dialogVisible: false,
                },
                write: {
                    title: "用户",
                    dialogVisible: false,
                    istip: true, //编辑内容是否显示
                    content:{
                        rowlist:{},
                        writeid : "" ,
                        rolename: '',  //角色名称
                        select: '' , 
                        selectvalue: [],  //角色等级
                        father_select: "",
                        father_selectvalue: [],
                        creatpeople: "", //创建人                      
                        selectOption: [
                            { value : "1" , label: "一级"},
                            { value : "2" , label: "二级"},
                            { value : "3" , label: "三级"},
                            { value : "4" , label: "四级"},
                            { value : "5" , label: "五级"},
                            { value : "6" , label: "六级"},
                            { value : "7" , label: "七级"},
                            { value : "8" , label: "八级"},
                            { value : "9" , label: "九级"},
                            { value : "10" ,label: "十级"},
                            { value : "11" ,label: "十一级"},
                            { value : "12" ,label: "十二级"},
                            { value : "13" ,label: "十三级"},
                            { value : "14" ,label: "十四级"},
                            { value : "15" ,label: "十五级"},
                            { value : "16" ,label: "十六级"},
                            { value : "17" ,label: "十七级"},
                            { value : "18" ,label: "十八级"},
                            { value : "19" ,label: "十九级"},
                            { value : "20" ,label: "二十级"},
                        ],
                        isdisabled: true, //是否可编辑
                        show_checkbox: true,  //是否显示多选盒子                       
                        hierarch:{
                            activeNames: ['1'],
                            treedata: [ ],
                            bj_tree: [],
                            defaultProps: {
                                children: 'children',
                                label: 'label'
                            } ,
                            checkedKey:[]
                        }, //层级权限
                        administration:{
                            activeNames: ['2'],
                            treedata: [ ],
                            bj_tree: [],
                            defaultProps: {
                                children: 'children',
                                label: 'label'
                            } ,
                            checkedKey:[]
                        }, //管理权限
                        catalog:{
                            activeNames: ['3'],
                            treedata: [ ],
                            bj_tree: [],
                            defaultProps: {
                                children: 'children',
                                label: 'label'
                            } ,
                            checkedKey:[]
                            
                        }, //目录权限
                    },
                    
                    
                },
                del: {
                    title: "警告",
                    dialogVisible: false,
                    deleted: true, //当前行可以删除  false为不可删除
                    delid: "" ,
                },
                
            },
            tree:{
                first: {

                },
                second:{

                }
            }, //节点树
            menuList:[],
            menuoperate: [], //页面操作
            isfirst_edit: 0 ,
        }
    },
    methods:{
        typeIndex(index) {
            return index + (this.page.currentPage - 1) * 8 + 1;
        },
        lastSelectStyle (){
            let _this = this;
            // 最后一级树形结构图 横向显示
            // $(".el-tree-node__children");
            _this.$nextTick(function(){
                // 循环获取空值的父级设置横向显示  S 
                let nullDom = $(".el-tree-node__children");
                for(let i = 0 ; i < nullDom.length ; i++){
                    let dom = $(nullDom[i]);
                    if( dom.text() == "" ){
                        dom.parent("div").css("display","inline-block");
                        dom.siblings("div").children("label").children("span").children("span").css("borderRadius","50%");
                    }
                }
                // 循环获取空值的父级设置横向显示  E 
            })
        },
        //表格打开查看
        handleLook(index, row){
            let _this = this;
            if( row.role_rank == 0 ){
                // role_rank 为0  数据库没数据 
                _this.dialog.write.dialogVisible = false;
                _this.$message.warning("您已拥有所有权限！");

                _this.lastSelectStyle();

            }else {
                _this.dialog.write.content.rowlist = row ;
                _this.dialog.write.dialogVisible = true;
                _this.dialog.write.title = "查看用户";
                _this.dialog.write.istip = false; //编辑提示是是否显示
                _this.dialog.write.content.isdisabled = true; //输入框是否可编辑
                // _this.dialog.write.content.show_checkbox = true;  //显示多选框
                _this.getrolevip(_this.userinfo.role_rank);
                _this.dialog.write.content.rolename = row.role_name;


                _this.dialog.write.content.select = row.role_rank;
                _this.dialog.write.content.father_select =_this.dialog.write.content.rowlist.role_fathter_name;

                _this.dialog.write.content.creatpeople = row.create_pepole;
                _this.dialog.write.content.writeid = row.id ;

                _this.isfirst_edit = 1 ;

                _this.dialog.write.content.hierarch.checkedKey = [];
                _this.dialog.write.content.administration.checkedKey = [];
                _this.dialog.write.content.catalog.checkedKey = [];
                // _this.dialog.write.content.hierarch.bj_tree = _this.disabled_tree(JSON.parse(row.role_limit)) ;
                _this.dialog.write.content.administration.bj_tree = _this.disabled_tree(JSON.parse(row.role_tree_data)) ;
                _this.dialog.write.content.catalog.bj_tree = _this.disabled_tree(JSON.parse(row.role_tree_data2)) ;
                _this.dialog.write.content.hierarch.treedata = [];
                _this.dialog.write.content.administration.treedata = [];
                _this.dialog.write.content.catalog.treedata = [];
                // _this.dialog.write.content.hierarch.treedata  = _this.dialog.write.content.hierarch.bj_tree;
                _this.dialog.write.content.administration.treedata  = _this.dialog.write.content.administration.bj_tree;
                _this.dialog.write.content.catalog.treedata  = _this.dialog.write.content.catalog.bj_tree;
                // let H_checked =  _this.pushchoose(_this.dialog.write.content.hierarch.bj_tree,_this.dialog.write.content.hierarch.checkedKey) ;
                let A_checked =  _this.pushchoose(_this.dialog.write.content.administration.bj_tree,_this.dialog.write.content.administration.checkedKey) ;
                let C_checked =  _this.pushchoose(_this.dialog.write.content.catalog.bj_tree,_this.dialog.write.content.catalog.checkedKey) ;
                _this.$nextTick(()=>{
                    _this.$refs.W_A_tree.setCheckedKeys(_this.dialog.write.content.hierarch.checkedKey);
                    
                    // _this.$refs.W_H_tree.setCheckedKeys(H_checked);
                    _this.$refs.W_A_tree.setCheckedKeys(A_checked);
                    _this.$refs.W_C_tree.setCheckedKeys(C_checked);     
                });
                _this.lastSelectStyle();
            }
        },
        disabled_chooseall_tree(table_arr){
            let _this = this;
            let treeDataShow = new Array();
            if(table_arr.length != 0 ){
                table_arr.forEach(function(v,i,arr){
                    v['disabled'] = true ;
                    v['tree_state'] = '1' ;
                    if( v.children != undefined && v.children.length != 0 ){
                       _this.disabled_chooseall_tree(v.children);
                    }
                    treeDataShow[i] = v;
                })
            }
            return treeDataShow;
        },
        disabled_tree(table_arr){
            let _this = this;
            let treeDataShow = new Array();
            if(table_arr.length != 0 ){
                table_arr.forEach(function(v,i,arr){
                    v['disabled'] = true ;
                    if( v.children != undefined && v.children.length != 0 ){
                       _this.disabled_tree(v.children);
                    }
                    treeDataShow[i] = v;
                })
            }
            return treeDataShow;
        },
        not_disabled_tree(table_arr){
            let _this = this;
            let treeDataShow = new Array();
            if(table_arr.length != 0 ){
                table_arr.forEach(function(v,i,arr){
                    v['disabled'] = false ;
                    if( v.children != undefined && v.children.length != 0 ){
                       _this.not_disabled_tree(v.children);
                    }
                    treeDataShow[i] = v;
                })
            }
            return treeDataShow;
        },
        //递归的方法  返回elemenui tree  第一个
        look_tree(table_arr){
            let _this = this;
            let treeDataShow = new Array();
            if(table_arr.length != 0 ){
                table_arr.forEach(function(v,i,arr){
                    if( v.tree_state == 1 ){
                        let obj = {};
                        obj.id  = v.id ;
                        obj.label = v.label ;
                        if( v.children != undefined && v.children.length != 0 ){
                            obj.children = _this.look_tree(v.children);
                        }
                        treeDataShow[i] = obj;
                    }
                })
            }
            return treeDataShow;
        },
        //递归的方法  返回elemenui tree  第一个
        diguiTree0(table_arr){
            let _this = this;
            let treeDataShow = new Array();
            if(table_arr.length != 0 ){
                table_arr.forEach(function(v,i,arr){
                    v['label'] = v['store_name'];
                    // v['disabled'] = false ;
                    if( v.children != undefined && v.children.length != 0 ){
                       _this.diguiTree0(v.children);
                    }
                    treeDataShow[i] = v;
                })
            }
            return treeDataShow;
        },
        //递归的方法  返回elemenui tree  后俩个数据
        diguiTree(table_arr){
            let _this = this;
            var treeDataShow = new Array();
            if(table_arr.length != 0 ){
                table_arr.forEach(function(v,i,arr){
                    v['label'] = v.tree_name;
                    // v['disabled'] = false ;
                    if( v.children != undefined && v.children.length != 0 ){
                       _this.diguiTree(v.children);
                    }
                    treeDataShow[i] = v;
                })
            }
            return treeDataShow;
        },
        // 改变树形状态 
        changeState(treeData,rres){
            let _this = this;
            let TREE = [];
            if(treeData != null && treeData.length > 0 ) {
                $.each(treeData,function(i,d){
                   d['tree_state'] = "0" ;
                   d['disabled'] = false ;
                    if(rres != null && rres.length > 0 ) {
                        $.each(rres,function(j,k){
                            if(d.id == k ){
                                d['tree_state'] = "1" ;
                            }else {
                            }
                        });
                    }
                    if(d.children != null && d.children.length > 0){
                        d.children = _this.changeState(d.children,rres);
                    }
                });
            }
            TREE = treeData;
            return TREE;
        },
        // 获取 权限 树新结构
        getListTree0(role_id , role_rank){
            let _this = this;
            let json ;
            let url ;
            _this.dialog.write.content.hierarch.treedata = [];
            if( _this.isfirst_edit == 1 ){
                json = {data: JSON.stringify({'id': "1" , "role_id" : ""+_this.dialog.write.content.rowlist.id+"" ,"role_rank" : _this.dialog.write.content.rowlist.role_rank })};
                let formdata = _this.$config.formData(json); 
                url = _this.$url.role_treedata_one_edit ;
                _this.isfirst_edit = 0 ;
                _this.$axios.post( url , formdata ).then((res) => { 
                    let one_tree  = _this.diguiTree0(res.data);
                    if( _this.dialog.write.title == "查看用户"){
                        _this.dialog.write.content.hierarch.treedata = _this.disabled_tree(one_tree);
                        let H_checked =  _this.pushchoose(_this.dialog.write.content.hierarch.treedata, _this.dialog.write.content.hierarch.checkedKey) ;
                        _this.$nextTick(()=>{
                            _this.$refs.W_H_tree.setCheckedKeys( _this.dialog.write.content.hierarch.checkedKey);
                        });
                    }else{
                        _this.dialog.write.content.hierarch.treedata =_this.not_disabled_tree(one_tree);
                        _this.dialog.write.content.hierarch.checkedKey =  _this.pushchoose(_this.dialog.write.content.hierarch.treedata, _this.dialog.write.content.hierarch.checkedKey) ;
                    }
                    _this.lastSelectStyle();
                });
            }else if( _this.isfirst_edit == 0 ){
                json = {data: JSON.stringify({'id': "1" , "role_id" : role_id ,"role_rank" : role_rank })};
                let formdata = _this.$config.formData(json); 
                url = _this.$url.role_treedata_one ;
                _this.$axios.post( url , formdata ).then((res) => { 
                    let one_tree  = _this.diguiTree0(res.data);
                    _this.dialog.write.content.hierarch.treedata =_this.not_disabled_tree(one_tree);
                    _this.lastSelectStyle();
                });
            }else {
                url = "";
            }
            // _this.$axios.post( url , formdata ).then((res) => { 
            //     let one_tree  = _this.diguiTree0(res.data);
            //     // if( _this.dialog.write.title == "查看用户"){
            //     //     _this.dialog.write.content.hierarch.treedata = _this.disabled_tree(one_tree);
            //     // }else{
            //          _this.dialog.write.content.hierarch.treedata =_this.not_disabled_tree(one_tree);
            //     // }
            //     // _this.dialog.write.content.hierarch.treedata = one_tree ;
            //     _this.lastSelectStyle();
            // });

        },
        // 获取 管理权限 树新结构
        getListTree1(role_id , role_rank){
            let _this = this;
            let json = {data: JSON.stringify({'id': "1" , "role_id" : role_id ,"role_rank" : role_rank })};
            let formdata = _this.$config.formData(json); 
            _this.dialog.write.content.administration.treedata =[];
            _this.$axios.post( _this.$url.role_treedata , formdata ).then((res) => { 
                let second_tree  = _this.diguiTree(res.data);
                if( _this.dialog.write.title == "查看用户"){
                    _this.dialog.write.content.administration.treedata = _this.disabled_tree(second_tree);
                }else{
                     _this.dialog.write.content.administration.treedata =_this.not_disabled_tree(second_tree);
                }
                _this.lastSelectStyle();
            });
        },
        // 获取 目录权限 树新结构
        getListTree2(role_id , role_rank){
            let _this = this;
            let json = {data: JSON.stringify({'id': "99" , "role_id" : role_id ,"role_rank" : role_rank })};
            let formdata = _this.$config.formData(json); 
            _this.dialog.write.content.catalog.treedata =  [];
            _this.$axios.post( _this.$url.role_treedata , formdata ).then((res) => { 
                let third_tree  = _this.diguiTree(res.data);
                if( _this.dialog.write.title == "查看用户"){
                    _this.dialog.write.content.catalog.treedata = _this.disabled_tree(third_tree);
                }else{
                    _this.dialog.write.content.catalog.treedata =_this.not_disabled_tree(third_tree);
                }
                _this.lastSelectStyle();
            });
        },
        // 获取 所选中的 选项组成数组
        pushchoose(tree,ARR){
            let _this = this;
            if(tree != null && tree.length > 0 ) { 
                tree.forEach(function(v,i,arr){
                    if(v.tree_state == 1){
                        ARR.push(v.id) ;
                    }
                    if(v.children != null && v.children.length != 0) {
                        _this.pushchoose(v.children,ARR);
                    }
                })
            }
            return ARR ;
        },
        // 禁止点击
        no_click(table_arr){
            let _this = this;
            var treeDataShow = new Array();
            if(table_arr.length != 0 ){
                table_arr.forEach(function(v,i,arr){
                    // v['disabled'] = true ;
                    if( v.children != undefined && v.children.length != 0 ){
                       _this.no_click(v.children);
                    }
                    treeDataShow[i] = v;
                })
            }
            return treeDataShow;
        },
        getrolevip(num){
            let _this = this;
            let json ;
            if( _this.dialog.write.title == "查看用户"){
                json = {"role_rank" : ""+num+"" , "check" : "1"}
            }else {
                json = {"role_rank" : ""+num+"" , "check" : "0"}
            }
            let formdata = _this.$config.formData(json); 
            _this.$axios.post(_this.$url.getrolerank, formdata).then((res)=>{
                let data = res.data;
                _this.dialog.write.content.selectvalue = [] ;
                let ARR = [];
                data.forEach(function(v,i,arr){
                    let obj = {};
                    obj["label"] = v.value ; 
                    obj['value'] = v.key.toString() ;
                    ARR.push(obj);
                });
                _this.dialog.write.content.selectvalue = ARR ;
            }).catch((err)=>{
            });
        },
        getrolefathervip(num){
            let _this = this;
            
            let N = Number(num)-Number(_this.userinfo.role_rank) ;
           
            if( num != ""){
                if( N == 1){
                    //一级不请求  就是登录的用户的等级
                    _this.dialog.write.content.father_select = _this.userinfo.role_id ;
                    _this.dialog.write.content.father_selectvalue = [{
                        "label": _this.userinfo.role_name ,
                        "value": _this.userinfo.role_id ,
                        "rank" : _this.userinfo.role_rank
                    }] ;
                }else{
                    let json = {"role_rank" : ""+num+""};
                    let formdata = _this.$config.formData(json);
                    _this.$axios.post(_this.$url.fatherrolerank, formdata).then((res)=>{
                        let data = res.data;
                        _this.dialog.write.content.father_selectvalue = [] ;
                        let ARR = [];
                        data.forEach(function(v,i,arr){
                            let obj = {};
                            obj["label"] = v.role_name ; 
                            obj['value'] = v.id.toString() ;
                            obj['rank'] = v.role_rank ;
                            ARR.push(obj);
                        });
                        _this.dialog.write.content.father_selectvalue = ARR ;
                        _this.dialog.write.content.father_select = "";

                        if(_this.dialog.write.title == "新增角色"){
                            _this.dialog.write.content.father_select = "" ;
                        }else {
                            _this.dialog.write.content.father_selectvalue.forEach(function(v,i,arr){
                                if(v.value == _this.dialog.write.content.rowlist.role_fathter_name ){
                                    _this.dialog.write.content.father_select = v["value"] ;
                                    return;
                                }
                            });
                        }
                    });
                };
            }
        },
        //表格打开编辑
        handleEdit(index, row) {
            let _this = this;
            //undefined 为新增用户
            _this.dialog.write.content.isdisabled = false; //输入框是否可编辑
            _this.dialog.write.content.creatpeople = ""; //创建人 编辑和新建不显示
            _this.dialog.write.content.show_checkbox = true;  //显示多选框

            _this.dialog.write.content.hierarch.checkedKey = [];
            _this.dialog.write.content.administration.checkedKey = [];
            _this.dialog.write.content.catalog.checkedKey = [];

            _this.dialog.write.content.rowlist = row ;
            if(index == undefined){
                _this.menuoperate.forEach(function(v,i,arr){
                       if( v == 2){
                            _this.getListTree0(_this.userinfo.role_id,_this.userinfo.role_rank);
                            _this.getListTree1(_this.userinfo.role_id,_this.userinfo.role_rank);
                            _this.getListTree2(_this.userinfo.role_id,_this.userinfo.role_rank);
                            _this.lastSelectStyle();

                            _this.dialog.write.dialogVisible = true;
                            _this.dialog.write.title = "新增角色";
                            _this.getrolevip(_this.userinfo.role_rank);
                            
                            _this.dialog.write.istip = false; //编辑提示是是否显示
                            _this.dialog.write.content.rolename = "";

                            _this.dialog.write.content.select = "";
                            _this.dialog.write.content.father_select = "" ;
                            _this.dialog.write.content.father_selectvalue = [];
                            _this.dialog.write.content.creatpeople = "";
                            _this.dialog.write.content.writeid = "" ;
                            _this.$nextTick(()=>{
                                _this.$refs.W_H_tree.setCheckedKeys([]);
                                _this.$refs.W_A_tree.setCheckedKeys([]);
                                _this.$refs.W_C_tree.setCheckedKeys([]);
                                // $(".el-checkbox__original").attr("disabled","false") ;
                            });
                            return ;
                       }
                });
            }else {
                _this.menuoperate.forEach(function(v,i,arr){ 
                    if( v == 3 ){
                         _this.dialog.write.dialogVisible = true;
                            if(_this.userinfo.role_id == row.id){
                                _this.dialog.write.dialogVisible = false;
                                _this.$message.warning("不能编辑自己的角色");
                            }else {
                                if (Math.abs( Number(row.role_rank) - Number(_this.userinfo.role_rank) )<= 3 ){
                                    _this.dialog.write.title = "编辑角色";
                                    _this.dialog.write.dialogVisible = true;
                                    _this.dialog.write.istip = true; //编辑提示是是否显示
                                    // _this.dialog.write.content.
                                    _this.dialog.write.content.rolename = row.role_name;
                                    _this.dialog.write.content.select = row.role_rank ;
                                    _this.dialog.write.content.father_select = row.role_fathter_name ;
                                    _this.dialog.write.content.creatpeople = "";
                                    _this.dialog.write.content.writeid = row.id ;

                                    _this.dialog.write.content.hierarch.bj_tree = [];
                                    _this.dialog.write.content.administration.bj_tree = [];
                                    _this.dialog.write.content.catalog.bj_tree = [];

                                    // _this.dialog.write.content.hierarch.bj_tree = _this.not_disabled_tree(JSON.parse(row.role_limit)) ;
                                    _this.dialog.write.content.administration.bj_tree = _this.not_disabled_tree(JSON.parse(row.role_tree_data)) ;
                                    _this.dialog.write.content.catalog.bj_tree = _this.not_disabled_tree(JSON.parse(row.role_tree_data2)) ;


                                    // _this.dialog.write.content.hierarch.treedata = [];
                                    _this.dialog.write.content.administration.treedata = [];
                                    _this.dialog.write.content.catalog.treedata = [];
                                    // _this.dialog.write.content.hierarch.treedata  =  _this.dialog.write.content.hierarch.bj_tree;
                                    _this.dialog.write.content.administration.treedata  = _this.dialog.write.content.administration.bj_tree;
                                    _this.dialog.write.content.catalog.treedata  = _this.dialog.write.content.catalog.bj_tree ;
                                    _this.isfirst_edit = 1 ;
                                    _this.getrolevip(_this.userinfo.role_rank);
                                }else {
                                    _this.$message.warning("只能编辑低于您三级之内的角色！");
                                    _this.dialog.write.dialogVisible = false;
                                }
                            }
                         return;
                    }
                });
            }   
            _this.lastSelectStyle();
            this.$nextTick(() => {
                  // dom元素更新后执行， 因此此处能正确打印出更改之后的值；
                  $('.el-checkbox').css('display','inline-block');
                // $(".el-checkbox__original").removeAttr("disabled") ;
                  
            });
            // 这个放在添加修改里面
        },
        Write_sure(){
            let _this = this;
            _this.dialog.write.istip = false;
        
            let H_tree = _this.changeState(_this.dialog.write.content.hierarch.treedata , _this.$refs.W_H_tree.getCheckedKeys()) ;
            let A_tree = _this.changeState(_this.dialog.write.content.administration.treedata , _this.$refs.W_A_tree.getCheckedKeys()) ;
            let C_tree = _this.changeState(_this.dialog.write.content.catalog.treedata , _this.$refs.W_C_tree.getCheckedKeys()) ;

            if( _this.userinfo.user_name != "" &&
             _this.dialog.write.content.rolename  != "" &&
             _this.dialog.write.content.select  != "" &&
             _this.dialog.write.content.father_select  != ""
            //   &&
            //  _this.$refs.W_H_tree.getCheckedKeys().length != 0 &&
            //  _this.$refs.W_A_tree.getCheckedKeys().length != 0 && 
            //  _this.$refs.W_C_tree.getCheckedKeys() != 0 
             ){
                let json ;
                let url ;
                if(_this.dialog.write.title == "新增角色"){
                    json = {
                        "create_pepole" : _this.userinfo.user_name ,
                        "create_pepole_id" : _this.userinfo.id ,
                        "create_pepole_rank" : _this.userinfo.role_rank,
                        "role_name" : _this.dialog.write.content.rolename ,
                        "role_rank" : _this.dialog.write.content.select ,
                        "role_limit" : JSON.stringify(H_tree) ,
                        "role_tree_data" : JSON.stringify(A_tree) ,
                        "role_tree_data2" : JSON.stringify(C_tree) ,
                        "role_fathter_name" : _this.dialog.write.content.father_select ,
                    }
                    url = _this.$url.role_add_H_A_C ;
                }else {
                    json = {
                        "id": _this.dialog.write.content.writeid ,
                        "create_pepole" : _this.userinfo.user_name ,
                        "create_pepole_id" : _this.userinfo.id ,
                        "create_pepole_rank" : _this.userinfo.role_rank,
                        "role_name" : _this.dialog.write.content.rolename ,
                        "role_rank" : _this.dialog.write.content.select ,
                        "role_limit" : JSON.stringify(H_tree) ,
                        "role_tree_data" : JSON.stringify(A_tree) ,
                        "role_tree_data2" : JSON.stringify(C_tree) ,
                        "role_fathter_name" : _this.dialog.write.content.father_select ,
                    }
                    url = _this.$url.role_upt_H_A_C ;
                };
                let formdata = _this.$config.formData(json); 
                _this.$axios.post( url , formdata).then((res)=>{
                    if(res.data.infocode == 1){
                        _this.$message.success(res.data.message);
                        _this.getTable(_this.page.currentPage);
                        _this.dialog.write.dialogVisible = false;
                    }else {
                        _this.$message.error(res.data.message)
                    }
                });

            }else {
                _this.$message.error("请填写完整信息！")
            }
        },
        writeTip(){
            let _this = this;
            _this.dialog.write.istip = false;

            // let H_checked =  _this.pushchoose(_this.dialog.write.content.hierarch.bj_tree,_this.dialog.write.content.hierarch.checkedKey) ;
            let A_checked =  _this.pushchoose(_this.dialog.write.content.administration.bj_tree,_this.dialog.write.content.administration.checkedKey) ;
            let C_checked =  _this.pushchoose(_this.dialog.write.content.catalog.bj_tree,_this.dialog.write.content.catalog.checkedKey) ;
            
            _this.$nextTick(()=>{
                _this.$refs.W_H_tree.setCheckedKeys( _this.dialog.write.content.hierarch.checkedKey);
                // _this.$refs.W_H_tree.setCheckedKeys(H_checked);
                _this.$refs.W_A_tree.setCheckedKeys(A_checked);
                _this.$refs.W_C_tree.setCheckedKeys(C_checked);
                // $(".el-checkbox__original").removeAttr("disabled"); 
                
            });
            _this.lastSelectStyle();
        },
        writeback(){
            let _this = this;
            _this.dialog.write.dialogVisible = false;
            // _this.dialog.write.istip = true;
        },
        // 表格打开删除
        handleDelete(index, row) {
            let _this = this;
            let uuu ;
            _this.menuoperate.forEach(function(v,i,arr){
                if( v == 4 ){
                    uuu = v;
                    return ;
                }else {
                }
            });
            if(uuu == 4){
                if (Math.abs( Number(row.role_rank) - Number(_this.userinfo.role_rank) )<= 3 ){
                    _this.dialog.del.dialogVisible = true;
                    _this.dialog.del.deleted = true; //先显示可以删除
                    _this.dialog.del.delid = row.id ; 
                }else {
                    _this.$message.warning("只能删除低于您三级之内的角色！");
                    _this.dialog.del.dialogVisible = false;
                    _this.dialog.del.deleted = false; //先显示可以删除
                    _this.dialog.del.delid = "" ; 
                }
            }else {
                _this.dialog.del.dialogVisible = false;
            }
        },
        //表格删除
        del_sure(){
            let _this = this ;
            let json = {'id' : _this.dialog.del.delid };
            let formdata = _this.$config.formData(json); 
            // _this.dialog.del.deleted = false; //先显示可以删除
            _this.$axios.post( _this.$url.Role_del , formdata ).then((res) => {
                if(res.status == 200) {
                    if(res.data.infocode == 1){
                        _this.$message.success(res.data.message) ;
                        _this.dialog.del.dialogVisible = false;
                        _this.dialog.del.deleted = true;
                        _this.getTable(_this.page.currentPage);
                        
                    }else {
                        _this.$message.error(res.data.message);
                        _this.dialog.del.dialogVisible = false;
                        _this.dialog.del.deleted = true;
                        _this.getTable(_this.page.currentPage);
                    }
                }
            }).catch((err)=>{
                _this.$message.error("请求失败！");
            });
        },
        //改变页码
        changePage(val){
            let _this = this;
            _this.getTable(val);
        },
        // 查看模态框 确认
        Look_sure(){
            let _this = this;
            _this.dialog.write.dialogVisible = false;
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
                url = _this.$url.likeroleMmanagelist
            }else {
                json = {data: JSON.stringify({'page' : ""+page+ "" , 'id' : _this.userinfo.role_id})};
                url = _this.$url.roleMmanagelist ;
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
        //折叠面板 层级权限
        handlehierarch(val){
            let _this = this;
        },
        //折叠面板 管理权限
        handleadministration(val){
            let _this = this;
        },
        //折叠面板 目录权限
        handlecatalog(val){
            let _this = this;
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
                    _this.getTable(_this.page.currentPage);
            //     }
            // });
        },

    },
    mounted: function() {
        let _this = this;
        _this.userinfo = sessionStorage.getItem('userinfo') != "" ? JSON.parse(sessionStorage.getItem('userinfo')) : "" ;
        _this.M_List();
    },
    watch: {
        'dialog.write.content.show_checkbox': {
            handler: function(val,oldval){
            },
            deep: true
        },
        'dialog.write.content.select': {
            handler: function(val,oldval){
                let _this = this;
                _this.getrolefathervip(val);
            },
            deep: true
        },
        'dialog.write.title':{
            handler: function(val,oldval){
                let _this = this;
                _this.$nextTick(()=>{
                    if( val == "查看用户" ){
                    // $(".el-checkbox__input").css("background","#000");
                    }else {
                        // $(".el-checkbox__input").css("background","#409EFF");
                    }
                });
            },
            deep: true
        },
        'dialog.write.content.father_select': {
            handler: function(val,oldval){
                let _this = this;
                if(val != ""){
                    let obj = {
                     "label":"",
                     "value":"",
                     "rank":""
                    };
                    obj = _this.dialog.write.content.father_selectvalue.find((item)=>{ 
                        if( item.value === _this.dialog.write.content.father_select ){
                            return item ;
                        }
                    });
                    _this.$nextTick(()=>{
                        if(obj != undefined){
                            // if( _this.dialog.write.title != "查看用户"){
                                _this.getListTree0(obj.value , obj.rank);
                                _this.getListTree1(obj.value , obj.rank);
                                _this.getListTree2(obj.value , obj.rank);
                            // }
                        }
                    });
                }else {
                }
            },
            deep: true
        },
        "dialog.write.dialogVisible": {
            handler: function(val,oldval){
                let _this = this;
                if(val == false){
                    _this.dialog.write.title = "用户";
                    _this.dialog.write.dialogVisible = false;
                    _this.dialog.write.content.rowlist = {};
                    _this.dialog.write.content.writeid = "";
                    _this.dialog.write.content.rolename = "";
                    _this.dialog.write.content.select = "";
                    _this.dialog.write.content.selectvalue = [];
                    _this.dialog.write.content.father_select = "";
                    _this.dialog.write.content.father_selectvalue = [];
                    _this.dialog.write.content.creatpeople = "";
                    _this.dialog.write.content.selectOption =  [ { value : "1" , label: "一级"}, { value : "2" , label: "二级"}, { value : "3" , label: "三级"}, { value : "4" , label: "四级"}, { value : "5" , label: "五级"}, { value : "6" , label: "六级"}, { value : "7" , label: "七级"}, { value : "8" , label: "八级"}, { value : "9" , label: "九级"}, { value : "10" ,label: "十级"}, { value : "11" ,label: "十一级"}, { value : "12" ,label: "十二级"}, { value : "13" ,label: "十三级"}, { value : "14" ,label: "十四级"}, { value : "15" ,label: "十五级"}, { value : "16" ,label: "十六级"}, { value : "17" ,label: "十七级"}, { value : "18" ,label: "十八级"}, { value : "19" ,label: "十九级"}, { value : "20" ,label: "二十级"}];
                    _this.dialog.write.content.isdisabled = true;
                    _this.dialog.write.content.show_checkbox = true;
                    _this.dialog.write.content.hierarch.activeNames = ['1'];
                    _this.dialog.write.content.hierarch.treedata = [];
                    _this.dialog.write.content.hierarch.bj_tree = [];
                    _this.dialog.write.content.hierarch.checkedKey = [];
                    _this.dialog.write.content.administration.activeNames = ['2'];
                    _this.dialog.write.content.administration.treedata = [];
                    _this.dialog.write.content.administration.bj_tree = [];
                    _this.dialog.write.content.administration.checkedKey = [];
                    _this.dialog.write.content.catalog.activeNames = ['3'];
                    _this.dialog.write.content.catalog.treedata = [];
                    _this.dialog.write.content.catalog.bj_tree = [];
                    _this.dialog.write.content.catalog.checkedKey = [];
                    _this.$nextTick(()=>{
                        _this.dialog.write.dialogVisible = false;
                        // _this.dialog.write.istip = true;
                    });
                }
            },
            deep: true
        }
    }
}
</script>
<style scoped>
    #role{
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
    #role .el-button {
        border: none;
        height: 34px;
    }
    #role .top_left .el-button+.el-button {
        margin-left: 10px;
    }
    #role .el-dialog__wrapper .el-button+.el-button {
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
    .table_del {
        background: url("../../assets/images/del_hover.png") no-repeat;
        background-size: 100% 100%;
    }
    
    .goback {
        width: 120px;
        height: 38px;
        background-color: #6477c8;
        border-radius: 6px;
        color: #fff;
    }
    .write_box {
        color: #a0a4bd;
        margin: 20px 0px 40px;
        text-align: center;
    }
    .Write .write_box {
        text-align: left;        
    }
    #role .write_box  .el-select>.el-input{
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
    #role .dialog_footer {
        margin-bottom: 20px;
    }
    .del_tit {
        text-align: center;
        margin: 22px 0 40px;
    }
    .Write {
    }
    .w_c_title {
        font-size: 0;
        height: 70px;
    }
    .w_c_title>div {
        display: inline-block;
        vertical-align: middle;
        width: 50%;
    }
    .w_c_title>div>div {
        display: inline-block;
        font-size: 14px;
        
    }
    .w_c_title .left{
        float: left;
    }
    .w_c_title .right{
        /* float: right; */
    }
    .w_c_title .left>div {
        /* text-align: left; */
    }
    .w_c_title .right>div {
        text-align: right;
    }
    .w_c_title>div>div:first-child {
        width: 25%;
        
    }
    .w_c_title>div>div:last-child {
        width: 60%;
    }
    .clearfix:after{content:'';display:block;clear:both;height:0;overflow:hidden;visibility:hidden;}
    .clearfix{zoom:1;}
    .write_tip {
        text-align: center !important;
    }
    .row_top {
        height: 34px;
        line-height: 34px;
    }
    .m_top {
        margin-top: 12px;
    }
    .table_del_no {
        background: url("../../assets/images/del.png") no-repeat;
        background-size: 100% 100%;
    }
</style>
