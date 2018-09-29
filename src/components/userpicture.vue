<template>
 <div id="userpicture">
    <h1>会员实况</h1>
    <div class="choose">
        <el-radio-group v-model="change_radio" @change="changeRadio">
            <el-radio :label="1">支付会员</el-radio>
            <el-radio :label="0">到店会员</el-radio>
        </el-radio-group>
    </div>
    <div class="big">
        <div class="box" v-on:mousemove="mouseMove">
            <ul v-for="(item,index) in imgcontent" :key="index">
                <li v-for="(item2,index2) in item" :key="index2">
                    <div class=" border_box">
                        <div class="addborder"></div>
                        <div class="imgs">
                            <div class="imgIn">
                                <img class="imgs_choose" :dataid="item2.isHighLight" :src="item2.headurl" alt="" :id=" 'phos_'+index+index2 "  @mouseover="overShow" @mouseout="outHide" @click="toCenter(item2.memNo)">
                            </div>   
                        </div>
                    </div>

                </li>
            </ul>
        </div>


    </div>  
    <div class="btm_contnet">
        <div class="">
            <!-- <p >今日累计客流</p> -->
            <p v-if="change_radio == 0 ">今日累计客流</p>
            <p v-else>今日支付客流量</p>
            <div>
                <p>
                    <i class="tobiao"></i>
                    <i v-text="btn_content.today"  style="font-size: 38px;color: yellow;"></i>人
                </p>
            </div>
        </div>
        <div class="">
            <!-- <p>高峰客流</p> -->
            <p v-if="change_radio == 0 ">高峰客流</p>
            <p v-else>VIP累计支付量</p>
            <div>
                <p>
                    <i class="tobiao"></i>
                    <i v-text="btn_content.high"   style="font-size: 38px;color: red;"></i>人
                </p>
            </div>
        </div>
        <div class="">
            <!-- <p>近一小时客流</p> -->
            <p v-if="change_radio == 0 ">近一小时客流</p>
            <p v-else>近1小时支付量</p>
            <div>
                <p>   
                    <i class="tobiao"></i>
                    <i v-text="btn_content.hour" style="font-size: 38px;color: green;"></i>人
                </p>
            </div>
        </div>
    </div> 
    <!-- 单线图 -->
    <div class="box_btms"  >
        <div id="onlys" ></div>
    </div> 
    
 </div>

</template>

