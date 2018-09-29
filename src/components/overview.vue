<template>
    <div id="overview">
        <div class="background clearfix">
            <div class="left fl">
                <div class="left_box">
                    <div class="top">
                        <p>{{left_top.title}}</p>
                        <div id="left_top"> </div>
                    </div>
                    <div class="bottom">
                        <p>{{left_btm.title}}</p>
                        <div id="left_btm"> </div>
                    </div>
                </div>
            </div>
            <div class="center">
                <div class="center_box">
                        <p>正在监控{{center.cnt}}个订单</p>
                        <div class="center_cont">
                            <div class="c_c_left">
                                <p>今日销售总额</p>
                                <div class="num_box">
                                    <div>
                                        <span v-for="item in center.amt">{{item}}</span>
                                        <span>元</span>
                                    </div>
                                </div>
                            </div>
                            <div class="c_c_center">
                                <p>昨日同比</p>
                                <div class="num_box">
                                    <div>
                                        <span v-for="item in center.amt_rate">{{item}}</span>
                                        <span>%</span>
                                    </div>
                                </div>
                            </div>
                            <div class="c_c_right">
                                <p>客单价</p>
                                <div class="num_box">
                                    <div>
                                        <span v-for="item in center.perSale">{{item}}</span>
                                        <span>元</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="center_box"> </div>
                </div>
            </div>
            <div class="right fr">
                <div class="right_box">
                    <div class="top">
                        <p>{{right_top.title}}</p>
                        <div id="right_top"> </div>
                    </div>
                    <div class="bottom">
                        <p>{{right_btm.title}}</p>
                        <div id="right_btm"> </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:"overview",
    data () {
      return {
        userinfo: {},
        msg: "概览",
        left_top:{
            title: "门店销售排行榜",
            echartsData : [], 
            option : {
                title: {    "text": "门店销售排行榜",    "textStyle": {        "color": "#fff",        "fontWeight": "bold",        "fontSize": 14    },    "top": "0%",    "left": "2.2%"},backgroundColor:"rgba(0,0,0,0)",color: ['#3398DB'],
                tooltip: { trigger: 'axis', axisPointer: {     type: 'line',     lineStyle: {         opacity: 0     } } },
                grid: { left: '5%', right: '2%', bottom: '3%', top: '15%', containLabel: true,  },
                xAxis: [{  type: 'value',  splitLine: {show: false},     axisLabel: {show: false} }],
                yAxis: [{
                    data: [], 
                    type: "category", axisLine: {    lineStyle: {              }}, axisTick: {     "show": false,     "alignWithLabel": true }, axisLabel: {     "textStyle": {         "color": '#fff',     },formatter: function(value) {
                            if (value.length > 5) {
                            return value.substring(0, 4) + "...";
                            } else {
                            return value;
                            }
                        } }
                }],
                series: [{ 
                    name: '门店销售排行榜', type: 'bar', barWidth: '50%', itemStyle: {     normal: {  barBorderRadius: 40, label : {  show: true,position: 'insideLeft',            formatter: '{c}元'        }     } },
                    data: [],
                }]
            }
        },
        left_btm:{
            title: "商品销售排行榜",
            echartsData : [], 
            option : {
                title: {"text": "商品销售排行榜","textStyle": {    "color": "#fff",    "fontWeight": "bold",    "fontSize": 14},"top": "0%","left": "2.2%" },
                tooltip : { trigger: 'axis', axisPointer : {    type : 'shadow'        },
                //  formatter : '{b}<br/>{a0}:{c0}%<br/>{a2}:{c2}%'
                 },
                legend: {
                    orient: 'vertical',right: 10,top: 10,textStyle: {    "color": "#1a1f37",    "fontWeight": "bold",    "fontSize": 12},
                    data:['已售', '剩余'],
                },
                grid: { y: 80,  y2: 30 },
                grid: { left: '5%', right: '2%', bottom: '5%', top: '15%', containLabel: true, z: 22 },
                xAxis : [ {     type : 'value',     position: 'top',     splitLine: {show: false},     axisLabel: {show: false } }],
                yAxis : [{
                        type : 'category',splitLine: {show: false},axisLabel: {  interval: "auto"    ,color: '#fff',                        
                        formatter: function(value) {
                            if (value.length > 5) {
                            return value.substring(0, 4) + "...";
                            } else {
                            return value;
                            }
                        }},
                        data : [],
                }],
                series : [
                    {
                        // name:'已售',
                        type:'bar',stack: '总量',barWidth: '50%',itemStyle :{     normal: {        barBorderRadius: 30,  barBorderColor:'#a65de3',        color:'#a65de3',        label : {  show: true,  position: 'insideLeft',            formatter: '{c}元'        }    }},
                        data:[]
                    },
                    // {
                    //     name:'已售',type:'bar',stack: '总量',itemStyle:  {    normal:{        barBorderColor:'rgba(0,0,0,0)',        color:'rgba(0,0,0,0)'    },    emphasis:{        barBorderColor:'rgba(0,0,0,0)',        color:'rgba(0,0,0,0)'    }},
                    //     data:[97, 55,30, 10]
                    // },
                    // {
                    //     name:'剩余',type:'bar',stack: '总量',barWidth: '50%',itemStyle :{     normal: {        barBorderRadius: 30,        barBorderColor:'#a064e1',        color:'#a064e1',        label : {            show: true,            position: 'insideLeft',            formatter: '{c}%'        }    }},
                    //     data:[97, 55,30, 10]
                    // },
                    // {
                    //     name:'剩余',type:'bar',stack: '总量',itemStyle:  {    normal:{        barBorderColor:'rgba(0,0,0,0)',        color:'rgba(0,0,0,0)'    },    emphasis:{        barBorderColor:'rgba(0,0,0,0)',        color:'rgba(0,0,0,0)'    }},
                    //     data: [3, 45, 70, 90]
                    // }
                ]
            }
        },
        center:{
            cnt: "", //正在监控的订单
            amt: [], //今日销售总额
            profit: [], //利润  作废
            profit_rate: [], //利润率  作废
            amt_rate: "" , // 昨日同比
            perSale: "" , //客单价
            echartsData: [],
            option : {
                title: { text: '', left: 'center', textStyle:{     color: "#fff" } },
                tooltip : { 
                   formatter: function(params) {
                        return params.data.name + "<br/>" + "今日销售金额：" + params.data.money + "元";
                   },
                },
                bmap: {
                    // center: [115.6950410698,41.6759698567],
                    center: [ ],
                    zoom: 13,roam: true,
                    mapStyle: {
                                styleJson: [{
                                    "featureType": "land",
                                    "elementType": "geometry",
                                    "stylers": {
                                        "color": "#08304B", //整个背景颜色
                                    }
                                }, {
                                    "featureType": "building",
                                    "elementType": "geometry",
                                    "stylers": {
                                        "color": "#fff"
                                    }
                                }, {
                                    "featureType": "highway",
                                    "elementType": "all",
                                    "stylers": {
                                        "lightness": -42,
                                        "saturation": -91
                                    }
                                }, {
                                    "featureType": "arterial",
                                    "elementType": "geometry",
                                    "stylers": {
                                        "lightness": -77,
                                        "saturation": -94
                                    }
                                }, {
                                    "featureType": "green",
                                    "elementType": "geometry",
                                    "stylers": {
                                        "color": "#1b1b1b"
                                    }
                                }, {
                                    "featureType": "water",
                                    "elementType": "geometry",
                                    "stylers": {
                                        "color": "#181818"
                                    }
                                }, {
                                    "featureType": "subway",
                                    "elementType": "geometry.stroke",
                                    "stylers": {
                                        "color": "#181818"
                                    }
                                }, {
                                    "featureType": "railway",
                                    "elementType": "geometry",
                                    "stylers": {
                                        "lightness": -52
                                    }
                                }, {
                                    "featureType": "all",
                                    "elementType": "labels.text.stroke",
                                    "stylers": {
                                        "color": "#313131"
                                    }
                                }, {
                                    "featureType": "all",
                                    "elementType": "labels.text.fill",
                                    "stylers": {
                                        "color": "#8b8787"
                                    }
                                }, {
                                    "featureType": "manmade",
                                    "elementType": "geometry",
                                    "stylers": {
                                        "color": "#1b1b1b"
                                    }
                                }, {
                                    "featureType": "local",
                                    "elementType": "geometry",
                                    "stylers": {
                                        "lightness": -75,
                                        "saturation": -91
                                    }
                                }, {
                                    "featureType": "subway",
                                    "elementType": "geometry",
                                    "stylers": {
                                        "lightness": -65,
                                        
                                    }
                                },
                                 {
                                    "featureType": "railway",
                                    "elementType": "all",
                                    "stylers": {
                                        "lightness": -40,
                                        
                                    }
                                },
                                 {
                                    "featureType": "boundary",
                                    "elementType": "geometry",
                                    "stylers": {
                                        "color": "#8b8787",
                                        "weight": "1",
                                        "lightness": -29
                                    }
                                }]
                            }
                },
                series: [
                    {
                        name: '所在位置',
                        type: 'effectScatter',
                        coordinateSystem: 'bmap',
                        showEffectOn: 'render',rippleEffect: {    brushType: 'stroke'},hoverAnimation: true,
                        label: {    normal: {       
                             formatter: '{b}',       
                              position: 'right',        show: true    }},
                              itemStyle: {    normal: {        color: 'red',  
                                    shadowBlur: 10,        shadowColor: '#333'   ,fontSize: 10,
                                     }},zlevel: 1,          

                        data:[
                            //  {
                            //     name: "",
                            //     money: "",
                            //     value: []
                            // },
                            // {
                            //     name: "商铺2",
                            //     money: "5486",
                                
                            //     value: [115.6537250232,41.6635035846]
                            // }  
                        ],
                    }    
                ]
            }

        },
        right_top:{
            title: "会员概览",
            echartsData : [], 
            option : {
                center : ['50%', '55%'],
                title: { text: '会员概要', x: '25%', y: 'center', textStyle : {     color : '#fff',  fontSize: 14,  fontFamily : '微软雅黑',     fontWeight : 'bolder' }},
                // tooltip : {show: true,formatter: "{a} <br/>{b} : {c} ({d}%)" },
                legend: {
                    data:[],
                    orient : 'vertical', right : "1%", y : 0, itemGap:12, textStyle:{         color:'#fff',     fontSize:12 }
                },
                series : [
                    {
                        // label: { normal: {show: true, position: 'bottom', textStyle: { fontFamily : "微软雅黑", fontSize : 12, color: '#fff' },formatter: "{d}%"  } },
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
        right_btm:{
            title: "收银方式分类",
            echartsData: [],
            option : {
                title : { "text": '支付方式分类', "left":'left', "textStyle": {     "color": "#fff",     "fontWeight": "bold",     "fontSize": 14 },},
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {  show:false, }, calculable : true,
                series : [
                    {
                        name:'支付方式分类', type:'pie', radius : [25, 70], center : ['50%', '55%'], roseType : 'area',
                        label: { normal: {show: true, textStyle: {  fontSize : 10, color: '#fff' },
                            // formatter: "{a} <br/>{b} : {c} ({d}%)"
                            formatter:function(params) {
                                            params = params.data.name
                                            var newParamsName = "";
                                            var paramsNameNumber = params.length;
                                            var provideNumber = 4;  //一行显示几个字
                                            var rowNumber = Math.ceil(paramsNameNumber / provideNumber);
                                            if (paramsNameNumber > provideNumber) {
                                                for (var p = 0; p < rowNumber; p++) {
                                                    var tempStr = "";
                                                    var start = p * provideNumber;
                                                    var end = start + provideNumber;
                                                    if (p == rowNumber - 1) {
                                                        tempStr = params.substring(start, paramsNameNumber);
                                                    } else {
                                                        tempStr = params.substring(start, end) + "\n";
                                                    }
                                                    newParamsName += tempStr;
                                                }

                                            } else {
                                                newParamsName = params;
                                            }
                                            return newParamsName
                                        },
                            }
                         },
                        color: ["#82e1de","#c97c61","#edca47","#9d68d9","#e64f37"],
                        // labelLine: {
                        //       normal:{
                        //         length: 1
                        //       }
                        // },
                        labelLine: {
                            normal: {
                                length: 0.001,
                                // length2: 0.001,
                                lineStyle: {
                                    color: '#fff'
                                }
                            }

                        },
                        data:[]
                    }
                ]
            }
        },
        intervalid:{}, //定时器
        menuList:[],
        menuoperate: [], //页面操作
      };
    },
    beforeCreate: function(){
        //加载之前 
    },
    mounted:function ( ) {
        let _this = this;
        _this.userinfo = JSON.parse(sessionStorage.getItem("userinfo"));
        _this.M_List();
        this.intervalid = setInterval(() => {
            _this.getMaps();
        }, 60000);
    },
    beforeDestroy () {
      clearInterval(this.intervalid);
    },
    methods:{
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
            //     if(res.status == 200){
                    // let data = res.data.data ;
                    // _this.menuList = data ;
                    _this.menuList = JSON.parse( sessionStorage.getItem("menus")) ;
                    let O = _this.menu(_this.menuList, _this.$route.path);
                    _this.menuoperate = O.operate ;
                    _this.getMaps();
            //     }
            // });
        },
        getMaps(){
            let _this = this;
            let S = _this.time_month()[0];
            let E = _this.time_month()[1];
            let Y = _this.time_month()[2];

            let json = { "vid" : _this.userinfo.store_root_id , "startDate" : S , "endDate" : E};
            let formdata = _this.$config.formData(json); 
            _this.$axios.post( _this.$url.getVenderSaleSort , formdata ).then((res)=>{
                if(res.status == 200 ) {
                    if( res.data != '' && res.data.length > 0 ){
                        let data = res.data.reverse();
                        _this.left_top.echartsData = data;
                        _this.Left_Top(_this.left_top.echartsData);
                    }else {
                        _this.left_top.echartsData = [];
                        _this.Left_Top(_this.left_top.echartsData);
                    }
                    
                }else {
                    _this.left_top.echartsData = [];
                    _this.Left_Top(_this.left_top.echartsData);
                }
            });
            _this.$axios.post( _this.$url.getStoreSaleSort , formdata ).then((res)=>{
                if(res.status == 200 ) {
                    if( res.data != '' && res.data.length > 0 ){
                        let data = res.data.reverse();
                        _this.left_btm.echartsData = data;
                        _this.Left_Btm(_this.left_btm.echartsData);
                    }else {
                        _this.left_btm.echartsData = [];
                        _this.Left_Btm(_this.left_btm.echartsData);
                    }
                }else {
                    _this.left_btm.echartsData = [];
                    _this.Left_Btm(_this.left_btm.echartsData);
                }
            });
            _this.$axios.post( _this.$url.seeSaleToday , formdata ).then((res)=>{
                if(res.status == 200 ) {
                    let data = res.data;
                    _this.center.cnt = data.cnt;
                    _this.center.amt = _this.RetainedDecimalPlaces(data.amt,0).split("");
                    _this.center.profit = _this.RetainedDecimalPlaces(data.profit,0).split("");
                    _this.center.profit_rate = data.profit_rate.toString().split("");
                    
                }else {
                    _this.center.cnt = "";
                    _this.center.amt = [];
                    _this.center.profit = [];
                    _this.center.profit_rate = [];
                }
            }).catch(()=>{
                _this.center.cnt = "";
                _this.center.amt = [];
                _this.center.profit = [];
                _this.center.profit_rate = [];
            });
            _this.$axios.post( _this.$url.seeMemCount , formdata ).then((res)=>{
                if(res.status == 200 ) {
                    let data = res.data;
                    _this.right_top.echartsData = data;
                    _this.Right_Top(_this.right_top.echartsData);
                }else {
                    _this.right_top.echartsData = {mem_heretoday: 0, mem_total: 0, mem_regtoday: 0};
                    _this.Right_Top(_this.right_top.echartsData);
                }
            }).catch(()=>{
                _this.right_top.echartsData = {mem_heretoday: 0, mem_total: 0, mem_regtoday: 0};
                _this.Right_Top(_this.right_top.echartsData);
            });
            _this.$axios.post( _this.$url.payStyleType , formdata ).then((res)=>{
                if(res.status == 200 ) {
                    let data = res.data;
                    _this.right_btm.echartsData = data ;
                    _this.Right_Btm(_this.right_btm.echartsData);
                }else {
                    _this.right_btm.echartsData = {};
                    _this.Right_Btm(_this.right_btm.echartsData);
                }
            }).catch(()=>{
                _this.right_btm.echartsData = {};
                _this.Right_Btm(_this.right_btm.echartsData);
            });
            _this.$axios.post( _this.$url.getStoreMapSaleData , formdata ).then((res)=>{
                if(res.status == 200 ) {
                    if( res.data.length > 0 ){
                        let data = res.data;
                        _this.center.echartsData = data;
                        _this.Center(_this.center.echartsData);
                    }else {
                        _this.center.echartsData = [];
                        _this.Center(_this.center.echartsData);
                    }
                }else {
                    _this.center.echartsData = [];
                    _this.Center(_this.center.echartsData);
                }
            });
           // 昨日同比 及客单价
            let json1 = { "vid" : _this.userinfo.store_root_id , "st1" : S , "et1" : E , "st2" : Y , "et2" : S}  ;
            let formdata1 = _this.$config.formData(json1); 
            _this.$axios.post( _this.$url.getAllYibiaoPan , formdata1 ).then((res)=>{
                if(res.status == 200 ) {
                    let data = res.data;
                    _this.center.amt_rate = _this.RetainedDecimalPlaces( data[0]['amt_rate'] ,0).split("") ;
                    _this.center.perSale = _this.RetainedDecimalPlaces( data[0]['perSale'] , 0).split("") ;
                    
                }else {
                     _this.center.amt_rate = "" ;
                    _this.center.perSale = "" ;
                }
            });
        },
        time_month(){
            let today = new Date(); let today_year = today.getFullYear(); 
            let today_mon = today.getMonth()+1; 
            let today_day = today.getDate();
            let today_month = today_year+"-"+(today_mon<10?('0'+today_mon):today_mon)+"-"+(today_day<10?('0'+today_day):today_day);
            let tommonr = new Date(); tommonr = +tommonr + 1000*60*60*24*1; tommonr= new Date(tommonr); let tommonr_year = tommonr.getFullYear(); let tommonr_mon = tommonr.getMonth()+1; let tommonr_day = tommonr.getDate(); let tommonr_month =tommonr_year+"-"+(tommonr_mon<10?('0'+tommonr_mon):tommonr_mon)+"-"+(tommonr_day<10?('0'+tommonr_day):tommonr_day);
            let yestoday = new Date(); yestoday = +yestoday - 1000*60*60*24*1; yestoday= new Date(yestoday); let yestoday_year = yestoday.getFullYear(); let yestoday_mon = yestoday.getMonth()+1; let yestoday_day = yestoday.getDate(); let yestoday_month =yestoday_year+"-"+(yestoday_mon<10?('0'+yestoday_mon):yestoday_mon)+"-"+(yestoday_day<10?('0'+yestoday_day):yestoday_day);

            let timeData = []; timeData[0] = today_month; timeData[1] = tommonr_month;  timeData[2] = yestoday_month; 
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
        Left_Top(data){
            let _this = this;
            let Ydata = [];
            let Xdata = [];
            if ( data.length > 0 ){
                data.forEach(function(v,i,arr){
                    Ydata.push(v.orderStoreName);
                    let val = {};
                    val["name"] = v.orderStoreName;
                    val["value"] = v.amt;
                    val["orderStore"] = v.orderStore
                    Xdata.push(val);
                });
                _this.left_top.option.yAxis[0].data = Ydata;
                _this.left_top.option.series[0].data = Xdata;
            }else {
                _this.left_top.option.yAxis[0].data = [];
                _this.left_top.option.series[0].data = [];
            }
            if (_this.myChartLeftTop == undefined){
                let dom_leftTop = document.getElementById('left_top');
                if(dom_leftTop != null){
                    _this.myChartLeftTop = _this.$echarts.init(dom_leftTop);
                    _this.myChartLeftTop.clear();   //只是清理画布，而不会删除 生成的元素节点
                    _this.myChartLeftTop.setOption(_this.left_top.option);
                }
            }else {
                _this.myChartLeftTop.clear();   //只是清理画布，而不会删除 生成的元素节点
                _this.myChartLeftTop.setOption(_this.left_top.option);
            }
            window.addEventListener("resize", function () {
                _this.myChartLeftTop.resize();
            });
            _this.menuoperate.forEach(function(v,i,arr){
                if(v == 7){
                    //可以点击
                    _this.myChartLeftTop.on('click',function(param){
                        _this.$router.push({ name: 'ShopInfo',params:{name:param.data}});
                        let obj = JSON.stringify(param.data);
                        sessionStorage.removeItem("tempShopInfo");
                        sessionStorage.setItem("tempShopInfo", obj);
                    });
                    return;
                }
            });

        },
        Left_Btm(data){
            let _this = this;
            let Ydata = [];
            let Xdata = [];
            if( data.length > 0 ){
                for(let i = 0 ; i < data.length ; i++){
                    Ydata.push(data[i].skuName);
                    Xdata.push(data[i].amt);
                }
                _this.left_btm.option.yAxis[0].data = Ydata;
                _this.left_btm.option.series[0].data = Xdata;
            }else {
                _this.left_btm.option.yAxis[0].data = [];
                _this.left_btm.option.series[0].data = [];
            }
            if ( _this.myChartLeftBtm == undefined ){
                let dom_leftBtm = document.getElementById('left_btm');
                if(dom_leftBtm != null){
                    _this.myChartLeftBtm = _this.$echarts.init(dom_leftBtm);
                    _this.myChartLeftBtm.clear();   //只是清理画布，而不会删除 生成的元素节点
                    _this.myChartLeftBtm.setOption(_this.left_btm.option);
                }
            }else {
                _this.myChartLeftBtm.clear();   //只是清理画布，而不会删除 生成的元素节点
                _this.myChartLeftBtm.setOption(_this.left_btm.option);
            }
            window.addEventListener("resize", function () {
                _this.myChartLeftBtm.resize();
            });
        },
        Right_Top(data){
            let _this = this;
            _this.right_top.option.series[0].data[0].value = data.mem_total;
            _this.right_top.option.series[0].data[1].value = data.mem_total;
            _this.right_top.option.series[1].data[0].value = data.mem_heretoday;
            _this.right_top.option.series[1].data[1].value = data.mem_total;
            _this.right_top.option.series[2].data[0].value = data.mem_regtoday;
            _this.right_top.option.series[2].data[1].value = data.mem_total;
            let tips = [];
            tips[0] = "会员总数:"+data.mem_total;
            tips[1] = "今日会员到店数:"+data.mem_heretoday;
            tips[2] = "今日注册数:"+data.mem_regtoday;
            _this.right_top.option.legend.data = tips;
            _this.right_top.option.series[0].name = tips[0];
            _this.right_top.option.series[1].name = tips[1];
            _this.right_top.option.series[2].name = tips[2];

            if( _this.myChartRightTop == undefined ){
                let dom_rightTop = document.getElementById('right_top');
                if(dom_rightTop != null){
                    _this.myChartRightTop = _this.$echarts.init(dom_rightTop);
                    _this.myChartRightTop.clear();   //只是清理画布，而不会删除 生成的元素节点
                    _this.myChartRightTop.setOption(_this.right_top.option);     
                } 
            }else {
                _this.myChartRightTop.clear();   //只是清理画布，而不会删除 生成的元素节点
                _this.myChartRightTop.setOption(_this.right_top.option);     
            }
            window.addEventListener("resize", function () {
                _this.myChartRightTop.resize();
            });
        },
        Right_Btm(data){
            let _this = this;
            let arr = [];
            for(let i in data){
                let val = {}
                val["value"] = data[i];
                if(i == "cashPay") { i = "现金支付" }
                else if(i == "wxPay") { i = "微信支付" }
                else if(i == "aliPay") { i = "支付宝支付" }
                else if(i == "intePay") { i = "积分支付" }
                else if(i == "couponPay") { i = "礼券支付" }
                else if(i == "posPay") { i = "pos机刷卡支付" }
                else if(i == "cardPay") { i = "储值卡支付" }
                else if(i == "maLingPay") { i = "抹零支付" }
                else if(i == "chequePay") { i = "支票支付" }
                else if(i == "cibPay") { i = "威富通" }
                else if(i == "cibZfbPay") { i = "威富通-支付宝" }
                else if(i == "cibWxPay") { i = "威富通-微信" }
                else { i = "其他"}
                val["name"] = i ;
                arr.push(val)
            }
            _this.right_btm.option.series[0].data = arr;

            if ( _this.myChartRightBtm == undefined ){
                let dom_rightBtm = document.getElementById('right_btm');
                if(dom_rightBtm != null){
                    _this.myChartRightBtm = _this.$echarts.init(dom_rightBtm);
                    _this.myChartRightBtm.clear();   //只是清理画布，而不会删除 生成的元素节点
                    _this.myChartRightBtm.setOption(_this.right_btm.option);
                }
            }else {
                _this.myChartRightBtm.clear();   //只是清理画布，而不会删除 生成的元素节点
                _this.myChartRightBtm.setOption(_this.right_btm.option);
            }
            window.addEventListener("resize", function () {
                _this.myChartRightBtm.resize();
            });
        },
        Center(data){
            let _this = this;
            if ( data.length > 0 ){
                let data_arr = [];
                data.forEach(function(v,i,arr){
                    let val = {};
                    val["money"] = v.amt_dy; val["name"] = v.orderStoreName; val["orderStore"] = v.orderStore; val["value"] = [v.lon , v.lat]; data_arr.push(val);
                });
                let center_arr = data_arr.slice(0,1);
                _this.center.option.bmap.center = center_arr[0].value;
                _this.center.option.series[0].data = data_arr;
            }else {
                _this.center.option.bmap.center = [116.46 , 39.92 ]; //北京
                _this.center.option.series[0].data = [];
            }
            if ( _this.myChartCenter == undefined ){
                let dom_center = document.getElementById('center_box');
                if(dom_center != null){
                    _this.myChartCenter = _this.$echarts.init(dom_center);
                    _this.myChartCenter.clear();   //只是清理画布，而不会删除 生成的元素节点
                    _this.myChartCenter.setOption(_this.center.option);
                    // 获取百度地图实例，使用百度地图自带的控件
                    // let bmap = _this.mychartcenter.getModel().getComponent('bmap').getBMap();
                    // bmap.addControl(new BMap.MapTypeControl());
                }; 
            }else {
                _this.myChartCenter.clear();   //只是清理画布，而不会删除 生成的元素节点
                _this.myChartCenter.setOption(_this.center.option);
            }

             window.addEventListener("resize", function () {
                _this.myChartCenter.resize();
            });

            _this.menuoperate.forEach(function(v,i,arr){
                if(v == 7){
                    //可以点击
                    _this.myChartCenter.on('click',function(param){
                        _this.$router.push({ name: 'ShopInfo',params:{name:param.data}});
                        let obj = JSON.stringify(param.data);
                        sessionStorage.removeItem("tempShopInfo");
                        sessionStorage.setItem("tempShopInfo", obj);
                    });
                    return;
                }
            });
        },
        setNumber(dom, number){
            var n = String(number),len = n.length;
            //如果新的数字短于当前的，要移除多余的i
            if(dom.find("i").length > len){
                dom.find("i:gt(" + (len - 1) + ")").remove();
            };
            //移除千分位分隔符
            dom.find("b").remove();
            //开始填充每一位
            for(var i=0;i<len;++i){
                //位数不足要补
                if(dom.find("i").length < len){
                    dom.append("<i></i>");
                }
                var obj = dom.find("i").eq(i);
                var y = -40 * parseInt(n.charAt(i), 10);
                //加分隔符
                // if(i < len - 1 && (len - i - 1) % 3 == 0)
                //     $("<b></b>").insertAfter(obj);
                if(i < len - 1 && (len - i - 1) % 3 == 0)
                    $("<b></b>").insertAfter(obj);
                //利用动画变换数字
                obj.animate({ backgroundPositionY:y+"px" }, 500);
            }
        },
        getTime(){
            let nowDate = new Date();
            let year = nowDate.getFullYear();
            let month = nowDate.getMonth() + 1 < 10 ? "0" + (nowDate.getMonth() + 1) : nowDate.getMonth() + 1;
            let day = nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate.getDate();
            let dateStr = year + "-" + month + "-" + day;
            return dateStr;
        }
     
    },
    watch: { 
        '$route'(to, from) {//监听路由改变
            let _this= this;
        }
    }
  }
</script>
<style scoped>
    #overview{
        height: 100% ;
        text-align: left;
        overflow: hidden;
        background: rgba(255,255,255,0.1);
        border-radius:10px;
        font-size: 0;
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
    p {
        font-size: 14px;
        text-align: center;
    }
    .left {
        display: inline-block;
        width: 25%;
        height: 100%;
        padding: 0 10px;
        box-sizing:border-box;
        -moz-box-sizing:border-box; /* Firefox */
        -webkit-box-sizing:border-box; /* Safari */
    }
    .center {
        display: inline-block;
        width: 50%;
        height: 100%;
    }
    .right{
        display: inline-block;
        width: 25%;
        height: 100%;
        padding: 0 10px;
        box-sizing:border-box;
        -moz-box-sizing:border-box; /* Firefox */
        -webkit-box-sizing:border-box; /* Safari */
    }
    .center_box {
        margin-top: 30px;
        height: 90%;
        background: url('../assets/images/over_big.png');
        background-size: 100% 100%;
    }
    .left_box {
        margin-top: 31px;
        padding-top: 34px;
        height: 90%;
        position: relative;
        box-sizing:border-box;
        -moz-box-sizing:border-box; /* Firefox */
        -webkit-box-sizing:border-box; /* Safari */
    }
    .right_box {
        margin-top: 31px;
        padding-top: 34px;
        height: 90%;
        position: relative;
        box-sizing:border-box;
        -moz-box-sizing:border-box; /* Firefox */
        -webkit-box-sizing:border-box; /* Safari */
    }
    .top {
        position: absolute;
        height: 45%;
        width: 100%;
    }
    .top>p {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
    }
    .bottom {
        position: absolute;
        bottom: 0;
        height: 45%;
        width: 100%;
    }
    .bottom>p {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
    }
    @media screen and (min-height: 800px) { 
       .bottom>p {
           top: 2.5%;
       }
       .top>p {
           top: 2.5%;
       }
       .center_box>p {
           top: 1.5%;
       }
    } 
    @media screen and (max-height: 800px) { 
       .bottom>p {
           top: 1%;
       }
       .top>p {
           top: 1%;
       }
       .center_box>p {
           top: 0.5%;
       }
    } 
    .left_box>div {
        background: url('../assets/images/over_little.png');
        background-size: 100% 100%;
    }
    .right_box>div {
        background: url('../assets/images/over_little.png');
        background-size: 100% 100%;
    }
    .center_box>p {
        padding-top: 1%;
    }
    #left_top {
        height: 88%;
        width: 100%;
        position: absolute;
        bottom: 0;
    }
    #right_top {
        height: 88%;
        width: 100%;
        position: absolute;
        bottom: 0;
    }
    #right_btm {
        height: 88%;
        width: 100%;
        position: absolute;
        bottom: 0;
    }
    #left_btm {
        height: 88%;
        width: 100%;
        position: absolute;
        bottom: 0;
    }
    .center_cont{
        font-size: 0;
    }
    .center_cont>div{
        display: inline-block;
        font-size: 14px;
    }
    .center_box>p {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
    }
    @media screen and (min-width: 1300px) { 
        .center_cont>div:first-child {
            width: 40%;
            margin-left: 10px;
        }
        .center_cont>div:nth-child(2) {
            width: 30%;
            margin-left: 10px;
        }
        .center_cont>div:last-child {
            width: 25%;
        }
        .center_cont {
            padding-top: 60px;
        }
    } 
    @media screen and (max-width: 1300px) { 
        .center_cont>div:first-child {
            width: 40%;
            margin-left: 10px;
        }
        .center_cont>div:nth-child(2) {
            width: 30%;
            margin-left: 10px;
        }
        .center_cont>div:last-child {
            width: 25%;
        }
        .center_cont{
            padding-top: 38px;
        }
    } 
    .center_cont>div  p {
        text-align: left;
    }
    .num_box>div {
        border: 1px solid #18376a;
        padding: 2px 4px 0px;
        display: inline-block;
    }
    .num_box>div>span {
        display: inline-block;
        width: 21px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        background: url("../assets/images/over_grid.png") no-repeat;
        background-size: 100% 100%;
        font-size: 20px;
    }
    .center_box {
        position: relative;
    }
    #center_box {
        width: 100%;
        position: absolute;
        height: 70%;
        bottom: 0;
        padding: 1px;
        box-sizing: border-box;
    }
    
</style>
