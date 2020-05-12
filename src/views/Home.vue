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
          <div>
            <Logo/>
            <h2>Welcome to My Questionnaire</h2>
            <br />
            <div class="btns">
              <el-button size="mini"><el-link href="../../static/设计文档.pdf" download="设计文档.pdf"><i class="el-icon-download"></i>设计文档下载</el-link></el-button>
              <el-button size="mini"><el-link href="../../static/实验报告.pdf" download="实验报告.pdf"><i class="el-icon-download"></i>实验报告下载</el-link></el-button>
            </div>
            <br /><br /><br />
          </div>
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
    }
</script>
<style>
   .el-header, .el-footer {
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
