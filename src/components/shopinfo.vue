<template>
    <div id='shopInfo'>
        <!-- <input type="button" value="返回" @click="goback()"> -->
        <!-- <Loading v-show="isLoading"></Loading> -->
        <div class="background">
            <h4 class="title">HiveFace数据管理 &nbsp; -  &nbsp; <span v-text="title"></span> </h4>
            <!-- <div > -->
                <el-row class="content">
                    <el-col :span="6">
                        <div class="left">
                            <div class="left_one">
                                <div id="l_one_box">  </div>
                            </div>
                            <div class="left_two">
                                <div id="l_two_box">  </div>
                            </div>
                            <div class="left_three">
                                <div id="l_three_box">  </div>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="center">
                            <div class="center_one">
                                <div class="center_top">
                                    <div class="c_t_top">
                                        <h4>当日销售收入概览</h4>
                                        <div>
                                            <el-row class="center_title">
                                                <el-col :span="12">今日销售总额</el-col>
                                                <!-- <el-col :span="6">毛利</el-col> -->
                                                <el-col :span="6">昨日同比</el-col>
                                                <el-col :span="6">客单价</el-col>
                                            </el-row>
                                            <el-row class="center_content">
                                                <el-col :span="12">￥<i><span v-text="center.title[0].amt"></span>元</i></el-col>
                                                <!-- <el-col :span="6"><i><span  v-text="center.title[0].profit"></span>元</i></el-col> -->
                                                <el-col :span="6"><i style="font-size: 22px;"><span style="font-size: 20px;"  v-text="center.title[0].amt_rate"></span>%</i></el-col>
                                                <el-col :span="6"><i><span  v-text="center.title[0].perSale"></span>元</i></el-col>
                                            </el-row>
                                        </div>
                                    </div>
                                    <div class="c_t_btm" id="c_t_btm"></div>
                                </div>
                            </div>
                            <div class="center_two">
                                <div class="center_btm">
                                    <div class="c_b_left" id="c_b_left"> </div>
                                    <div class="c_b_right" id="c_b_right"> </div>
                                </div>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="right">
                            <div class="right_one">
                                <div id="r_one_box">  </div>
                            </div>
                            <div class="right_two">
                                <div id="r_two_box">
                                    
                                </div>
                            </div>
                            <div class="right_three">
                                <div id="r_three_box">  </div>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            <!-- </div> -->
        </div>
    </div>
</template>

