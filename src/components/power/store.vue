<template>
    <div id="store">
        <div class="bg">
            <p class="tip">门店管理</p>
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
                    </el-table-column>
                    <el-table-column
                    label="序号"
                    :index="typeIndex"
                    type="index"
                    >
                    </el-table-column>
                    <el-table-column
                    label="门店名称"
                    prop="store_name"
                    >
                    </el-table-column>
                    <el-table-column
                    label="门店级别"
                    prop="source_rank"
                    sortable
                    >
                    </el-table-column>
                    
                    <el-table-column
                    label="创建时间"
                    prop="create_time"
                    sortable
                    >
                    </el-table-column>
                    
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                                <span class="table_todo table_look" @click="handleLook(scope.$index, scope.row)"></span>
                                <span class="table_todo table_write" @click="handleEdit(scope.$index, scope.row)"></span>
                                <span class="table_todo table_del" @click="handleDelete(scope.$index, scope.row)"></span>
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
                <div class="write_box">
                    <div>
                        <el-row>
                            <el-col :span="9">
                                <div class="grid-content">
                                    角色名称： <i v-text="dialog.look.content.rolename"></i>
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div class="grid-content">
                                    创建人： <i v-text="dialog.look.content.creatpeople"></i>
                                </div>
                            </el-col>
                            <el-col :span="7">
                                <div class="grid-content">
                                    角色等级：
                                    <el-select class="look_select" v-model="dialog.look.content.rolevip" disabled>
                                        <el-option :label="item.label" :value="item.value" v-for="(item , index) in dialog.look.content.roleviplist" :key="item.label"></el-option>
                                    </el-select>
                                </div>
                            </el-col>
                            
                        </el-row>
                    </div>
                    <div class="store_power">
                            <el-collapse v-model="dialog.look.content.tree.activeNames" @change="handleStorePower">
                                <el-collapse-item title="门店权限" name="1">
                                    <el-tree
                                        :data="dialog.look.content.tree.treedata"
                                        default-expand-all
                                        node-key="id"
                                        ref="tree"
                                        highlight-current
                                        :props="dialog.look.content.tree.defaultProps">
                                    </el-tree>
                                </el-collapse-item>                           
                            </el-collapse>
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
                    <el-form ref="form" :model="dialog.write.store">
                        <!-- <el-form-item label="商户名称："> -->
                        <!-- </el-form-item> -->
                        <el-form-item label="商户名称：">
                            <i v-text="dialog.write.storeName"></i>
                            <!-- <el-input id="storeName" disabled="disabled"  placeholder="请输入门店名称"></el-input> -->
                        </el-form-item>
                        <el-form-item label="门店名称：">
                            <el-input v-model="dialog.write.store.name" placeholder="请输入门店名称"></el-input>
                        </el-form-item>


                        <div class="isId" @click="storeId_sure()">
                            该门店是否存在ID
                        </div>
                        <!-- 判断门店id是否存在 -->
                        <!-- <el-form-item label="门店ID：" v-show="dialog.write.ID_isShow == true">
                            <el-input v-model="dialog.write.store.ID" placeholder="请输入门店ID"></el-input>
                        </el-form-item> -->
                        <el-form-item id="select_storeid"  v-show="dialog.write.ID_isShow === true"> 
                            <div class="sub-title store_id_left">门店ID：</div>
                            <el-autocomplete
                                class="inline-input select_input"
                                v-model="state2"
                                :fetch-suggestions="querySearch"
                                placeholder="请输入内容"
                                @select = "handleSelect"
                            ></el-autocomplete>
                        </el-form-item>

                        <el-form-item label="级别：">
                            <el-select v-model="dialog.write.store.vip" placeholder="请选择级别">
                                <el-option :label="item.label" :value="item.value" v-for="(item , index) in dialog.write.store.viplist" :key="item.label"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="父级：">
                            <el-select v-model="dialog.write.store.father_vip"  placeholder="请选择父级">
                                <el-option class="father_viplist" :label="item.label" :value="item.value" v-for="(item , index) in dialog.write.store.father_viplist" :key="item.label"></el-option>
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
                    <p class="del_tit">确定删除该项吗？</p>
                </div>
                <div class="dialog_footer">
                    <el-button class="gosure" size="small" type="primary" @click="del_sure()">确 定</el-button>
                    <el-button class="goback" size="small" @click="dialog.del.dialogVisible = false">取 消</el-button>
                </div>
            </el-dialog>
            <!-- 删除  E -->
            
        </div>

    </div>
