
<template>
 <div id="usercenter">
    <div class="US_search">
      <el-input :disabled="S_isdisabled" v-model="USinput" placeholder='请输入会员id' @keyup.enter.native="enter_search()"></el-input>
      <el-button class="USsearch_btn" @click="searchNum()" >查询</el-button>
    </div>
    <div class="UStitle">
      <p>
        <i class="US_sourse"></i>
        <span v-html="important">  </span> 
      </p>
    </div>
    <div class="UScontent clearfix">
      <div class="UScontent_left fl">
        <el-row class="US_left_top">
          <el-col :span="12">
            <div class="grid-content bg-purple picture_content">
              <h5>会员基本信息</h5>
              <!-- <p> {{userinfodata.title}} <i> {{userinfodata.vip}} </i> </p> -->
              <el-row :gutter="20" class="info_one">
                <el-col :span="12" v-for="item in userinfodata.content">
                  <div class="grid-content bg-purple" v-for="(key , value) in item"  v-if="value == '头像'">
                    <span style="display: inline-block;width: 100%; height: 100%; "><img  :src="key" alt="" style="width: 100%;height: 100%;"></span>
                  </div>
                  <div class="grid-content bg-purp；le" v-for="(key , value) in item"  v-else>
                    {{value}} : <span> {{key}} </span>   
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :span="12">
          <div class="grid-content bg-purple picture_content">
                <h5>会员特征</h5>
                <div class="info_two">
                    <span v-for="(item,key) in userpointdata">
                        <span v-if="key != 'memNo'"> <i class="it_s" > {{item}} </i> </span>
                    </span>
                </div>
          </div>          
          </el-col>
        </el-row>

        <el-row class="US_left_btm">
          <el-col :span="12">
          <div class="grid-content bg-purple picture_content">
              <h5>消费场景</h5>
              <div class="info_three" id="myChart_left" ref="myChart_left"></div>

          </div>          
          </el-col>

          <el-col :span="12">
          <div class="grid-content bg-purple picture_content">
              <h5>消费情况</h5>
              <div class="info_fore"  id="myChart_right" ref="myChart_right"></div>

          </div>          
          </el-col>
       
        </el-row>
      </div>


      <div class="UScontent_right fr">
         <div class="picture_content"> 
            <h5>行为洞察</h5>
            <div class="UScontent_right_btm" v-show="right_box">

                <div class="rightInfo_ls">
                    <h4>零售</h4>
                    <p v-for="item in news_ls">
                    <span v-for="(key , value) in item">
                        <span>{{value}}：</span> <i> {{key}} </i>   
                    </span>
                    </p> 
                </div>

                <div class="rightInfo_cy">
                    <h4>餐饮</h4>
                    <p v-for="item in news_cy">
                    <span v-for="(key , value) in item">
                        <span>{{value}}：</span> <i> {{key}} </i>   
                    </span>
                    </p> 
                </div>

                <div class="rightInfo_jd">
                    <h4>酒店</h4>
                    <p v-for="item in news_jd">
                    <span v-for="(key , value) in item">
                        <span>{{value}}：</span> <i> {{key}} </i>   
                    </span>
                    </p> 
                </div>

            </div>
         </div>
      </div>
    </div>

    <div class="fx_box">
        <h4 class="m_pm">月度消费排名分析</h4>
        <div class="month_fx">
           <div>
                <div class="m_f_box">
                    <p>总消费</p>
                    <p v-show="btm_show">击败了<span> 【<i v-if="beat_m.length > 0" v-text=" Math.floor(Number(beats_m.m_one.beatRate)*100)+'%' "></i>】</span>所有人</p>
                </div>
            </div>
            <div>
                <div class="m_f_box">
                    <p>年龄</p>
                    <p v-show="btm_show">击败了<span> 【<i v-if="beat_m.length > 0" v-text=" Math.floor(Number(beats_m.m_two.beatRate)*100)+'%' "></i>】</span>同龄人</p>
                </div>
            </div>
            <div>
                <div class="m_f_box">
                    <p>星座</p>
                    <p v-show="btm_show">击败了<span> 【<i v-if="beat_m.length > 0" v-text=" Math.floor(Number(beats_m.m_three.beatRate)*100)+'%' "></i>】</span>相同星座的人</p>
                </div>
            </div>
            <div>
                <div class="m_f_box">
                    <p>地区</p>
                    <p v-show="btm_show">击败了<span> 【<i v-if="beat_m.length > 0" v-text=" Math.floor(Number(beats_m.m_fore.beatRate)*100)+'%' "></i>】</span>的<i v-if="beat_m.length > 0" v-text="beats_m.m_fore.csmDim2"></i>地区人</p>
                </div>
            </div>
        </div>
    </div>
    <div class="fx_box">
        <h4>年度消费排名分析</h4>
        <div class="year_fx">
            <div>
                <div class="y_f_box">
                    <p>总消费</p>
                    <p v-show="btm_show">击败了<span> 【<i v-if="beat_y.length > 0" v-text=" Math.floor(Number(beats_y.y_one.beatRate)*100)+'%' "></i>】</span>所有人</p>
                </div>
            </div>
            <div>
                <div class="y_f_box">
                    <p>年龄</p>
                    <p v-show="btm_show">击败了<span> 【<i v-if="beat_y.length > 0" v-text=" Math.floor(Number(beats_y.y_two.beatRate)*100)+'%' "></i>】</span>同龄人</p>
                </div>
            </div>
            <div>
                <div class="y_f_box">
                    <p>星座</p>
                    <p v-show="btm_show">击败了<span> 【<i v-if="beat_y.length > 0" v-text=" Math.floor(Number(beats_y.y_three.beatRate)*100)+'%' "></i>】</span>相同星座的人</p>
                </div>
            </div>
            <div>
                <div class="y_f_box">
                    <p>地区</p>
                    <p v-show="btm_show">击败了<span> 【<i v-if="beat_y.length > 0" v-text=" Math.floor(Number(beats_y.y_fore.beatRate)*100)+'%' "></i>】</span>的<i v-if="beat_y.length > 0" v-text="beats_y.y_fore.csmDim2"></i>地区人</p>
                </div>
            </div>
        </div>
    </div>
    <transition name="el-fade-in">
    <div class="user_jl clearfix" v-show="btm_show">
        <!-- 用户消费记录时间轴 -->
        <div class="box_btms" style="width: 70%; height: 400px;" >
            <div id="lins_times"></div>
        </div>
        <!-- 右侧账单信息 -->
        <div class="bills">
            <div class="bill_head">
                <el-date-picker
                    v-model="valueTime"
                    type="daterange"
                    value-format="yyyy-MM-dd"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    @change="change_times"
                    :picker-options="pickerOptions"
                    >
                </el-date-picker>

            </div>
            <div class="bill_body">
                <el-carousel height="450px" style="font-size: 16px;" ref="cardPane" 
                :interval='5000' :initial-index="carousel_start"
                >
                    <el-carousel-item v-for="item in bill_content">
                        <el-row>
                            <el-col :span="12">店号: <i v-text="item.dh"></i> </el-col>
                            <el-col :span="12">流水号： <i v-text="item.lsh"></i> </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">机号: <i v-text="item.jh"></i> </el-col>
                            <el-col :span="12">收银员： <i v-text="item.syy"></i> </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">日期: <i class="line_choose_time" v-text="item.rq"></i> </el-col>
                        </el-row>
                        <el-table
                        :data="item.tableData"
                        height="250"
                        width="100%"
                        :default-sort = "{prop: 'date', order: 'descending'}"
                        >
                            <el-table-column
                            prop="name"
                            label="商品名"
                            >
                            </el-table-column>
                            <el-table-column
                            prop="num"
                            label="数量"
                            sortable
                            >
                            </el-table-column>
                            <el-table-column
                            prop="pre"
                            label="单价"
                            sortable
                            >
                            </el-table-column>
                            <el-table-column
                            prop="money"
                            label="金额"
                            sortable
                            >
                            </el-table-column>
                        </el-table>
                        <p style="margin: 10px auto 15px; font-size: 14px;">订单金额：<i v-text="item.ddje"></i> </p>
                        <!-- <el-row class="take_money">
                            <el-col :span="12">收款总额: <i v-text="item.skze"></i> </el-col>
                            <el-col :span="12">找回： <i v-text="item.zh"></i> </el-col>
                        </el-row> -->
                        <h4>实际支付：<i  v-text="item.sjzf"></i></h4>
                    </el-carousel-item>
                </el-carousel>
                
            </div>

        </div>
    </div>
    </transition>
 </div>

