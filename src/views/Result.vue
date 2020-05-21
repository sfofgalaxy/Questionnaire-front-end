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
        <el-table
          :data="tableData"
          stripe
          show-summary
          style="width: 100%">
          <el-table-column
            prop="date"
            label="日期"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="180"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址">
          </el-table-column>
        </el-table>
      </el-main>
      <el-divider></el-divider>
      <el-footer>Design ©2020 by 彭子帆 3170105860@zju.edu.cn</el-footer>
    </el-container>
  </el-container>
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
                questionList:[],
                total:0,
                tableData:[]
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
