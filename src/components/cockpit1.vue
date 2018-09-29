<template>
 <div id='cockpit_con'>
   <div style="font-size: 1.8vw;margin-left: 20px;padding-left:20px;margin-top: 50px;vertical-align: top;display: inline-block;">{{mapname}}省</div>
   <div id="left">
     <div id='myChart'> </div>
   </div>
   <div id="right">
       <select name="" id="xiao" selected-data=1>
         <option value="月会员量">&nbsp&nbsp&nbsp&nbsp月会员量</option>
         <!-- <option value="季度用户量">&nbsp&nbsp&nbsp&nbsp季度用户量</option> -->
         <!-- <option value="年用户量">&nbsp&nbsp&nbsp&nbsp年用户量</option> -->
       </select>
       <table v-show="tshow">
         <tr><td colspan="2">TOP10城市{{title}}排行</td></tr>
         <tr v-for="(v,k) in city" v-bind:style="{color:[k<3?'#ff9000':'']}">
           <td>{{v.name}}</td>
           <td>{{v.value}}</td>
         </tr>
       </table>
   </div>
 </div>

</template>
<style scoped> 
  #cockpit_con{
    height: 100%;
    text-align: left;
        background: rgba(255,255,255,0.1);
    border-radius:10px;
  }
  #myChart{
   width:95%; 
   height: 95%;
  }
  #left{
    width: 55%;
    height:80%;
    display: inline-block;
    vertical-align: top;
    margin-top: 8%;
  }
  #right{
    /*width: 30%;*/
    width: 24%;
    height: 80%;
    display: inline-block;
    vertical-align: top;
    margin-top: 8%;
  }
  select {
    background: url("../assets/images/select.png") no-repeat scroll right center transparent;
    appearance:none;
    -moz-appearance:none;
    -webkit-appearance:none;
    background-color: #545768;
    width: 100%;
    height: 7.5%;
    font-size: 1.3vw;
    color: #d8d7d7;
    border: none;
    margin-top: 20px;
  }
  select::-ms-expand { display: none; }
  table{
    height: 82%;
    background: #545768;
    width: 100%;
    padding: 15px;
  }
  table>tr:first-child td{
    text-align: center;
    font-size: 1.4vw
  }
  table>tr td{
    width: 50%;
    text-align: center;
    font-size: 1.2vw;
  }
</style>
<script>
 import city from '../assets/js/city.js';
  export default {
    name:"cockpit_con",
    data () {
      return {
        msg: "我是百度钱包",
        radio: '1',
        city:[],
        show_city:[],
        mapname:'',
        title:'月会员量',
        tshow:true,
        option:{
          title : {
              x:'center',
          },
          tooltip : {
              trigger: 'item'
          },
          dataRange: {
              x: 'left',
              y: 'bottom',
              show:false,
              splitList: [
                  {start: 3000},
                  {start: 2000, end: 3000},
                  {start: 1000, end: 2000},
                  {start: 500, end: 1000},
                  {start: 100, end: 500},
                  {start:50,end:100},
                  {start:0,end:50},
              ],
              color: ['#57bad4', '#4492a7', '#377589','#2c566a','#224153','#0c2538',"#0b2132"]
          },
          series : [
              {
                  name:'用户量',
                  type: 'map',
                  zoom:1.2,
                  mapType: '',
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
                          areaColor:'#0f2f3f',
                      }
                  },
                  data:[{name: '',value:0}],
              },
              {
                name: 'TO3会员量',
                type: 'map',
                mapType: '',
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
                          borderColor:'#00e1ff',
                          areaColor:'#0f2f3f',
                      }
                  },
                data:[
                    {name:'',value:0},
                ]
              },
          ]
        },
        userinfo: {},
      };
    },
    mounted:function () {
      let _this = this;
      _this.userinfo = JSON.parse(sessionStorage.getItem("userinfo"));

      let name = this.$route.params.name?this.$route.params.name:sessionStorage.weizhi;
      sessionStorage.weizhi = name;
      _this.mapname = name;
        let json = { 'vid': _this.userinfo.store_root_id , 'proc' :_this.mapname }
        let formdata = _this.$config.formData(json); 
        _this.$axios.post( _this.$url.getVipProc ,formdata).then((res)=>{
            // 右侧数据
            _this.city = [];
            let arr = res.data;
            arr.slice(0,10).forEach(function(v,k){
                let value = [];
                value['value'] = v.cnt;
                value['name'] = v.city;
                _this.city.push(value);
            });
            // 左侧地图及数据
            _this.option.series[0].data = [];
            res.data.forEach(function(v,k){
                let val = {};
                val['value'] = v.cnt;
                val['name'] = v.city;
                _this.option.series[0].data.push(val);
            });
            let city_values = res.data.slice(0,3) ;
            _this.option.series[1].data = [];
            city_values.forEach(function(v,k){
                let value2 = {};
                value2['value'] = v.cnt;
                value2['name'] = v.city;
                _this.option.series[1].data.push(value2);
            });
            _this.getChar();
        });
       
    },
    methods:{
      getChar(bei){
         let _this = this;
         let myChart = this.$echarts.init(document.getElementById('myChart'));
         this.option.series[0].mapType = _this.mapname;
         this.option.series[1].mapType = _this.mapname;
        //  _this.getList(bei);
         myChart.setOption(this.option)
         window.onresize = myChart.resize;
      },
    }
  }
</script>
