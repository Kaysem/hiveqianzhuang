<template>
    <div id="blacklist" @click="bigShow = false">
      <div class="bg" >
            <p class="tip">黑名单库</p>
            <div class="top">
                <div>
                    <el-row class="top_left">
                         <el-button type="primary" round class="addblackbtn" @click="addBlack">添加黑名单</el-button>
                    </el-row>
                </div>
                <div class="top_content timesearch">
                <b>可选择时间：</b>
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
                <div class="top_right">
                    <el-input  placeholder="请输入门店名称" v-model="SearchInput" class="input-with-select searchinput">
                        <el-button slot="append" icon="el-icon-search" @click="SearchBtn(SearchInput)"></el-button>
                    </el-input>
                </div>
            </div>
            <!-- 表格 S -->
            <div class="table_box">
                <el-table
                    ref="multipleTable"
                    :data="table.tableData "
                    style="width: 100%"
                    stripe
                    :default-sort = "{prop: 'date', order: 'descending'}"
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
                    prop="comeStore"
                    sortable
                    >
                    </el-table-column>
                    <el-table-column
                    label="备注"
                    prop="mark"
                    >
                    </el-table-column>
                    <el-table-column
                    label="最近到店时间"
                    prop="lastdate"
                    sortable
                    >
                    </el-table-column>
                    <el-table-column
                    label="出现次数"
                    prop="comeCnt"
                    >
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <span class="table_todo table_look" @click.stop="handleLook(scope.$index, scope.row , $event)" ></span>
                            <span class="table_todo table_del" @click.stop="handleDelete(scope.$index, scope.row)"></span>
                        </template>
                    </el-table-column>

                </el-table>
                <div id="big_picture"  v-show="bigShow == true"  @click.stop="bigShow = true">
                        <div class="kapian" :data="gridData">
                            <!-- <img src="../../assets/images/01.jpg" class="img"> -->
                            <img :src="gridData.url" class="img">
                            <div class="table_top"> 
                                  <div class="table_left">
                                        <!-- <p>女</p> -->
                                        <p>{{ gridData.sex }}</p>
                                        <p class="shuxing">性别</p>
                                  </div>
                                  <div class="table_right">
                                        <!-- <p>18岁</p> -->
                                        <p>{{ gridData.age }}</p>
                                        <p class="shuxing">年龄</p>
                                  </div>
                            </div>
                            <div class="table_bottom">
                                  <div class="table_left">
                                        <!-- <p>消费顾客</p> -->
                                        <p>{{ gridData.memType }}</p>
                                        <p class="shuxing">身份信息</p>
                                  </div>
                                  <div class="table_right">
                                        <!-- <p>西直门店</p> -->
                                        <p>{{ gridData.comeStore }}</p>
                                        <p class="shuxing">创建门店</p>
                                  </div>
                            </div>
                            
                            <div class="info_analyze">
                                  <span>创建时间 : </span>
                                  <!-- <span>2018-03-40  14:34:54</span> -->
                                  <span>{{ gridData.createdate }}</span>
                            </div>
                            <div class="info_analyze">
                                  <!-- <span>出现频率最多月份 : 9月</span> -->
                                  <span>出现频率最多月份 : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ gridData.comeMonth }}</span>
                            </div>
                            <div class="info_analyze">
                                  <!-- <span>出现频率最多周期 : 星期二</span> -->
                                  <span>出现频率最多周期 : &nbsp;&nbsp;&nbsp;&nbsp;{{ gridData.comeWeek }}</span>
                            </div>
                            <div class="info_analyze">
                                  <!-- <span>出现频率最多门店 : 西直门店</span> -->
                                  <span>出现频率最多门店 : &nbsp;&nbsp;&nbsp;&nbsp;{{ gridData.comeStore }}</span>
                            </div>
                      </div>

                    <!-- </el-popover> -->
                </div>
            </div>
            <!-- 表格 E -->
            
            <!-- 黑名单总人数 -->
            <div class="clear float_left">
                <span :total=page.total  class="float_left">黑名单人员:{{ page.total }}人</span>
            </div>

           <!-- 分页 S -->
            <div class="add_pages">
                <span @click="tochagePage('L')">首页</span>
                <el-pagination
                  background
                  @current-change="handleCurrentChange"
                  :current-page="page.currentPage"
                  :page-size="page.pageSize"
                  layout="prev, pager, next"
                  :total=page.total>
                </el-pagination>
                <span @click="tochagePage('R')">尾页</span>
            </div>
            <!-- 分页 E -->
        </div>
        <!-- 提示框 S -->
        <el-dialog
            class="dialog_box"
            title="黑名单添加"
            :visible.sync="Dialog.del.show"
            width="30%"
            center>
                <p> 删除黑名单会导致该用户进入正常顾客体系，是否</p>
                <p>确认要删除黑名单？</p>
                <span slot="footer" class="dialog-footer">
                    <el-button class="gosure"  type="primary" @click="sureDelRow()">确 定</el-button>
                    <el-button class="goback" @click="Dialog.del.show = false">取 消</el-button>
                </span>
        </el-dialog>

    </div>
