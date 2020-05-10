<template>
    <div class="register-container">
        <Logo/>
        <el-form :model="registerData" :rules="rules"
         status-icon
         ref="register" 
         label-position="left" 
         label-width="0px" 
         class="register-page">
            <h3 class="title">My Questionnaire 注册</h3>
            <el-form-item prop="email">
                <el-input type="text" 
                    v-model="registerData.email" 
                    auto-complete="off" 
                    placeholder="邮箱"
                ></el-input>
            </el-form-item>
            <el-form-item prop="username">
                <el-input type="text" 
                    v-model="registerData.username" 
                    auto-complete="off" 
                    placeholder="用户名"
                ></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" 
                    v-model="registerData.password" 
                    auto-complete="off" 
                    placeholder="密码"
                ></el-input>
            </el-form-item>
            <el-link href="http://47.94.46.115/#/login">已有账号？点击登录</el-link>
            <br/>
            <br/>
            <el-form-item style="width:100%;">
                <el-button type="primary" style="width:100%;" @click="handleSubmit" :loading="logining">注册</el-button>
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
            registerData: {
                email:'',
                username: '',
                password: '',
            },
            rules: {
                email: [{required: true, message: '请输入邮箱', trigger: 'blur'}],
                username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
                password: [{required: true, message: '请输入密码', trigger: 'blur'}]
            },
            checked: false
        }
    },
    methods: {
        handleSubmit(event){
            this.$refs.register.validate((valid) => {
                if(valid){
                    //这里使用FormData用于后端springboot用@RequestParam()接受参数
                    //否则需要用@RequestBody
                    let param = new FormData();
                    param.append("email",this.registerData.email)
                    param.append("username",this.registerData.username);
                    param.append("password",this.registerData.password);
                    //这里axios需要使用vue对象，因此必须使用为匿名函数的箭头函数
                    //这样this就指向了vue，就能使用$cookies
                    axios.post('/api/user/register',param)
                    .then((res)=>{
                        let resData=res.data;
                        if(resData.state==true){
                            this.$cookies.set("token", resData.message);
                            alert("注册成功");
                            this.$router.push("/Home");
                            return true;
                        }
                        else{
                            alert("账号或密码错误");
                            return false;
                        }
                    }).catch((error)=> {
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
.register-container {
    text-align: center;
    width: 100%;
    height: 100%;
}
.register-page {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    margin: 30px auto;
    width: 350px;
    padding: 35px 35px 15px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
}
</style>