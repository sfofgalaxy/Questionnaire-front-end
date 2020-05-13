<template>
  <el-container>
    <el-aside width="200px">
      <Navigator/>
    </el-aside>
    <el-container>
      <el-header style="font-size: 18px;color: #303133;">
        问卷调查网站
      </el-header>
      <el-main>
        我的问卷网站
      </el-main>
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
        name: "MyPaper.vue",
        methods: {
            query(){
                let author = "me";
                let token = this.$cookies.get("token");
                axios.get('/api/paper/myquestionnaire',{
                    params:{
                        username: author
                    },
                    headers:{
                        token: token
                    }
                }).then((res) => {
                    let myPapers = res.data;
                    for(let i =0;i<myPapers.length;i++){
                      //do something
                    }
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
