<template>
  <div class="Height" :id="id" style="width: 100%;height: 100%">
    
  </div>
</template>

<script>
export default {
  name: 'ZheXianTu',
  data () {
    return {
      option:{
          title: {
              text: '',
              subtext: ''
          },
          tooltip: {
              trigger: 'axis'
          },
          legend: {
              data:[]
          },
          xAxis:  {
              type: 'category',
              boundaryGap: false,
              data: []
          },
          yAxis: {
              type: 'value',
              axisLabel: {
                  formatter: '{value}'
              }
          },
          series: [
              {
                  name:'直接访问',
                  type:'line',
                  data:[11, 11, 15, 13, 12, 13, 10],
              },
          ]
      }
    }
  }, 
  props:['id','title','color','legend','xaxis','yaxis','data'],
  mounted:function() {

      let _this = this;
      console.log($(".Height").height());
      this.option.title.text = this.title[0];
      this.option.title.subtext = this.title[1];
      this.option.legend.data = this.legend;
      this.option.yAxis.axisLabel.formatter += this.yaxis;
      this.option.xAxis.data = this.xaxis;
      this.option.color = this.color;
      this.option.series = this.dealData();
      let myChart = this.$echarts.init(document.getElementById(_this.id));
      myChart.setOption(this.option)
      window.addEventListener("resize", function () {
        myChart.resize();
      });
  },
  methods:{
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
#myChart{
  width: 100%;
  height: 100%;
}
</style>
