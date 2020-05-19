<template>
  <el-container>
    <el-aside width="200px">
      <Navigator/>
    </el-aside>
    <el-container>
  <el-pagination
    small
    layout="prev, pager, next"
    :total="50">
  </el-pagination>
</template>

<script>
  import Navigator from "../components/Navigator";
  import axios from "axios";
    export default {
        name: "Result",
        components:{
            Navigator,
        },
        methods:{

        },
        data(){
            return{
                questionList:[]
            }
        },
        mounted() {
            let username = this.$cookies.get("username");
            let token = this.$cookies.get("token");
            axios.get("/api/result/"+this.$route.params.paperid,{
                params:{
                    username:username
                },
                headers:{
                    token:token
                }
            })
                .then((res)=>{
                    let resData = res.data;
                    if(resData.state===true){
                        this.questionList = resData.questionList;
                    }
                })
                .catch((error)=>{

                })
        }
    }
</script>
//从我的问卷跳转过来查看结果paperid数据如下取出：this.$route.params.paperid
<style scoped>

</style>
