<template>
    <div class="register-container">
      <el-alert v-if="logining"
                :title="loginMessage"
                :type="success"
                center
                show-icon>
      </el-alert>
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
          <el-form-item prop="confirmPassword">
            <el-input type="password"
                      v-model="registerData.confirmPassword"
                      auto-complete="off"
                      placeholder="请确认密码"
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
        let validateConfirm= (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.registerData.password) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        var validateEmail = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请正确填写邮箱'));
            } else {
                if (value !== '') {
                    var reg=/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
                    if(!reg.test(value)){
                        callback(new Error('请输入有效的邮箱'));
                    }
                }
                callback();
            }
        };
        return {
            logining: false,
            registerData: {
                email:'',
                username: '',
                password: '',
                confirmPassword:'',
            },
            rules: {
                email: [{required: true, message: '请输入邮箱', trigger: 'blur'},{validator:validateEmail,trigger: 'blur',required: true}],
                username: [{required: true, message: '请输入用户名', trigger: 'blur'},{ min: 6, max: 20, message: '请输入6-20位字符', trigger: 'blur' }],
                password: [{required: true, message: '请输入密码', trigger: 'blur'},{ min: 6, max: 20, message: '请输入6-20位字符', trigger: 'blur' }],
                confirmPassword:[{required:true, message:'请确认密码', trigger:'blur'},{validator:validateConfirm, trigger: 'blur', required: true}],
            },
            checked: false,
            loginMessage:"",
            success:""
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
                        this.loginMessage=resData.message;
                        this.logining=true;
                        if(resData.state===true){
                            this.success="success";
                            this.$cookies.set("token", resData.message);
                            this.$cookies.set("username",resData.username);
                            this.$router.push("/Home");
                            return true;
                        }
                        else{
                            this.success="error";
                            return false;
                        }
                    }).catch((error)=> {
                        this.logining=true;
                        this.success="error";
                        this.loginMessage= error;
                        return false;
                    });
                }else{
                    this.success="error";
                    this.logining=true;
                    this.loginMessage='提交出错';
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
