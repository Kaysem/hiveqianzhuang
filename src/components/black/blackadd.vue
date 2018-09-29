<template>
    <div id="blackadd">
        <div class="b_top">
            <h4 class="page_title">抓拍照片浏览</h4>
            <div class="top_content time">
                <span>时间：</span>
                <el-radio-group v-model="top.valueTimeS" @change="changeTimes()">
                    <el-radio label="half">最近半小时</el-radio>
                    <el-radio label="hour">最近一小时</el-radio>
                    <el-radio class="custom" label="custom">自定义
                        <el-date-picker 
                            v-model="top.valueTime"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            type="datetimerange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </el-radio>
                </el-radio-group>
            </div>
            <div class="top_content sex">
                <span>性别：</span>
                <el-radio-group v-model="top.valueSex" @change="changeSex()">
                    <el-radio label="ALL">全部</el-radio>
                    <el-radio label="男">男性</el-radio>
                    <el-radio label="女">女性</el-radio>
                </el-radio-group>
            </div>
            <div class="top_content age">
                <span>年龄：</span>
                <div>
                    <div class="startage">
                        <input type="text" id="startage" v-model="top.age.startAge" placeholder="" >
                    </div>
                    <span class="age_line"></span>
                    <div class="endage">
                        <input type="text" id="endage" v-model="top.age.endAge" placeholder="" >
                    </div>
                </div>
            </div>
            <!-- <div class="top_content kind">
                <span>查看方式：</span>
                <el-radio-group v-model="top.kind" @change="changeKind()">
                    <el-radio-button label="按位置"></el-radio-button>
                    <el-radio-button label="按时间"></el-radio-button>
                </el-radio-group>
            </div> -->
            <div class="top_content operaty">
                <span>操作：</span>
                <div class="todo_search" @click.stop="usercomein_list()"> <span class="search_icon"></span> 查询 </div>
                <div class="add_black" @click.stop="dialogShow( 'add' )"> <span class="black_icon"></span> 加入黑名单 </div>
                <div class="del_btn"  @click.stop="dialogShow( 'del' )"> <span class="del_icon"></span> 删除照片 </div>
            </div>
        </div>
        <div class="b_btm" v-if="top.kind == '按位置'">
            <ul class="add_store clearfix">
                <!-- <li v-for=" ( item , index ) in btm.add.list" :class="index === 0 ? 'active': ''" @click.stop="ClickAddStore( $event  )"> -->
                <li v-for=" ( item , index ) in btm.add.list" :key="index" :class=" index === 0 ? 'active': ''" @click.stop="ClickAddStore( $event  )">
                    {{item.name}}
                    {{index}}
                </li>
            </ul>
            <el-collapse v-model="btm.add.collapse" @change="collapseChange()">
                <!-- <el-collapse-item v-for="( item , index ) in btm.add.listContent" :name="''+index+''"> -->
                <el-collapse-item v-for="( item , index ) in btm.add.listContent" :key="index" :name="''+index+''">
                    <template slot="title">
                        <el-checkbox :v-model="item.checked"> {{item.name}} </el-checkbox>
                    </template>
                    <div class="pic_all_box">
                        <!-- <div class="pictrue_box" v-for="(item2 , index2) in item.children"> -->
                        <div class="pictrue_box" v-for="(item2 , index2) in item.children" :key="index2">
                            <div class="img_box">
                                <el-checkbox v-model="item2.checked" class="chk_box" @change="checkBoxChange_A( item , index , item2 ,index2 )">  </el-checkbox>
                                <img src="../../assets/images/a1.jpg" alt="" @click.stop="toPersonal(item2)">
                            </div>
                            <p>时间 ：{{item2.time}}   
                                <i class="pic_icons pic_vip"></i> 
                                <i class="pic_icons pic_black"></i>  
                                <i class="pic_icons "></i>  
                                 
                            </p>
                            <p>性别 ：{{item2.sex}} </p>
                            <p>年龄 ：{{item2.age}} 岁 </p>
                        </div> 
                        <!-- 单个人 E -->
                        
                    </div>
                    <div class="clickMore"> 点击加载更多 </div>
                </el-collapse-item>
                <!-- <el-collapse-item   name="1">
                    <template slot="title">
                        <el-checkbox v-model="btm.add.checked[1]"> 收银机（离线） </el-checkbox>
                    </template>
                    <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
                    <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
                </el-collapse-item> -->
                
            </el-collapse>

        </div>
        <div class="b_btm" v-else>
            <ul class="add_store clearfix">
                <li class="active" @click.stop="ClickAddStore( $event  )">青岛一店</li>
                <!-- <li @click.stop="ClickAddStore( $event  )">二分店</li> -->
                <!-- <li v-for=" ( item , index ) in btm.times.list" :class=" index === 0 ? 'active': '' " @click.stop="ClickAddStore( $event  )">
                    {{item.name}}
                    {{index}}
                </li> -->
            </ul>
            <div class="times_pic">
                <div class="times_pic_box" v-if="btm.times.listContent.length != 0">
                    <!-- 单个人 S -->
                    <!-- <div class="pictrue_box" v-for=" ( item , index ) in btm.times.listContent"> -->
                    <div class="pictrue_box" v-for=" ( item , index ) in btm.times.listContent" :key="index">
                        <div class="img_box">
                            <!-- <input class="chk_box"  type="checkbox" @change="checkBoxChange( $event )"> -->
                            <el-checkbox v-model="item.checked" class="chk_box" @change="checkBoxChange_T( item , index  )">  </el-checkbox>
                            <img :src="item.url" alt="" @click.stop="toPersonal(item)">
                        </div>
                        <p>时间：<i class="pic_font">{{item.ts}} </i>
                            <i v-if="item.repoName == '金王会员库'" class="pic_icons pic_vip"></i> 
                            <i v-else-if="item.repoName == '金王黑名单库'" class="pic_icons pic_black"></i>  
                            <i v-else class="pic_icons "></i>
                        </p>
                        <p>性别：<i class="pic_font">{{item.gender}} </i> </p>
                        <p>年龄：<i class="pic_font">{{item.age}} 岁</i></p>
                    </div> 
                    <!-- 单个人 E -->
                </div>
                <!-- <div class="clickMore"> 点击加载更多 </div> -->
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
        <!-- 模态框 S -->
        <el-dialog
            :title="tip.title"
            :visible.sync="tip.dialogVisible"
            width="30%"
            show-close:false
            >
            <div v-if="tip.state === 'add' " class="dialog_text_center">
                <div class="dialog_content dialog_add_black">
                    <p id="isBlack">是否确定添加该人员到黑名单？</p>
                    <p id="black_commit">
                        <span id="beiZhu">备注&nbsp;&nbsp;: </span>
                        <el-autocomplete
                          popper-class="my-autocomplete"
                          v-model="state3"
                          :fetch-suggestions="querySearch"
                          placeholder="对人员描述型总结"
                          @select="handleSelect">
                          <i
                            class="el-icon-edit el-input__icon"
                            slot="suffix"
                            @click="handleIconClick">
                          </i>
                          <template slot-scope="{ item }">
                            <div class="name">{{ item.value }}</div>
                          </template>
                        </el-autocomplete>
                    </p>
                </div>
                <div slot="footer" class="dialog-footer">
                    <input class="footer_btn sure_btn" type="button" value="确定" @click="toBlackPic()">
                    <input class="footer_btn back_btn" type="button" value="取消" @click="tip.dialogVisible = false"> 
                </div>
            </div>
            <!-- 判断勾选的会员类型  Start-->
            <div v-if="tip.state === 'repoName_vip' " class="dialog_text_center">
                <div class="dialog_content dialog_add_black">
                    <p id="isBlack">小主,该人员是<span style="color:#FFB90F"> VIP会员 </span>,请再次确认是否要加入到黑名单？</p>
                    <p id="black_commit">
                        <span id="beiZhu">备注&nbsp;&nbsp;: </span>
                        <el-autocomplete
                          popper-class="my-autocomplete"
                          v-model="state3"
                          :fetch-suggestions="querySearch"
                          placeholder="对人员描述型总结"
                          @select="handleSelect">
                          <i
                            class="el-icon-edit el-input__icon"
                            slot="suffix"
                            @click="handleIconClick">
                          </i>
                          <template slot-scope="{ item }">
                            <div class="name">{{ item.value }}</div>
                          </template>
                        </el-autocomplete>
                    </p>
                </div>
                <div slot="footer" class="dialog-footer">
                    <input class="footer_btn sure_btn" type="button" value="确定" @click="toBlackPic()">
                    <input class="footer_btn back_btn" type="button" value="取消" @click="tip.dialogVisible = false"> 
                </div>
            </div>
            <div v-else-if ="tip.state === 'repoName_black'" >
                <div class="dialog_content dialog_black_error">
                    <!-- 如果状态为repoName_black 则执行已在黑名单提示 -->
                    <p>小主,该人员已是黑名单人员,无需重复添加!</p>
                </div> 
            </div>
            <div v-else-if ="tip.state === 'greater_addBlackPic'" >
                <div class="dialog_content dialog_black_error">
                    <!-- 如果状态为addBlackPic 则执行多选添加提示 -->
                    <p>小主,每次仅可勾选一张照片添加至黑名单哦!</p>
                </div> 
            </div>
            <div v-else-if ="tip.state === 'del' " >
                <div class="dialog_content dialog_del_pic">
                    您即将删除照片，删除的照片不可恢复，谢谢！
                </div>
                <div slot="footer" class="dialog-footer">
                    <input class="footer_btn sure_btn" type="button" value="确定" @click="delList()"> 
                    <input class="footer_btn back_btn" type="button" value="取消" @click="tip.dialogVisible = false"> 
                </div>
            </div>
            <div v-else-if ="tip.state === 'greater_delPic'" >
                <div class="dialog_content dialog_black_error">
                    <!-- 如果状态为delPic 则执行多选删除提示 -->
                    <p>小主,每次仅可勾选一张照片进行删除哦!</p>
                </div> 
            </div>
            <!-- <div v-else-if = "tip.state === 'success'" >
                <div class="dialog_black_success"> 
                    <span>添加成功</span>
                     <div>
                        <img src="../../assets/images/success.png" alt="" class="inline_block">
                     </div>
                     <span>添加成功</span>
                </div> 
            </div>
            <div v-else-if = "tip.state === 'error'" >
                <div class="dialog_content dialog_black_error">
                    <div>
                        <img src="../../assets/images/error.png" alt="">
                     </div>
                    <p>您的“加入黑名单”操作失败，请稍后再试</p>
                </div> 
            </div> -->
            <div v-else ></div>
        </el-dialog>
        
        <!-- 模态框 E -->

    </div>
