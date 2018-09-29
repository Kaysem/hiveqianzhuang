<template>
 <div id='cockpit_con'>
    <div id="left">
       <div style="letter-spacing:5px;font-size: 1.8vw;padding-left:9px;margin-top: 50px;vertical-align: top; position: absolute;">{{msg}}</div>
       <div  class="zhuce">

           <div>累计注册会员</div>
           <div><i class="tobiao"></i>{{total}}</div>
        </div>
        <div  class="jinri">
           <div>今日新增会员</div>
           <div><i class="tobiao"></i>{{today}}</div>
        </div>
        <div  class="benyue">
           <div>本月活跃会员</div>
           <div><i class="tobiao"></i>{{month}}</div>
        </div>
    </div>
    <div id="coo_center">
      <div  class="linetips">
       <div>{{linetips1}}</div>
       <div>{{linetips2}}</div>
      </div>
      <div id='myChart'> </div>
    </div>
    <div id="right">
      <div  class="xiaoliang">
       <div>TOP5会员量(省份)</div>
       <div class="rows" v-for="v in new_xl" v-bind:style="{marginTop:v[2]}" >
         <div style="width: 16%;">{{v[0]}}</div>
         <div style="width: 76%;">
          <div v-bind:style="{background:v[3],width:v[4]}">{{v[1]}}</div>
         </div>
       </div>
      </div>
    </div>

    
    
 </div>

</template>
<style scoped>
  #cockpit_con{
    height: 100% ;
    text-align: left;
    overflow: hidden;
    background: rgba(255,255,255,0.1);
    border-radius:10px;
  }
  #myChart{
   width:100%; 
   height: 100%;
  }
  #left{
    display: inline-block;
    width:22%;
    padding-left:30px;
    height: 100%;
    vertical-align: top;
  }
  #coo_center{
    display: inline-block;
    width: 53%;
    height: 100%;
    padding:0px;
    text-align: left;
    vertical-align: top;
    padding-bottom: 10px;
  }
  #right{
    display: inline-block;
    width: 20%;
    padding:0px;
    height: 100%;
    vertical-align: top;
  }
  .linetips>div:last-child{
    margin-top: 5px;
    color: yellow;
  }
  .zhuce{
    background: url('../assets/images/bg_01.png');
    width:100% ;
    height:100px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    margin-top: 144px;
    position: relative;
  }

  .jinri{
    background: url('../assets/images/bg_01.png');
    width:100%;
    height: 100px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    margin-top: 16%;
    position:relative;
  }
  .benyue{
    background: url('../assets/images/bg_01.png');
    width:100% ;
    height: 100px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    margin-top: 16%;
    position:relative;
    
  }
  .xiaoliang{
    background: url('../assets/images/bg_03.png');
    width:100% ;
    height: 100%;
    background-repeat: no-repeat;
    background-size: 100% 60%;
    margin-top: 144px;
    margin-right: 100px;
        padding: 0px 5px;
    box-sizing: border-box;
  }
  .benyue>div:first-child,.jinri>div:first-child,.zhuce>div:first-child{
    padding-top: 15px;
    font-size: 1.2vw ;
    position: absolute;
    left: 16%;
  }
  .zhuce>div:last-child{
    font-size: 1.8vw;
    color: yellow;
    position: absolute;
    right: 16%;
    bottom: 16%;
  }
  .jinri>div:last-child{
    font-size: 1.8vw;
  position: absolute;
    right: 16%;
    bottom: 16%;
    color: yellow
  }
  .benyue>div:last-child{
    font-size: 1.8vw;
     position: absolute;
    right: 16%;
    bottom: 16%;
    color: yellow
  }
  .xiaoliang>div:first-child{
    position: relative;
    margin-left:16% ;
    top:30px;
    font-size: 1.5vw;
  }
  .rows{
      /* margin-left: 5%; */
      width: 100%
  }
  .rows div{
    display: inline-block;
    font-size: 1.2vw
  }
  .rows div:last-child{
    /* margin-left: 2%; */
    font-size: 1.2vw
  }
  .tobiao {
    display: inline-block;
    width: 18px;
    height: 16px;
    background: url("../assets/images/02.png") no-repeat;
    background-size: 100% 100%;
    margin-right: 11px;
  }
