<template>
  <div id="main">
    <el-container>
        <el-header>
            <img class="logo" src="../assets/images/logoDXH.png" style="height: 31px;">
            <div class="login_out">
               <el-dropdown>
                <span class="el-dropdown-link">
                  <i v-text="username"></i>
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item><i @click="changePW()">修改密码</i></el-dropdown-item>
                  <el-dropdown-item><i @click="loginOut()">退出</i></el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
        </el-header>
        <el-container>
          <el-aside width="180px" style="background-color: rgb(238, 241, 246)">
              <el-menu :default-openeds="menuOpen" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
                <!-- 没有子节点的菜单 S -->
                <el-menu-item :index="''+index+''" v-if="item.children == undefined" v-for="(item,index) in menuList" :key="index">
                  <i :class='item.icon' class="icon_pic"> </i>
                  <span slot="title">
                    <a href="javascript:;" @click="torouter(item.url,item)" :data-url="item.url"><i v-show="big_isShow">{{item.tree_name}}</i></a>
                  </span>
                </el-menu-item>
                <!-- 没有子节点的菜单 E -->

                <!-- <el-menu-item index="2">
                  <i class='icon_pic cockpit'> </i>
                  <span slot="title">
                    <a href="javascript:;" @click="torouter('/cockpit')" data-url="/cockpit"><i v-show="big_isShow">会员分布</i></a>
                  </span>
                </el-menu-item>

                <el-menu-item index="3">
                  <i class='icon_pic shoplist'> </i>
                  <span slot="title">
                        <a href="javascript:;" @click="torouter('/shoplist')" data-url="/shoplist"><i v-show="big_isShow">门店信息</i></a>
                  </span>
                </el-menu-item>

                <el-menu-item index="4">
                  <i class='icon_pic usercenter'> </i>
                  <span slot="title">
                        <a href="javascript:;" @click="torouter('/usercenter')" data-url="/usercenter"><i v-show="big_isShow">顾客中心</i></a>
                  </span>
                </el-menu-item> -->

                <!-- 有子节点的菜单 S -->
                <el-submenu :index="''+index+''" v-else-if="item.children" >
                  <template slot="title">
                    <i :class="item.icon" class="icon_pic"></i>
                    <span slot="title">{{item.tree_name}}</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item :index="index+'-'+index2" v-for="(item2,index2) in item.children" :key="index2">
                      <span>
                        <a href="javascript:void(0)" @click="torouter(item2.url,item)" :data-url="item2.url"><i v-show="big_isShow">{{item2.tree_name}}</i></a>
                      </span>
                    </el-menu-item>
                    <!-- <el-menu-item index="5-2">
                      <span>
                        <a href="javascript:void(0)" @click="torouter('/power/role')" data-url="/power/role"><i v-show="big_isShow">角色管理</i></a>
                      </span>
                    </el-menu-item>
                    <el-menu-item index="5-3">
                      <span>
                        <a href="javascript:void(0)" @click="torouter('/power/store')" data-url="/power/store"> <i v-show="big_isShow">门店管理</i></a>
                      </span>
                    </el-menu-item>
                    <el-menu-item index="5-4">
                      <span>
                      <a href="javascript:void(0)" @click="torouter('/power/system')" data-url="/power/system"> <i v-show="big_isShow">系统日志</i></a>
                      </span>
                    </el-menu-item> -->
                  </el-menu-item-group>
                </el-submenu>
                <!-- 有子节点的菜单 E -->

                <!-- 待定 -->
                <el-submenu index="6" >
                  <template slot="title">
                    <i class="black icon_pic"></i>
                    <span slot="title">黑名单</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="6-1">
                      <span>
                        <a href="javascript:void(0)" @click="torouter('/black/blacklist')" data-url="/black/blacklist"><i v-show="big_isShow">黑名单库</i></a>
                      </span>
                    </el-menu-item>
                    <el-menu-item index="6-2">
                      <span>
                        <a href="javascript:void(0)" @click="torouter('/black/blackadd')" data-url="/black/blackadd"><i v-show="big_isShow">抓取照片</i></a>
                      </span>
                    </el-menu-item>
                    
                  </el-menu-item-group>
                </el-submenu>
                

            </el-menu>
              <!-- <div class="change_menu" @click="tochang()"> 《  </div> -->
          </el-aside>
          <el-main>
            <div class='content_main'>
              <router-view/>
            </div>
          </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>

