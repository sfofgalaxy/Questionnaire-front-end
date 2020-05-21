<template>
  <div class="modifyPwd-container">
    <Logo/>
    <el-form :model="modifyPwdData" :rules="rules"
             status-icon
             ref="modifyPwd"
             label-position="left"
             label-width="0px"
             class="modifyPwd-page">
      <h3 class="title">My Questionnaire 修改密码</h3>
      <el-form-item prop="username">
        <el-input type="text"
                  v-model="modifyPwdData.username"
                  auto-complete="off"
                  placeholder="用户名"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password"
                  v-model="modifyPwdData.password"
                  auto-complete="off"
                  placeholder="密码"
        ></el-input>
      </el-form-item>
      <el-form-item prop="confirmPassword">
        <el-input type="password"
                  v-model="modifyPwdData.confirmPassword"
                  auto-complete="off"
                  placeholder="请确认密码"
        ></el-input>
      </el-form-item>
      <br/>
      <br/>
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;" @click="handleSubmit" :loading="logining">确认修改</el-button>
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
                } else if (value !== this.modifyPwdData.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                logining: false,
                modifyPwdData: {
                    email:'',
                    username: '',
                    password: '',
                    confirmPassword:'',
                },
                rules: {
                    username: [{required: true, message: '请输入用户名', trigger: 'blur'},{ min: 6, max: 20, message: '请输入6-20位字符', trigger: 'blur' }],
                    password: [{required: true, message: '请输入密码', trigger: 'blur'},{ min: 6, max: 20, message: '请输入6-20位字符', trigger: 'blur' }],
                    confirmPassword:[{required:true, message:'请确认密码', trigger:'blur'},{validator:validateConfirm, trigger: 'blur', required: true}],
                },
                checked: false
            }
        },
        methods: {
            handleSubmit(event){
                this.$refs.modifyPwd.validate((valid) => {
                    if(valid){
                        //这里使用FormData用于后端springboot用@RequestParam()接受参数
                        //否则需要用@RequestBody
                        let param = new FormData();
                        param.append("email",this.modifyPwdData.email)
                        param.append("username",this.modifyPwdData.username);
                        param.append("password",this.modifyPwdData.password);
                        //这里axios需要使用vue对象，因此必须使用为匿名函数的箭头函数
                        //这样this就指向了vue，就能使用$cookies
                        axios.put('/api/user/modifypwd',param,{
                            headers: {
                                'token': this.$cookies.get("token")
                            }
                        }).then((res)=>{
                            let resData=res.data;
                            if(resData.state===true){
                                this.$cookies.set("token", resData.message);
                                this.$cookies.set("username",resData.username);
                                alert("修改成功");
                                this.$router.push("/Home");
                                return true;
                            }
                            else{
                                alert(resData.message);
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
  .modifyPwd-container {
    text-align: center;
    width: 100%;
    height: 100%;
  }
  .modifyPwd-page {
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
