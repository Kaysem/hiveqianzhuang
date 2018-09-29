<template>
  <div :id="id" style="width: 100%;height: 100%">
    
  </div>
</template>

<script>
export default {
  name: 'doubleP',
  data () {
    return {
      option:{
            title : {
                text: '',
                subtext: '',
                x:'center'
            },
            tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            x: 'left',
            data:[]
        },
        series: [
        ]
      }
    }
  }, 
  props:['id','title','legend','data'],
  mounted:function() {
      this.initData();
  },
  watch:{
    title:{  
        handler:function(val,oldval){
            this.initData();
        },  
        deep:true//对象内部的属性监听，也叫深度监听  
    },
    legend:{  
        handler:function(val,oldval){
            this.initData();
        },  
        deep:true//对象内部的属性监听，也叫深度监听  
    },
    data:{  
        handler:function(val,oldval){
            this.initData();
        },  
        deep:true//对象内部的属性监听，也叫深度监听  
    },
  },
  methods:{
    initData(){
      let _this = this;
      _this.option.title.text = _this.title[0];
      _this.option.title.subtext = this.title[1];
      _this.option.legend.data = _this.legend;
      // this.option.yAxis.axisLabel.formatter += this.yaxis;
      // this.option.xAxis.data = this.xaxis;
      // this.option.color = this.color;
      _this.option.series = _this.data;
      _this.$nextTick(function () {
          let myChart = _this.$echarts.init(document.getElementById(_this.id));
          myChart.setOption(_this.option);
          window.addEventListener("resize", function () {
             myChart.resize();
          });
      });
    },
    dealData(){
      let _this = this;
      $.each(_this.data,function(k,v){
         _this.data[k]['type'] = 'line';
      })
      return _this.data;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