</template>

<script>
export default {
    name: 'Browse',
    data () {
        return {
            top:{
                valueTimeS: 'half',
                valueTime: [], //时间
                valueSex: "ALL", //性别
                age:{
                    startAge: '1',
                    endAge: '99',
                },
                kind: "按时间", //位置按时不需要

            },
            page:{
                total: 0 ,      //总条数
                pageSize: 10,    //1页条数
                currentPage:1 , //当前页面位置
                allPages:  0  , //总页数
            },
            btm : {
                add: {
                    collapse: [ ],
                    checked: [ true , false ],
                    list :[
                        {
                            name:"一分店", 
                        },
                        {
                            name:"二分店" 
                        },
                        {
                            name:"三分店" 
                        },
                    ],
                    listContent: [
                        {
                            name: "入口（在线）",
                            checked: false,
                            children: [
                                {
                                    img:"",
                                    time: "12:20",
                                    sex: "男",
                                    age: "23",
                                    checked: false,
                                }
                            ]
                        },
                        {
                            name: "收银口（在线）",
                            checked: false,
                            children: [
                                {
                                    img:"",
                                    time: "12:20",
                                    sex: "男",
                                    age: "23",
                                    checked: false,
                                } ,
                            ]
                        }
                    ]
                } ,
                times:{
                    list :[
                        {
                            name:"全部", 
                        },
                        {
                            name:"一分店", 
                        }
                    ],
                    listContent: [
                        // {
                        //     img:"",
                        //     time: "12:20",
                        //     sex: "男",
                        //     age: "23",
                        //     checked: false,
                        // } 
                    ]
                }
            },
            tip: {
                state: "" ,
                title: "" , 
                dialogVisible: false, 
            },
            // 添加黑名单时弹框备注输入框内容 S
            restaurants: [],
            state3: ''
            // E
        }
    }, 
    beforeMount() {
        let _this = this;
        console.log('挂载前执行');
        _this.usercomein_list();
    },
    mounted:function() { 
        let _this = this;
        for(let i = 0; i < _this.btm.add.listContent.length; i++) {
            _this.btm.add.collapse.push(i.toString());
        }
        $('#startage').keyup(function(){
            let c  =$(this) ;
            if(/[^\d]/.test(c.val())){//替换非数字字符
              let temp_amount=c.val().replace(/[^\d]/g,'');
              $(this).val(temp_amount);
            }
            if( $(this).val().length >= 3 ){
                $(this).val( $(this).val().substr(0,3) )
            }
            _this.top.age.startAge = $(this).val();
        });
        $('#endage').keyup(function(){
            let c=$(this);
            if(/[^\d]/.test(c.val())){//替换非数字字符
              let temp_amount=c.val().replace(/[^\d]/g,'');
              if(temp_amount.length >= 3 ){
                  temp_amount = temp_amount.slice(0,3);
              }
              $(this).val(temp_amount);
            }
            if( $(this).val().length >= 3 ){
                $(this).val( $(this).val().substr(0,3) )
            }
            _this.top.age.endAge = $(this).val();
            
        });

        $('#startage').blur(function(){
            $('#endage').focus();
        });
        $('#endage').blur(function(){
        });
        
        window.addEventListener("resize", function () {
            _this.Address_picsMargin();    
            _this.Time_picsMargin();
        });
        /**
         * 点击添加黑名单后备注输入框相关
         */
        _this.restaurants = this.loadAll();
    },
    watch:{
        "top.kind": {
            handler: function( val, oldval ){
                let _this = this;
                if( val === "按时间" ){
                    _this.$nextTick(()=>{
                        _this.Time_picsMargin();
                    });
                }else {
                    _this.$nextTick(()=>{
                        _this.Address_picsMargin();
                    });
                }
                if( val != oldval ){
                    $(".add_store > li ").eq(0).addClass("active").siblings("li").removeClass("active");
                }

            },
            deep: true
        },
        "tip.dialogVisible": {
            handler: function( val, oldval ){
                let _this = this;
                if( val === false ){
                    _this.tip.title = "";
                    _this.tip.state = "";
                    for( let i = 0 ; i < _this.btm.times.listContent.length ; i++ ){
                        _this.btm.times.listContent[i]['checked'] = false ; 
                    }
                }
            },
            deep: true
        },
        'top.valueTime': {
            handler: function( val, oldval ){
                let _this = this;
                if( val === null ){
                    val = [] ;
                }
                if( val != null && val.length != 0 ){
                    _this.top.valueTimeS = "custom" ;
                }
            },
            deep: true
        },
        // "top.age.startAge":{
        //     handler: function(val,oldval){
        //         let _this = this;
        //     },
        //     deep: true,
        // }
        
    },
    methods:{
         //改变页码
        changePage(val){
            let _this = this;
            _this.page.currentPage = val;
            _this.usercomein_list(_this.page.currentPage);
        },
        //首页
        tochagePage(type){
            let _this = this; 
            if(type == "L"){
                _this.page.currentPage = 1;
            }else {
                _this.page.currentPage = _this.page.allPages;
            }
            _this.usercomein_list(_this.page.currentPage);
        },
        /**
         *时间改变
         */
        changeTimes( ){
            let _this = this; 
            if( _this.top.valueTimeS != "custom" ){
                _this.top.valueTime = [];
            }
        },
        /**
         * 时间更改事件
         */
        ClickTime( e , state ){
            let _this = this ;
            if( $( e.target ).prop("tagName") != "LI" ){
                $( ".timeLis li" ).eq(2).addClass("active").siblings("li").removeClass("active");
            }else {
                $( e.target ).addClass("active").siblings("li").removeClass("active");
            }
        },
        /** 
         * 更改性别
         */
        changeSex(val){
            let _this = this;
        } ,
        /** 
         * 更改更改查看方式
         */
        changeKind(val){
            let _this = this;
        },
        /**
         * 按位置 点击门店切换
         */
        ClickAddStore(e){
            let _this = this;
            $( e.target ).addClass("active").siblings("li").removeClass("active");

        },
        /**@augments
         * 折叠面板 
         */
        collapseChange(val) {
            let _this = this;
            _this.$nextTick(()=>{
                _this.Address_picsMargin();
            });
           
        },
        /**
         * 按位置图片间距
         */
        Address_picsMargin(){
            let pic_all_boxW = $(".pic_all_box ").width();
            let N = 5 ;
            let MarginPic = pic_all_boxW - (180*5)  - 16  ;
            $(".pic_all_box > div").css({
                "marginRight": MarginPic / 4 - 1 + "px",
            });
            for( let i = 0 ; i < $(".pic_all_box > div").length ; i++ ){
                $(".pic_all_box > div:nth-child("+i*5+")").css({
                    "marginRight": "0px",
                });
            };
        },
        /**
         * 按时间图片间距
         */
        Time_picsMargin(){
            let times_pic_boxW = $(".times_pic_box ").width();
            let N = 5 ;
            let MarginPic = times_pic_boxW - (180*5) ;
            $(".times_pic_box > div").css({
                "marginRight": MarginPic / 4 -1 + "px",
            });
            for( let i = 0 ; i < $(".times_pic_box > div").length ; i++ ){
                $(".times_pic_box > div:nth-child("+i*5+")").css({
                    "marginRight": "0px",
                });
                
            };
        },
        /**
         * 按位置多选框
         */
        checkBoxChange_A(  item , index , item2 ,index2 ){
            let _this = this;
        },
        /**
         * 按时间多选框
         */
        checkBoxChange_T( item , index  ){
            let _this = this;
        },
        getMyDate(str){  
            let _this = this;
            var oDate = new Date(str),  
            oYear = oDate.getFullYear(),  
            oMonth = oDate.getMonth()+1,  
            oDay = oDate.getDate(),  
            oHour = oDate.getHours(),  
            oMin = oDate.getMinutes(),  
            oSen = oDate.getSeconds(),  
            oTime = oYear +'-'+ _this.getzf(oMonth) +'-'+ _this.getzf(oDay) +' '+ _this.getzf(oHour) +':'+ _this.getzf(oMin) +':'+_this.getzf(oSen);//最后拼接时间  
            return oTime;  
        },
        //补0操作
        getzf(num){  
          if(parseInt(num) < 10){  
              num = '0'+num;  
          }  
          return num;  
        }, 
        /**
         * 列表数据
         */
        usercomein_list(p=1){
            let _this = this;
            let timestamp = (new Date()).getTime();//当前时间
            let timeStart = "";
            let timeEnd = "";
            if( _this.top.valueTimeS == 'half' ){
                timeStart = _this.getMyDate( (timestamp/1000-1800) * 1000 ) ;
                timeEnd = _this.getMyDate( timestamp ) ;
            }else if( _this.top.valueTimeS == 'hour' ){
                timeStart = _this.getMyDate( (timestamp/1000-3600) * 1000 ) ;
                timeEnd = _this.getMyDate( timestamp ) ;
            }else {
                timeStart = _this.top.valueTime[0] ;
                timeEnd = _this.top.valueTime[1] ;
            }
            let json = {
                'page': p ,
                'sex': _this.top.valueSex  ,
                'ageStart': _this.top.age.startAge ,
                'ageEnd': _this.top.age.endAge ,
                'timeStart': timeStart ,
                'timeEnd': timeEnd
            };
            let formdata = _this.$config.formData(json); 
            _this.$axios.post( _this.$url.usercomein_list ,formdata).then((res)=>{
                console.log("列表重新渲染了");
                if( res.status == 200 ){ 
                        let data = res.data;
                        _this.page.currentPage = data.start ;
                        _this.page.total = data.count ;
                        _this.page.allPages = data.pages ;
                        let List = [];
                        List = data.datas;
                        for( let i = 0 ; i < List.length ; i++ ){
                            List[i]['checked'] = false ;
                            List[i]['ts'] = _this.getMyDate( parseInt(List[i]['time']) ) ;
                        }
                        _this.btm.times.listContent = List ;
                        _this.$nextTick(()=>{
                            _this.Time_picsMargin();    
                        });
                     
                }
            }).catch((err)=>{
                // _this.$message("请求出错，请稍后重试！");
                _this.btm.times.listContent = [] ;
            });
        },
        /**
         * 删除 
         */
        delList(){
            let _this = this;
            let str = "";
            let N = _this.btm.times.listContent.length-1 ;
            for( let i = 0 ; i < _this.btm.times.listContent.length ; i++ ){
                if( _this.btm.times.listContent[i]['checked'] === true ){
                    str += _this.btm.times.listContent[i]['id'] + "," ;
                }
            }
            str = str.substring(0,str.length-1);
            _this.$axios.get(_this.$url.browse_del+"/"+str).then((res)=>{
                if( res.status == 200 && res.data.code == 1 ){
                    _this.$message.success("删除成功！");
                }else {
                    _this.$message.error("删除失败，请稍后再试！");
                }
                _this.usercomein_list();
                _this.tip.dialogVisible = false ;
            }).catch((err)=>{
                _this.$message.error("请求失败，请稍后再试！");
                _this.tip.dialogVisible = false ;
            });
        },
        /**
         * 模态框
         */
        dialogShow( state ){
            let _this = this;
            _this.tip.state = state ;
            let checked_sum = 0;
            let _repoName = "";
            if( state === "add" ){
                let flag = false ;
                for( let i = 0 ; i < _this.btm.times.listContent.length ; i++ ){
                    if( _this.btm.times.listContent[i]['checked'] === true ){
                        console.log(_this.btm.times.listContent[i].repoName);
                        flag = true ;
                        checked_sum = checked_sum+1;
                        // 获取到已被选中的照片 客户人员类型
                        _repoName = _this.btm.times.listContent[i].repoName;
                    }
                }
                // 判断勾选的数量
                if (checked_sum == 1){
                  if( flag === true ){
                      // 判断勾选的照片人员会员类型
                      // 会员库VIP会员
                    if( _repoName == '金王会员库') {
                        
                        _this.tip.title = "黑名单添加"; 
                        _this.tip.state = "repoName_vip";
                    }else if(_repoName == '金王黑名单库') {
                        // 黑名单会员
                        _this.tip.state = "repoName_black";
                    }else {
                        // 普通会员
                        _this.tip.state = "add"; 
                        _this.tip.title = "黑名单添加";
                    }
                    _this.tip.dialogVisible = true ;
                  }
                }else if (checked_sum > 1){
                    //如果勾选的数量大于1 将模态框的状态设为greater
                    _this.tip.state = "greater_addBlackPic";
                    // 并打开模态框
                    _this.tip.dialogVisible = true ;
                    _this.tip.title = "黑名单添加";
                    // _this.$message.warning("请选择要添加黑名单的照片！");
                }else {
                    _this.$message.warning("请选择要添加至黑名单的照片！");
                }
                
            }else if( state === "del"){
                let flag = false ;
                for( let i = 0 ; i < _this.btm.times.listContent.length ; i++ ){
                    if( _this.btm.times.listContent[i]['checked'] === true ){
                        flag = true ;
                        checked_sum = checked_sum+1;
                    }
                }
                if(checked_sum == 1 ){
                    if( flag === true ){
                      _this.tip.dialogVisible = true ;
                      _this.tip.title = "删除照片";
                    }
                }
                else if( checked_sum > 1 ){
                    //如果勾选的数量大于1 将模态框的状态设为greater
                    _this.tip.state = "greater_delPic";
                    // 并打开模态框
                    // _this.$message.warning("请选择要添加黑名单的照片！");
                    _this.tip.dialogVisible = true ;
                    _this.tip.title = "删除照片";
                }else {
                    _this.$message.warning("请选择要删除的照片！");
                }
            }else{
                _this.tip.title = "";
                _this.tip.dialogVisible = false ;
            }
        },
        /**
         * 添加到黑名单点击确定
         */
        
        toBlackPic(){
            // let _this = this;
            // _this.tip.title = "";
            // _this.tip.state = "error";

            let _this = this;
            let str = "";
            let N = _this.btm.times.listContent.length-1 ;
            for( let i = 0 ; i < _this.btm.times.listContent.length ; i++ ){
                if( _this.btm.times.listContent[i]['checked'] === true ){
                    str += _this.btm.times.listContent[i]['id'] + "," ;
                }
            }
            str = str.substring(0,str.length-1);
             let formdata = _this.$config.formData({}); 
            _this.$axios.post(_this.$url.browse_blackAdd+"/"+str , formdata ).then((res)=>{
                if( res.status == 200 && res.data.code == 1 ){
                    _this.$message.success("添加成功！");
                    _this.tip.dialogVisible = false;
                }else {
                    _this.$message.error("添加失败, 请稍后重试！");
                    _this.tip.dialogVisible = false;
                }
                // 添加 强制使弹框隐藏
                // clearTimeout(setTimeout);
                // let timeOut = setTimeout(() => {
                //     _this.tip.dialogVisible = false
                // }, 2000);
                _this.tip.title = "" ;
            }).catch((err)=>{
                _this.$message.error("请求失败，请稍后再试！");
            });


        },
        /**
         * 点击图片进入个人中心
         */
        toPersonal(item){
            let _this = this;
            let Num = item.age;
            // _this.$router.push({ name: 'Personal',params:{ personal : Num }});
        },

        /**
         * 添加黑名单时弹框备注输入框相关方法
         */
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
        loadAll() {
            return [
              { "value": "附近小偷" },
              { "value": "警方通缉"},
              { "value": "会员偷东西"},
            ];
        },
        handleSelect(item) {
          console.log(item);
        },
        handleIconClick(ev) {
          console.log(ev);
        }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    #browse{
        width: 100%;
        /* min-height: 539px; */
        color: #fff;
        border-radius: 10px;
        /* padding: 2%; */
        margin: auto;
        overflow: hidden;
        position: relative;
        margin-bottom: 20px;
        min-width: 1021px;
        overflow-x: auto;
    }
    #browse > div {
        /* width: 98%; */
        padding: 20px;
    }
    .b_top {
        background: rgba(255,255,255,0.1);
        padding: 20px;
    }
    .b_btm {
        background: rgba(255,255,255,0.1);
        margin-top: 20px;
        padding: 20px;
    } 
    .page_title {
        font-size: 20px;
        font-weight: 400;
    }
    
    .timeLis {
        display: inline-block;
        vertical-align: middle;
    }
    .timeLis > li {
        float: left;
        height: 40px;
        line-height: 40px;
        vertical-align: middle;
        margin: 0px 10px;
        color: #c5c5c5;
        cursor: pointer;
    }
    .timeLis > li.active {
        color: #fff;
    }
    .top_content {
        margin-top: 15px;
    }
    .age>div {
        display: inline-block;
        vertical-align: middle;
        margin: 0px 10px;
    }
    .startage input  {
        border: 1px solid #91a2eb;
        background: rgba(0,0,0,0);
        border-radius: 20px;
        color: #c5c5c5;
        outline: none;
        width: 100%;
        height: 100%;
        padding-left: 24px;
        box-sizing: border-box;
    }
    .endage input {
        border: 1px solid #91a2eb;
        background: rgba(0,0,0,0);
        border-radius: 20px;
        color: #c5c5c5;
        outline: none;
        width: 100%;
        height: 100%;
        padding-left: 24px;
        box-sizing: border-box;
    }
    .age_line {
        display: inline-block;
        vertical-align: middle;
        width: 30px;
        height: 1px;
        background: #91a2eb;
    }
    .startage {
        display: inline-block;
        position: relative;
        width: 78px;
        height: 36px;
    }
    .endage  {
        display: inline-block;
        position: relative;
        width: 78px;
        height: 36px;
    }
    .startage:after   {
        content: "岁";
        display: block;
        position: absolute;
        right: 15px;
        top: 47%;
        transform: translateY(-50% );
        color: #c5c5c5;
        font-size: 13px;
    }
    .endage:after {
         content: "岁";
        display: block;
        position: absolute;
        right: 15px;
        top: 47%;
        transform: translateY(-50% );
        color: #c5c5c5;
        font-size: 13px;
    }
    .operaty > div {
        display: inline-block;
        color: #c5c5c5;
        font-size: 14px;
        margin: 0px 10px;
        width: 110px;
        height: 40px;
        line-height: 40px;
        border: none;
        border-radius: 20px;
        text-align: center; 
    } 
    .search_icon {
        display: inline-block;
        vertical-align: middle;
        width: 20px;
        height: 20px;
        background: url("../../assets/images/search_icon.png") no-repeat;
        background-size: 100% 100%;
    }
    .todo_search:hover .search_icon {
        background: url("../../assets/images/search_icon_hover.png") no-repeat;
        background-size: 100% 100%;
    }
    .black_icon {
        display: inline-block;
        vertical-align: middle;
        width: 20px;
        height: 20px;
        background: url("../../assets/images/browse_black.png") no-repeat;
        background-size: 100% 100%;
    }
    .add_black:hover .black_icon {
        background: url("../../assets/images/browse_black_hover.png") no-repeat;
        background-size: 100% 100%;
    }
    .operaty > div:hover{
        background: rgb(54, 63, 104);
        color: #fff;
        cursor: pointer;
    }
    .operaty > div:active {
        opacity: 0.8 ;
    } 
    .del_icon {
        display: inline-block;
        vertical-align: middle;
        width: 20px;
        height: 20px;
        vertical-align: sub;
        background: url("../../assets/images/del_btn.png") no-repeat;
        background-size: 100% 100%;
    }
    .del_btn:hover .del_icon {
        background: url("../../assets/images/del_btn_hover.png") no-repeat;
        background-size: 100% 100%;
    }
    .add_store>li {
        float: left;
        width: 90px;
        color: #c5c5c5;
        padding: 5px 5px 10px 0px;
        margin-right:10px;
        cursor: pointer;
    }
    .add_store>li.active {
        color: #fff;
        border-bottom: 1px solid #fff;
    }
    #browse > .b_btm {
        padding: 20px 40px 40px;
    }
    
    div.clickMore {
        background: #596085;
        color: #d2d8fc;
        text-align: center;
        height: 32px;
        line-height: 32px;
        border: 1px solid #596085; 
    }
    div.clickMore:hover {
        opacity: 0.8;
        border: solid 1px #596085;
        color: #596085;
        background: rgba(0,0,0,0);
    }
    div.clickMore:active {
        opacity: 0.6;
        border: solid 1px #596085;
        color: #596085;
        background: rgba(0,0,0,0);
    }
    .img_box {
        width: 150px;
        height: 180px;
        margin-bottom: 7px;
        position: relative;
    }
    .img_box > .chk_box {
        position: absolute;
        left: 10px;
        top: 10px;
    }
    .img_box img {
        width: 100%;
        height: 100%;
    }
    input[type="checkbox"]{
        width: 16px;
        height: 16px;
        position: absolute;
        left: 10px;
        top: 10px;
    }
    .pictrue_box {
        display: inline-block;
        vertical-align: middle;
        width: 180px;
    }
    .pic_all_box {
        /* min-width: 750px; */
        font-size: 0px;
    }
    .times_pic_box  {
        /* min-width: 750px; */
        font-size: 0px;
    }
    .times_pic_box p {
        font-size: 13px;
    }
    .pic_all_box>div {
        margin-bottom: 10px;
        font-size: 13px;
    }
    .times_pic {
        /* min-width: 750px; */
        margin-top: 30px;
        padding: 0px 20px;
        color: #c5c5c5;
        font-size: 13px;
    }
    .times_pic>div>.pictrue_box {
        margin-bottom: 10px;
    }
    /* 虚拟操作日期选择框DOM样式 */
    .el-range-editor.el-input__inner {
        background: #1a1f37;
        border-radius: 20px;
        border-color: #91a2eb;
    }
    /* 虚拟操作分页DOM样式 */
    .el-pagination {
        display: inline-block;
    }
    .pictrue_box p {
        font-size: 13px;
        line-height: 1.769230769230769;
    }
    .footer_btn  {
       	width: 100px;
        height: 38px;
        background-color: #4b77e5;
        border-radius: 10px;
        border: 1px solid #4b77e5;
        outline: none;
        color: #fff;
        cursor: pointer;
    }
    .footer_btn:hover {
        opacity: 0.8;
    }
    .footer_btn:active {
        opacity: 0.6;
    }
    .footer_btn + .footer_btn  {
        margin-left: 100px;
        background-color: #87a7f6;
        border: 1px solid #87a7f6;
    }
    
    .pic_icons {
        width: 16px;
        height: 16px;
        display: inline-block;
        vertical-align: text-bottom;
    }
    .pic_vip {
        background: url( " ../../assets/images/browse_vip_icon.png") no-repeat ;
        background-size: 100% 100%;
    }
    .pic_black {
        background: url( " ../../assets/images/browse_black_icon.png") no-repeat ;
        background-size: 100% 100%;
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
    .pic_font {
        font-size: 10px;
        white-space:nowrap;
    }
    inline_block {
        display: inline-block;
    }
    .dialog_black_success{
        height: 200px;
    }
    .dialog_black_success p {
        color: #fff;
        text-align: center;
    }
    .dialog_black_error p {
        color: #fff;
        text-align: center;
    }
    
    /**
    模态框提示内容居中
    */
    .dialog_text_center {
        text-align: center;
    }
    /* 虚拟操作模态框DOM样式 */
    .el-dialog{
        height: 275px;
    }
    .dialog-footer {
        margin: 30px 0 20px 0;
    }
    #isBlack {
        color: #bdc0d4;
        font-size: 14px;
        margin-top: 30px;
        margin-bottom: 20px;
    }
    #black_commit {
        color: #bdc0d4;
        font-size: 14px;
    }
    #beiZhu {
        margin-right: 22px;
    }
    /* .el-dialog__body {
        height: 200px;
    } */
    .el-dialog__body .el-input__inner {
        width: 310px;
        height: 38px;
        border-radius: 20px;
    }
    /* 虚拟操作DOM 分页按钮页码padding*/
    .add_pages .el-pagination {
        text-align: right;
        padding: 2px 0;
    }
    
</style>
