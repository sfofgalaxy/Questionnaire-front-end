<template>

</template>

<script>
  import axios from 'axios';
    export default {
        name: "Questionnaire",
        methods:{
            onSubmit(){
                let username = this.$cookies.get("username");
                if(username==null)username="";
                //axios.post("/api/answer/"+this.paperid);
            }
//答题传输数据到/answer/{paperid}时，一组数[num,content]分别对应questionID.content
        },
        data(){
            return{
              paperid:this.$route.query.paperid,
              question:[],
            }
        },
        mounted() {
            axios.get("/api/paper/"+this.paperid)
                .then((res)=>{
                    let resData = res.data;
                    if(resData.state===true){
                        this.question = resData.question;
                    }
                    alert(resData.message);
                })
                .catch((err)=>{
                    alert(err);
                })
        }
    }
</script>


<style scoped>

</style>
