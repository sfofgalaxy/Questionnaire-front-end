<template>
    <div class="login-container">
        <Logo/>
        <el-form :model="loginData" :rules="rules"
         status-icon
         ref="login"
         label-position="left"
         label-width="0px"
         class="login-page">
            <h3 class="title">My Questionnaire 登录</h3>
            <el-form-item prop="username">
                <el-input type="text"
                    v-model="loginData.username"
                    auto-complete="off"
                    placeholder="用户名"
                ></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password"
                    v-model="loginData.password"
                    auto-complete="off"
                    placeholder="密码"
                ></el-input>
            </el-form-item>
            <el-checkbox
                v-model="checked"
                class="rememberme"
            >记住密码</el-checkbox><br/>
            <el-link href="http://47.94.46.115/#/register" target="_blank">点击注册</el-link>
            <br/>
            <br/>
            <el-form-item style="width:100%;">
                <el-button type="primary" style="width:100%;" @click="handleSubmit" :loading="logining">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import axios from 'axios'
import Logo from '@/components/Logo'
export default {
    data(){
        return {
            logining: false,
            loginData: {
                username: '',
                password: '',
            },
            rules: {
                username: [{required: true, message: '请输入用户名', trigger: 'blur'},{ min: 6, max: 20, message: '请输入6-20位字符', trigger: 'blur' }],
                password: [{required: true, message: '请输入密码', trigger: 'blur'},{ min: 6, max: 20, message: '请输入6-20位字符', trigger: 'blur' }]
            },
            checked: false
        }
    },
    methods: {
        handleSubmit(event){
            this.$refs.login.validate((valid) => {
                if(valid){
                    //这里使用FormData用于后端springboot用@RequestParam()接受参数
                    //否则需要用@RequestBody
                    let param = new FormData();
                    param.append("username",this.loginData.username);
                    param.append("password",this.loginData.password);
                    //这里axios需要使用vue对象，因此必须使用为匿名函数的箭头函数
                    //这样this就指向了vue，就能使用$cookies
                    axios.post('/api/user/login',param)
                    .then((res)=>{
                        let resData = res.data;
                        if(resData.state==true){
                            this.$cookies.set("token", resData.message);
                            this.$cookies.set("username",resData.username);
                            this.$router.push("/Home");
                            return true;
                        }
                        else{
                            alert(resData.message);
                            return false;
                        }
                    }).catch((error)=>{
                        console.log(error);
                        return false;
                    });
                }else{
                    console.log('提交出错');
                    return false;
                }
            })
        }
    },
    components:{
        Logo,
    },
};
</script>

<style scoped>
.login-container {
    text-align: center;
    width: 100%;
    height: 100%;
}
.login-page {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    margin: 30px auto;
    width: 350px;
    padding: 35px 35px 15px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
}
label.el-checkbox.rememberme {
    margin: 0px 0px 15px;
    text-align: left;
}
</style>
