<template>
  <el-container>
    <el-header height="150px" style="font-size: 24px; color: #303133;text-align: center">
      调查问卷
      <h2>{{title}}</h2>
      <div style="font-size: 18px">{{description}}</div>
    </el-header>
    <el-divider></el-divider>
    <el-main>
      <el-form ref="question" :model="question" label-width="300px">
        <el-form-item
          required="true"
          v-for="questionID in question.length"
          :label="question[questionID-1].content">
          <el-radio-group v-model="answer[questionID-1].content" v-if="question[questionID-1].type==='0'">
            <el-radio v-for="optionID in question[questionID-1].option.length" :label="question[questionID-1].option[optionID-1].content"></el-radio>
          </el-radio-group>
          <el-checkbox-group v-else-if="question[questionID-1].type==='1'" v-model="checkedList[questionID-1]">
            <el-checkbox v-for="optionID in question[questionID-1].option.length" :label="question[questionID-1].option[optionID-1].content"></el-checkbox>
          </el-checkbox-group>
          <el-input v-model="answer[questionID-1].content" v-else-if="question[questionID-1].type==='2'"></el-input>
          <el-input-number v-model="answer[questionID-1].content" v-else-if="question[questionID-1].type==='3'"></el-input-number>
          <el-input-number v-model="answer[questionID-1].content" v-else-if="question[questionID-1].type==='4'" :precision="2" :step="0.1"></el-input-number>
          <el-rate v-model="answer[questionID-1].content" v-else-if="question[questionID-1].type==='5'" allow-half></el-rate>
          <el-input v-model="answer[questionID-1].content" v-else-if="question[questionID-1].type==='6'" readonly @focus="getLocation(questionID-1)"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即提交</el-button>
        </el-form-item>
      </el-form>
    </el-main>
    <el-divider></el-divider>
    <el-footer>Design ©2020 by 彭子帆 3170105860@zju.edu.cn</el-footer>
  </el-container>
</template>

<script>
    import axios from 'axios';
    import returnCitySN from 'returnCitySN';

    export default {
        name: "Questionnaire",
        methods:{
            onSubmit(){
                let checkLength = this.checkedList.length;
                for(let i=0;i<checkLength;i++){
                    if(this.checkedList[i].length>0){
                        console.log(this.checkedList[i]);
                        for(let j=0;j<this.checkedList[i].length;j++){
                            this.answer[i].content+=(this.checkedList[i][j]+";");
                        }
                    }
                }
                let username = this.$cookies.get("username");
                if(username==null)username="";
                let answer=[],answerLength=this.answer.length;
                //答题传输数据到/answer/{paperid}时，一组数[num,content]分别对应questionID.content
                for(let i=0;i<answerLength;i++){
                    answer.push([this.answer[i].questionid,this.answer[i].content]);
                }
                let formData = new FormData();
                formData.append("username",username);
                formData.append("answer",answer);
                formData.append("ip",returnCitySN['cip']);
                axios.post("/api/answer/"+this.paperid,formData)
                    .then((res)=>{
                        let resData = res.data;
                        if(resData.state===true){
                            alert("提交成功");
                            this.$router.push("/");
                        }else {
                            alert(resData.message+"，请重新尝试");
                        }
                    })
                    .catch((err)=>{
                        alert(err);
                    });
            },
            async getQuestion(){
                let username = this.$cookies.get("username");
                await axios.get("/api/paper/"+this.paperid,{
                    params:{
                      username: username
                  }
                })
                    .then((res)=>{
                        let resData = res.data;
                        if(resData.state===true){
                            this.title = resData.title;
                            this.description = resData.description;
                            let QuestionAndOption = resData.question;
                            /*
                            * 问题为key，格式为"Question(questionid=6, paperid=3, type=0, content=q1)"
                            * 因此要对key进行操作
                            * 正则用于将xxxx(aaaaaaaaaaaa)取出括号中内容
                            * */
                            let regex = /\((.+?)\)/g;
                            for(let question in QuestionAndOption){//遍历json数组时，这么写p为索引，0,1
                                let matchString = question.match(regex)[0];
                                let result = matchString.substring(1, matchString.length - 1);
                                //result即为"questionid=6, paperid=3, type=0, content=q1“

                                //将result值即储存为{ questionid: "7",  paperid: "3",  type: "2",  content: "文本" }
                                let item = eval('(' + this.toArray(result) + ')');
                                //增加option属性而后储存在this.question中
                                item.option = QuestionAndOption[question];
                                this.question.push(item);
                                let questionid = item.questionid;
                                //预先增加answer
                                this.answer.push({questionid:questionid,content:""});
                                this.checkedList.push([]);
                            }
                        }
                        else alert(resData.message);
                    })
                    .catch((err)=>{
                        alert(err);
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
            getLocation(questionID){
              this.answer[questionID].content = "正在定位...";
              this.answer[questionID].content = returnCitySN['cname'];
            }
        },
        data(){
            return{
              paperid:this.$route.query.paperid,
              question:[],
              title:"",
              description:"",
              answer:[],
              checkedList:[]
            }
        },
        mounted() {
          this.getQuestion();
        }
    }
</script>


<style scoped>

</style>