<script>
 import srcs from "../assets/images/uidxhlogo.png"
  export default {
    name:"Usercenter",
    data () {
      return {
        userinfo: {},
        intervalid_picture: {},
        shuzi: 0,
        storeID: "",
        change_radio: 1,
        imgsurl:[
            [srcs,srcs,srcs,srcs,srcs,srcs,srcs,srcs,srcs,srcs,srcs,srcs,srcs,srcs,srcs,srcs,srcs,srcs,srcs,srcs,srcs], 
            [srcs,srcs,srcs,srcs,srcs,srcs,srcs,srcs,srcs,srcs,srcs], 
            [srcs,srcs,srcs,srcs,srcs,srcs,srcs,srcs,srcs,srcs,srcs] 
        ] ,
        imgcontent : [],
        high_light: [], 
        gaoliang: "",
        btn_content:{
            today: "", high:  "", hour:  "",
        },
        btn_option: {
            title : { text: '', subtext: '', x: 'center', align: 'left', textStyle: {     color: "#fff", }, },  grid: { bottom: 50 },  tooltip : { trigger: 'axis', }, legend: { data:['客流量'], x: 'left', textStyle: {     color: "#fff", }, },
            xAxis : {
                type : 'category', axisLine:{       lineStyle:{           color:'#fff',           width:1,     }   },
                data : [  "0:00","1:00","2:00","3:00","4:00","5:00","6:00","7:00","8:00","9:00","10:00","11:00","12:00","13:00","14:00", "15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00" ]
            },
            yAxis: [
               { name: '客流量', type: 'value', splitLine: {       lineStyle: {           color: ['#fff']       }   },   nameTextStyle: {       color: ['#fff']       },   axisLine:{       lineStyle:{           color:'#fff',           width:1,     }   }  },
            ],
            series: [
                {
                    name:'客流量',
                    type:'line',
                    animation: false,
                    symbol:'circle',
                    symbolSize: 8,
                    // areaStyle: {    normal: {        color:"#0087ED"    }},
                    itemStyle:{    normal: {        color: "yellow",        borderColor: "green",    }},
                    // lineStyle: {    normal: {        color:'rgba(0,0,0,0.5)',          width: 2    }},
                    data:[
                        // Math.floor(100*Math.random()),
                        // Math.floor(100*Math.random())
                    ]
                }
            ]
        },
      };
    },
    methods: {
        mouseMove(e){
            var box = document.getElementsByClassName('box')[0];
            // $.each($(".box ul"),function(v,k){
            // });
            var x = (box.clientWidth/2 - e.clientX + box.offsetLeft)/20;
            var y = (box.clientHeight/2 - e.clientY + box.offsetTop)/20;
            box.style.left = x+'px';
            box.style.top = y+'px';
        },
        /*
        * 将一个数组分成几个同等长度的数组
        * array[分割的原数组]
        * size[每个子数组的长度]搜索
        */
        sliceArray(array, size) {
            var result = [];
            for (var x = 0; x < Math.ceil(array.length / size); x++) {
                var start = x * size;
                var end = start + size;
                result.push(array.slice(start, end));
            }
            return result;
        },
        toCenter(ids){
            let _this = this;
            if(_this.change_radio == 1){
                _this.$router.push({name: 'Usercenter' , params:{dataid: ids}})
            }else {
            }
        },
        overShow (e) {
            let eventid = e.target.id;
            $("#"+eventid ).parent("div").parent("div").siblings().addClass("active");
        },
        outHide (e) {
             let eventid = e.target.id;
             $("#"+eventid ).parent("div").parent("div").siblings().removeClass("active");
        },
        changeRadio(){
            let _this = this;
            _this.sendpage(_this.change_radio);
            _this.lines(_this.change_radio);

            clearInterval(_this.intervalid_picture);
            var test = function(){
            var is = 0;
            _this.intervalid_picture = setInterval(function(){
                is++;
                for(let i = 0 ; i < $(".imgs_choose").length ; i++){
                    let dataID = $($(".imgs_choose")[i]).attr("dataid");
                    if(dataID == "1"){
                        $($(".imgs_choose")[i]).parent("div").parent("div").siblings().addClass("active");
                        $($(".imgs_choose")[i]).css({ "margin": "0 auto", "left": "-100%", "right": "-100%", "position": "absolute", "transform": "scale(1.2,1.2)",});
                    }
                }
                if(is == 3)  {
                    is = 0;
                    clearInterval(_this.intervalid_picture);
                    _this.sendpage(_this.change_radio);
                    _this.lines(_this.change_radio);
                    test();
                }
            },3000);
        };
        test();
        },
        sendpage( changes = 1 ){
            //type 为1 是默认 支付会员  0为到店会员  
            let _this = this;
            // let formdata = _this.$config.formData({ type: changes }); 
            _this.$axios.get( _this.$url.getSome +"?type=" + changes + "&store_id="+_this.storeID + "&vid=" + _this.userinfo.store_root_id).then((res)=>{
                _this.imgcontent = res.data; //图片信息数据
                _this.high_light = res.data; //高亮
                _this.imgcontent = _this.sliceArray(_this.imgcontent , 11);
                _this.light();
            });
        },
        getLine(){
            let _this = this;
            if( _this.myChartOnly == undefined ){
                let dom_only =  document.getElementById('onlys');
                if(dom_only != null){
                    _this.myChartOnly = _this.$echarts.init(dom_only);
                    _this.myChartOnly.clear();   //只是清理画布，而不会删除 生成的元素节点
                    _this.myChartOnly.setOption(_this.btn_option);
                }
            }else {
                _this.myChartOnly.clear();   //只是清理画布，而不会删除 生成的元素节点
                _this.myChartOnly.setOption(_this.btn_option);
            }
            window.addEventListener("resize", function () {
                _this.myChartOnly.resize();
            });
        },
        compare(property){
            return function(obj1,obj2){
                var value1 = obj1[property];
                var value2 = obj2[property];
                return value1 - value2;     // 升序
            }
        },
        lines( changes = 1 ){
            let _this = this;
            // changes = 1 为支付会员
            // changes = 0 为到店会员  
            if( changes == 0 ){
                _this.$axios.get( _this.$url.getMemFlow +"?type=" + changes + "&store_id="+_this.storeID ).then((res)=>{
                    if(res.status == 200){
                            let data = res.data;
                            _this.btn_content.today = data.tt_cnt; //今日累计客流
                            _this.btn_content.high = data.max_cnt; //高峰客流
                            _this.btn_content.hour = data.last_cnt; //近一小时客流
                            let list = data.list;
                            let sortObj = list.sort(_this.compare("hour"));
                            
                            _this.btn_option.series = [];
                            let series_json = {}
                            series_json["name"] = "客流量" ;
                            series_json["type"] = "line" ;
                            series_json["animation"] = false ;
                            series_json["symbolSize"] = 8 ;
                            series_json["itemStyle"] = {    normal: {        color: "#a65de3",        borderColor: "green",    }};
                            series_json["data"] = [] ;
                            for(let i = 0 ; i< sortObj.length ; i++){
                                series_json["data"].push(sortObj[i].cnt);
                            }
                            _this.btn_option.series.push(series_json);
                            _this.getLine();
                    }else {
                            _this.btn_content.today = "";
                            _this.btn_content.high = "";
                            _this.btn_content.hour = "";
                            _this.btn_option.series = [];
                            _this.getLine();
                    }
                }).catch((err)=>{
                    _this.btn_content.today = "";
                    _this.btn_content.high = "";
                    _this.btn_content.hour = "";
                    _this.btn_option.series = [];
                    // _this.getLine();
                });
            }else {
                _this.$axios.get( _this.$url.getPayMemFlow +"?type=" + changes + "&store_id="+_this.storeID ).then((res)=>{ 
                    _this.btn_content.today = res.data[0].tt_cnt ; //今日支付客流量
                    _this.btn_content.high =  res.data[0].vip_cnt ; //VIP累计支付量
                    _this.btn_content.hour =  res.data[0].last_cnt ; //近1H支付量
                }).catch(()=>{
                    _this.btn_content.today = "" ; //今日支付客流量
                    _this.btn_content.high = "" ; //VIP累计支付量
                    _this.btn_content.hour =  "" ; //近1H支付量
                });
                _this.btn_option.series[0].data = [];
                _this.btn_option.series = [];
                for(let i = 0 ; i < 2 ; i++){
                    let series_json = {}
                    if(i == 0){
                        series_json["name"] = "支付客流" ;
                        series_json["itemStyle"] = {    normal: {        color: "yellow",        borderColor: "green",    }};
                    }else if( i == 1 ){
                        series_json["name"] = "VIP支付量" ;
                        series_json["itemStyle"] = {    normal: {        color: "green",        borderColor: "green",    }};
                    }else { }
                    series_json["type"] = "line" ;
                    series_json["animation"] = false ;
                    series_json["symbolSize"] = 8 ;
                    series_json["data"] = [] ;
                    _this.btn_option.series.push(series_json)
                }
                _this.$axios.get( _this.$url.getPayMemFlowHour +"?type=" + changes + "&store_id="+_this.storeID ).then((res)=>{ 
                    let data = res.data;
                    let zfkl = [] ;
                    let VIPzfkl = [] ;
                    for(let i = 0 ; i < data.length ;i++ ){
                        _this.btn_option.series[0].data.push(data[i].cnt_tt) ;
                        _this.btn_option.series[1].data.push(data[i].cnt_vip) ;
                    };
                    _this.getLine();
                }).catch(()=>{
                    _this.btn_option.series = [] ;
                    // _this.getLine();
                });
            }
            
        },
        light(){
            let _this = this;
            let data = _this.high_light;
            for(let i = 0 ; i < data.length ; i++){
                if(data[i]["isHighLight"] == 1 ){
                    _this.gaoliang = "1";
                }
            }
        }
    },
    beforeDestroy () {
        let _this = this;
        clearInterval(_this.intervalid_picture)
    },
    mounted(){
        let _this = this; 
        _this.userinfo = JSON.parse(sessionStorage.getItem("userinfo"));
        let infoobj=JSON.parse(sessionStorage.getItem("shoplistInfo"));
        _this.storeID = _this.$route.params.name?_this.$route.params.name:infoobj;
        _this.sendpage(_this.change_radio);
        _this.lines(_this.change_radio);
        _this.$nextTick(()=>{
            $.each($("ul"),function(v,k){
                let n = $(this).find("li").length;
                $(this).css({
                    "width": 103*n + "px",
                });
            })
            $("ul").css("width");
        });
        var test = function(){
            var is = 0;
            _this.intervalid_picture = setInterval(function(){
                is++;
                for(let i = 0 ; i < $(".imgs_choose").length ; i++){
                    let dataID = $($(".imgs_choose")[i]).attr("dataid");
                    if(dataID == "1"){
                        $($(".imgs_choose")[i]).parent("div").parent("div").siblings().addClass("active");
                        $($(".imgs_choose")[i]).css({ "margin": "0 auto", "left": "-100%", "right": "-100%", "position": "absolute", "transform": "scale(1.2,1.2)",});
                    }
                }
                if(is == 3)  {
                    is = 0;
                    clearInterval(_this.intervalid_picture);
                    _this.sendpage(_this.change_radio);
                    _this.lines(_this.change_radio);
                    test();
                }
            },3000);
        };
        test();
    },
    watch:{
        'high_light':{  
        handler:function(val,oldval){
            if(val != oldval){
                $(".addborder").removeClass("active");
            }
        },  
        deep:true//对象内部的属性监听，也叫深度监听  
    },
    }
  }
