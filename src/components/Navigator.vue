<template>
  <el-row class="tac" style="width: 200px">
    <el-col :span="12" style="width: 200px">
      <img src="@/assets/logo.png" style="width: 100%" />
      <el-menu
        default-active="1-1"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-house"></i>
            <span slot="title">Home</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="1-1">
              Index
            </el-menu-item>
            <el-menu-item index="1-2">
             <el-link href="http://47.94.46.115/#/">首页</el-link>
            </el-menu-item>
            <el-menu-item index="1-2">
              <el-link href="http://47.94.46.115/#/" target="_blank">接口</el-link>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2" :disabled="disabled">
          <template slot="title">
            <i class="el-icon-document-checked"></i>
            <span>问卷中心</span>
          </template>
          <el-menu-item-group>
<!--            <template slot="title">分组一</template>-->
            <el-menu-item index="2-1">发布问卷</el-menu-item>
            <el-menu-item index="2-2">我的问卷</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-user"></i>
            <span slot="title">个人中心</span>
          </template>
          <el-menu-item index="4-1"><el-link href="http://47.94.46.115/#/login">登录</el-link></el-menu-item>
          <el-menu-item index="4-2"><el-link href="http://47.94.46.115/#/register">注册</el-link></el-menu-item>
          <el-menu-item index="4-3" @click="remove">注销</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
    export default {
        name: "Navigator.vue",
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            remove:function () {
                this.$cookies.remove("token");
                this.$cookies.remove("username");
                this.disabled=true;
                alert("注销成功");
                this.$router.push("/");
            }
        },
        data(){
            return {
                disabled: true
            }
        },
        mounted() {
            let token = this.$cookies.get("token");
            if(token!=null&&token!=""){
                this.disabled=false;
            }
        }
    }
</script>

<style scoped>

</style>
