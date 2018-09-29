<template>
  <div class="Height" :id="id" style="width: 100%;height: 100%">
    
  </div>
</template>

<script>
export default {
  name: 'ZhuZhuangTu',
  data () {
    return {
      option:{
          title: {
              text: '世界人口总量',  //title1
              subtext: '数据来自网络',//title2
          },
          color: [],  //color
          tooltip : {
              trigger: 'axis',
              axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                  type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
              }
          },
          legend: {
            data: [],//legend
          },
          grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
          },
          xAxis : [],   //x轴信息
          yAxis : [],//y轴信息,
          series : [],
      }
    }
  }, 
  props:['id','title','color','legend','axis','type','data'],
  mounted:function() {
    // console.log(this.id);
    console.log($(".Height").parent().height())
      let _this = this;
      let type = this.type?this.type:'h';
      let json1 = {
                    type : 'category',
                    data : this.axis,
                    axisTick: {
                        alignWithLabel: true
                    }
                  };
      let json2 = {
                   type : 'value'
                 }
      if(type == 'h'){
         this.option.xAxis[0] = json1;
         this.option.yAxis[0] = json2;
      }else if(type == 's'){
         this.option.yAxis[0] = json1;
         this.option.xAxis[0] = json2;
      }
      this.option.title.text = this.title[0];
      this.option.title.subtext = this.title[1];
      this.option.legend.data = this.legend;
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
         _this.data[k]['type'] = 'bar';
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