</template>
<script>
export default {
    name:"Store",
    data(){
        return{
            state2: '',
            restaurants: [],
            disabld_isId: false,
            userinfo: {},
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
                    title: "门店信息",
                    dialogVisible: false,
                    content:{
                        rolename: 'SEO',
                        creatpeople:"张娜",
                        rolevip:"2",
                        roleviplist:[
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
                        ],
                        tree:{
                            activeNames: ['1'],
                            treedata: [
                            //     {
                            //     id: 1,
                            //     label: '总部',
                            //     children: [
                            //         {
                            //             id: 2,
                            //             label: '华北区',
                            //             children: [{
                            //                 id: 5,
                            //                 label: '河北'
                            //             }, {
                            //             id: 6,
                            //             label: '天津'
                            //             }]
                            //         },
                            //         {
                            //             id: 3,
                            //             label: '华南区',
                            //             children: [{
                            //                 id: 7,
                            //                 label: '大'
                            //             }, {
                            //             id: 8,
                            //             label: '他人个人'
                            //             }]
                            //         },
                            //         {
                            //             id: 4,
                            //             label: '华东区',
                            //             children: [{
                            //                 id: 9,
                            //                 label: '果然是个'
                            //             }, {
                            //             id: 10,
                            //             label: '不给你'
                            //             },{
                            //                 id: 9,
                            //                 label: '果然是个'
                            //             }, {
                            //             id: 10,
                            //             label: '不给你'
                            //             }]
                            //         }
                            //     ],

                            // }
                            ],
                            defaultProps: {
                                children: 'children',
                                label: 'label'
                            }
                        }
                    }
                    
                },
                write: {
                    title: "用户",
                    storeName: "",
                    store_root_id: "",
                    dialogVisible: false,
                    ID_isShow: false,
                    store:{
                        writeid: "",
                        name:"",
                        ID:"",
                        vip: "",
                        viplist:[
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
                        ],
                        father_vip:"",
                        father_viplist:[
                            { value : "" , label: ""},
                        ],
                    },
                    tableline: {},
                     
                },
                del: {
                    title: "警告",
                    dialogVisible: false,   
                },
                
            },
            menuList:[],
            menuoperate: [], //页面操作
        }
    },
    methods:{
        typeIndex(index) {
            return index + (this.page.currentPage - 1) * 8 + 1;
        },
        storeId_sure(){
            let _this = this;
            _this.dialog.write.ID_isShow = !_this.dialog.write.ID_isShow ;

            // _this.disabld_isId = 
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
            _this.dialog.look.dialogVisible = true;
            _this.lastSelectStyle();
            _this.dialog.look.content.rolename = row.role_name ;
            _this.dialog.look.content.creatpeople = row.create_pepole ;
            _this.dialog.look.content.rolevip = row.source_rank
            let json = {data: JSON.stringify({'id' : ""+row.id+""})};
            let formdata = _this.$config.formData(json); 
            _this.$axios.post( _this.$url.StoreRanklist , formdata).then((res)=>{ 
                if(res.status ==200){
                    let data = res.data;
                    let Tree = _this.diguiTree(data);
                    _this.dialog.look.content.tree.treedata = Tree;
                }else {
                    _this.dialog.look.content.tree.treedata = [] ;
                }
            });


        },
        diguiTree(table_arr){
            let _this = this;
            var treeDataShow = new Array();
            if(table_arr.length != 0 ){
                table_arr.forEach(function(v,i,arr){
                    let obj = {};
                    obj.id = v.id;
                    obj.label = v.store_name;
                    if( v.children != undefined && v.children.length != 0 ){
                       obj.children =  _this.diguiTree(v.children);
                    }
                    treeDataShow[i] = obj;
                })
            }
            return treeDataShow;
        },
        getfather_viplist(val){
            let _this = this;
            if(val != ""){
                if( val == 1 ){
                    _this.dialog.write.store.father_viplist = [{"label" : "根目录" , "value" : "0"}];
                    _this.dialog.write.store.father_vip = "0";
                }else {
                    val = val - 1 ;
                    let json = {
                        "source_rank" : ""+val+""  ,
                         "id" : _this.userinfo.role_id 
                    };
                    let formdata = _this.$config.formData(json); 
                    _this.$axios.post( _this.$url.rankQuery , formdata).then((res)=>{ 
                        if(res.status == 200){
                            let data = res.data;
                            let Arr = [];
                            data.forEach(function(v,i,arr){
                                let val = {};
                                val["value"] = ""+v.id+"";
                                val["label"] = v.store_name;
                                Arr.push(val);
                            });
                            _this.dialog.write.store.father_viplist = Arr;
                            _this.dialog.write.store.father_vip = "";
                            _this.dialog.write.store.father_viplist.forEach(function(v,i,arr){
                                if(v.value == _this.dialog.write.tableline.father_rank_id ){
                                    _this.dialog.write.store.father_vip = _this.dialog.write.tableline.father_rank_id ;
                                    return;
                                }
                            });
                        }
                    }).catch((err)=>{
                        _this.dialog.write.store.father_viplist = [{'label':'','label':''}];
                        _this.dialog.write.store.father_vip = "";
                    });
                }
            }
        },
        //表格打开编辑
        handleEdit(index, row) {
            let _this = this;
            //undefined 为新增用户
            if(index == undefined){
                _this.menuoperate.forEach(function(v,i,arr){
                    if(v == 2){
                        _this.dialog.write.dialogVisible = true;
                        return;
                    }
                });
                _this.state2 = "";
                _this.dialog.write.ID_isShow = false ;
                _this.dialog.write.title = "新增门店";
                _this.dialog.write.store = {
                    writeid: "",
                    name:"",
                    ID:"",
                    vip: "",
                    viplist:[
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
                    ],
                    father_vip:"",
                    father_viplist:[
                        { value : "" , label: ""},
                    ],
                }
                
            }else {


                _this.menuoperate.forEach(function(v,i,arr){
                    if(v == 3){
                        _this.dialog.write.dialogVisible = true;
                        return;
                    }
                });
                _this.dialog.write.tableline = row ;
                _this.dialog.write.title = "编辑门店";
                _this.dialog.write.store.name = row.store_name ;
                _this.dialog.write.store.ID = row.store_id ;
                _this.dialog.write.store.vip = row.source_rank ;
                _this.dialog.write.store.father_vip = row.father_rank_id ;
                _this.dialog.write.store.writeid = row.id ;
                if( row.store_id != undefined){
                    _this.dialog.write.ID_isShow = true ; //测试用
                    _this.state2 = row.store_id ;
                }else {
                    _this.dialog.write.ID_isShow = false ;    
                    _this.state2 = "" ;                 
                }
                
            }   
        },
        getStoreId(){
            let _this = this;
            let json = { "vid" : _this.userinfo.store_root_id , "storeCode" : ""};
            let formdata = _this.$config.formData(json); 
            _this.$axios.post( _this.$url.getStoreIds , formdata).then((res)=>{
                if(res.data.code == 1){
                    let data = res.data.data;
                    _this.restaurants = [];
                    for(let i = 0 ; i < data.length ; i++){
                        let val = {};
                        val["value"] = data[i]["storeCode"];
                        _this.restaurants.push(val);
                    }
                }
            });
        },
        // 表格 新增 或 编辑 的确定
        Write_sure(){
            let _this = this;
            // let title = _this.dialog.write.title ;
            let obj = {};
            obj = _this.dialog.write.store.father_viplist.find((item)=>{
                if( item.value == _this.dialog.write.store.father_vip ){
                    return item ;
                }
            });
            if( _this.dialog.write.store.vip == ""){
                _this.dialog.write.store.vip = 0;
                _this.dialog.write.store.father_vip = 0;
                if(obj != undefined){
                    obj["label"] = 0;
                }else {
                    _this.$message.error("请填写完整信息！");
                }
            };
//显示ID
if(_this.dialog.write.ID_isShow == true){
    //判断 id是否存在
    _this.chkStoreExist(_this.state2);
    

}else {
    //不显示ID

    if(_this.dialog.write.store.name != "" && _this.dialog.write.store.vip != "" && _this.dialog.write.store.father_vip != ""){
        let json;
        let url;
        
        if( _this.dialog.write.title == "新增门店"){
            url = _this.$url.Store_add ;
            json = {
                "store_name": _this.dialog.write.store.name ,
                // "store_id": _this.dialog.write.store.ID ,
                "source_rank": _this.dialog.write.store.vip ,
                "father_rank": obj.label , //label值
                "father_rank_id": _this.dialog.write.store.father_vip , //value值
                "create_pepole": _this.userinfo.user_name ,
                "create_pepole_id" : _this.userinfo.id ,
                "role_name" : _this.userinfo.role_name ,
                "role_id" : _this.userinfo.role_id ,
                "store_root_name": _this.userinfo.store_name,
                "store_root_id": _this.userinfo.store_root_id
            };
        }else {
            //修改
            json = {
                "id": _this.dialog.write.store.writeid ,
                "store_name": _this.dialog.write.store.name ,
                // "store_id": _this.dialog.write.store.ID ,
                "source_rank": _this.dialog.write.store.vip ,
                "father_rank": obj.label,   //label值
                "father_rank_id": _this.dialog.write.store.father_vip ,  //value值
                "create_pepole": _this.userinfo.user_name ,
                "create_pepole_id" : _this.userinfo.id ,
                "role_name" : _this.userinfo.role_name ,
                "role_id" : _this.userinfo.role_id ,
                "store_root_name": _this.userinfo.store_name,
                "store_root_id": _this.userinfo.store_root_id
            };
            url = _this.$url.Store_upt ;
        }
        let formdata = _this.$config.formData(json); 
        _this.$axios.post( url , formdata).then((res)=>{ 
            if(res.status == 200){
                if( res.data.infocode == 1){
                    _this.getTable(_this.page.currentPage);
                    _this.$message.success(res.data.message);
                    _this.dialog.write.tableline = {};
                    _this.dialog.write.dialogVisible = false;
                }else {
                    _this.$message.error(res.data.message);
                }
                
            }else {
                _this.$message.error(res.data.message);
            }
        });
    }else {
        _this.$message.error("请填写完整信息！")
    }
   
}


            // if( _this.dialog.write.store.name != "" && _this.dialog.write.store.name != undefined &&
            //     _this.dialog.write.store.ID != "" && _this.dialog.write.store.ID != undefined  ){
            //         let json;
            //         let url;
                    
            //         if( _this.dialog.write.title == "新增门店"){
            //             url = _this.$url.Store_add ;
            //             json = {
            //                 "store_name": _this.dialog.write.store.name ,
            //                 // "store_id": _this.dialog.write.store.ID ,
            //                 "source_rank": _this.dialog.write.store.vip ,
            //                 "father_rank": obj.label , //label值
            //                 "father_rank_id": _this.dialog.write.store.father_vip , //value值
            //                 "create_pepole": _this.userinfo.user_name ,
            //                 "create_pepole_id" : _this.userinfo.id ,
            //                 "role_name" : _this.userinfo.role_name ,
            //                 "role_id" : _this.userinfo.role_id ,
            //                 "store_root_name": _this.userinfo.store_name,
            //                 "store_root_id": _this.userinfo.store_root_id
            //             };
            //         }else {
            //             //修改
            //             json = {
            //                 "id": _this.dialog.write.store.writeid ,
            //                 "store_name": _this.dialog.write.store.name ,
            //                 // "store_id": _this.dialog.write.store.ID ,
            //                 "source_rank": _this.dialog.write.store.vip ,
            //                 "father_rank": obj.label,   //label值
            //                 "father_rank_id": _this.dialog.write.store.father_vip ,  //value值
            //                 "create_pepole": _this.userinfo.user_name ,
            //                 "create_pepole_id" : _this.userinfo.id ,
            //                 "role_name" : _this.userinfo.role_name ,
            //                 "role_id" : _this.userinfo.role_id ,
            //                 "store_root_name": _this.userinfo.store_name,
            //                 "store_root_id": _this.userinfo.store_root_id
            //             };
            //             url = _this.$url.Store_upt ;
            //         }
            //         let formdata = _this.$config.formData(json); 
            //         _this.$axios.post( url , formdata).then((res)=>{ 
            //             if(res.status == 200){
            //                 if( res.data.infocode == 1){
            //                     _this.getTable(_this.page.currentPage);
            //                     _this.$message.success(res.data.message);
            //                 }else {
            //                     _this.$message.error(res.data.message);
            //                 }
                            
            //             }else {
            //                 _this.$message.error(res.data.message);
            //             }
            //         });
            // }else{
            //     _this.$message.error("请填写完整信息！");

            // }
            
        },
        // 表格打开删除
        handleDelete(index, row) {
            let _this = this;

            _this.menuoperate.forEach(function(v,i,arr){
                if(v == 4){
                    _this.dialog.del.dialogVisible = true;
                    _this.dialog.write.store.writeid = row.id ;
                    return;
                }
            });
        },
        //表格删除
        del_sure(){
            let _this = this;
            let json = {"id" : _this.dialog.write.store.writeid}
            let formdata = _this.$config.formData(json); 
            _this.$axios.post( _this.$url.Store_del , formdata).then((res)=>{ 
                if( res.status == 200){
                    if(res.data.infocode == 1){
                        _this.$message.success(res.data.message);
                        _this.getTable(_this.page.currentPage);
                    }else {
                        _this.$message.error(res.data.message);
                    }
                    
                }else {
                    _this.$message.error(res.data.message);
                }
            }).catch((err)=>{
                 _this.$message.error("删除失败！");
            });
            _this.dialog.del.dialogVisible = false;
            
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
                url = _this.$url.Storemanagelike ;
            }else {
                json = {data: JSON.stringify({'page' : ""+page+ "" , 'id' : _this.userinfo.role_id})};
                url = _this.$url.Storemanagelist ;
            }
            let formdata = _this.$config.formData(json); 
            _this.table.tableData = [];
            _this.$axios.post( url , formdata).then((res)=>{ 
                if(res.status == 200){
                    let data = res.data;
                    // (data)
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
        handleStorePower(val){
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
                    _this.getTable(_this.page.currentPage);
                // }
            // });
        },
        querySearch(queryString, cb) {
            var restaurants = this.restaurants;
            var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
            // 调用 callback 返回建议列表的数据
            cb(results);
        },
        createFilter(queryString) {
            return (restaurant) => {
                return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
        },
        // loadAll() {
        //     return [
        //     { "value": "123" },
        //     { "value": "345"},
        //     { "value": "135" },
        //     ];
        // },
        handleSelect(item) {
            // 获取到的门店id 去做对比 一不一样
            // let _this = this;
            // _this.chkStoreExist(_this.state2);
        },
        chkStoreExist(value){
            //判断门店是否存在 
             let _this = this;
            let json = { "vid" : _this.userinfo.store_root_id , "storeCode" : value } ;
            let formdata = _this.$config.formData(json) ; 
            _this.$axios.post( _this.$url.chkStoreExist , formdata).then((res)=>{ 
                if( res.data.code == 1){
                    _this.disabld_isId = 1 ;
                    if ( _this.disabld_isId == 1 ){
                        let obj = {};
                        obj = _this.dialog.write.store.father_viplist.find((item)=>{
                            if( item.value == _this.dialog.write.store.father_vip ){
                                return item ;
                            }
                        });
                        if(_this.dialog.write.store.name != "" && _this.dialog.write.store.vip != "" && _this.dialog.write.store.father_vip != "" && _this.state2 != ""){
                            //存在斌正确
                            let json;
                            let url;
                            if( _this.dialog.write.title == "新增门店"){
                                url = _this.$url.Store_add ;
                                json = {
                                    "store_name": _this.dialog.write.store.name ,
                                    "store_id": _this.state2 ,
                                    "source_rank": _this.dialog.write.store.vip ,
                                    "father_rank": obj.label , //label值
                                    "father_rank_id": _this.dialog.write.store.father_vip , //value值
                                    "create_pepole": _this.userinfo.user_name ,
                                    "create_pepole_id" : _this.userinfo.id ,
                                    "role_name" : _this.userinfo.role_name ,
                                    "role_id" : _this.userinfo.role_id ,
                                    "store_root_name": _this.userinfo.store_name,
                                    "store_root_id": _this.userinfo.store_root_id
                                };
                            }else {
                                //修改
                                json = {
                                    "id": _this.dialog.write.store.writeid ,
                                    "store_name": _this.dialog.write.store.name ,
                                    "store_id": _this.state2 ,
                                    "source_rank": _this.dialog.write.store.vip ,
                                    "father_rank": obj.label,   //label值
                                    "father_rank_id": _this.dialog.write.store.father_vip ,  //value值
                                    "create_pepole": _this.userinfo.user_name ,
                                    "create_pepole_id" : _this.userinfo.id ,
                                    "role_name" : _this.userinfo.role_name ,
                                    "role_id" : _this.userinfo.role_id ,
                                    "store_root_name": _this.userinfo.store_name,
                                    "store_root_id": _this.userinfo.store_root_id
                                };
                                url = _this.$url.Store_upt ;
                            }
                            let formdata = _this.$config.formData(json); 
                            _this.$axios.post( url , formdata).then((res)=>{ 
                                if(res.status == 200){
                                    if( res.data.infocode == 1){
                                        _this.getTable(_this.page.currentPage);
                                        _this.$message.success(res.data.message);
                                        _this.dialog.write.tableline = {};
                                        _this.dialog.write.dialogVisible = false;
                                    }else {
                                        _this.$message.error(res.data.message);
                                    }
                                    
                                }else {
                                    _this.$message.error(res.data.message);
                                }
                            });
                        }else {
                            _this.$message.error("请输入完整信息！");
                        }
                            
                    }
                }else {
                    _this.disabld_isId = 0 ;
                    _this.$message.error("门店ID有误，请重新输入！");
                    $(".select_input").focus();
                    _this.state2 = "";
                }
    
    // else {
    //     _this.$message.error("请输入正确门店ID!");
    // }
            });
        }

    },
    mounted: function() {
        let _this = this;
        _this.userinfo = sessionStorage.getItem('userinfo') != "" ? JSON.parse(sessionStorage.getItem('userinfo')) : "" ;
        _this.M_List();
        _this.dialog.write.storeName = _this.userinfo.store_name ;
        _this.dialog.write.store_root_id = _this.userinfo.store_root_id ;
        _this.dialog.write.ID_isShow = false;
        _this.getStoreId();
        // this.restaurants =  [
        //     { "value": "123" },
        //     { "value": "345"},
        //     { "value": "135" },
        // ];
    },
    watch: {
        'table.multipleSelection': {
            handler: function(val,oldval){
                let _this = this;
                if(val.length != 0){
                    _this.disabled.disabled_del = false;
                }else {
                    _this.disabled.disabled_del = true;                    
                }
            },
            deep: true
        },
        "dialog.write.store.vip": {
            handler: function(val,oldval){
                let _this = this;
               
                _this.getfather_viplist(val);
               
            },
            deep: true
        },
        "dialog.write.store.father_viplist" :{
            handler: function(val,oldval){
               
            },
            deep: true
        },
        // "dialog.write.ID_isShow" :{
        //     handler: function(val,oldval){
        //         let _this = this;
        //         if(val == false){
        //             _this.disabld_isId = false ;
        //         }
        //     },
        //     deep: true
        // }
    }
}
</script>
<style scoped>
    #store{
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
    #store .el-button {
        border: none;
        height: 34px;
    }
    #store .top_left .el-button+.el-button {
        margin-left: 10px;
    }
    #store .el-dialog__wrapper .el-button+.el-button {
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
        color: #fff;
        margin-top: 6px;
    }
    #store .write_box  .el-input{
        width: 100%;
    }
    #store .write_box  .el-select>.el-input{
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
    #store .dialog_footer {
        margin-bottom: 20px;
    }
    .del_tit {
        text-align: center;
        font-size: 16px;
        margin: 22px 0 40px;
    }
    #store .el-form-item>label {
        text-align: right;
    }
    .Look .write_box {
        margin-bottom: 40px;
    }
    .isId {
        margin-bottom: 20px;
        color: #a0a4bd;
        cursor: pointer;
    }
    .isId:active {
        opacity: 0.8;
    }
    .store_id_left {
        width: 19%;
        display: inline-block;
        color: #a0a4bd;
    }
</style>
