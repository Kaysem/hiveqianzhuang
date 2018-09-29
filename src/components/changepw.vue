<template>
    <div id="changepw">
        <div class="bg">
            <div class="step">
                <el-steps :space="300" :active="step.num" align-center>
                    <el-step title="身份验证"></el-step>
                    <el-step title="修改登录密码"></el-step>
                    <el-step title="完成"></el-step>
                </el-steps>
            </div>
            <div class="content">
                <!-- 第一步 S -->
                <div class="readly_kind" v-show="kind.isShow">
                    <el-row>
                        <el-col :span="8" class="right">
                            已验证<span v-text="kind.name"></span>：
                        </el-col>
                        <el-col :span="8">
                            <span v-text="kind.number"></span>
                        </el-col>
                        <el-col :span="8" class="right" >
                            <span @click="changeKind()" class="c_kind">使用<span v-text="kind.changename"></span>验证</span>    
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8" class="right">
                            <span v-text="kind.name"></span>验证码：
                        </el-col>
                        <el-col :span="16" class="positions">
                            <input type="text" class="write_input" v-model="kind.phoneyzm">
                            <input class="send" type="button" :value="kind.send" :disabled="kind.isdisabled" @click="toYzm()">
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8" class="right">
                            验证码：
                        </el-col>
                        <el-col :span="16" class="positions">
                            <input type="text" class="write_input" v-model="kind.yzm">
                            <img id="codeimg" class="send" src="" alt="验证码" @click="reset_codeimg()">
                        </el-col>
                    </el-row>
                    <input class="change" type="button" value="提交" @click="tochange()">
                </div>
                <!-- 第一步 E -->
                <!-- 第二部 S -->
                <div v-show="change.isShow">
                    <el-row>
                        <el-col :span="8" class="right">
                            新密码：
                        </el-col>
                        <el-col :span="16" class="positions">
                            <input type="text" class="write_input" v-model="change.password">
                        </el-col>
                        
                    </el-row>
                    <el-row>
                        <el-col :span="8" class="right">
                            确认新密码：
                        </el-col>
                        <el-col :span="16" class="positions">
                            <input type="text" class="write_input" v-model="change.againpassword">
                        </el-col>
                    </el-row>
                    <!-- <el-row>
                        <el-col :span="8" class="right">
                            验证码：
                        </el-col>
                        <el-col :span="16" class="positions">
                            <input type="text" class="write_input" v-model="kind.yzm">
                            <img class="send" src="../assets/images/yzm.png" alt="验证码">
                        </el-col>
                    </el-row> -->
                    <input class="change" type="button" value="提交" @click="tofinish()">
                </div>
                <!-- 第二部 E -->
                <!-- 第三部 S -->
                <div v-show="finish.isShow" class="finish_content">
                    <p><i class="ready_sure"></i>密码修改成功，系统将为您登录，请牢记您的新密码</p>
                    <p>系统将在<i v-text="finish.num"></i>秒后自动跳转至登录页面，您可以选择直接<span class="tologin" @click="toLogin()">返回登录</span></p>
                </div>
                <!-- 第三部 E -->
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "changepw",
    data(){
        return {
            userinfo: {},
            step:{
                num: 1,
            },
            kind: {
                isShow: true,
                //    type: '手机',
                name: '手机号',
                changename: '邮箱',
                number: '',
                send: '获取验证码',
                phoneyzm: '',
                // yzm: '',
                isdisabled: false,
                interval:{},
                codeimg_key: "", //验证码随机数
            },
            change:{
                isShow: false,
                password: '',
                againpassword: '',
            },
            finish: {
                isShow: false,
                num: 3,
                interval: {},
            }
        }
    },
    mounted: function(){
        let _this = this;
        _this.userinfo = JSON.parse(sessionStorage.getItem("userinfo"));
        _this.step.num = 1;
        _this.reset_codeimg();

        _this.kind.number = _this.userinfo.phone_num ;
        
    },
    methods:{
         //生成验证码
        reset_codeimg(){
            let _this = this;
            let url =_this.$url.getVerify +'?key='+Math.random();
            $("#codeimg").attr('src', url);
            _this.kind.codeimg_key = url.substring((url.indexOf("=")+1) , url.length);
        },
        email_YZ(){
            let _this = this;
            let json =  { data: JSON.stringify( {"email_code" :  _this.kind.phoneyzm } ) };
            let formdata = _this.$config.formData(json) ; 
            _this.$axios.post(_this.$url.emailcode , formdata ).then((res)=>{
                if(res.data.infocode == 1){
                    _this.step.num = 2;
                    _this.kind.isShow = false;
                    _this.change.isShow = true;
                    clearInterval(_this.kind.interval);
                    _this.kind.send = "获取验证码";
                }else {
                    _this.$message.error(res.data.message);
                }
            })
        },
        phone_YZ(){
            let _this = this;
            let json =  { data: JSON.stringify( {"message_code" :  _this.kind.phoneyzm } ) };
            let formdata = _this.$config.formData(json) ; 
            _this.$axios.post(_this.$url.phonecode , formdata ).then((res)=>{
                if(res.data.infocode == 1){
                    _this.step.num = 2;
                    _this.kind.isShow = false;
                    _this.change.isShow = true;
                    clearInterval(_this.kind.interval);
                    _this.kind.send = "获取验证码";
                }else {
                    _this.$message.error(res.data.message);
                }
            })
        },
        tochange(){
            let _this = this;
            if( _this.kind.number != "" && _this.kind.phoneyzm != "" && _this.kind.yzm){


                let json = {"checkCode":  _this.kind.yzm , "key" : _this.kind.codeimg_key } ;
                let formdata = _this.$config.formData(json) ; 
                // 判断验证码
                _this.$axios.post( _this.$url.checkVerify , formdata ).then((res)=>{ 
                    if( res.data == true ){ 
                        if(_this.kind.name == "手机号"){

                        }else {
                            _this.email_YZ();
                        }
                      

                    }else {
                        _this.$message.error("请输入正确验证码");
                    }
                });
                


            }else {
                _this.$message.error("请输入完整信息！")
            }
        },
        toYzm(){
            let _this = this;
            _this.kind.send = "重新发送(60s)"
            _this.kind.isdisabled = true ;
            let i = 1 ;
            let time = 60;
            _this.kind.interval = setInterval(function(){
                _this.kind.send = "重新发送("+ (--time) +"s)";
                if(time <= 0){
                    clearInterval(_this.kind.interval);
                    _this.kind.isdisabled = false ;
                    _this.kind.send = "获取验证码" ;
                }
            },1000);

            let url ;
            let json ;
            if ( _this.kind.name == "手机号"){
                url = _this.$url.getsendmoblie ;
                json =  { "id":_this.userinfo.id , "tel" : _this.kind.number } 
            }else {
                url = _this.$url.getsendemail ;
                json =  { "id":_this.userinfo.id , "sendto" : _this.kind.number }
            }
            let formdata = _this.$config.formData(json) ; 
            _this.$axios.post( url ,formdata ).then((res)=>{
                if(res.data.infocode == 1){
                    //发送验证码成功
                }else {
                    _this.$message.error(res.data.data);
                }
            });


        },
        changeKind(){
            let _this = this;
            let temp = _this.kind.name;
            _this.kind.name = _this.kind.changename ;
            _this.kind.changename = temp;
            _this.kind.send = "获取验证码";
            _this.kind.isdisabled = false ;
            clearInterval(_this.kind.interval);
            if ( _this.kind.name == "手机号"){
                _this.kind.number = _this.userinfo.phone_num ;
            }else {
                _this.kind.number = _this.userinfo.mailbox ;
            }
        },
        tofinish(){
            let _this = this;
            if( _this.change.password != "" && _this.change.againpassword != "" ){
                if( _this.change.password === _this.change.againpassword){
                    _this.userinfo.pass_word = _this.change.password ;
                    let  json = _this.userinfo ;
                    let formdata = _this.$config.formData(json); 
                    _this.$axios.post( _this.$url.User_upt , formdata).then((res)=>{
                        if(res.data.infocode == 1){

                            _this.$message.success(res.data.message);

                            _this.change.isShow = false;
                            _this.finish.isShow = true;

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
           
        },
        toLogin(){
            let _this = this;
            clearInterval(_this.finish.interval);
            sessionStorage.clear();
            _this.$router.push({ name: 'Login'});

        }
    },
    watch: {
        'finish.isShow': {
            handler: function(val,oldval){
                let _this = this;
                if(val == true){
                    _this.step.num = 3;
                    let time = 3;
                    _this.finish.interval = setInterval(function(){
                        _this.finish.num = (--time) ;
                        if(_this.finish.num <= 0){
                            clearInterval(_this.finish.interval);
                              sessionStorage.clear();
                            _this.$router.push({ name: 'Login'});
                            _this.finish.isShow = false;
                            _this.step.num = 1;
                            _this.finish.num = 3 ;
                        }
                    },1000);
                }else {
                    _this.step.num = 1;
                    _this.finish.num = 3 ;
                    clearInterval(_this.finish.interval);
                    _this.finish.isShow = false;
                    _this.kind.isShow = true;
                }
            },
            deep: true
        },
        
    }
}
</script>
<style scoped>
    #changepw {
        height: 100% ;
        text-align: left;
        overflow: hidden;
        background: rgba(255,255,255,0.1);
        border-radius:10px;
        position: relative;
    }
    .step {
        /* margin-top: 100px;
        margin-left: 100px; */
        position: absolute;
        left: 50%;
        top: 100px;
        transform: translateX(-50%);
    }
    #changepw .el-steps {
        margin: auto;
    }
    #changepw .el-step.is-horizontal {
        width: 300px !important; 
    }
    #changepw .step  .el-step:last-child{
        width: 50px !important; 
    }
    .content>div {
        width: 400px;
        margin: auto;
        position: absolute;
        top: 30%;
        left : 50%;
        transform: translateX(-50%);
        color: #9598ae;
    }
    .right {
        text-align: right;
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
        font-size: 16px;
        padding-left: 10px;
    }
    input[type='button'] {
        border: 0;
        color: #fff;
        background-color: #353d65;
	    border-radius: 6px;
        padding-left: 0;
    }
    #changepw .el-col-8 {
        line-height: 40px;
    }
    .positions {
        position: relative;
    }
    .positions .write_input {
        width: 100%;
    }
    .send {
        position: absolute;
        right: 0; 
        bottom: 5px;
        width: 100px;
    }
    .content>div>div {
        margin-bottom: 40px;
    }
    .content>div .change {
        width: 200px;
        background-color: #6477c8;
	    border-radius: 6px;
        margin: auto;
    }
    input[disabled="disabled"] {
	    background-color: #202641;
	    color: #9fa5bc;
    }
    .c_kind {
        color: #4c9ff8;
    }
    input:active {
        opacity: 0.8;
    }
    .content .finish_content {
        /* width: 460px;
        position: relative;
        margin:80px 0px 0px 0px; */
    }
    .finish_content>:first-child {
        font-size: 20px;
        margin: 20px 0;
    }
    .finish_content>:last-child {
        font-size: 16px;
    }
    .ready_sure {
        width: 30px;
        height: 30px;
        background: pink;
        position: absolute;
        left: -36px;
        background: url("../assets/images/finish.png") no-repeat ;
        background-size: 100% 100%;
    }
    .tologin {
        color: #4c9ff8;
        font-size: 14px;
        cursor: pointer;
    }
    
</style>

