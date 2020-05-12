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
        制作并发布问卷
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
        name:"Make.vue",
    }
</script>

<style scoped>

</style>
