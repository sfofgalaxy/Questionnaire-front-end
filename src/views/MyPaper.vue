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
        <div class="infinite-list-wrapper" style="overflow:auto">
          <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
              fixed
              prop="title"
              label="问卷标题"
              width="150">
            </el-table-column>
            <el-table-column
              prop="mode"
              label="模式"
              width="120">
            </el-table-column>
            <el-table-column
              prop="fillnumber"
              label="可填写的次数"
              width="120">
            </el-table-column>
            <el-table-column
              prop="open"
              label="状态"
              width="120">
            </el-table-column>
            <el-table-column
              prop="description"
              label="描述"
              width="300">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="100">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                <el-button @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
                <el-button v-if="this.tableData[scope.row].open" @click="handleClose(scope.row)" type="text" size="small">关闭</el-button>
                <el-button v-else @click="handleOpen(scope.row)" type="text" size="small">开启</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-main>
      <el-divider></el-divider>
      <el-footer>Design ©2020 by 彭子帆 3170105860@zju.edu.cn</el-footer>
    </el-container>
  </el-container>
</template>

<script>
    import Navigator from '@/components/Navigator';
    export default {
        components:{
            Navigator
        },
        name: "MyPaper.vue",
        data(){
          return{
            tableData:[]
          }
        },
        methods: {
            handleClick(row) {
                console.log(row);
            },
            handleDelete(row){
                console.log(row);
            },
            handleOpen(row){

            },
            handleClose(row){

            }
        },
        mounted() {
            let username = this.$cookies.get("username");
            let token = this.$cookies.get("token");
            axios.get('/api/paper/myquestionnaire',{
                params:{
                    username: username
                },
                headers:{
                    token: token
                }
            }).then((res) => {
                let myPapers = res.data;
                this.tableData=myPapers;
                for(let i =0;i<myPapers.length;i++){
                    //do something
                }
            }).catch((error) => {
                console.log(error);
                return false;
            });
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
