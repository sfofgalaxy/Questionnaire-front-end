<template>
  <el-container>
    <el-aside width="200px">
      <Navigator/>
    </el-aside>
    <el-container>
      <el-header style="font-size: 18px;color: #303133;">
        问卷调查网站
      </el-header>
      <el-divider></el-divider>
      <el-main>
        <el-form ref="post" :model="form" label-width="200px">
          <el-form-item required label="问卷名称">
            <el-input maxlength="50" v-model="form.title"></el-input>
          </el-form-item>
          <el-form-item label="问卷描述">
            <el-input maxlength="500" type="textarea" v-model="form.description"></el-input>
          </el-form-item>
          <el-form-item label="问卷类型">
            <el-radio-group v-model="form.mode">
              <el-radio label="0" name="mode" aria-checked="true" border>仅允许登录作答</el-radio>
              <el-radio label="1" name="mode" border>未登录可作答N次</el-radio>
              <el-radio label="2" name="mode" border>未登录每日可作答N次</el-radio>
            </el-radio-group>&nbsp;&nbsp;
            <el-input-number :min="1" v-model="form.fillNumber" v-show="form.mode!=='0'" ></el-input-number>
          </el-form-item>
          <el-form-item label="问卷发布后即可开始作答">
            <el-switch v-model="form.open"></el-switch>
          </el-form-item>
          <el-form-item style="font-weight: bold"
                        v-for="questionID in questionNum"
                        :label="'问题'+questionID">
            <br/>
            <el-divider></el-divider>
            <Question :ref="'question'+questionID"/>
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-plus" circle @click="addQuestion"></el-button>&nbsp;添加题目<br/><br/>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
          </el-form-item>
        </el-form>
      </el-main>
      <el-divider/>
      <el-footer>Design ©2020 by 彭子帆 3170105860@zju.edu.cn</el-footer>
    </el-container>
  </el-container>
</template>

<script>
    import Navigator from '@/components/Navigator';
    import Logo from '@/components/Logo';
    import Question from "../components/Question"
    import axios from 'axios';
    export default {
        components:{
            Question,
            Navigator,
            Logo
        },
        data(){
            return{
                form: {
                    title: '',
                    open: false,//默认打开的
                    mode: "0",
                    description: '',
                    fillNumber:0
                },
                questionNum:0
            }
        },
        name:"Post",
        methods: {
            addQuestion(){
              this.questionNum++;
            },
            onSubmit() {
                let num = this.questionNum;
                let question = [], option=[];
                for(let i = 0; i<num; i++){
                //动态绑定ref需要写成[`question${i+1}`]
                    let questionForm = this.$refs[`question${i+1}`][0].form;//问题类型和内容
                    let optionNum = this.$refs[`question${i+1}`][0].optionNum;//选项数量
                    let type = questionForm.type;
                    let content = questionForm.content;
                    question.push([content,type]);//分别代表content,type
                    if(type==='0'||type==='1'){
                        for(let j=0;j<optionNum;j++){
                            //第一个参数对应第几个问题（非数据库中第几个问题）第二个参数代表选项内容
                          option.push([i+1,questionForm.option[j]]);
                        }
                    }
                }
                let param = new FormData();
                let author=this.$cookies.get('username');
                let token = this.$cookies.get('token');
                param.append("author",author);
                param.append("title",this.form.title);
                param.append("description",this.form.description);
                param.append("mode",this.form.mode);
                param.append("fillnumber",this.form.fillNumber);
                param.append("open",this.form.open);
                param.append("question", question);
                param.append("option", option);
                param.append("username",author);
                //0和10分别代表模式和最大允许填写次数
                axios.post('/api/paper/post',param, {
                    headers:{
                        token:token
                    }
                })
                    .then((res) => {
                        let resData = res.data;
                        if(resData.state===true){
                            alert("问卷已发布在: http://47.94.46.115/#/questionnaire?paperid="+resData.message);
                            this.$router.push("/mypaper");
                        }else alert(resData.message);
                    }).catch((error) => {
                      alert(error+"登录已过期");
                      this.$router.push("/login");
                      return false;
                });
          }
        }
    }
</script>

<style scoped>
  .el-header, .el-footer {
    color: rgba(0,0,0,.65);
    text-align: center;
    padding: 24px 50px;
    border: 5px;
    font-size: 12px;
  }

  .el-aside {
    color: #333;
    text-align: center;
  }

  .el-main {
    color: #333;
    text-align: center;
    border-top: 1px solid #f5f6f7;
    border-bottom: 1px solid #f5f6f7;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

</style>
