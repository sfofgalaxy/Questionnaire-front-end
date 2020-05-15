<template>
  <el-button @click="test">
    测试post
  </el-button>
</template>

<script>
  import axios from 'axios';
    export default {
        name: "Test.vue",
        methods: {
            test: function () {
                let author = "me";
                axios.get('/api/test',{
                    params:{
                        username: author
                    },
                    headers:{
                        token:1234
                    }
                }).then((res) => {
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

</style>