</style>
<script>
  export default {
    name:"cockpit_con",
    data () {
      return {
        userinfo: {},
        msg: "HiveFace会员分布情况",
        radio: '1',
        // H: mydate.getHours(),
        // M: mydate.getMinutes(),
        option:{
                  title : {
                      x:'left',
                  },
                  tooltip : {
                      trigger: 'item'
                  },
                  legend: {
                      orient: 'horizontal',
                      top:'85%',
                      right:'10%',
                      show:true,
                      selectedMode:false,
                      itemWidth:10,
                      itemHeight:10,
                      data:[
                              // {icon :'circle',name:'访问中',textStyle:{color:'#fff'}},
                              {icon :'rect',name:'覆盖区域',textStyle:{color:'#fff'}},
                           ]
                  },
                  geo: {
                        map: 'china',
                        zoom:1.2,
                        layoutSize:'50%',
                        label: {emphasis: {show: true}},
                        itemStyle: {normal: {areaColor: 'rgba(0,0,0,0.2)',borderColor: 'rgba(0,0,0,0.2)'},emphasis: {areaColor: 'rgba(0,0,0,0.2)'}}
                  },
                  dataRange: {
                      x: 'left', y: 'bottom', show: false, textStyle: {color: '#fff'  },        // 值域文字颜色
                      splitList: [
                          {start: 150000},
                          {start: 100000, end: 150000},
                          {start: 50000, end: 100000},
                          {start: 10000, end: 50000},
                          {start: 5000, end: 10000},
                          {start: 1000, end: 5000},
                          {start:500,end:1000},
                          {start:0,end:500},
                      ],
                      color: ['#57bad4', '#4492a7', '#377589','#2c566a','#224153','#0c2538',"#0b2132"]
                  },
                  series : [
                      {
                          name:'访问中',
                          type: 'map',
                          zoom:1.2,
                          mapType: 'china',
                          showLegendSymbol:false,
                          itemStyle:{
                              normal:{
                                 label:{show:true,color:'#fff'},
                                 borderWidth:'1',
                                 borderColor:'#2ca5c6',
                                 areaColor:"#0c2538",
                                 color:'yellow'
                              },
                              emphasis:{
                                 label:{"show":true,color:'#fff'},
                                 borderColor:'#00e1ff',
                                 areaColor:'#0f2f3f', //鼠标移上的效果
                              }
                          },
                      },
                      {
                          name:'覆盖区域',
                          type: 'map',
                          mapType: 'china',
                          itemStyle:{
                              normal:{
                                 label:{show:true,color:'#fff'},
                                 borderWidth:'1',
                                 borderColor:'#2ca5c6',
                                 areaColor:"#0c2538",
                              },
                              emphasis:{
                                 label:{"show":true,color:'#fff'},
                                 borderColor:'#00e1ff',
                                 areaColor:'#0f2f3f',
                              }
                          },
                          data:[ ]
                      },
                      {
                          name: '用户量',
                          type: 'map',
                          mapType: 'china',
                          zoom:1.2,
                          showLegendSymbol:false,
                          itemStyle:{
                                normal:{
                                  label:{show:true,color:'#fff'},
                                  borderWidth:'1',
                                  borderColor:'#2ca5c6',
                                  areaColor:"red",
                                },
                                emphasis:{
                                  label:{"show":true,color:'#fff'},
                                  borderColor:'yellow',
                                  areaColor:'#0f2f3f',
                                }
                            },
                          data:[
                              {name:'',value:0},
                          ]
                        },
                      {
                        name: 'TOP5用户量',
                        type: 'map',
                        mapType: 'china',
                        zoom:1.2,
                        showLegendSymbol:false,
                        itemStyle:{
                              normal:{
                                 label:{show:true,color:'#fff'},
                                 borderWidth:'1',
                                 borderColor:'#2ca5c6',
                                 areaColor:"red",
                              },
                              emphasis:{
                                 label:{"show":true,color:'#fff'},
                                 borderColor:'yellow',
                                 areaColor:'#0f2f3f',
                              }
                          },
                        data:[
                            {name:'',value:0},
                            {name:'',value:0},
                            {name:'',value:0},
                            {name:'',value:0},
                            {name:'',value:0}
                        ]
                      },
                  ]
               },
        linetips1:'',
        linetips2:'',
        month:'',
        today:'',
        total:'',
        xiaoliang:[
          ['','0','25%','#57bad4','10%'],
          ['','0','10%','#4492a7','7%'],
          ['','0','12%','#377589','5%'],
          ['','0','14%','#2c566a','5%'],
          ['','0','16%','#224153','5%']
        ],
        new_xl : [],
        menuList:[],
        menuoperate: [], //页面操作
      };
    },
    mounted:function ( ) {
        let _this = this;
        _this.userinfo = JSON.parse(sessionStorage.getItem("userinfo"));
        _this.M_List();
        
    },
    methods:{
      getAxios(){
        let _this= this;
        let json = {'vid': _this.userinfo.store_root_id  };
          let formdata = _this.$config.formData(json); 
          _this.$axios.post( _this.$url.getVipDistribution ,formdata).then((res)=>{
            let b = (JSON.stringify(res.data) == "{}");
            if( b ){
              _this.total = 0 ;
              _this.today = 0 ;
              _this.month = 0 ;
            }else {
              let total = res.data.cnt_total;
              let toady = res.data.cnt_today;
              let month = res.data.cnt_month_hy;
              _this.total = Math.floor(total).toString().split('').reverse().join('').replace(/(\d{3})/g,'$1,').replace(/\,$/,'').split('').reverse().join('');
              _this.today = Math.floor(toady).toString().split('').reverse().join('').replace(/(\d{3})/g,'$1,').replace(/\,$/,'').split('').reverse().join('');
              _this.month = Math.floor(month).toString().split('').reverse().join('').replace(/(\d{3})/g,'$1,').replace(/\,$/,'').split('').reverse().join('');
            }
              
          }).catch(()=>{
              _this.total = 0 ;
              _this.today = 0 ;
              _this.month = 0 ;
          });
          _this.$axios.post( _this.$url.getVipChina , formdata ).then((res)=>{
            _this.new_xl = [];
            if( res == null || res.data == null || res.data.length == 0 ){
                _this.xiaoliang = [
                    ['','0','25%','#57bad4','10%'],
                    ['','0','10%','#4492a7','7%'],
                    ['','0','12%','#377589','5%'],
                    ['','0','14%','#2c566a','5%'],
                    ['','0','16%','#224153','5%']
                ];
                _this.option.series[3].data[0].name = 0;
                _this.option.series[3].data[0].value = 0;
            }else { 
              if( res.data.length < 5 ){
                for(let i = 0 ; i < 5 ; i++){
                  if(res.data[i] == undefined || res.data[i] == null ){
                    res.data[i] = {province: "", cnt_rate: "" , cnt: "" }
                  }
                }
              }
              $.each( _this.xiaoliang , function (v,k){
                  k[0] = res.data[v]['province'];
                  k[1] = Math.floor(res.data[v]['cnt']).toString().split('').reverse().join('').replace(/(\d{3})/g,'$1,').replace(/\,$/,'').split('').reverse().join('');
                  k[4] = res.data[v]['cnt_rate']*100 + "%";
                  _this.option.series[3].data[v].name = res.data[v].proc;
                  _this.option.series[3].data[v].value = res.data[v].cnt;
              });
              for( let i = 0 ; i < _this.xiaoliang.length ; i++ ){
                if( _this.xiaoliang[i][0] == ""){
                  _this.xiaoliang.splice(i , 1);
                  i-- ;
                }
              }
              _this.new_xl = _this.xiaoliang;

            }
          }).catch(()=>{
            _this.xiaoliang = [
                ['','0','25%','#57bad4','10%'],
                ['','0','10%','#4492a7','7%'],
                ['','0','12%','#377589','5%'],
                ['','0','14%','#2c566a','5%'],
                ['','0','16%','#224153','5%']
            ];
            _this.new_xl = _this.xiaoliang;
          });
          _this.$axios.post( _this.$url.getVipChina ,formdata).then((res)=>{
              _this.option.series[2].data = [];
              if( res != null && res.data != null ){
                  $.each(res.data , function (v,k){
                    let val = {};
                    val['value'] = k.cnt;
                    val['name'] = k.province;
                    _this.option.series[2].data.push(val)
                });
                  _this.getChar();
                
              }else {
                    _this.option.series[2].data = [] ;
                    _this.getChar();                    
              }
              
          }).catch(()=>{
             _this.option.series[2].data = [] ;
            _this.getChar();             
          });
      },
      getChar(){
         let _this = this;
         let myChart = this.$echarts.init(document.getElementById('myChart'));
         myChart.setOption(this.option)
         window.onresize = myChart.resize;
         let click = 0 ;
        _this.menuoperate.forEach(function(v,i,arr){
            if(v == 7){
                //可以点击
                click = v ;
                return;
            }
        });
        if( click == 7 ){
          myChart.on('click',function(param){
              _this.$router.push({ name: 'Cockpit1',params:{name:param.data.name}})
          });
        }
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
                  _this.getAxios();
              // }
          // });
      },
    },
    watch: { }
  }
</script>