<script>
// import Loading from "./loading"

  export default {
    name:"cockpit_con",
    // components:{Loading,} ,
    data () {
        return {
            isLoading: true,
            title: '', 
            orderStore:'',
            left:{
                l_top: {
                    echartData: [
                        {value: 0, name: '店内客流'},
                        {value: 0, name: '支付客流'},
                        // {value: 0, name: '店外客流'},
                    ],
                    option: {
                        title: { 
                            text: '今日客流转化情况', left: "center",
                            textStyle: {"color": "#fff","fontWeight": "bold","fontSize": 14 },
                        },
                        tooltip: {
                            trigger: 'item',
                            // formatter: "{a} <br/>{b} : {c}"
                        },
                        legend: {
                            textStyle: {
                                "color": "#fff",
                                "fontWeight": "bold",
                                "fontSize": 10
                            },
                            data: [],
                            orient: 'vertical',right: 0,top: 20, 
                            show:false,
                        },
                        calculable: true,
                        series: [
                            {
                                name:'今日客流转化情况',type:'funnel',top: '20%',left: "center",height: '70%',width: "80%",gap: 1,
                                label: { normal: {     show: true,     position: 'inside',     formatter: "{b} : {c}" }, emphasis: {     textStyle: {         fontSize: 12,         color: "rgba(0,0,0,0.8)"     } } },
                                itemStyle: {  normal: {  borderColor: '#81c2d3',  borderWidth: 1  } },
                                color: ["#71f7f9","#32c6e9","#36a3d9"],
                                data: []
                            }
                        ]
                    }
                },
                l_center: {
                    echartData: [],
                    option: {
                        title: {  text: '今日门店客流分时走势', left: "center",textStyle: {"color": "#fff","fontWeight": "bold","fontSize": 14}, },
                        grid: {    left: '3%',   right: '4%',top: '50',  bottom: '3%',  containLabel: true  },  
                        xAxis: {
                            type: 'category', axisLine:{   lineStyle:{  color:'#d7d7d7',  width:1,   }  },axisTick: {show: false },
                            data: [],
                        },
                        tooltip : { trigger: 'axis', formatter: "{b}: {c}"  },
                        yAxis: {  
                            type: 'value', axisTick: {show: false },splitLine: {  show:false ,  }, nameTextStyle: {  color: ['#d7d7d7']    },  axisLine:{   lineStyle:{   color:'#d7d7d7',   width:1, }   }  
                        },
                        series: [{
                            name:'今日门店客流分时走势',  
                            type:'line',  
                            symbol:'circle',  
                            symbolSize:8,  
                            label: {
                                normal: {
                                    show: true, position: 'top', textStyle: { fontFamily : "微软雅黑", fontSize : 12, color: '#999' },
                                    formatter: function(data) {
                                        return data.value;
                                    }
                                },
                            },
                            itemStyle:{    normal:{   color:'#5ce3df',   borderColor:'#5ce3df',   }   },  
                            data: [],
                        }]
                    }
                },
                l_btm: {
                    echartData: [],
                    option: {
                        title: {  text: '近7日内客流趋势', left: "center",textStyle: {"color": "#fff","fontWeight": "bold","fontSize": 14}, },
                        grid: {    left: '3%',   right: '4%',top: '50',  bottom: '3%',  containLabel: true  },  
                        xAxis: {
                            type: 'category', axisLine:{   lineStyle:{  color:'#d7d7d7',  width:1,   }  },axisTick: {show: false },
                            data: [],
                        },
                        tooltip : { trigger: 'axis', formatter: "{b}: {c}"  },
                        yAxis: {  
                            type: 'value',axisTick: {show: false }, splitLine: {  show:false ,  }, nameTextStyle: {  color: ['#d7d7d7']    },  axisLine:{   lineStyle:{   color:'#d7d7d7',   width:1, }   }  
                        },
                        series: [{
                            name:'今日新老客到店比例',  
                            type:'line',  
                            symbol:'circle',  
                            symbolSize:8,  
                            label: {
                                normal: {
                                    show: true, position: 'top', textStyle: { fontFamily : "微软雅黑", fontSize : 12, color: '#999' },
                                    formatter: function(data) {
                                        return data.value;
                                    }
                                },
                            },
                            areaStyle: {normal: {color:'rgba(92, 227, 223, 0.2)'}}, 
                            itemStyle:{    normal:{   color:'#5ce3df',   borderColor:'#5ce3df',   }   },  
                            data: [],
                        }]
                    }
                }
            },
            center: {
                title:[{ amt:"", amt_rate:"", perSale:"", profit:"" }],
                c_top:{
                    echartData: [],
                    option : {
                        title : {"text": "分时段销售金额","textStyle": {    "color": "#fff",    "fontWeight": "bold",    "fontSize": 14},"top": "0%","left": "center"},backgroundColor:"rgba(0,0,0,0)",color: ['#5ce3df'],
                        tooltip: {trigger: 'axis',axisPointer: {    type: 'line',    lineStyle: {  opacity: 0    }}, },
                        legend: {
                            data:['今日销售额','昨日销售额'],
                            right:"5%", top:"0", orient: 'vertical',textStyle: {"color": "#fff","fontWeight": "bold","fontSize": 10 },
                        },
                        grid: {left: '5%',right: '5%',bottom: '2%',top: '50',containLabel: true,z: 22 },
                        xAxis : [{
                            //  formatter: "{a} <br/>{b}: {c}",
                                type : 'category', axisTick: {show: false },splitLine:{      show:false  }, axisLine: {    lineStyle: {        color: 'rgb(170,170,170)',    }},axisLabel: {    "textStyle": {  "color": '#d7d7d7',    }},
                                data : []
                        }],
                        yAxis : [ {
                                type : 'value', axisTick: {show: false },  splitLine:{      show:false  }, axisLine: {    lineStyle: {        color: 'rgb(170,170,170)',    }},axisLabel: {    "textStyle": {  "color": '#d7d7d7',    }},
                        }],
                        series : [
                            {
                                name:'今日销售额',
                                type:'bar', barWidth: '30%',itemStyle: {    normal: {     color: "#5de4e1",   barBorderRadius: 30,    }},
                                data:[],
                            },
                            {
                                name:'昨日销售额',
                                type:'bar', barWidth: '30%',itemStyle: {    normal: {    color: "#f4c913",     barBorderRadius: 30,    }},
                                data:[],
                            }
                        ]
                    },
                },
                c_btm: {
                    c_b_left:{
                        echartData: [
                            // { value: 111, name: '4/2' }, 
                            // { value: 3434,  name: '4/3' }
                        ],
                        option: {
                            title: {  text: '近7日销售金额趋势', left: "center",textStyle: {"color": "#fff","fontWeight": "bold","fontSize": 14}, },
                            grid: {    left: '3%',   right: '4%',top: '40',  bottom: '3%',  containLabel: true  },  
                            xAxis: {
                                type: 'category', axisLine:{   lineStyle:{  color:'#d7d7d7',  width:1,   }  },axisTick: {show: false },
                                axisLabel: {
                                        show: true,
                                        // interval:0,
                                        // formatter:function(params) {
                                        //     var newParamsName = "";
                                        //     var paramsNameNumber = params.length;
                                        //     var provideNumber = 4;  //一行显示几个字
                                        //     var rowNumber = Math.ceil(paramsNameNumber / provideNumber);
                                        //     if (paramsNameNumber > provideNumber) {
                                        //         for (var p = 0; p < rowNumber; p++) {
                                        //             var tempStr = "";
                                        //             var start = p * provideNumber;
                                        //             var end = start + provideNumber;
                                        //             if (p == rowNumber - 1) {
                                        //                 tempStr = params.substring(start, paramsNameNumber);
                                        //             } else {
                                        //                 tempStr = params.substring(start, end) + "\n";
                                        //             }
                                        //             newParamsName += tempStr;
                                        //         }

                                        //     } else {
                                        //         newParamsName = params;
                                        //     }
                                        //     return newParamsName
                                        // },
                                        textStyle: {
                                            color: '#fff' //文字颜色
                                        }
                                    },
                                data: [], //日期
                            },
                            tooltip : { trigger: 'axis', },
                            yAxis: {  
                                type: 'value', axisTick: {show: false },splitLine: {  show:false ,  }, nameTextStyle: {  color: ['#d7d7d7']    },  axisLine:{   lineStyle:{   color:'#d7d7d7',   width:1, }   }  
                            },
                            series: [{
                                name:'近7日销售金额趋势',  
                                type:'line',  
                                symbol:'circle',  
                                symbolSize:8,  
                                label: { normal: {show: true, position: 'top', textStyle: { fontFamily : "微软雅黑", fontSize : 12, color: '#999' },formatter: function(data) {    return data.value;} } },
                                areaStyle: {normal: {color:'rgba(92, 227, 223,0.2)'}}, 
                                itemStyle:{    normal:{   color:'#5ce3df',   borderColor:'#5ce3df',   }   },  
                                data: [], //数值
                            }]
                        }  
                    },
                    c_b_right:{
                        echartData: [
                            // { value: 2, name: '2次' }, 
                            // { value: 3,  name: '3次' },
                            // { value: 7,  name: '4次' },
                            // { value: 12,  name: '5次以上' },
                        ], //放数据
                        option: {
                            title : {"text": "近30日会员购买次分布","textStyle": {    "color": "#fff",    "fontWeight": "bold",    "fontSize": 14},"top": "0%","left": "center"},backgroundColor:"rgba(0,0,0,0)",color: ['#5ce3df'],
                            tooltip: {trigger: 'axis',axisPointer: {    type: 'line',    lineStyle: {  opacity: 0    }},},
                            grid: {left: '5%',right: '5%',bottom: '2%',top: '50',containLabel: true,z: 22 },
                            label:{ normal:{     show: true,     position: 'top'}  },
                            xAxis: [{
                                type: 'category',gridIndex: 0,axisTick: {show: false },axisLine: {    lineStyle: {        color: 'rgb(170,170,170)',    }},axisLabel: {    "textStyle": {        "color": '#d7d7d7',    }},
                                data: [], //name值
                            }],
                            yAxis: [
                                { type: "value",axisTick: {show: false }, splitLine:{      show:false  }, axisLine: {    lineStyle: {        color: 'rgb(170,170,170)',    }},axisLabel: {    "textStyle": {  "color": '#d7d7d7',    }}}
                            ],
                            series: [{
                                    name: '',type: 'bar',barWidth: '30%',itemStyle: {    normal: {        barBorderRadius: 30,    }},
                                    data: [], //数值
                                },
                            ]
                        }
                    }
                }
            },
            right: {
                r_top:{
                    title: "会员概览",
                    echartsData : [], 
                    option : {
                        center : ['50%', '55%'],
                        title: { text: '会员概要', x: '25%', y: 'center', textStyle : {     color : '#fff',  fontSize: 14,  fontFamily : '微软雅黑',     fontWeight : 'bolder' }},
                        legend: {
                            data:[],
                            orient : 'vertical', right : "1%", y : 0, itemGap:12, textStyle:{         color:'#fff',     fontSize:12 }
                        },
                        series : [
                            {
                                label: { normal:{show:false}},
                                name:'',type:'pie',clockWise:false, center : ['38%', '50%'], radius : [55, 70],itemStyle : {    normal : {        color: '#82e1de',    }},
                                data:[
                                    {
                                        value:"",
                                        name:''
                                    },
                                    {
                                        value:"",
                                        name:'', itemStyle : {    normal : {        color: 'rgba(0,0,0,0)',        label: {show:false},        labelLine: {show:false}    },    emphasis : {        color: 'rgba(0,0,0,0)'    }}
                                    }
                                ]
                            },
                            {
                                label: { normal:{show:false}},
                                name:'', type:'pie', clockWise:false,center : ['38%', '50%'], radius : [40, 55], itemStyle : {     normal : {         color: '#eccb48',     } },
                                data:[
                                    {
                                        value: "", 
                                        name:''
                                    },
                                    {
                                        value:"",
                                        name:'',itemStyle : {    normal : {        color: 'rgba(0,0,0,0)',        label: {show:false},        labelLine: {show:false}    },    emphasis : {        color: 'rgba(0,0,0,0)'    }}
                                    }
                                ]
                            },
                            {
                                label: { normal:{show:false}},
                                name:'', type:'pie', clockWise:false, center : ['38%', '50%'],radius : [25, 40], itemStyle : {     normal : {         color: '#916cc7',     } },
                                data:[
                                    {
                                        value:"", 
                                        name:''
                                    },
                                    {
                                        value:"",
                                        name:'', itemStyle : {     normal : {         color: 'rgba(0,0,0,0)',         label: {show:false},         labelLine: {show:false}     },     emphasis : {         color: 'rgba(0,0,0,0)'     } }
                                    }
                                ]
                            }
                        ]
                    }
                },
                r_center: {
                    echartData: [{  value: "", name: '非会员' }, { value: "",  name: '会员' }], //放数据
                    option: {
                        title: {text:'今日平均客单价', left:'center',textStyle:{    color:'#fff',    fontSize:14,    align:'center'},
                         subtext: '相差', itemGap: 55 , subtextStyle:{    color:'#5de4e1',    fontSize:12,    align:'center'} },
                        grid: {    left: '3%',   right: '4%',top: '50',  bottom: '3%',  containLabel: true  },  
                        legend: {
                            data: [],
                            formatter: function(name) { },
                            selectedMode:true, left: 'center',top: '50%',icon: 'none',align:'center',textStyle: { color: "#5de4e1", fontSize: 12, },
                        },
                        tooltip: { trigger: 'item',  formatter: "{a} <br/>{b}: {d}%" },
                        series: [{
                            name: '今日平均客单价', type: 'pie', radius: ['42%', '60%'], color: [ '#deb140','#5de4e1'],  
                            label: { normal: { textStyle: { fontSize: '12',  fontWeight: 'bold'  }, formatter: "{b}: \n {c}" }, },
                            data: []
                        }]
                    }
                },
                r_btm:{
                    echartData: [
                        // { value: 120, name: '农夫山泉' },  { value: 50,  name: '蒙牛酸奶' }, { value: 440,  name: '加多宝' },  { value: 50,  name: 'aaa' },
                    ], //放数据
                    option: {
                        title : {"text": "今日热卖商品top5","textStyle": {    "color": "#fff",    "fontWeight": "bold",    "fontSize": 14},"top": "0%","left": "center"},backgroundColor:"rgba(0,0,0,0)",color: ['#5ce3df'],
                        tooltip: {trigger: 'axis',axisPointer: { type: 'line', lineStyle: { opacity: 0 }}},
                        grid: {left: '3%',right: '5%',bottom: '0%',top: '15%',containLabel: true,z: 22 },
                        label:{ normal:{     show: true,     position: 'right'}  },
                        xAxis: [{ type: 'value', show:false,splitLine:{ show:false  } , axisLine:{show: false} ,  }],
                        yAxis: [{
                            type: "category",splitLine:{  show:false  }, axisLine: {  lineStyle: { color: 'rgb(170,170,170)', }},
                            axisLabel: { "textStyle": {  "color": '#d7d7d7',"fontSize": "10" } ,formatter: function(value) { if (value.length > 5) {  return value.substring(0, 4) + "..."; } else {  return value;  }}},
                            axisTick: {show: false }, //去掉刻度线
                            data: [],
                        }],
                        series: [{
                                name: '今日热卖商品',type: 'bar',barWidth: '50%',itemStyle: { normal: {   barBorderRadius: 30,    }},
                                data: [],
                            },
                        ]
                    }
                }
            },
            intervalid1: {},
            userinfo: {} ,
        }
    },
    beforeDestroy () {
      clearInterval(this.intervalid1)
    },
    mounted:function ( ) {
        let _this = this;
        _this.userinfo = JSON.parse(sessionStorage.getItem("userinfo"));
        let getobj=JSON.parse(sessionStorage.getItem("tempShopInfo"));
        let name = this.$route.params.name?this.$route.params.name: getobj;
        sessionStorage.name = name ;
        _this.title = name.name ;
        _this.orderStore = name.orderStore;
        
        let M_T = $(".title").css("marginTop"); let M_B = $(".title").css("marginBottom");
        $(".center_btm>div").width( ($(".center_btm").width()-16)/2 ); $(".content").height($("#shopInfo").height() - $(".title").height() - Number(M_T.slice(0,M_T.length-2)) - Number(M_B.slice(0,M_B.length-2))  ); $(".c_t_top>h4").css("padding", Number(($(".c_t_top").height()-$(".c_t_top>h4").height()-$(".c_t_top>div").height())/2)+"px")
        window.onresize = function temp() {
            $(".center_btm>div").width( ($(".center_btm").width()-16)/2 );
            $(".content").height($("#shopInfo").height() - $(".title").height() - Number(M_T.slice(0,M_T.length-2)) - Number(M_B.slice(0,M_B.length-2))  );
            $(".c_t_top>h4").css("padding", Number(($(".c_t_top").height()-$(".c_t_top>h4").height()-$(".c_t_top>div").height())/2)+"px")
        };

        _this.getAll();
        this.intervalid1 = setInterval(() => {
            _this.getAll();
        }, 60000);
    },
    methods:{
        // goback(){
        //     let _this = this;
        //     _this.$router.go(-1);
        // },
        getAll(){
            let _this = this;
            let Mou = _this.time_month()[0];
            let Week = _this.time_month()[1];
            let Today = _this.time_month()[2];
            let Tomm = _this.time_month()[3];
            let Yest = _this.time_month()[4];

            let json = { "vid" : _this.userinfo.store_root_id , "orderStore" : _this.orderStore };
            let formdata = _this.$config.formData(json); 

            let json_center = { "vid" : _this.userinfo.store_root_id , "orderStore" : _this.orderStore , "createDate" : Today  };
            let formdata_center = _this.$config.formData(json_center); 

            let json_change = { "vid" : _this.userinfo.store_root_id , "orderStore" : _this.orderStore ,  "startDate1": Today , "endDate1": Tomm , "startDate2": Yest , "endDate2": Today };
            let formdata_change = _this.$config.formData(json_change);

            //近7日销售金额趋势
            let json_money = { "vid" : _this.userinfo.store_root_id , "orderStore" : _this.orderStore , "createDate" : Today  };
            let formdata_money = _this.$config.formData(json_money); 

            //30日
            let json2 = { "vid" : _this.userinfo.store_root_id , "orderStore" : _this.orderStore , "startDate": Mou , "endDate": Today };
            let formdata2 = _this.$config.formData(json2);
            //今日新老顾客
            let json3 = { "vid" : _this.userinfo.store_root_id , "orderStore" : _this.orderStore , "startDate1": Today , "endDate1": Tomm , "startDate2": Today , "endDate2": Tomm };
            let formdata3 = _this.$config.formData(json3); 

            //今日
            let json4 = { "vid" : _this.userinfo.store_root_id , "orderStore" : _this.orderStore , "startDate": Today , "endDate": Tomm };
            let formdata4 = _this.$config.formData(json4); 
            //当日销售收入概览  2017-12-01  2017-12-02 2017-11-30 2017-12-01 formdata_change
            //ok
            _this.$axios.post( _this.$url.getSaleIncomeToday , formdata_change ).then((res)=>{
                if(res.status == 200 ) {
                    let data = res.data;
                    _this.center.title = data;
                    _this.center.title[0]['amt'] = _this.RetainedDecimalPlaces(data[0]['amt'],2);
                    _this.center.title[0]['profit'] = _this.RetainedDecimalPlaces(Number(data[0]['profit']),2);
                }else {
                    _this.center.title = [{ amt:"", amt_rate:"", perSale:"", profit:"" }];
                }
            }).catch(()=>{
                _this.center.title = [{ amt:"", amt_rate:"", perSale:"", profit:"" }];
            });
            //分时段销售金额 (今日/昨日) 2017-12-02 formdata_center
            //ok
            _this.$axios.post( _this.$url.getSaleTimeQuantum , formdata_center ).then((res)=>{
                if(res.status == 200 ) {
                    let data = res.data;
                    _this.center.c_top.echartData = data;
                    _this.C_T_Btm();
                }else {
                    _this.center.c_top.echartData = [];
                    _this.C_T_Btm();               
                }
            }).catch(()=>{
                _this.center.c_top.echartData = [];
                _this.C_T_Btm(); 
            });
            //近7日销售金额趋势 2017-12-08 formdata_money
            //ok
            _this.$axios.post( _this.$url.getSale7Days , formdata_money ).then((res)=>{
                if(res.status == 200 ) {
                    let data = res.data;
                    let EchartArr = [];
                    data.forEach(function(v,i,arr){
                        let val = {}; val["value"] = v.amt;  val["name"] = v.date;
                        EchartArr.push(val);
                    });
                    _this.center.c_btm.c_b_left.echartData = EchartArr;
                    _this.C_B_left();
                }else {
                    _this.center.c_btm.c_b_left.echartData = [];
                    _this.C_B_left();             
                }
            }).catch(()=>{
                _this.center.c_btm.c_b_left.echartData = [];
                _this.C_B_left();
            });
            //近30日会员购买次分布   formdata2
            //ok
            _this.$axios.post( _this.$url.getSaleVip30Days , formdata2 ).then((res)=>{
                if(res.status == 200 ) {
                    let data = res.data;
                    let EchartArr = [];
                    data.forEach(function(v,i,arr){
                        let val = {}; val["value"] = v.ren_cnt;  val["name"] = v.buy_cnt;
                        EchartArr.push(val);
                    });
                    _this.center.c_btm.c_b_right.echartData = EchartArr;
                    _this.C_B_right();
                }else {
                    _this.center.c_btm.c_b_right.echartData = [];
                    _this.C_B_right();              
                }
            }).catch(()=>{
                _this.center.c_btm.c_b_right.echartData = [];
                _this.C_B_right(); 
            });
            //今日客流转化情况 2017-12-01 2017-12-02 formdata4
            //ok
            _this.$axios.post( _this.$url.getFlowUserCgToday , formdata4 ).then((res)=>{
                if(res.status == 200 ) {
                    let data = res.data;
                    _this.left.l_top.echartData[0]["value"] = data.tt_cnt;
                    _this.left.l_top.echartData[1]["value"] = data.cnt;
                    _this.L_top();
                }else {
                    _this.left.l_top.echartData[0]["value"] = 0 ;
                    _this.left.l_top.echartData[1]["value"] = 0 ;
                    _this.L_top();             
                }
            }).catch(()=>{
                _this.left.l_top.echartData[0]["value"] = 0 ;
                _this.left.l_top.echartData[1]["value"] = 0 ;
                _this.L_top();   
            });
            //今日门店客流分时走势
            //ok
            _this.$axios.post( _this.$url.getFlowEveryTimes , formdata ).then((res)=>{
                if(res.status == 200 ) {
                    let data = res.data;
                    let EchartArr = [];
                    data.forEach(function(v,i,arr){
                        let val = {};
                        val["value"] = v.cnt;
                        val["name"] = v.hour + "时";
                        EchartArr.push(val);
                    });
                    _this.left.l_center.echartData = EchartArr;
                    _this.L_Center();
                }else {
                    _this.left.l_center.echartData = [];
                    _this.L_Center();              
                }
            }).catch(()=>{
                _this.left.l_center.echartData = [];
                _this.L_Center();   
            });
            //近7日内客流趋势
            //ok
            _this.$axios.post( _this.$url.getFlow7Days , formdata ).then((res)=>{
                if(res.status == 200 ) {
                    let data = res.data;
                    let EchartArr = [];
                    data.forEach(function(v,i,arr){
                        let val = {}; val["value"] = v.cnt;  val["name"] = v.hour;
                        EchartArr.push(val);
                    });
                    _this.left.l_btm.echartData = EchartArr;
                    _this.L_Btm();
                }else {
                    _this.left.l_btm.echartData = [];
                    _this.L_Btm();              
                }
            }).catch(()=>{
                _this.left.l_btm.echartData = [];
                _this.L_Btm(); 
            });
            //今日新老顾客到店  2017-12-01 2018-12-08 2017-12-01 2017-12-31  formdata3
            //ok
            _this.$axios.post( _this.$url.getNewOldToday , formdata3 ).then((res)=>{
                if(res.status == 200 ) {
                    let data = res.data;
                    _this.right.r_top.echartsData = data;
                    _this.R_Top(_this.right.r_top.echartsData);
                   
                }else {
                    _this.right.r_top.echartsData = [
                        { "mem_tt": 0 },
                        { "mem_today": 0 },
                        { "mem_csm": 0 }
                    ];
                    _this.R_Top(_this.right.r_top.echartsData);          
                }
            }).catch(()=>{
                _this.right.r_top.echartsData = [
                    { "mem_tt": 0 },
                    { "mem_today": 0 },
                    { "mem_csm": 0 }
                ];
                _this.R_Top(_this.right.r_top.echartsData); 
            });
            //今日平均客单价      formdata4
            //ok
            _this.$axios.post( _this.$url.getAvgPriceToday , formdata4 ).then((res)=>{
                if(res.status == 200 ) {
                    let data = res.data;
                    _this.right.r_center.echartData[0]["value"] = data[0].perSale_Nomem;
                    _this.right.r_center.echartData[1]["value"] = data[0].perSale_mem;
                    _this.R_Center(data[0].diff);
                }else {
                    _this.right.r_center.echartData[0]["value"] = "";
                    _this.right.r_center.echartData[1]["value"] = "";
                    _this.R_Center(0);            
                }
            }).catch(()=>{
                _this.right.r_center.echartData[0]["value"] = "";
                _this.right.r_center.echartData[1]["value"] = "";
                _this.R_Center(0);
            });
            //今日热卖商品TOP10     2017-12-01 2017-12-02 formdata4
            //ok
            _this.$axios.post( _this.$url.getTop10Today , formdata4 ).then((res)=>{
                if(res.status == 200 ) {
                    let data = res.data;
                    let EchartsArr = [];
                    data.forEach(function(v,i,arr){
                        let val = {};
                        val["value"] = v.amt;
                        val["name"] = v.skuName;
                        EchartsArr.push(val)
                    });
                    _this.right.r_btm.echartData = EchartsArr.reverse();
                    _this.R_Btm();
                }else {
                     _this.right.r_btm.echartData = [];
                    _this.R_Btm();              
                }
            }).catch(()=>{
                _this.right.r_btm.echartData = [];
                _this.R_Btm();  
            });
        },
        time_month(){
            let d = new Date(); d = +d - 1000*60*60*24*29; d = new Date(d); let year = d.getFullYear(); let mon = d.getMonth()+1; let day = d.getDate(); let last_month = year+"-"+(mon<10?('0'+mon):mon)+"-"+(day<10?('0'+day):day);

            let today = new Date(); let today_year = today.getFullYear(); let today_mon = today.getMonth()+1; let today_day = today.getDate(); let today_month = today_year+"-"+(today_mon<10?('0'+today_mon):today_mon)+"-"+(today_day<10?('0'+today_day):today_day);

            let week = new Date(); week = +week - 1000*60*60*24*6; week= new Date(week); let week_year = week.getFullYear(); let week_mon = week.getMonth()+1; let week_day = week.getDate(); let week_month = week_year+"-"+(week_mon<10?('0'+week_mon):week_mon)+"-"+(week_day<10?('0'+week_day):week_day);

            let tommonr = new Date(); tommonr = +tommonr + 1000*60*60*24*1; tommonr= new Date(tommonr); let tommonr_year = tommonr.getFullYear(); let tommonr_mon = tommonr.getMonth()+1; let tommonr_day = tommonr.getDate(); let tommonr_month =tommonr_year+"-"+(tommonr_mon<10?('0'+tommonr_mon):tommonr_mon)+"-"+(tommonr_day<10?('0'+tommonr_day):tommonr_day);
 
            let yestoday = new Date(); yestoday = +yestoday - 1000*60*60*24*1; yestoday= new Date(yestoday); let yestoday_year = yestoday.getFullYear(); let yestoday_mon = yestoday.getMonth()+1; let yestoday_day = yestoday.getDate(); let yestoday_month =yestoday_year+"-"+(yestoday_mon<10?('0'+yestoday_mon):yestoday_mon)+"-"+(yestoday_day<10?('0'+yestoday_day):yestoday_day);

            let timeData = []; 
            timeData[0] = last_month; 
            timeData[1] = week_month; 
            timeData[2] = today_month;  
            timeData[3] = tommonr_month; 
            timeData[4] = yestoday_month; 
            
            return timeData;
        },
         //值：num 小数位：del 
        RetainedDecimalPlaces(num, del) {
        　　if (del != 0) {
        　　　　 num = parseFloat(num).toFixed(del); //天花板函数保留小数并四舍五入
        　　}
        　　var source = String(num).split(".");//按小数点分成2部分
        　　source[0] = source[0].replace(new RegExp('(\\d)(?=(\\d{3})+$)', 'ig'), "$1,");//只将整数部分进行都好分割
        　　return source.join(".");//再将小数部分合并进来
        },
        L_top(){
            let _this = this;
            let data = _this.left.l_top.echartData;
            let tips = [];
            data.forEach(function(v,i,arr){
                tips.push(v.name);
            });
            _this.left.l_top.option.legend.data = tips;
            _this.left.l_top.option.series[0].data = data;

            if( _this.myChartLeftTop == undefined ){
                let dom_l_one_box = document.getElementById('l_one_box');
                if( dom_l_one_box != null){
                    _this.myChartLeftTop = _this.$echarts.init(dom_l_one_box);
                    _this.myChartLeftTop.clear();
                    _this.myChartLeftTop.setOption(_this.left.l_top.option);
                }
            }else {
                _this.myChartLeftTop.clear();
                _this.myChartLeftTop.setOption(_this.left.l_top.option);
            }
            
            window.addEventListener("resize", function () {
                _this.myChartLeftTop.resize();
            });
            
        },
        L_Center(){
            let _this = this;
            let data = _this.left.l_center.echartData;
            let Ydata = [];
            let Xdata = [];
            if( data.length > 0 ){
                data.forEach(function(v,i,arr){
                    Xdata.push(v.name);
                    Ydata.push(v.value);
                });
            }
            _this.left.l_center.option.xAxis.data = Xdata;
            _this.left.l_center.option.series[0].data = Ydata;  

            if ( _this.myChartLeftCenter == undefined ){
                let dom_l_two_box = document.getElementById('l_two_box');
                if( dom_l_two_box != null){
                    _this.myChartLeftCenter = _this.$echarts.init(dom_l_two_box);
                    _this.myChartLeftCenter.clear();
                    _this.myChartLeftCenter.setOption(_this.left.l_center.option);
                }
            }else {
                _this.myChartLeftCenter.clear();
                _this.myChartLeftCenter.setOption(_this.left.l_center.option);
            }

            window.addEventListener("resize", function () {
                _this.myChartLeftCenter.resize();
            });
        },
        L_Btm(){
            let _this = this;
            let data = _this.left.l_btm.echartData;
            let Ydata = [];
            let Xdata = [];
            if( data.length > 0 ){
                data.forEach(function(v,i,arr){
                    Xdata.push(v.name);
                    Ydata.push(v.value);
                });
            }
            _this.left.l_btm.option.xAxis.data = Xdata;
            _this.left.l_btm.option.series[0].data = Ydata;   

            if( _this.myChartLeftBtm == undefined ){
                let dom_l_three_box = document.getElementById('l_three_box');
                if( dom_l_three_box != null){
                    _this.myChartLeftBtm = _this.$echarts.init(dom_l_three_box);
                    _this.myChartLeftBtm.clear();
                    _this.myChartLeftBtm.setOption(_this.left.l_btm.option);
                }
            }else {
                _this.myChartLeftBtm.clear();
                _this.myChartLeftBtm.setOption(_this.left.l_btm.option);
            }
            
            window.addEventListener("resize", function () {
                _this.myChartLeftBtm.resize();
            });
        },
        C_T_Btm(){
            let _this = this;

            let Xdata = [];
            let Yestoday = [];
            let today = [];
            if ( _this.center.c_top.echartData.length > 0 ){
                _this.center.c_top.echartData.forEach(function(v,i,arr){
                    Xdata.push(v["hour"]+"时");  
                    today.push(v["amt_dy"]);  
                    Yestoday.push(v["amt_yy"]);
                });
            }
            _this.center.c_top.option.xAxis[0].data = Xdata;
            _this.center.c_top.option.series[0].data = today;
            _this.center.c_top.option.series[1].data = Yestoday;


            if( _this.myChartCenTopBtm == undefined ){
                let dom_c_t_btm = document.getElementById('c_t_btm');
                if( dom_c_t_btm != null){
                    _this.myChartCenTopBtm = _this.$echarts.init(dom_c_t_btm);
                    _this.myChartCenTopBtm.clear();   //只是清理画布，而不会删除 生成的元素节点
                    _this.myChartCenTopBtm.setOption(_this.center.c_top.option);
                }
            }else {
                _this.myChartCenTopBtm.clear();   //只是清理画布，而不会删除 生成的元素节点
                _this.myChartCenTopBtm.setOption(_this.center.c_top.option);
            }
            window.addEventListener("resize", function () {
                _this.myChartCenTopBtm.resize();
            });
        },
        C_B_left(){
            let _this = this;
            let data = _this.center.c_btm.c_b_left.echartData;
            let Ydata = [];
            let Xdata = [];
            if ( data.length > 0 ){
                data.forEach(function(v,i,arr){
                    Ydata.push(v.value);
                    Xdata.push(v.name);
                });
            }
            
            _this.center.c_btm.c_b_left.option.xAxis.data = Xdata;
            _this.center.c_btm.c_b_left.option.series[0].data = Ydata;

            if( _this.myChartCenBtnLeft == undefined ){
                let dom_c_b_left = document.getElementById('c_b_left');
                if( dom_c_b_left != null){
                    _this.myChartCenBtnLeft = _this.$echarts.init(dom_c_b_left);
                    _this.myChartCenBtnLeft.clear();
                    _this.myChartCenBtnLeft.setOption(_this.center.c_btm.c_b_left.option);
                }
            }else {
                _this.myChartCenBtnLeft.clear();
                _this.myChartCenBtnLeft.setOption(_this.center.c_btm.c_b_left.option);
            }
            window.addEventListener("resize", function () {
                _this.myChartCenBtnLeft.resize();
            });
        },
        C_B_right(){
            let _this = this;
            let data = _this.center.c_btm.c_b_right.echartData;
            let Ydata = [];
            let Xdata = [];
            if( data.length > 0 ){
                data.forEach(function(v,i,arr){
                    Ydata.push(v.value);
                    Xdata.push(v.name);
                });
            }
            _this.center.c_btm.c_b_right.option.xAxis[0].data = Xdata;
            _this.center.c_btm.c_b_right.option.series[0].data = Ydata;
            if ( _this.myChartCenBtnRight == undefined ){
                let dom_c_b_right = document.getElementById('c_b_right');
                if( dom_c_b_right != null){
                    _this.myChartCenBtnRight = _this.$echarts.init(dom_c_b_right);
                    _this.myChartCenBtnRight.clear();
                    _this.myChartCenBtnRight.setOption(_this.center.c_btm.c_b_right.option);
                }
            }else {
                _this.myChartCenBtnRight.clear();
                _this.myChartCenBtnRight.setOption(_this.center.c_btm.c_b_right.option);
            }
            window.addEventListener("resize", function () {
                _this.myChartCenBtnRight.resize();
            });
        },
        R_Top(data){
            let _this = this;
            _this.right.r_top.option.series[0].data[0].value = data[0].mem_tt;
            _this.right.r_top.option.series[0].data[1].value = data[0].mem_tt;
            _this.right.r_top.option.series[1].data[0].value = data[2].mem_csm;
            _this.right.r_top.option.series[1].data[1].value = data[0].mem_tt;
            _this.right.r_top.option.series[2].data[0].value = data[1].mem_today;
            _this.right.r_top.option.series[2].data[1].value = data[0].mem_tt;
            let tips = [];
            tips[0] = "会员总数:"+data[0].mem_tt;
            tips[1] = "今日到店消费会员:"+data[2].mem_csm;
            tips[2] = "今日注册数:"+data[1].mem_today;
            _this.right.r_top.option.legend.data = tips;
            _this.right.r_top.option.series[0].name = tips[0];
            _this.right.r_top.option.series[1].name = tips[1];
            _this.right.r_top.option.series[2].name = tips[2];

            if( _this.myChartRightTop == undefined ){
                let dom_rightTop = document.getElementById('r_one_box');
                if(dom_rightTop != null){
                    _this.myChartRightTop = _this.$echarts.init(dom_rightTop);
                    _this.myChartRightTop.clear();
                    _this.myChartRightTop.setOption(_this.right.r_top.option);     
                }
            }else {
                _this.myChartRightTop.clear();
                _this.myChartRightTop.setOption(_this.right.r_top.option);     
            }
            window.addEventListener("resize", function () {
                _this.myChartRightTop.resize();
            });
        },
        R_Center(diff){
            let _this = this;
            _this.right.r_center.option.series[0].data = _this.right.r_center.echartData; 
            _this.right.r_center.option.legend.data =  [_this.right.r_center.echartData[0].name]; //右侧提示信息  
            _this.right.r_center.option.legend.formatter = function(params){
                return diff;
            } 
            if ( _this.myChartRightCenter == undefined ){
                let dom_r_two_box = document.getElementById('r_two_box');
                if( dom_r_two_box != null){
                    _this.myChartRightCenter = _this.$echarts.init(dom_r_two_box);
                    _this.myChartRightCenter.clear();
                    _this.myChartRightCenter.setOption(_this.right.r_center.option);
                }
            }else {
                _this.myChartRightCenter.clear();
                _this.myChartRightCenter.setOption(_this.right.r_center.option);
            }
            window.addEventListener("resize", function () {
                _this.myChartRightCenter.resize();
            });
        },
        R_Btm(){
            let _this = this;
            let data = _this.right.r_btm.echartData;
            let Ydata = [];
            let Xdata = [];
            if( data.length > 0 ){
                data.slice(0,5).forEach(function(v,i,arr){
                    Ydata.push(v.name); Xdata.push(v.value);
                });
            }
            _this.right.r_btm.option.yAxis[0].data = Ydata;
            _this.right.r_btm.option.series[0].data = Xdata;

            if ( _this.myChartRightBtm == undefined ){
                let dom_r_three_box = document.getElementById('r_three_box');
                if( dom_r_three_box != null){
                    _this.myChartRightBtm = _this.$echarts.init(dom_r_three_box);
                    _this.myChartRightBtm.clear();
                    _this.myChartRightBtm.setOption(_this.right.r_btm.option);
                }
            }else {
                _this.myChartRightBtm.clear();
                _this.myChartRightBtm.setOption(_this.right.r_btm.option);
            }
            
            window.addEventListener("resize", function () {
                _this.myChartRightBtm.resize();
            });
        },
    },
    watch: { 
        "orderStore":{
            handler:function(val,oldval){
                let _this = this;
            },
            deep: true
        }

    }
  }
