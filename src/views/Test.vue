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
                let question = [
                  [0,0],//分别代表parentID(0代表无parentID)和type
                    [0,1],
                    [0,2],
                    [1,2],
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

</style>
