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
        <el-form ref="form" :model="form" label-width="200px">
          <el-form-item label="问卷名称">
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
            <el-input-number v-model="form.fillNumber" v-show="form.mode!=='0'" ></el-input-number>
          </el-form-item>
          <el-form-item label="问卷发布后即可开始作答">
            <el-switch v-model="form.open"></el-switch>
          </el-form-item>
          <el-form-item style="font-weight: bold"
                        v-for="questionID in questionNum"
                        :label="'问题'+questionID"
                        :ref="'question'+questionID">
            <br/>
            <el-divider></el-divider>
            <Question />
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
    import Question from "../components/Question";
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
                let i;
                let param = new FormData();
                let num = this.questionNum;
                // for(i = 0; i<num; i++){
                //
                //     this.$refs.('question'+i).
                // }
                let question = [
                    ["content1",0],//分别代表content,type
                    ["content2",1],
                    ["content3",2],
                    ["content4",2],
                ];
                let option = [
                    [1,"第一个问题的选项1"],//第一个参数对应第几个问题（非数据库中第几个问题）
                    [1,"第一个问题的选项2"],
                    [2,"第二个问题的选项1"],
                ];
                let author="me";
                let title="hello";
                let description="description";
                param.append("author",author);
                param.append("title",title);
                param.append("description",description);
                param.append("mode",0);
                param.append("fillnumber",10);
                param.append("open",true);
                param.append("question", question);
                param.append("option", option);
                //0和10分别代表模式和最大允许填写次数
                axios.post('/api/paper/test', param)
                    .then((res) => {
                        console.log(res);
                    }).catch((error) => {
                    console.log(error);
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
