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
                let param = new FormData();
                let data = [
                  [1,1,1,1],
                  [2,1,1,1],
                  [3,1,1,1],
                  [4,1,1,1]
            ];
                param.append("question", data);
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

</style>
