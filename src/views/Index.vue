<template>
<div id="app">
  <a href="http://47.94.46.115/#/home"><Logo/></a>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <br/><br/>
    <h3>Essential Links</h3>
    <el-link href="http://47.94.46.115/#/home"><h2>Home Page</h2></el-link><br/>
    <el-button size="mini"><el-link href="../../static/设计文档.pdf" download="设计文档.pdf">设计文档下载</el-link></el-button>
    <el-button size="mini"><el-link href="../../static/实验报告.pdf" download="实验报告.pdf">实验报告下载</el-link></el-button>
    <ul>
      <li>
        <a
          href="http://47.94.46.115:8080/swagger-ui.html"
          target="_blank"
        >
          Api Document
        </a>
      </li>
      <li>
        <a
          href="http://47.94.46.115/#/login"
          target="_blank"
        >
          Login
        </a>
      </li>
      <li>
        <a
          href="http://47.94.46.115/#/register"
          target="_blank"
        >
          Register
        </a>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
import Logo from '@/components/Logo'
export default {
  name: 'Index',
  data () {
    return {
      msg: 'Welcome to My Questionnaire'
    }
  },
  components:{
    Logo
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
