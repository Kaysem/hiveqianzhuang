<template>
    <div id="password">
        <div class="bg">
            <img src="../assets/images/bg_login.jpg" alt="">
        </div>
        <div class="center">
            <!-- 输入邮箱或者手机号  S -->
            <div v-show="reset.isShow">
                <p class="tip">重置密码</p>
                <div class="reset_tip">
                    <input id="user_number" class="username" type="text" placeholder="请输入邮箱地址或手机号码" v-model="reset.emailOrphone">
                    <p class="reset_err" v-show="reset.error">该手机号、邮箱未注册，请重新输入</p>
                </div>
                <div class="img">
                    <input id="pic_codeimg" type="text" placeholder="请输入验证码" v-model="reset.verification" >
                    <img id="codeimg" src="" alt="验证码" @click="reset_codeimg()">
                </div>
                <div class="tonext">
                    <input type="button" value="下一步" @click="ToNext()">
                </div>
            </div>
            <!-- 输入邮箱或者手机号  E -->
            <!-- 邮箱通道 S -->
            <div v-show="email.isShow">
                <p class="tip">重置密码</p>
                <div class="email_tip">
                    <p>为保护账户安全，需要验证邮箱有效性</p>
                    <p>点击发送邮件按钮，将会发送一份有验证码的邮件</p>
                    <p>至邮箱<span class="email_num" v-text="email.number"></span> </p>
                </div>
                <div class="tonext">
                    <input type="button" value="发送邮件" @click="ToEmail()">
                    <p> <span class="change" @click="change()">其他方式验证</span> </p>
                </div>
            </div> 
            <!-- 邮箱通道 E -->
            <!-- 安全验证  公共模板  S -->
            <div v-show="verification.isShow">
                <p class="tip">安全验证</p>
                <div>
                    <p>请使用<span v-text="verification.kind"></span><span v-text="verification.number"></span>获得验证码</p>
                </div>
                <div class="safe">
                    <input type="text" v-model="verification.codeimg" :placeholder="verification.placeholder">
                    <input type="button" :value="verification.send" :disabled="verification.isDisabled" @click="sendAgain()">
                </div>

                <div class="tonext">
                    <input type="button" value="确定" @click="sure()">
                    <p> <span class="change" @click="change()">其他方式验证</span> </p>
                </div>
            </div>
            <!-- 安全验证  公共模板  E -->

            <!-- 新密码 S -->
            <div v-show="newpassword.isShow">
                <p class="tip">设置新密码</p>
                <input type="text" placeholder="请输入密码" v-model="newpassword.password">
                <input type="text" placeholder="请再次输入新密码" v-model="newpassword.againpassword">
                <p class="password_tip">密码长度8~16位，数字、字母、字符至少包含两种</p>
                <div class="tonext">
                    <input type="button" value="提交" @click="submit()">
                </div>
            </div>
            <!-- 新密码 E -->
            
        </div>



    </div>
  
