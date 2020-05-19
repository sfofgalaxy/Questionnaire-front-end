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
        制作并发布问卷
      </el-main>
      <el-divider></el-divider>
      <el-footer>Design ©2020 by 彭子帆 3170105860@zju.edu.cn</el-footer>
    </el-container>
  </el-container>
</template>

<script>
    import Navigator from '@/components/Navigator';
    import Logo from '@/components/Logo';
    export default {
        components:{
            Navigator,
            Logo
        },
        name:"Post",
        methods: {
            post() {
                let param = new FormData();
                let question = [
                    [0,1,0],//分别代表parentID(0代表无parentID)、parentID中的第几个option，type
                    [0,0,1],
                    [0,0,2],
                    [1,0,2],
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