export default {
  name: 'Main',
  data(){
    return{
      userinfo: {},
      navWidth: "180px",
      isCollapse: false,
      now_url:'',
      big_isShow: true,
      menuOpen: ['1'],
      menuactive: '1',
      username:"",
      systemInterval: {},
      onlineTime: 0 , //在线时间
      Ip_add: "", //IP地址
      dataTime: "", //当前时间
      menuList: [] , //菜单数据
    }
  },
  beforeDestroy () {
      let _this = this;
      clearInterval(_this.systemInterval);
  },
  mounted:function(){
    let _this = this;
    this.now_url = this.$route.path;
    let H = Number($(".el-main").height() - $(".content_main").height());
    $(".content_main").css("margin", H/2 + "px auto");
    _this.userinfo = sessionStorage.getItem('userinfo') != "" ? JSON.parse(sessionStorage.getItem('userinfo')) : "" ;
    _this.username = _this.userinfo.user_name;
    _this.Ip_add = returnCitySN["cip"] ;

    _this.M_List();
    function system_func(){
        _this.systemInterval = setInterval(() => {
            let T ;
            _this.dataTime = _this.GetDate() ;
            if(sessionStorage.getItem("times") != null || sessionStorage.getItem("times") != undefined){
              let a = sessionStorage.getItem("times");
                T = ++a;
            }else {
              T = ++_this.onlineTime ;
            }
            _this.systemStatus(T);
        }, 60000);
    };
    system_func();
  },
  methods:{
    M_List(){
      let _this = this; 
      console.log(sessionStorage);
      _this.menuList = JSON.parse( sessionStorage.getItem("menus")) ; 
      _this.$nextTick(()=>{
        $(".el-menu-item").removeClass("is-active");
        $("a[data-url='"+this.$route.path+"']").parent("").parent("").addClass("is-active");
      }); 
    },
    torouter(url,item){
        $("#leftmune li").removeClass('is-active');
        this.now_url = url;
        this.$router.push({path:url})
    },
    changePW(){
      let _this = this;
      this.$router.push({name:"Changepw"});
    },
    loginOut(){
      let _this = this;
      sessionStorage.clear();
      clearInterval(_this.systemInterval);
      _this.$router.push({path:'/login'}) ;
    },
    tochang(){
      let _this = this;
      // _this.isCollapse = !_this.isCollapse;
    },
    tochangSm(){
      let _this= this;
      _this.navWidth = '40px';
    },
    tochangBig(){
      let _this= this;
      _this.navWidth = '180px';
    },
    handleOpen(key, keyPath) {
    },
    handleClose(key, keyPath) {
    },
    systemStatus(T){
      let _this = this;
      // 更新系统日志
      sessionStorage.setItem("times",T);
      
      // sessionStorage.setItem("times",times);
      let json = {
        "id" : _this.userinfo.logid , 
        "user_name": _this.userinfo.user_name,
        "user_id": _this.userinfo.id ,
        "role_name": _this.userinfo.role_name,
        "role_id": _this.userinfo.role_id,
        "ip_addr" : _this.Ip_add ,
        "online_time": T,
        "last_time": _this.dataTime ,
        "state": "1" ,
        "role_father_id": _this.userinfo.create_role_id ,
      };
      let formdata = _this.$config.formData(json); 
      _this.$axios.post( _this.$url.System_upt , formdata).then((res)=>{ 
        
      }).catch((err)=>{
        _this.$message.error("日志错误！");
      })

    },
    GetDate(){
      let _this = this;
      let myDate = new Date();
        //获取当前年
      let year = myDate.getFullYear();
      //获取当前月
      let month = myDate.getMonth() + 1;
        //获取当前日
      let date = myDate.getDate();
      let h = myDate.getHours(); //获取当前小时数(0-23)
      let m = myDate.getMinutes(); //获取当前分钟数(0-59)
      let s = myDate.getSeconds();
      //获取当前时间
      let now = year + '-' + _this.conver(month) + "-" + _this.conver(date) + " " + _this.conver(h) + ':' + _this.conver(m) + ":" + _this.conver(s);
      return now;
    },
    conver(s) {
      return s < 10 ? '0' + s : s;
    }


  },
  watch:{
    "now_url" : {
      handler: function(val, oldVal){
        let _this= this;
        
       
      },
      deep: true
    },
    '$route'(to, from) {//监听路由改变
      let _this= this;
      if( to.path == "/power/user" || to.path == "/power/role" || to.path == "/power/store" || to.path == "/power/system" ){
        let N = "1" ;
        _this.menuOpen = [];
        _this.menuList.forEach(function(v,i,arr){
          if( v.url == "/power"){
            N = i.toString();
          }
        });
        _this.menuOpen.push(N);
      }else if( to.path == "/black/blackadd" || to.path == "/black/blacklist" ){
        let N = "1" ;
        _this.menuOpen = [];
        _this.menuList.forEach(function(v,i,arr){
          if( v.url == "/black"){
            // N = i.toString();
            N = 6;
            
          }
        });
        _this.menuOpen.push("6");
      }else {
        _this.menuOpen = ['1'];
      }
    }
  }

}

</script>

<style>
#main {
    height: 100%;
}
.el-header {
    position: relative;
}
.login_out{
    position: absolute;
    right: 20px;
    top: 50%;
    /* width: 70px; */
    transform: translateY(-50%);
}
.out_btn{
    width: 100%;
    display: inline-block;
    background: #1469a8;
    border: 0;
    outline-style: none;
    height: 31px;
    line-height: 31px;
    border-radius: 10px;
    color: #fff;
    cursor: pointer;
    letter-spacing: 3px;
    text-align: center;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    font-size: 12px;
}
.out_btn:hover {
    opacity: 0.8;
}
.out_btn:active {
    opacity: 1;
}
.is-active a {
  color: #fff;
}
.el-dropdown {
  color: #fff;
}
.el-dropdown-menu {
  padding: 0;
}
.power_menu>ul {
  margin-left: -20px;
}
.power_menu>ul>li {
  padding-left: 60px !important;

}
.login_out {
  cursor: pointer;
}
.change_menu {
  color: #fff;
  font-size: 14px;
  height: 36px;
  line-height: 36px;
  cursor: pointer;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: rgba(0,0,0,0.4);
}
.el-aside {
  position: relative;
}

</style>
