<template>
  <el-pagination
    small
    layout="prev, pager, next"
    :total="50">
  </el-pagination>
</template>

<script>
    export default {
        name: "Result"
    }
</script>
//从我的问卷跳转过来查看结果paperid数据如下取出：this.$route.params.paperid
<style scoped>

</style>
