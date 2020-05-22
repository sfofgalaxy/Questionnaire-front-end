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
          :data="rows"
          stripe
          height="250"
          show-summary
          style="width: 100%">
          <el-table-column
            type="index"
            width="50"
            label="序号">
          </el-table-column>
          <el-table-column
            prop="username"
            label="用户名"
            width="75">
          </el-table-column>
          <el-table-column
            prop="ip"
            label="IP地址"
            width="150">
          </el-table-column>
          <el-table-column
            prop="subTime"
            label="提交时间"
            width="240"
          >
          </el-table-column>
          <el-table-column
            v-for="questionID in questionList.length"
            :prop="'question'+questionID"
            :label="questionList[questionID-1].content"
            width="180">
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
            async getResult(){
                let username = this.$cookies.get("username");
                let token = this.$cookies.get("token");
                await axios.get("/api/result/"+this.$route.query.paperid,{
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
                            //开始获取每行数据
                            let results = resData.resultListMap;
                            console.log(results);
                            /*
                            * 问题为key，格式为"Question(questionid=6, paperid=3, type=0, content=q1)"
                            * 因此要对key进行操作
                            * 正则用于将xxxx(aaaaaaaaaaaa)取出括号中内容
                            * */
                            let regex = /\((.+?)\)/g;
                            for(let result in results){
                                let matchString = result.match(regex)[0];
                                let str = matchString.substring(1, matchString.length - 1);
                                //str即为"resultid=1, username=, ip=60.186.216.234, paperid=1, submittime=Fri May 22 13:54:42 GMT 2020“
                                let row = {};
                                //将str值即储存为{ resultid:"1", username:"", ip:"60.186.216.234", paperid:"1", submittime:"Fri May 22 13:54:42 GMT 2020 "}
                                //数据：[{username:"String",ip:"String",subTime:"String",question1:"String"或question1:1},{}]
                                let temp = eval('(' + this.toArray(str) + ')')
                                row.username=temp.username;
                                row.ip = temp.ip;
                                row.subTime= temp.submittime;
                                let answerNum = results[result].length;
                                for(let i=0;i<answerNum;i++){
                                    //let type = this.questionList[results[result][i].questionid-1].type;
                                    row['question'+results[result][i].questionid] = results[result][i].content;
                                    // else if(type===3)row['question'+results[result][i].questionid] = parseInt(results[result][i].content);
                                    // else if(type===4)row['question'+results[result][i].questionid] = parseFloat(results[result][i].content);
                                }
                                this.rows.push(row);
                            }
                            console.log(this.rows);
                        }else {
                            alert(resData.message);
                            this.$router.push("/login");
                        }
                    })
                    .catch((error)=>{
                        alert(error);
                    })
            },
            //将"a=a,b=b,c=c"类似字符串返回拼好json格式的字符串
            toArray(str){
                let list = str.split(",");
                let myStr = "{";
                for(let i=0;i<list.length;i++)
                {
                    let keys = list[i].split("=");
                    //去掉头尾空格
                    let key = keys[0].replace(/(^\s*)|(\s*$)/g, "");
                    let value= keys[1].replace(/(^\s*)|(\s*$)/g, "");
                    if(i>0)
                    {
                        myStr += ",";
                    }
                    myStr += "\""+key+"\":\""+value+"\"";
                }
                myStr += "}";
                return myStr;
            },
        },
        data(){
            return{
                questionList:[],
                total:0,
                rows:[],
            }
        },
        mounted() {
          this.getResult();
        }
    }
</script>
<style scoped>

</style>
