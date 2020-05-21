<template>
  <el-form ref="form" :model="form" label-width="200px">
    <el-form-item label="题目内容">
      <el-input maxlength="100" v-model="form.content"></el-input>
    </el-form-item>
    <br/>
    <el-form-item align="left" label="题目类型">
      <el-radio-group @change="handleChange" v-model="form.type">
        <el-radio label="0" name="type" border>单选</el-radio>
        <el-radio label="1" name="type" border>多选</el-radio>
        <el-radio label="2" name="type" border>文本问答</el-radio>
        <el-radio label="3" name="type" border>数字（整数）</el-radio>
        <br/>
        <el-radio label="4" name="type" border>数字（小数）</el-radio>
        <el-radio label="5" name="type" border>评分</el-radio>
        <el-radio label="6" name="type" border>获取地理位置</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item v-if="form.type==='0'||form.type==='1'" v-for="optionID in optionNum" :label="'选项'+optionID">
      <el-input v-model="form.option[optionID-1]" placeholder="请输入选项内容"></el-input>
    </el-form-item>
    <br/>
    <el-form-item>
      <div v-if="form.type==='0'||form.type==='1'"><el-button icon="el-icon-plus" circle @click="addOption"></el-button>&nbsp;添加选项</div>
      &nbsp;<br/>
    </el-form-item>
  </el-form>
</template>

<script>
    export default {
        name: "Question",
        data(){
            return{
                form: {
                    content: '',
                    type: "0",
                    option: []
                },
                optionNum:0
            }
        },
        methods:{
            addOption(){
                this.optionNum++;
                this.form.option.push("");
            },
            handleChange(label){
            }
        }
    }
</script>

<style scoped>

</style>