</template>

<script>
import imgsrc from "../../assets/images/1.jpg";

export default {
  name: "Blacklist",
  data() {
    return {
      userinfo: {},
      SearchInput: "",
      top:{
        valueTimeS: '',
        valueTime: [], //时间
      },
      table: {
        tableData: [],
        // chooseImg: "",
      },
      page: {
        total: 0 ,      //总条数
        pageSize: 8,    //1页条数
        currentPage: 1, //当前页面位置
        allPages:  0  ,
      },
      Dialog: {
        del: {
          show: false
        }
      },
      bigShow: false,
      gridData: [],
    };
  },
  methods: {
    /**
     *搜索时间改变
     */
    changeTimes( ){
        let _this = this; 
        if( _this.top.valueTimeS != "custom" ){
            _this.top.valueTime = [];
        }
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
    //请求列表
    getPics(n = 1) {
      let _this = this;
      // console.log(_this.userinfo);
      let timestamp = (new Date()).getTime();//当前时间
      let timeStart = "";
      let timeEnd = "";
      console.log(_this.top.valueTimeS);
      if( _this.top.valueTimeS == 'half' ){
          timeStart = _this.getMyDate( (timestamp/1000-1800) * 1000 ) ;
          timeEnd = _this.getMyDate( timestamp ) ;
      }else if( _this.top.valueTimeS == 'hour' ){
          timeStart = _this.getMyDate( (timestamp/1000-3600) * 1000 ) ;
          timeEnd = _this.getMyDate( timestamp ) ;
      }else if( _this.top.valueTimeS && _this.top.valueTime != []){
          timeStart = _this.top.valueTime[0] ;
          timeEnd = _this.top.valueTime[1] ;
      }else {
          timeStart = "";
          timeEnd   = "";
      }
      console.log(123);
      console.log(timeStart,timeEnd);
      let json = {
        'venderId': _this.userinfo.store_root_id,
        'storeName': _this.SearchInput,
        'rows': 8, //每页条数
        'sidx': "", //排序字段
        'sord': "", //ASC|DESC
        'page': n,
        'st': timeStart ,
        'et': timeEnd
      };
      let formdata = _this.$config.formData(json);
      _this.$axios.post(_this.$url.blacklist_list, formdata)
        .then(res => {
          _this.table.tableData = [] ;
          console.log(res.data);
          // if (res.status == 200 && res.data.code == 1) {
          if (res.status == 200) {
            console.log('请求了黑名单数据成功了');
            let data = res.data;

            // 金王数据测试 S
            // _this.page.total = data.count ; 
            // _this.page.currentPage = data.start ;
            // _this.page.allPages = data.pages ;
            // _this.table.tableData = data.datas ;
            //金王数据测试  end

            _this.page.total = data.records;  // 总条数
            _this.page.currentPage = data.page; // 当前页
            _this.page.allPages = data.total; //总页数
            _this.table.tableData = data.rows; // 列表黑名单人员数据
            for( let i = 0 ; i <  _this.table.tableData.length ;i++ ){
               _this.table.tableData[i]['lastdate'] = _this.getMyDate(_this.table.tableData[i]['lastdate']);
            }
            // _this.top.valueTimeS = "";
            // _this.top.valueTime = [];
          } else {
            _this.$message.error("请求失败！");
          }
        })
        .catch(err => {
          _this.$message.error("服务器繁忙，请稍后再试");
          console.log(err);
        });
    },
   
    // 分页方法 S
    //改变页码
    handleCurrentChange(val) {
      let _this = this;
      _this.page.currentPage = val;
      _this.getPics(_this.page.currentPage);
      console.log(`当前页: ${val}`);
    },
    //首页
    tochagePage(type) {
      let _this = this;
      if (type == "L") {
        _this.page.currentPage = 1;
      } else {
        _this.page.currentPage = _this.page.allPages;
      }
      _this.getPics(_this.page.currentPage);
    },
    // 搜索
    SearchBtn(searchinput) {
      let _this = this;
      console.log(searchinput);
      _this.getPics();
    },
    typeIndex(index) {
      let _this = this;
      return index + (_this.page.currentPage - 1) * 8 + 1;
    },

    // 表单操作之删除操作事件
    handleDelete(index, row) {
      let _this = this;
      _this.Dialog.del.show = true;
      _this.Dialog.del.row = row;

      // 点确定后执行sureDelRow()
    },
    // 从黑名单中删除之弹框确认按钮事件
    sureDelRow(){
      let _this = this;
      _this.$axios.get( _this.$url.blacklist_del+"/"+_this.Dialog.del.row.id ).then((res)=>{
          if( res.status == 200 && res.data.code == 1 ) {
              _this.$message.success("删除成功！");
              _this.getPics(_this.page.currentPage);
          }else {
              _this.$message.error(res.data.msg);
          }
          _this.Dialog.del.show = false ;
          
      }).catch((err)=>{
          _this.$message.error("请求失败，请稍后再试！");
      })
    },
    //表单操作之查看操作事件
    handleLook(index, row, e) {
      let _this = this;
      _this.bigShow = false;
      // let table_top = $(".table_box").offset().top;
      // let Table_Height = $(".table_box").height();
      // let TOP = $(e.target).offset().top - table_top;
      // if (Table_Height - TOP <= $("tbody tr:last-child").height()) {
      //   TOP = TOP - 10;
      // } else if (Table_Height - TOP <= $("tbody tr:last-child").height() * 2) {
      //   TOP = TOP - 50;
      // } else {
      //   TOP = TOP + 10;
      // }
      // $("#big_picture").css({
      //   top: TOP
      // });

      // _this.table.chooseImg = rows.imageurl ;
      // 点击查看之后 获取当前点击黑名单数据
      for( let i = 0 ; i <  _this.table.tableData.length ;i++ ){
        _this.table.tableData[i]['createdate'] = _this.getMyDate(_this.table.tableData[i]['createdate']);
      }
      _this.gridData = _this.table.tableData[index]
      console.log(_this.table.tableData[index]);
      
      _this.bigShow = true;
    },
    // 添加黑名单按钮事件
    addBlack() {
      let _this = this;
      _this.$router.push({path: '/black/blackadd'});
    }
  },
  beforeDestroy() {
    let _this = this;
  },
  mounted() {
    let _this = this;
    _this.userinfo = sessionStorage.getItem("userinfo") != "" ? JSON.parse(sessionStorage.getItem("userinfo")) : "";
    _this.getPics(); //下拉数据
  },
  watch: {
    //侦听 Dialog.del.show 值的变化  从而操作Dialog.del.show
    "Dialog.del.show": {
        handler: function( val, oldval ){
            let _this = this;
            if( val === false ){
                _this.Dialog.del.row = {};
            }
        },
        deep: true
    },
    'top.valueTime': {
        handler: function( val, oldval ){
          console.log(val);
            let _this = this;
            if( val === [] || val === null ){
                _this.top.valueTime = [] ;
                _this.top.valueTimeS = "";
            }
            if( val != [] && val !=null  && val.length != 0 ){
                _this.top.valueTimeS = "custom" ;
            }
            _this.getPics();
            console.log('先执行 小时');
        },
        deep: true
    },
    // 'top.valueTimes': {
    //     handler: function( val, oldval ){
    //         let _this = this;
    //         console.log(val);
    //         if( val === "" ){
    //              _this.top.valueTimeS = "" ;
    //         }
    //         if( val != "" ){
    //             _this.top.valueTimeS = oldval ;
    //         }
    //         _this.getPics();
    //         console.log('先执行 日期');
    //     },
    //     deep: true
    // },
    'SearchInput': {
       handler: function( val, oldval ){
         console.log(val);
            let _this = this;
            if( val === "" ){
                val = "" ;
            }
            if( val != "" ){
                _this.top.valueTimeS = "val" ;
            }
            _this.getPics();
            console.log('先执行 日期');
        },
        deep: true
    }
  }
};
</script>
<style scoped>
#blacklist {
  width: 96%;
  /* min-height: 539px; */
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  border-radius: 10px;
  padding: 2%;
  margin: auto;
  overflow: hidden;
  position: relative;
  margin-bottom: 20px;
}
.bg {
  padding: 0px 20px;
}
.tip {
  font-size: 24px;
  margin-top: 16px;
}
.el-button + .el-button {
  margin-left: 0px;
}
.top {
  position: relative;
  height: 34px;
  margin: 20px 0px 30px;
}
.top_left {
  top: 0;
  left: 0;
  position: absolute;
}
.top_right {
  top: 0;
  right: 0;
  position: absolute;
  width: 270px;
}
.top_right > .el-input {
  width: 100%;
}
.el-input-group__append {
  border-top-right-radius: 16px;
  border-bottom-right-radius: 16px;
}
.dialog_footer {
  text-align: center;
}
.add_pages {
  text-align: right;
  margin-top: 14px;
  /* margin-bottom: 30px; */
}
.add_pages > span {
  display: inline-block;
  width: 28.5px;
  height: 28px;
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  font-size: 10px;
  text-align: center;
  line-height: 28px;
  border-radius: 5px;
  vertical-align: text-top;
  cursor: pointer;
}
.add_pages > span:hover {
  background: #91a2eb;
}
.add_pages > span:last-child {
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
/* 黑名单 */
#blacklist .el-button {
  border: none;
  height: 34px;
}
#blacklist .top_left .el-button + .el-button {
  margin-left: 10px;
}
#blacklist .el-dialog__wrapper .el-button + .el-button {
  margin-left: 50px;
}
.addblackbtn {
  width: 120px;
  height: 48px;
  background-color: #6477c8;
  border-radius: 24px;
}