</template>
<script>
export default {
    name: "password",
    data(){
        return {
            info : {},
            type: "",
            reset: {
                isShow: true,
                emailOrphone:'',  //手机号或者邮箱
                verification: '', // 验证码
                error: false, //错误提示
                // isDisabled: true,
                codeimg_key: "", //验证码随机数
            },
            email: {
                id: "",
                isShow: false,
                number: "",
            },
            //公共验证模板
            verification: {
                isShow: false,
                kind: "", //验证通道 ： 安全邮箱  手机
                number: "", 
                codeimg:"",
                placeholder: "", // 提示： 邮箱 手机
                send: "获取验证码", 
                isDisabled: false,
                timeinterval: {}
            },
            newpassword: {
                isShow: false,
                password: "",
                againpassword: "",
            }
        }
    },
    mounted: function(){
        let _this = this;
        _this.reset_codeimg();
        
    },
    methods:{
        //生成验证码
        reset_codeimg(){
            let _this = this;
            let url =_this.$url.getVerify +'?key='+Math.random();
            $("#codeimg").attr('src', url);
            _this.reset.codeimg_key = url.substring((url.indexOf("=")+1) , url.length);
        },
        ToNext(){
            let _this = this;
            let json = {"checkCode":   _this.reset.verification , "key" : _this.reset.codeimg_key } ;
            let formdata = _this.$config.formData(json) ; 
            // 判断验证码
            _this.$axios.post( _this.$url.checkVerify , formdata ).then((res)=>{ 
                if( res.data == true ){
                            // 判断邮箱手机号
                            var phone_Reg = /^1[34578][0-9]{9}/;
                            var email_Reg = /[a-zA-Z0-9]{1,10}@[a-zA-Z0-9]{1,5}\.[a-zA-Z0-9]{1,5}/;
                            if( !phone_Reg.test(_this.reset.emailOrphone) && !email_Reg.test(_this.reset.emailOrphone )){
                                _this.$message.error("请输入有效的邮箱地址或手机号！");
                            }else {
                                let json ;
                                let url ;
                                if( phone_Reg.test(_this.reset.emailOrphone) && _this.reset.emailOrphone.length === 11 ){
                                    //手机号
                                    _this.type = "手机";
                                    json =  {data: JSON.stringify({ "phonecode": _this.reset.emailOrphone })}
                                    url = _this.$url.phonejubge ;                                    
                                      
                                }else if( email_Reg.test(_this.reset.emailOrphone) === true ){
                                    //邮箱
                                    json =  {data: JSON.stringify({ "mailbox": _this.reset.emailOrphone })}
                                    url = _this.$url.emailjubge ;
                                    _this.type = "邮箱";

                                }else{
                                    alert("请填写正确格式信息！");
                                    _this.reset.error = true;
                                }
                                let formdata = _this.$config.formData(json) ; 
                                _this.$axios.post( url , formdata).then((res)=>{ 
                                    if(res.data.infocode == 1){
                                        if(_this.type == "邮箱"){
                                            _this.email.id = res.data.id;
                                           _this.reset.isShow = false;
                                            _this.email.isShow = true; 
                                            _this.verification.isShow = false;
                                            _this.reset.error = false;;
                                            _this.verification.kind = "安全邮箱" ;
                                            _this.email.number = _this.reset.emailOrphone ;
                                            _this.verification.number = _this.reset.emailOrphone ;
                                            _this.verification.placeholder = "请输入邮箱验证码" ;
                                        }else if(_this.type == "手机"){
                                            _this.email.id = res.data.id;
                                            _this.reset.isShow = false;
                                            _this.email.isShow = false;
                                            _this.verification.isShow = true;
                                            _this.reset.error = false;
                                            _this.verification.kind = "手机" ;
                                            _this.verification.number = _this.reset.emailOrphone ;
                                            _this.verification.placeholder = "请输入手机验证码" ;
                                        }else {
                                            _this.reset.error = true;
                                        }
                                    }else {
                                        _this.$message.error(res.data.message);
                                    }
                                }).catch((err)=>{
                                });
                            }
                }else {
                    _this.$message.error("请输入正确验证码");
                    $("#pic_codeimg").focus();
                    // _this.reset.isDisabled = true;
                }
            });
         
        },
        change(){
            let _this = this;
            _this.reset.isShow = true;
            _this.email.isShow = false;
            _this.verification.isShow = false;  
        },
        ToEmail(){
            let _this = this;     
            let json =  { "id":_this.email.id , "sendto" : _this.reset.emailOrphone } ;
            let formdata = _this.$config.formData(json) ; 
            _this.$axios.post(_this.$url.getsendemail ,formdata ).then((res)=>{
                if(res.data.infocode == 1){
                    _this.email.isShow = false;
                    _this.verification.isShow = true; 
                }else {
                    _this.$message.error(res.data.data);
                }
            });
            
        },
        ToPhone(){
             let _this = this;  
            let json =  { "id":_this.email.id , "tel" : _this.reset.emailOrphone } ;
            let formdata = _this.$config.formData(json) ; 
            _this.$axios.post(_this.$url.getsendmoblie ,formdata ).then((res)=>{
                if(res.data.infocode == 1){
                    // _this.email.isShow = false;
                    _this.verification.isShow = true; 
                }else {
                    _this.$message.error(res.data.data);
                }
            });
        },
        query(){
            let _this = this;
             let json =  { "id":_this.email.id }
            let formdata = _this.$config.formData(json) ; 
             _this.info = {};
            _this.$axios.post( _this.$url.user_query , formdata).then((res)=>{
                _this.info = res.data ;
            })
        },
        sure(){
            let _this = this;
            let json ;
            let url ;
            if( _this.type == "手机"){
                json =  { data: JSON.stringify( {"message_code" : _this.verification.codeimg} ) };
                url = _this.$url.phonecode ;
            }else if(_this.type == "邮箱"){
                json =  { data: JSON.stringify( {"email_code" : _this.verification.codeimg} ) };
                url = _this.$url.emailcode ;
            }
            let formdata = _this.$config.formData(json) ; 
            _this.$axios.post(url, formdata ).then((res)=>{
                if(res.data.infocode == 1){
                    _this.newpassword.isShow = true;
                    _this.verification.isShow = false;
                    clearInterval(_this.timeinterval);
                    _this.query();
                }else {
                    _this.$message.error(res.data.message);
                }
            });

        },
        sendAgain(){
            let _this = this;
            if(_this.type == "邮箱"){
                _this.ToEmail();
            }else if(_this.type == "手机"){
                _this.ToPhone();
            }else {

            }
            _this.verification.isDisabled = true ;
            _this.verification.send = "重新发送(60s)";
            let i = 1 ;
            let time = 60;
            _this.timeinterval = setInterval(function(){
                _this.verification.send = "重新发送("+ (--time) +"s)";
                if(time <= 0){
                    clearInterval(_this.timeinterval);
                    _this.verification.isDisabled = false ;
                    _this.verification.send = "获取验证码" ;
                }
            },1000);
        },
        submit(){
            let _this = this;
            if( _this.newpassword.password != "" && _this.newpassword.againpassword != "" ){
                if( _this.newpassword.password === _this.newpassword.againpassword){
                    _this.info.pass_word = _this.newpassword.password ;
                     let  json = _this.info ;
                    let formdata = _this.$config.formData(json); 
                    _this.$axios.post( _this.$url.User_upt , formdata).then((res)=>{
                        if(res.data.infocode == 1){
                            _this.$message.success(res.data.message);
                            _this.$router.push({ name: 'Login'});
                        }else {
                            _this.$message.error(res.data.message);
                        }
                    });
                }else {
                    _this.$message.error("请确认两次密码是否一致！");
                }
            }else {
                _this.$message.error("请输入密码！");
            }
        }
    },
    watch: {
        'verification.isShow': {
            handler: function(val,oldval){
                let _this = this;
                if(val == true){
                    if(_this.type == "邮箱"){
                        _this.verification.send = "重新发送(60s)"
                        _this.verification.isDisabled = true ;
                        let i = 1 ;
                        let time = 60;
                        _this.timeinterval = setInterval(function(){
                            _this.verification.send = "重新发送("+ (--time) +"s)";
                            if(time <= 0){
                                clearInterval(_this.timeinterval);
                                _this.verification.isDisabled = false ;
                                _this.verification.send = "获取验证码" ;
                            }
                        },1000);

                    }else {
                        _this.verification.send = "获取验证码"
                        _this.verification.isDisabled = false ;
                    }
                }else {
                    clearInterval(_this.timeinterval);
                }
            },
            deep: true
        },
        'reset.error': {
            handler: function(val,oldval) {
                if(val == true){
                    $(".reset_tip>input").addClass("reset_err_input");
                }else {
                     $(".reset_tip>input").removeClass("reset_err_input");
                }
            },
            deep: true,
        }
    }
}
</script>
<style scoped>
    #password {
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
        text-align: center;
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
    input {
        height: 40px;
        border: 0;
        outline: none;
        background: rgba(0,0,0,0);
        border-bottom: 1px solid #4b5377;
        color: #98a1c9;
        font-size: 14px;
        display: block;
        margin:25px auto 0;
        width: 50%;
        font-size: 16px;
        padding-left: 10px;
    }
    input[type='button'] {
        border: 0;
        color: #fff;
        background-color: #6477c8;
	    border-radius: 6px;
        width: 100%;
        padding-left: 0;
    }
    .tip {
        font-size: 20px;
        letter-spacing: 2px;
        color: #e7ecff;
        margin-top: 60px;
        margin-bottom: 30px;
    }
    .img {
        position: relative;
    }
    .center img {
        width: 70px;
        height: 35px;
        position: absolute;
        top: -10px;
        right: 25%;
        border:1px solid #ccc;
    }
    .tonext {
        position: absolute;
        width: 50%;
        top: 250px;
        /* bottom: 80px; */
        left: 50%;
        transform: translateX(-50%);
    }
    input[type='button']:active {
        opacity: 0.8;
    }
    .reset_tip {
        position: relative;
    }
    .reset_err_input {
        border-bottom: 1px solid #f25f38;
    }
    .reset_err {
        position: absolute;
        color: #f25f38;
        text-align: center;
        font-size: 14px;
        margin-left: 190px;
    }
    .email_tip>p {
        font-size: 16px;
    }
    .email_tip>p:first-child {
        margin-bottom: 20px;
    }
    .email_tip>p:nth-child(2) {
        margin-bottom: 10px;
    }
    .email_num {
        color: #57beff;
    }
    .tonext>p {
        text-align: center;
        margin-top: 20px;
    }
    .tonext>p>span {
        font-size: 14px;
        border-bottom: 1px solid #cad2f5;
        color: #cad2f5;
        cursor: pointer;
    }
    .safe {
        margin-top: 10px;
    }
    .safe input {
        display: inline-block;
    }
    .safe input:first-child {
        width: 30%;
    }
    .safe input:last-child {
        width: 15%;
        margin-left: 48px;
        font-size: 14px;
        text-align: center;
    }
    /* input:last-child[disabled=":disabled"]{
    } */
    input[disabled="disabled"] {
	    background-color: #202641;
	    color: #9fa5bc;
        cursor: not-allowed;
    }
    .password_tip {
        margin-left: 190px;
        text-align: left;
        color: #9fa5bc;
        font-size: 12px;
    }
</style>

