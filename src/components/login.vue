<template>
    <div id="login">
        <div class="bg">
            <img src="../assets/images/bg_login.jpg" alt="">
        </div>
        <div class="center">
            <div class="left">
                <div class="imgs">
                    <img src="../assets/images/left_login.png" alt="无限讯奇">
                </div>
                <div class="logos clearfix">
                    <div class="fl logo_dxh"></div>
                    <div class="fr logo_hiveface"></div>
                </div>
            </div>
            <div class="right">
                <div>
                    <h4>欢迎登录</h4>
                    <input type="text" placeholder="请输入用户名" v-model="login.input_user"   @keyup.enter="toPass()">
                    <input type="password" placeholder="请输入密码" v-model="login.input_password" class="password" @keyup.enter="toSub()">
                    <p class="forget" @click="reset()">忘记密码</p>
                    <input class="submit" type="button" value="登录" @click="toSub()">
                </div>
            </div>
        </div>
    </div>

</template>
<script>
export default {
    name: "login",
    data(){
        return {
            login: {
                userinfo: {},
                input_user: "",
                input_password:"",
                menuList: [],
            }
            
        }
    },
    mounted: function(){
        let _this = this;
    },
    methods:{
        toPass(){
            let _this = this;
            $(".password").focus();
        },
        M_List(){
            let _this = this;
            // let json1 = {"id": _this.userinfo.role_id ,"role_rank":_this.userinfo.role_rank  } ;
            
        },
        toSub(){
            let _this = this;
            // sessionStorage.setItem("user", _this.login.input_user);
            // _this.$router.push({ name: 'Overview'});
            sessionStorage.removeItem('userinfo');
            sessionStorage.removeItem("URL");
            sessionStorage.removeItem("menus") ;

            let json = { 'user_name' : _this.login.input_user , 'pass_word' : _this.login.input_password }
            let formdata = _this.$config.formData(json); 
            if( _this.login.input_user != "" && _this.login.input_password != ""){
                _this.$axios.post( _this.$url.login , formdata).then((res)=>{
                    if(res.data.infocode == 1){
                        this.$message.success(res.data.message);
                        _this.userinfo = {};
                        _this.userinfo = res.data.object[0];
                        sessionStorage.setItem("userinfo",JSON.stringify(_this.userinfo));
                        _this.$nextTick(()=>{
                            let json1 = {data: JSON.stringify({"id": _this.userinfo.role_id ,"role_rank":_this.userinfo.role_rank  })}
                            let formdata = _this.$config.formData(json1) ; 
                            _this.menuList = [] ;
                            _this.$axios.post( _this.$url.querytreedata , formdata).then((res2)=>{ 
                                if(res2.status == 200){
                                    let data = res2.data.data ;
                                    _this.menuList = data ;
                                    sessionStorage.setItem("menus",JSON.stringify(_this.menuList));
                                    if (sessionStorage.getItem("menus") != null){
                                        let role_menu = JSON.parse(sessionStorage.getItem("menus"))[0] ;
                                        let URL ;
                                        if( role_menu.children == undefined) {
                                            URL = role_menu.url ;
                                            sessionStorage.setItem("URL" , URL);
                                        }else {
                                             URL = role_menu.children[0].url ;
                                             sessionStorage.setItem("URL" , URL);
                                        }
                                    }
                                    $(".el-menu-item").removeClass("is-active");
                                    $("a[data-url='"+this.$route.path+"']").parent("").parent("").addClass("is-active");
                                   _this.$router.push({path: sessionStorage.getItem("URL") });
                                
                                }
                            });
                        });
                    }else {
                        _this.$message.error(res.data.message);
                    }
                }).catch((err)=>{
                    _this.$message.error("服务器繁忙请稍后再试！");
                });
            }else {
                _this.$message.error("请输入正确的用户名和密码！");
            }
           
        },
        reset(){
            let _this = this;
            _this.$router.push({ name: 'Resetpassword'});
        }

    }
}
</script>
<style scoped>
    #login {
        width: 100%;
        height: 100%;
        position: relative;
    }
    .bg {
        width: 100%;
        height: 100%;
        position: absolute;
        font-size: 0;
    }
    .bg img {
        width: 100%;
        height: 100%;
    }
    .center {
        width: 700px;
        height: 400px;
        background-color: rgba(95,69,255, 0.1);
        box-shadow: 0px 13px 9px 0px 
            rgba(4, 0, 0, 0.26);
        border-radius: 10px;
        position: absolute;
        left: 50%;
        top: 47%;
        transform: translate(-50%,-50%);
        font-size: 0;
    }
    .center>div {
        display: inline-block;
        vertical-align: bottom;
        width: 50%;
        font-size: 14px; 
    }
    .imgs img{
        width: 100%;
    }
    .imgs {
        margin: auto;
        width: 300px;
        margin-top: 100px;
    }
    .right>div {
        margin: 0px 40px 0px 20px;
    }
    .right input {
        width: 100%;
        height: 40px;
        border: 0;
        outline: none;
        background: rgba(0,0,0,0);
        border-bottom: 1px solid #4b5377;
        color: #98a1c9;
        margin-top: 20px;
        font-size: 16px;
        padding-left: 10px;
    }
    .right input[type='button'] {
        border: 0;
        color: #fff;
        background-color: #6477c8;
	    border-radius: 6px;
    }
    h4 {
        font-size: 20px;
        font-weight: 400;
	    letter-spacing: 2px;
	    color: #e7ecff;
        text-align: center;
        margin-bottom: 20px;
    }
    ::-webkit-input-placeholder { /* WebKit browsers */
        color:   #98a1c9;
    }
    :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
        color:   #98a1c9;
    }
    ::-moz-placeholder { /* Mozilla Firefox 19+ */
        color:   #98a1c9;
    }
    :-ms-input-placeholder { /* Internet Explorer 10+ */
        color:   #98a1c9;
    }
    .forget {
        font-size: 12px;
        text-align: right;
        margin-top: 10px;
        color: #d3d5df;
        cursor: pointer;
    }
    .forget:active {
        opacity: 0.8;
    }
    .submit {
        letter-spacing: 2px;
    }
    .submit:active {
        opacity: 0.8;
        cursor: pointer;
    }
    .logos {
        height: 46px;
        width: 77%;
        margin: 20px auto 0px;
    }
    .logo_dxh:after {
        content: "" ;
        display: block;
        width: 1px;
        height: 80%;
        position: absolute;
        right: -12px;
        top: 50%;
        transform: translateY(-50%) ;
        background: #ccc;
    }  
    .logo_dxh {
        width: 122px;
        background: url("../assets/images/dxhlogin.png") no-repeat;
        background-size: 1005 100%;
        height: 100%;
        position: relative;
    }
    .logo_hiveface {
        width: 122px;
        background: url("../assets/images/hivefacelogo.png") no-repeat;
        background-size: 1005 100%;
        height: 100%;
    }
</style>