.table_look {
  background: url("../../assets/images/look_hover.png") no-repeat;
  background-size: 100% 100%;
  /* margin-right: 48px; */
}
.table_write {
  background: url("../../assets/images/write_hover.png") no-repeat;
  background-size: 100% 100%;
}
.table_del {
  background: url("../../assets/images/del_hover.png") no-repeat;
  background-size: 100% 100%;
}
.table_todo {
  display: inline-block;
  width: 16px;
  height: 18px;
  margin: 0 44px;
  vertical-align: middle;
}
.gosure {
  width: 120px;
  height: 38px;
  background-color: #2f67c2;
  border-radius: 6px;
  border: none;
}
.goback {
  width: 120px;
  height: 38px;
  background-color: #6477c8;
  border-radius: 6px;
  color: #fff;
  border: none;
}
.table_box {
  position: relative;
  min-height: 422px;
}
#big_picture {
  position: absolute;
  top: -26%;
  right: 16%;
  /* width: 160px;
  height: 200px; */
}

.float_left {
    float:left;
}
.clear {
    margin-left: 8px;
    margin-top: 14px;
    height:8px;
}
.float_right {
    float: right;
}

/* 弹框显示黑名单会员个人信息样式 Start*/

.kapian {
                 width: 298px;
                 height: 470px; 
                 background-color: #313856;
                 border-radius: 10px;
                 margin-top: 100px;
                 color: #fff;
                 font-size: 14px;
                 font-weight: 700;
                 font-family: MicrosoftYaHei;
            }
            .img {
                  width: 116px;
                  height: 116px;
                  border: 4px solid #717ba3;
                  border-radius: 50%;
                  margin-top: -48px;
                  margin-left: 88px;
                  margin-bottom: 24px;
            }
            p {
                  margin-top: 10px;
                  margin-bottom: 10px;
            }
            .table_top {

                  text-align: center;
                  border-bottom: 1px solid #464f76;
            }
            .table_left {
                  width: 123px;
                  display: inline-block;
                  border-right: 1px solid #464f76;
            }
            .table_right {
                  width: 123px;
                  display: inline-block;
            }
            .table_bottom{
                  text-align: center;
            }
            .shuxing {
                  font-size: 12px;
                  color: #bdc0d4;
            }
            .info_analyze {
                  margin-left: 42px;
                  margin-top:  28px;
            }
/* 弹框显示黑名单会员个人信息样式 End*/

    .timesearch {
      float: right;
      margin-right: 300px;
    }
    .el-input__inner {
      width: 364px;
      height: 35px;
      background-color: #1a1f37;
      border-radius: 20px;
      border-color: #91a2eb
    }
</style>

