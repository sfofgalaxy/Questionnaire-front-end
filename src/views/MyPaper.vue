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
            height="250"
            border
            style="width: 100%">
            <el-table-column
              type="index"
              width="50"
              label="序号">
            </el-table-column>
            <el-table-column
              fixed
              prop="title"
              label="问卷标题"
              width="150">
            </el-table-column>
            <el-table-column
              prop="mode"
              label="模式"
              width="150">
            </el-table-column>
            <el-table-column
              prop="fillnumber"
              label="可填写的次数"
              width="110">
            </el-table-column>
            <el-table-column
              prop="open"
              label="状态"
              width="60">
            </el-table-column>
            <el-table-column
              prop="description"
              label="描述"
              width="300">
            </el-table-column>
            <el-table-column
              prop="url"
              label="链接"
              width="350">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="100">
              <template slot-scope="scope" >
                <el-button @click="handleCheck(scope.row)" type="text" size="small">查看结果</el-button>
                <el-button @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
                <el-button v-if="scope.row.open==='open'" @click="handleClose(scope.row)" type="text" size="small">关闭</el-button>
                <el-button v-else @click="handleOpen(scope.row)" type="text" size="small">开启</el-button>
              </template>
            </el-table-column>
            <el-pagination
              background
              layout="prev, pager, next"
              :total="total">
            </el-pagination>
          </el-table>
      </el-main>
      <el-divider></el-divider>
      <el-footer>Design ©2020 by 彭子帆 3170105860@zju.edu.cn</el-footer>
    </el-container>
  </el-container>
</template>

<script>
    import Navigator from '@/components/Navigator';
    import axios from 'axios';

    export default {
        components:{
            Navigator,
        },
        name: "MyPaper",
        data(){
          return{
            tableData:[],
            total:0
          }
        },
        methods: {
            handleCheck(row) {
                this.$router.push('/result?paperid='+row.paperid);
            },
            handleDelete(row){
                let username = this.$cookies.get("username");
                let token = this.$cookies.get("token");
                axios.delete('/api/paper/delete/'+row.paperid,{
                    params:{
                        username: username
                    },
                    headers:{
                        token: token
                    }
                })
                    .then((res)=>{
                     let resData =  res.data;
                     alert(resData.message);
                     if(resData.state)this.$router.go(0);
                    })
                    .catch((error)=>{
                        alert(error+"登录已过期");
                        this.$router.push("/login");
                    });
            },
            handleOpen(row){
                let username = this.$cookies.get("username");
                let token = this.$cookies.get("token");
                let formData = new FormData();
                formData.append("username",username);
                axios.put('/api/paper/open/'+row.paperid,formData,{
                        headers:{
                            token: token
                        }
                    }
                )
                    .then((res)=>{
                        let resData = res.data;
                        alert(resData.message);
                        if(resData.state)this.$router.go(0);
                    })
                    .catch((error)=>{
                        alert(error+"登录已过期");
                        this.$router.push("/login");
                    });
            },
            handleClose(row){
                let username = this.$cookies.get("username");
                let token = this.$cookies.get("token");
                let formData = new FormData();
                formData.append("username",username);
                axios.put('/api/paper/close/'+row.paperid,formData,{
                    headers:{
                        token: token
                    }
                  }
                )
                    .then((res)=>{
                        let resData = res.data;
                        alert(resData.message);
                        if(resData.state)this.$router.go(0);
                    })
                    .catch((error)=>{
                        alert(error+"登录已过期");
                        this.$router.push("/login");
                    });
            },
            async getTableData(){
                let username = this.$cookies.get("username");
                let token = this.$cookies.get("token");
                await axios.get('/api/paper/myquestionnaire',{
                    params:{
                        username: username
                    },
                    headers:{
                        token: token
                    }
                }).then((res) => {
                    let length = res.data.length;
                    this.tableData=res.data;
                    for(let i=0;i<length;i++){
                        if(this.tableData[i].open===true)this.tableData[i].open="open";
                        else this.tableData[i].open="close";
                        if(this.tableData[i].mode===0){
                            this.tableData[i].mode="登录后可答";
                            this.tableData[i].fillnumber="-";
                        }
                        else if(this.tableData[i].mode===1)this.tableData[i].mode="未注册可答N次";
                        else this.tableData[i].mode="未注册每日可答N次";
                        this.tableData[i].url="http://47.94.46.115/#/questionnaire?paperid="+this.tableData[i].paperid;
                    }
                    this.total = this.tableData.length
                }).catch((error) => {
                    alert(error+"登录已过期");
                    this.$router.push("/login");
                    return false;
                });
            },
        },
        mounted() {
            this.getTableData();
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
