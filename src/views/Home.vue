<template>
    <el-container>
      <el-aside width="200px">
        <Navigator/>
      </el-aside>
      <el-container>
        <el-main>
          <h2>Welcome to My Questionnaire</h2>
<!--          <div class="btns">-->
<!--            <el-link target="_blank" href="@/assets/设计文档.pdf" :underline="false" style="margin-left:15px">-->
<!--              <el-button size="mini" type="warning">设计文档</el-button>-->
<!--            </el-link>-->
<!--          </div>-->
        </el-main>
        <el-footer>Design ©2020 by 彭子帆 3170105860@zju.edu.cn</el-footer>
      </el-container>
    </el-container>
</template>
<script>
    import Navigator from '@/components/Navigator';
    export default {
        components:{
            Navigator
        }
    }
</script>
<style>
   .el-footer {
    color: rgba(0,0,0,.65);
    text-align: center;
    padding: 24px 50px;
    font-size: 12px;
  }

  .el-aside {
    color: #333;
    text-align: center;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 500px;
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