</script>
<style scoped>
#userpicture {
    width: 96%;
    
    background: rgba(255,255,255,0.1);
    color: #fff;
    border-radius: 10px;
    padding: 2%;
    margin: auto;
    overflow: hidden;
    position: relative;
    margin-bottom: 20px;
  }
  .big {
    width: 1000px;
    overflow: hidden;
    background: rgba(255,255,255,0.1);
    margin: 30px auto 0;
    height: 568px;
  }
.box {
    position: relative;
    margin-top: -55px;
    margin-left: -20px;
    /* background-color: #aaa; */
    /* overflow-y: auto; */
    overflow-x: hidden;
    height: 1100px;
    width: 1050px;
}
ul {
    width: 1133px;
    height: 115px;
    margin-top: -25px;
}

ul:nth-child(2n+1) {
    margin-left:-52px;
    width: 1200px;
}
ul:nth-child(1) {
    margin-left:-52px;
}
ul:first-child {
    margin-top:0px;
}

ul li {
    float: left;
    width: 100px;
    height: 70px; 
    margin-left: 3px;
}
.imgs {
    width: 100px;
    height: 116px;
    overflow: hidden;
    visibility: hidden;
    transform: rotate3d(0,0,1,-60deg) skewY(30deg);
    position: absolute;
}
.imgs .imgIn {
    width: 100px;
    height: 116px;
    overflow: hidden;
    visibility: visible;
    transform: skewY(-30deg) rotate3d(0,0,1,60deg);
    z-index: 999;
}
.imgs img {  
    width: 100%;  
    height: 100%;
}
li {
    position: relative;
}
img:hover  {
    /* width: 105%;
    height: 105%; */
    margin: 0 auto;
    left: -100%;
    right: -100%;
    position: absolute;
    transform: scale(1.2,1.2);
}
.border_box {
    /* position: absolute; */
    width: 105px;
    height: 120px;
    overflow: hidden;
    visibility: visible;
    /* -webkit-transform: translate(-50% , -50%) skewY(-30deg) rotate3d(0,0,1,60deg); */
    /* transform: skewY(-30deg) rotate3d(0,0,1,60deg); */
    /* transform: translate(-50% , -50%) skewY(-30deg) rotate3d(0,0,1,60deg); */
    /* top: 50%; */
    /* left: 50%; */
    z-index: -1;
}
.active {
    width: 106px;
    height: 123px;
    background: url("../assets/images/margin_bor5.png") no-repeat;
    background-size: 100% 100%;
    /* position: absolute; */
    /* z-index: 9999; */
    left: -3px;
    top: -4px;
    /* transform: translateX(-50%); */
}
.choose {
    position: absolute;
    right: 22px;
    top: 22px;
    color: #fff;
}
.el-radio {
    color: #fff;
}
.addborder {
    position: absolute;
    /* width: 110px;
    height: 120px; */
}
.btm_contnet {
    position: relative;
    height: 100px;
    width:1000px;
    margin: 30px auto 40px;
}
.btm_contnet>div {
    width:30%;
    padding: 10px;
    background:rgba(255,255,255,0.1);
    position: absolute;
    height:100%;
}
.btm_contnet>div:nth-child(1){
    left: 0 ;
    top: 0; 
}
.btm_contnet>div:nth-child(2){
    left: 50%;
    transform: translateX(-50%);
}
.btm_contnet>div:nth-child(3){
    right: 0;
    top: 0; 
}
.box_btms {
    width: 1000px;
    height: 500px;
    margin:auto;
}
#onlys {
    width: 1000px;
    height: 500px;
}
.btm_contnet>div>div>p{
    position: absolute;
    right: 20px;
    top: 50%;
    /* transform: translateX(-50%); */
}
.tobiao {
    display: inline-block;
    width: 18px;
    height: 16px;
    background: url("../assets/images/02.png") no-repeat;
    background-size: 100% 100%;
    margin-right: 11px;
    vertical-align: middle;
  }
</style>