</template>

<script>

  export default {
    name:"usercenter",
    data () {
      return {
        S_isdisabled: true,
        carousel_start: 0, //轮播初始
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now() - 8.64e7;
          }
        }, 
        valueTime:[],
        memNumber:'', //记录用户编码id ，更改时间的时候传入
        beat_m:[],   //月消费排名
        beats_m : {
            m_one:{
                beatRate: '',
                csmDim: '',
                csmDim2:'',
                csmRank:'',
                memberCode:'',
                memberPhone:'',
                month:'',
                vendorId:'',
            },
            m_two:{
                 beatRate: '',
                csmDim: '',
                csmDim2:'',
                csmRank:'',
                memberCode:'',
                memberPhone:'',
                month:'',
                vendorId:'',
            },
            m_three: {
                 beatRate: '',
                csmDim: '',
                csmDim2:'',
                csmRank:'',
                memberCode:'',
                memberPhone:'',
                month:'',
                vendorId:'',
            },
            m_fore: {
                 beatRate: '',
                csmDim: '',
                csmDim2:'',
                csmRank:'',
                memberCode:'',
                memberPhone:'',
                month:'',
                vendorId:'',
            }
        },
        beat_y:[],   //月消费排名
        beats_y : {
            y_one:{ 
                beatRate: '', csmDim: '', csmDim2:'', csmRank:'', memberCode:'', memberPhone:'', month:'', vendorId:'',
            },
            y_two:{
                 beatRate: '', csmDim: '', csmDim2:'', csmRank:'', memberCode:'', memberPhone:'', month:'', vendorId:'',
            },
            y_three: {
                 beatRate: '', csmDim: '', csmDim2:'', csmRank:'', memberCode:'', memberPhone:'', month:'', vendorId:'',
            },
            y_fore: {
                 beatRate: '',csmDim: '',csmDim2:'',csmRank:'',memberCode:'',memberPhone:'',month:'',vendorId:'',
            }
        },
        today_times:  new Date(),  //初始化时间
        btm_show: false,  //有数据时 显示内容
        msg: "我是会员中心",
        radio: '1',
        USinput: "",
        userinfodata : {title: '',vip: "",content: [{},{},{},{},{},{},{},{},{},{},{}]},//用户基本信息
        userpointdata : {}, //用户特征
        rightInfo_ls : [{},{},{},{},{},{},{},{},{},{},{},{},{}],//右侧信息
        rightInfo_cy : [{},{},{},{},{},{}],//右侧信息
        rightInfo_jd : [{},{},{},{},{}],//右侧信息
        right_box : false, //右侧盒子显示隐藏
        important: "" ,//用户重要信息提示
        option_left : {
            title : {},
            tooltip : {trigger: 'item',formatter: "{a} <br/>{b} : {c} ({d}%)"},
            legend: {x : 'left',y : 'top',data:['商超','餐饮','酒店']},
            calculable : true,
            series: [{
                name: "消费场景",
                type: 'pie',
                radius: [0, '55%'],
                center: ['50%', '50%'],
                roseType: 'radius',
                color: ['#00c3c4', '#b599e0', '#00a3f1'],
                data: [
                    {value: Math.round(Math.random() * 1000 ),name: '商超'},
                    {value: Math.round(Math.random() * 1000 ),name: '餐饮'},
                    {value: Math.round(Math.random() * 1000 ),name: '酒店'}
                ],
                label: {normal: {textStyle: {fontSize: 14},formatter: function(param) {return param.name + ':\n' + Math.round(param.percent) + '%';}}},
                labelLine: {normal: {smooth: false, lineStyle: {width: 1}}},
                itemStyle: {normal: {shadowBlur: 10,shadowColor: 'rgba(0, 0, 0, 0.4)'}},
                animationType: 'scale',
                animationEasing: 'elasticOut',
                // animationDelay: function(idx) {return Math.random() * 200;}
            }]
        } ,//南丁格尔玫瑰图
        option_right: {
            title: {text: ''},
            tooltip: {
                trigger: 'axis',
                axisPointer: {type: 'shadow' },// 默认为直线，可选为：'line' | 'shadow'
                formatter: function(datas) {
                    var res = datas[0].name + '<br/>',
                         val;
                    for (var i = 0, length = datas.length; i < length; i++) {
                        val = (datas[i].value) + '元';
                        res += datas[i].seriesName + '：' + val + '<br/>';
                    }
                    return res;
                }
            },
            legend: {data: ['商超', '餐饮', '酒店'],align: 'right',right: 10},
            grid: {left: '3%',right: '4%',bottom: '3%',containLabel: true},
            xAxis: [
                {type: 'category',splitLine: { show: false }, 
                data: []}
            ],
            yAxis: [{type: 'value',splitLine: {show: false }, name: '元',axisLabel: {formatter: '{value}'}}],
            series: [
                {
                    name: '商超',type: 'bar',itemStyle: {normal: {color: '#00c3c4'}},
                    data: [],
                }, 
                {
                    name: '餐饮', type: 'bar', itemStyle: {normal: {color: '#cbb8ea'}},
                    data: [],
                }, 
                {
                    name: '酒店', type: 'bar',itemStyle: {normal: {color: '#66bff6'}},
                    data: [],
                }
            ]
        } ,//柱状图
        peoid: '', //用户的id
        news_ls:[],  //零售
        news_cy:[],  //商超
        news_jd:[],  //酒店
        lines_times: {
            title: {
                text: '当前用户消费时间轴',
            },
            tooltip: {
                trigger: 'axis',
            },
            xAxis: {
                type: 'category',data: [],
            },
            yAxis: {
                type: 'value',
            },
            series: [
                {
                    label: {
                        normal: {
                            show: true,
                            formatter: function(data) {
                                return data;
                            },
                            position: 'top',
                            textStyle: {
                                fontFamily : "微软雅黑",
                                fontSize : 12,
                                color: '#999'
                            }
                        },
                        
                    },
                    data: [],
                    type: 'line',
                }
            ],
        }, // 用户消费记录时间轴
        times_data:[], //用户消费记录时间轴数据
        bill_content: [ 
            {  dh:'', lsh:'', jh:'', syy:'',rq: '', tableData: [], ddje: '' , sjzf :''},
        ], //小票信息
        userinfo: {},
        menuList:[],
        menuoperate: [], //页面操作
      };
    },
    methods : {
        change_times(val){
            let _this = this;
            _this.valueTime = val;
            _this.myChartTimes.clear();
            _this.userTime(_this.memNumber,_this.valueTime);
            _this.tobuy(_this.memNumber,_this.valueTime);
        },
        dataChange(data){
            let _this = this;
            _this.today_times = data
            _this.tobuy(_this.memNumber,_this.today_times);
        },
        enter_search(){
            let _this = this;
            _this.searchNum();
        },
        searchNum(){
            let _this = this;
            if( _this.USinput == "" || _this.USinput == undefined){
                alert("请输入正确用户id")
                _this.clearpage();
            }else {
                //发送请求  S
                _this.sendpage(_this.USinput);
                //发送请求 E
            }
        },
        change_line(){
            let _this = this;
            _this.lines_times.xAxis.data = [];
            _this.lines_times.series[0].data = [];
            $.each(_this.times_data , function( v,k ){
                _this.lines_times.xAxis.data.push( k.time);
                _this.lines_times.series[0].data.push( k.value);
            });
            _this.lines_times.series[0].label.normal.formatter = function( params ){
                let t =  []; $.each(_this.times_data , function(v,k){  t.push( k.event ) ;  }); return t[params.dataIndex];
            }
            $(".box_btms").html('<div id="lins_times"></div>');  //点击事件重复执行， 将原先div清空。
            let dom_times =  document.getElementById('lins_times');
            _this.myChartTimes = _this.$echarts.init(dom_times);
            _this.myChartTimes.clear();   //只是清理画布，而不会删除 生成的元素节点
            _this.myChartTimes.setOption(_this.lines_times);
            _this.myChartTimes.on('click',function(param){
                let line_time = param.name;
                let tick_dom = $(".el-carousel__container .el-carousel__item");
                for(let i = 0 ; i < tick_dom.length ; i++){
                    let dom_time = $(tick_dom[i]).children().eq(2).children("div").children().html();
                    if( line_time === dom_time){
                        _this.setActiveItem(i);
                        return;
                    };
                };
            });
            window.addEventListener("resize", function () {
                // _this.myChartLeft.resize();
                // _this.myChartRight.resize();
                _this.myChartTimes.resize();
            });
        },
        //设置手动更改轮播
        setActiveItem(index){
            let _this = this;
            _this.$refs.cardPane.setActiveItem(index);
        },
        getPie (arr){
            // let _this = this; 
            // ================================================================
            // _this.change_line(); // 改变折线图
            // =====================================================
            // window.addEventListener("resize", function () {
                // _this.myChartLeft.resize();
                // _this.myChartRight.resize();
                // _this.myChartTimes.resize();
            // });
        },
        getEchart_left(){
            let _this = this;

            let dom_left = document.getElementById('myChart_left');
            _this.myChartLeft = _this.$echarts.init(dom_left);
            _this.myChartLeft.setOption(_this.option_left);

             window.addEventListener("resize", function () {
                _this.myChartLeft.resize();
            });
        },
        getEchart_right(){
            let _this = this;
            let dom_right = document.getElementById('myChart_right');
            _this.myChartRight = _this.$echarts.init(dom_right);
            _this.myChartRight.setOption(_this.option_right);
             window.addEventListener("resize", function () {
                _this.myChartRight.resize();
            });
        },
        clearpage (){
            let _this = this ;
                _this.important = ""; 
                // this.userinfodata = "";
                // this.userpointdata = "";
                // this.option_left = {};
                // this.option_right = {};
                // this.rightInfo = [];
                _this.userinfodata = {title: '',vip: "",content: [{},{},{},{},{},{},{},{},{},{},{}]};//用户基本信息
                _this.userpointdata = {};//用户特征
                _this.rightInfo_ls = [{},{},{},{},{},{},{},{},{},{},{},{},{}];//右侧信息
                _this.rightInfo_cy = [{},{},{},{},{},{}];//右侧信息
                _this.rightInfo_jd = [{},{},{},{},{}];//右侧信息
                _this.news_ls = []; 
                _this.news_cy = []; 
                _this.news_jd = []; 
                _this.right_box = false, //右侧盒子显示隐藏
                _this.btm_show = false; //顶部折线图显示隐藏
                _this.myChartLeft.clear();
                _this.myChartRight.clear();
                _this.myChartTimes.clear();
                _this.bill_content =  [ 
                    {  dh:'', lsh:'', jh:'', syy:'', rq: '', tableData: [], ddje: '', sjzf:''},
                ];
                _this.times_data = [];  //用户消费记录时间轴数据;
                _this.beat_m = [];
        }, //清空页面信息
        //   消费小票
        tobuy(Uname,dataTime){
            let _this = this;
            let json_xp = { "vid" : _this.userinfo.store_root_id , 'memNo' : Uname , 'st': dataTime[0] , 'et': dataTime[1]};
            // let json_xp = { 'memNo' : "18630716" , 'datestr': "2017-12-05" };
            let formdata_xp = _this.$config.formData(json_xp); 
            _this.$axios.post( _this.$url.getTicketinfo ,formdata_xp).then((res)=>{ 
                //循环操作小票 ，按照订单号分类 
                let bills = res.data;
                _this.bill_content = [];
                let i = 0;
                for(; i < bills.length ; i++){
                    let tmpValueI = bills[i];
                    let value = {};
                    value['dh'] = tmpValueI.orderStore; value['lsh'] = tmpValueI.orderNo; value['syy'] = tmpValueI.cashier; value['jh'] = tmpValueI.posCode; value['rq'] = tmpValueI.createdate;
                    let ary_table = new Array();
                    let map1 = {'name': tmpValueI.skuName,'num': tmpValueI.skuNum,'pre': tmpValueI.realPrice,'money': tmpValueI.amount,};
                    ary_table.push(map1);
                    let j = i+1;
                    for(; j < bills.length ; j++ ){
                        let tmpValueJ = bills[j];
                        if(tmpValueI.orderNo == tmpValueJ.orderNo){
                            //tab td + row
                            let map2 = {'name': tmpValueJ.skuName,'num': tmpValueJ.skuNum,'pre': tmpValueJ.realPrice,'money': tmpValueJ.amount,};
                            ary_table.push(map2);
                            i++;
                        }else{
                            i = j-1;
                            break;
                        };
                    };
                    //div + 1个
                    value['tableData'] = ary_table;
                    value['ddje'] = tmpValueI.orderAmount;
                    value['sjzf'] = tmpValueI.realPayAmount;
                    _this.bill_content.push(value);
                }
            });
        },
        userTime(uname,dataTime){
            let _this = this;
            _this.$axios.get( _this.$url.getLine1 + "?memNo=" + uname + "&startDate=" + dataTime[0] + "&endDate=" + dataTime[1] + "&vid=" + _this.userinfo.store_root_id).then((res)=>{
                if( res.data.length > 0){
                    let arr = res.data;
                    // arr.reverse();
                    _this.times_data = [];
                    $.each( arr ,function(v,k){
                        let value = [];
                        value['time'] = k.createdate;
                        value['value'] = k.amount;
                        value['event'] = k.amount;
                        _this.times_data.push(value);
                    });
                    _this.change_line();
                }else {
                    _this.times_data = [];
                }
            });
        },
        sendpage(uname="0"){
            //开始请求  S  ==============================================================
            //请求基本信息 和 用户特征
            let _this = this; 
            let json = { 'memNo' : uname}
            _this.memNumber = uname;
            let formdata = _this.$config.formData(json); 
            // ===========================
            _this.$axios.post( _this.$url.getMemInfo ,formdata).then((res)=>{
                if( res.data != ""){
                    _this.right_box = true;
                    _this.btm_show = true;
                    // // 用户基本信息
                    let baseInfo = res.data.baseInfo;  //基本信息
                    let baseBehaviour = res.data.baseBehaviour; //零售
                    let baseTrait = res.data.baseTrait;  //用户特征
                    let baseInfoImage = {} ; //用户头像
                    
                    //  //用户头像
                    if( res.data.baseInfoImage == null ){
                        baseInfoImage = {
                            imgPath :"",
                        };
                    }else {
                        baseInfoImage = res.data.baseInfoImage ;
                    }
                    _this.userinfodata.content[0].头像 = baseInfoImage.imgPath;
                    // 用户信息
                    _this.userinfodata.content[1].性别 = baseInfo.sex;
                    _this.userinfodata.content[2].生日 = baseInfo.birthday;
                    _this.userinfodata.content[3].年龄 = baseInfo.age;
                    _this.userinfodata.content[4].户籍地 = baseInfo.native_city;
                    _this.userinfodata.content[5].生肖 = baseInfo.shengxiao;
                    _this.userinfodata.content[6].信誉额度 = baseInfo.creditLine;
                    _this.userinfodata.content[7].工作地 = baseInfo.work_city;
                    if(baseInfo.memberSource == 0 ){
                        _this.userinfodata.content[8].会员来源 = '微信';
                    }else if (baseInfo.memberSource == 1 ){
                        _this.userinfodata.content[8].会员来源 = '微博';
                    }else if (baseInfo.memberSource == 2 ){
                        _this.userinfodata.content[8].会员来源 = '逛街路过';
                    }else if (baseInfo.memberSource == 3 ){
                        _this.userinfodata.content[8].会员来源 = '朋友推荐';
                    }else if (baseInfo.memberSource == 4 ){
                        _this.userinfodata.content[8].会员来源 = '其他媒体';
                    }else {
                        _this.userinfodata.content[8].会员来源 = '';
                    };
                    _this.userinfodata.content[9].累计积分 = baseInfo.memPointAmount;
                    _this.userinfodata.content[10].会员编号 = uname;
                    // 用户特征
                    delete(baseTrait["memNo"]);
                    _this.userpointdata = baseTrait;
                    //零售信息
                    _this.rightInfo_ls[0].总购买金额 = baseBehaviour.tt_mount;
                    _this.rightInfo_ls[1].总购买次数 = baseBehaviour.tt_times;
                    _this.rightInfo_ls[2].最爱买的商品类型 = baseBehaviour.fav_skuType;
                    _this.rightInfo_ls[3].最爱买的商品名称 = baseBehaviour.fav_skuName;
                    _this.rightInfo_ls[4].最喜欢的购物时间段 = baseBehaviour.fav_buyTime;
                    _this.rightInfo_ls[5].最喜欢的购物日周几 = baseBehaviour.fav_buyDate;
                    _this.rightInfo_ls[6].最喜欢的聚会日 = baseBehaviour.fav_partyDate;
                    _this.rightInfo_ls[7].第一次到店时间 = baseBehaviour.fst_comeDate;
                    _this.rightInfo_ls[8].最后一次到店时间 = baseBehaviour.lst_ComeDate;
                    _this.rightInfo_ls[9].第一次买的产品 = baseBehaviour.fst_skuName;
                    _this.rightInfo_ls[10].买的最贵的商品 = baseBehaviour.mst_expsku;
                    _this.rightInfo_ls[11].买的最贵的商品价格 = baseBehaviour.mst_expskuPrice;
                    _this.rightInfo_ls[12].最大一笔支出最大订单金额 = baseBehaviour.mst_payAmount;
                    _this.news_ls = _this.rightInfo_ls;
                    // 用户提示信息
                    _this.$axios.get( _this.$url.getMsg , {params:{ "vid" : _this.userinfo.store_root_id , uid: uname}}).then((res)=>{
                        if( res.data != ""){
                            _this.important = res.data;
                        }else {
                            _this.important="";
                        }
                    });
                    //饼图
                    _this.$axios.get( _this.$url.getPie + "?memNo=" + uname).then((res)=>{
                        if( res.data != ""){
                            _this.option_left.series[0].data = res.data;
                            _this.getEchart_left();
                        }else {
                            _this.option_left.series[0].data = [];
                            _this.getEchart_left();
                        }
                    });
                    //柱状
                    _this.$axios.get( _this.$url.getBar + "?memNo=" + uname).then((res)=>{
                        if( res.data != null ){
                            let legs =  res.data.legs;
                            let xds = res.data.months;
                            let shangchao = res.data.shangchao;
                            let canyin = res.data.canyin;
                            let jiudian = res.data.jiudian;
                            _this.option_right.legend.data = legs;
                            _this.option_right.xAxis[0].data = xds;
                            _this.option_right.series[0].data =  shangchao;
                            _this.option_right.series[1].data =  canyin;
                            _this.option_right.series[2].data =  jiudian;
                            _this.getEchart_right();
                        }else {
                            let data = {
                                "months":[],
                                "canyin":[],
                                "legs":[],
                                "jiudian":[],
                                "shangchao":[]
                            }
                            let legs =  data.legs;
                            let xds = data.months;
                            let shangchao = data.shangchao;
                            let canyin = data.canyin;
                            let jiudian = data.jiudian;
                            _this.option_right.legend.data = legs;
                            _this.option_right.xAxis[0].data = xds;
                            _this.option_right.series[0].data =  shangchao;
                            _this.option_right.series[1].data =  canyin;
                            _this.option_right.series[2].data =  jiudian;
                            _this.getEchart_right();
                        }
                    });
                     //用户消费记录时间
                        _this.userTime(uname,_this.valueTime);
                    
                }else {
                }
                    // 月度消费排名
                    _this.$axios.get( _this.$url.getMonthReport + "?memNo=" + uname).then((res)=>{
                        if(res.status == 200){
                            let m = res.data;
                            let arr = [];
                            let Length_m ;
                            if( m.length < 4 ) {
                                Length_m = 4 ;
                            }else {
                                Length_m = m.length ;
                            }
                            for( let i = 0 ; i < 4 ; i++ ){
                                for(let j = 0 ; j < m.length ; j++ ) {
                                    if( m[j].csmDim == i ){
                                        arr[i] = m[j] ;
                                        break ;
                                    }else {
                                        arr[i] = {beatRate : '',csmDim : '',csmDim2 : '',csmRank : '',memberCode : '',memberPhone : '',month : '',vendorId :''} 
                                    }
                                }
                            }
                            _this.beat_m = arr;
                            _this.beats_m.m_one = _this.beat_m[0];
                            _this.beats_m.m_two = _this.beat_m[1];
                            _this.beats_m.m_three = _this.beat_m[2];
                            _this.beats_m.m_fore = _this.beat_m[3];
                        }
                    });
                     // 年度消费排名
                    _this.$axios.get( _this.$url.getYearReport + "?memNo=" + uname).then((res)=>{
                        if(res.status == 200){
                            let m = res.data;
                            let arr = [];
                            let Length_m ;
                            if( m.length < 4 ) {
                                Length_m = 4 ;
                            }else {
                                Length_m = m.length ;
                            }
                            for( let i = 0 ; i < 4 ; i++ ){
                                for(let j = 0 ; j < m.length ; j++ ) {
                                    if( m[j].csmDim == i ){
                                        arr[i] = m[j] ;
                                        break ;
                                    }else {
                                        arr[i] = {beatRate : '',csmDim : '',csmDim2 : '',csmRank : '',memberCode : '',memberPhone : '',month : '',vendorId :''} 
                                    }
                                }
                            }
                            _this.beat_y = arr;
                            _this.beats_y.y_one = _this.beat_y[0];
                            _this.beats_y.y_two = _this.beat_y[1];
                            _this.beats_y.y_three = _this.beat_y[2];
                            _this.beats_y.y_fore = _this.beat_y[3];
                            
                        }
                    });
                    // // 消费小票
                    _this.tobuy(uname,_this.valueTime);
            }).catch((err)=>{
                alert("请确认会员id是否存在！");
                _this.clearpage();
            });
            //开始请求  E  ===============================================================
      },
//             插入 
// 参数说明：str表示原字符串变量，flg表示要插入的字符串，sn表示要插入的位置
        insert_flg(str,flg,sn){
            let newstr="";
            for(let i=0;i<str.length;i+=sn){
                let tmp=str.substring(i, i+sn);
                newstr+=tmp+flg;
            }
            newstr = newstr.substring(0,newstr.length-1);
            return newstr;
        },
        find(str,cha,num){
            var x=str.indexOf(cha);
            for(var i=0;i<num;i++){
                x=str.indexOf(cha,x+1);
            }
            return x;
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
                    // let btns ;
                    _this.menuoperate.forEach(function(v,i,arr){
                        if(v == 6){
                            //可以搜索
                            _this.S_isdisabled = false;
                            return;
                        }
                    });

                // }
            // });
        },
    },
    mounted:function () {
        let _this = this;
        $(".info_two").height();

        _this.userinfo = JSON.parse(sessionStorage.getItem("userinfo"));
        _this.M_List();


        if( this.$route.params.dataid == undefined){
            _this.USinput = "";
            _this.btm_show = false;
            _this.right_box = false; //右侧盒子显示隐藏
        }else {
            _this.USinput = this.$route.params.dataid;
            _this.btm_show = true;
            _this.right_box = true; //右侧盒子显示隐藏
            _this.sendpage( _this.USinput );
        }
        // 设置开始结束时间  半年
        let dt = new Date(); 
        let now = dt.toLocaleString();
        let before_now = now.substr(0,now.indexOf(" "));
        let real_now = before_now.replace(/\//g,"-");
        dt.setMonth( dt.getMonth()-6 ); 
        let before =  dt.toLocaleString();
        let before_t = before.substr(0,before.indexOf(" "));
        let real_before = before_t.replace(/\//g,"-");

        let S_time_M = Number(_this.find(real_before,"-",1)) - Number(_this.find(real_before,"-",0)); //开始时间 的月份 是否加0
        let E_time_M = Number(_this.find(real_now,"-",1)) - Number(_this.find(real_now,"-",0));  //结束时间 的月份 是否加0
        var B_T ;
        let N_T ;
        if( S_time_M == 2){
            real_before = _this.insert_flg(real_before,"0",5);
        }
        if( E_time_M == 2){
            real_now = _this.insert_flg(real_now,"0",5);
        }
        B_T = real_before;
        N_T = real_now;
        if(real_before.length - real_before.lastIndexOf("-") == 2 ){
            B_T = _this.insert_flg(real_before,"0",real_before.length-1);
        }
        if(real_now.length - real_now.lastIndexOf("-") == 2 ){
            N_T = _this.insert_flg(real_now,"0",real_now.length-1);
        }
        _this.valueTime = [B_T,N_T];
    },
    watch:{
        'bill_content':{
            handler: function(val, old){
                let _this = this ;
                let timer = setInterval(function () {
                    _this.$refs.cardPane.resetItemPosition();
                    clearInterval(timer);
                }, 100);
            },
            deep: true,
        },
    }
  }
</script>
<style>
    #usercenter {
        width: 96%;
        background: #fff;
        color: #222;
        border-radius: 10px;
        padding: 2%;
        margin: auto;
    }
    .el-input {
        position: relative;
        font-size: 14px;
        display: inline-block;
        width: 30%;
        
    }
    .el-input input {
        height: 40px;
    }
    .US_search {
        height: 50px;
    }
    .US_search input {
        width: 100%;
    }
    .USsearch_btn {
        background: #ff844b;
        color: #fff;
        border: 0;
    }
    .US_sourse {
        display: inline-block;
        width:18px;
        height: 22px;
        vertical-align: middle;
        background: url("../assets/images/rilings.png") no-repeat;
        background-size: 100% 100% ;
    }
    .UStitle {
        height: 52px;
    }
    .UStitle p{
        color: #011188;
    }
    .UScontent {
        width : 100%;
        height: 640px;
    }
    .UScontent_left {
        width: 60%;
    }
    .UScontent_right {
        width: 35%;
        height: 94%;
    }
    .UScontent_left {
        height: 100%;
    }
    .UScontent_left .el-row {
        margin-bottom: 15px !important;
    }
    .US_left_top , .US_left_btm {
        height: 46%;
    }
    .US_left_top.el-row {
        margin-bottom : 4%;
    }
    .UScontent_left>.US_left_top>div ,
    .UScontent_left>.US_left_btm>div ,
    .UScontent_left>.US_left_top>div>.grid-content ,
    .UScontent_left>.US_left_btm>div>.grid-content {
        height: 100%;
        border: 0.5px solid #8496f2;
        border-radius: 10px;
    }
    .UScontent_left>.US_left_top>div:nth-child(1) , .UScontent_left>.US_left_btm>div:nth-child(1){
        margin-right: 2%;
    } 
    .info_one {
        margin: 10px 0 0 0 !important;
        padding: 0 !important;
    }
    .info_one > .el-col  {
        height: 32px;
        padding: 0 !important;
    }
    .info_one>div.el-col:first-child {
        height: 112px;
    }
    .info_one>div:first-child .grid-content {
        height: 100%;
        width: 70%;
    }
    .picture_content h5 {
        height: 16%;
        background: #8496f2;
        color: #fff;
        font-size: 16px;
        padding: 0px 0 0 7%;
        line-height: 45px;
    }
    .picture_content>p {
        padding: 5% 7% 2%;
        font-weight: 600;
    }
    .picture_content>p>i {
        font-size: 14px;
        color: #4660e7;
    }
    .picture_content>.info_one {
        padding-left: 5% !important;
        font-size: 16px;
        color: #666;
        margin: 0;
    }
    .info_two {
        position: relative;
        height: 80%;
        font-size: 0;
    }
    .info_two span:nth-child(1)>span{
        background: #346c89;
    }
    .info_two span:nth-child(2)>span{
        background: #4a92a7;
    }
    .info_two span:nth-child(3)>span{
        background: #6faabd;
    }
    .info_two span:nth-child(4)>span{
        background: #c87667;
    }
    .info_two span:nth-child(5)>span{
        background: #868ac0;
    }
    .info_two span:nth-child(6)>span{
        background: #87b4a2;
    }
    .info_two span:nth-child(7)>span{
        background: #87caa7;
    } 
    .info_two span:nth-child(8)>span{
        background: #985463;
    }
    .info_two span:nth-child(9)>span{
        background: #a8a0ba;
    }
    .info_two span:nth-child(10)>span{
        background:  #408981;
    }
    .info_two span:nth-child(11)>span{
        background: #bbaf43;
    } 
    .info_two span:nth-child(12)>span{
        background: #767550;
    }
    .info_two>span {
        display: inline-block;
        width:33.33%;
        height: 50px;
        word-wrap : break-word;
        font-size: 16px;
        vertical-align: middle;
        position: relative;
        margin-top: 10px;
        color: #fff;
    }
    .info_two>span>span {
        display: inline-block;
        width:80%;
        height: 42px;
        text-align: center;
        margin: auto; 
        vertical-align: middle;
        position: absolute;
        top: 0 ;
        left: 50%;
        transform: translate(-50%);
        border-radius: 6px;
    }
    .info_three , .info_fore {
    height: 80% ;
    width: 100%;
    }
    .UScontent_right .picture_content .UScontent_right_btm {
    width : 100%;
    overflow: auto;
    }
    .UScontent_right_btm h4 {
    padding: 2% 0 2% 4%;
    width: 95%;
    }
    .UScontent_right{
    border: 1px solid #8496f2;
    border-radius: 10px;
    }
    h5 {
    border-radius: 5px 5px 0 0 ;
    }
    .UScontent_right_btm>div {
    overflow-y: auto;
    }
    .UScontent_right_btm>div>p {
    padding : 2% 0 2% 4%;
    }
    .UScontent_right .picture_content {
        height: 100%;
    }
    .UScontent_right .picture_content h5{
        height: 8%;
    }  
    .UScontent_right .picture_content .UScontent_right_btm{
        height: 90%;
    } 
    .UScontent_right_btm>div{
        width: 100;
    }
    .UScontent_right_btm>div>p , .UScontent_right_btm>div>p>span {
        width: 95%;
        display: block;
    }
    .UScontent_right_btm>div>p>span>span {
        display: inline-block;
        width: 50%;
        vertical-align : middle;
    }
    .info_one>.el-col {
        /* padding: 2% !important; */
    }
    .el-button:focus, .el-button:hover {
        background: rgba(255,132,75,0.8);
        color: rgba(255,255,255,1)
    }
    .el-button:focus {
        background: rgba(255,132,75,1);       
    }
    .clearfix:after {
        content: '';
        height: 0;
        line-height: 0;
        clear: both;
    }
    #lins_onlys , #lins_many , #lins_times{
        width : 100%;
        height: 400px;
    }
    .year_fx , .month_fx {
        font-size: 0;
        text-align : center;
    }
    .year_fx>div , .month_fx>div{
        width: 25%;
        height: 100px;
        display: inline-block;
        box-sizing:border-box;
        -moz-box-sizing:border-box; /* Firefox */
        -webkit-box-sizing:border-box; /* Safari */
        font-size: 16px;
        padding-right: 20px;
        vertical-align: middle;
    }
    .year_fx>div:last-child , .month_fx>div:last-child{
        padding-right: 0;
    }
    .year_fx>div>div , .month_fx>div>div{
        height: 100%;
        background-image: linear-gradient(
            #f3f4fc, 
            #f3f4fc), 
        linear-gradient(
            #f3f4fc, 
            #f3f4fc);
        background-blend-mode: normal, 
            normal;
        box-shadow: 0px 6px 12px 0px 
            rgba(33, 24, 21, 0.1);
        border-radius: 8px;
        border: solid 1px #f3f4fc;
    }
    .m_f_box>p:first-child , .y_f_box>p:first-child {
        margin: 20px;
    }
    .m_f_box>p>span {
        color: #4b62df;
    }
    .fx_box>h4 {
        text-align: left;
        margin: 30px auto;
        color: #4b62df;
        font-size: 20px;
    }
    .fx_box>h4:before {
        content: '';
        width: 4px;
        height: 30px;
        background-color: #4b62df;
        display: inline-block;
        vertical-align: middle;
        margin-right: 10px;
    }
    .user_jl {
        font-size: 0;
        margin: 20px 0;
        position: relative;
    }
    .user_jl>div {
        font-size: 16px;
        display: inline-block;
        vertical-align: middle;
        font-size: 0;
    }
    .user_jl >.box_btms {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
    }
    .bills {
        width: 30%;
        height: 500px;
        border: 1px solid #ccc;
        float: right;
        /* padding: 5px; */
        box-sizing: border-box;
    }
    .el-row {
    margin-bottom: 20px;

    }
    .el-col {
        font-size: 16px;
    /* border-radius: 4px; */
    }
    .el-input--prefix .el-input__inner {
        padding-left: 75px;
    }
    .bill_head {
        position: relative;
        height: 40px;
        background: #8496f2;
    }
    .bill_head .el-input__inner {
        border: 0;
        background: rgba(0,0,0,0);
        color: #fff;
    }
    .bill_head>div {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
    }
    .bill_body {
        padding: 5px;
    }
    
    .el-table__body{
        table-layout:auto !important;
    }
    .el-table th>.cell {
        font-weight: 400;
    }
    .it_s {
        font-size: 14px;
        position: absolute;
        width: 100%;
        top: 50%; 
        left: 50%;
        transform: translate(-50%,-50%);
    }
    .el-col {
        font-size: 14px;
        word-wrap : break-word;
    }

    .el-row {
        margin-bottom: 5px !important;
    }
    .fx_box .m_pm {
        margin: 0 auto 30px;
    }
    .el-carousel__indicators {
        width: 100%;
        text-align: center;
    }
</style>