</script>
<style scoped>
    #shopInfo{
        height: 100% ;
        text-align: left;
        overflow: hidden;
        background: rgba(255,255,255,0.1);
        border-radius:10px;
    }
    .background {
        width: 100%;
        height: 100%;
        background: url('../assets/images/over_bj.png');
        background-size: 100% 100%;
        font-size: 0;
    }
    .background>div {
        font-size: 16px;
    }
    .title {
        text-align: center;
        margin: 15px 0 10px;
        font-size: 24px;
        font-weight: 400;
    }
    .content {
        width: 98%;
        margin: auto;
    }
    .content>div {
        height: 100%;
        position: relative;
        box-sizing: border-box;
        padding-bottom: 10px;
    }
    .left {
        height: 98%;
        position: absolute;
        width: 100%;
    }
    .left>div {
        width: 100%;
        position: absolute;
        height: 31.5%;
        padding-right: 16px;
        box-sizing: border-box;
    }
    .left>div>div {
        width: 100%;
        height: 100%;
        border: 1px solid #00c7fe;
    }
    .left>div:first-child {
        top: 0;
    }
    .left>div:nth-child(2) {
        top: 50%;
        transform: translateY(-50%);
    }
    .left>div:last-child {
        bottom: 0;
    }


    .right {
        height: 98%;
        position: absolute;
        width: 100%;
    }
    .right>div {
        width: 100%;
        position: absolute;
        height: 31.5%;
        padding-left: 16px;
        box-sizing: border-box;
    }
    .right>div>div {
        width: 100%;
        height: 100%;
        border: 1px solid #00c7fe;
    }
    .right>div:first-child {
        top: 0;
    }
    .right>div:nth-child(2) {
        top: 50%;
        transform: translateY(-50%);
    }
    .right>div:last-child {
        bottom: 0;
    }
    .center {
        height: 98%;
        position: absolute;
        width: 99%;
        box-sizing: content-box;
        left: 50%;
        transform: translateX(-50%);
    }
    .center>div {
        width: 100%;
        position: absolute;
        height: 31.5%;
        box-sizing: border-box;
    }
    .center>div>div {
        width: 100%;
        height: 100%;
        border: 1px solid #00c7fe;
    }
    .center>div:first-child {
        height: 66%;
        top: 0;
    }
    .center>div:nth-child(2) {
        bottom: 0;
    }
    .center>div>.center_btm  {
        border: none;
        font-size: 0;
    }
    .center_btm {
        position: relative;
    }
    .center_btm>div {
        position: absolute;
        height: 100%;
        width: 48%;
        font-size: 16px;
        border: 1px solid #00c7fe;
        
    }
    .c_b_left {
        margin-left: -1px;
        left: 0;
    }
    .c_b_right {
        margin-right: -2px;
        right: 0;
    }
    .center_top>div {
        width: 100%;
    }
    .center_top>div:first-child {
        height: 37%;
    }
    .center_top>div:last-child {
        height: 63%;
    }
    .c_t_top h4 {
        text-align: center;
        font-weight: 600;
        font-size: 14px;
    }
    .c_t_top>div {
        width: 90%;
        height: 70%;
        margin:auto;
    }
    .c_t_top {
        position: relative;
    }
    .c_t_top:after {
        content: '';
        display: inline-block;
        width: 90%;
        height: 1px;
        background: #00c7fe;
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
    }
    .center_title {
        font-size: 14px;
        padding: 12px 0px 12px;
        text-align: center;
    }
    .center_content {
        color: #00c7fe;
        font-size: 14px;
        text-align: center;
        
    }
    .center_content i {
        font-size: 20px;
    }
</style>