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
              <el-link href="http://47.94.46.115/#/home" :underline="false">Welcome</el-link>
            </el-menu-item>
            <el-menu-item index="1-2">
             <el-link href="http://47.94.46.115/#/" :underline="false">Index</el-link>
            </el-menu-item>
            <el-menu-item index="1-2">
              <el-link href="http://47.94.46.115:8080/swagger-ui.html" :underline="false" target="_blank">接口文档</el-link>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-link :disabled="disabled" href="http://47.94.46.115/#/make" :underline="false">
          <el-menu-item index="2" :disabled="disabled">
              <i class="el-icon-document-checked"></i>
              <span>发布问卷</span>
          </el-menu-item>
        </el-link>
        <el-link :disabled="disabled" href="http://47.94.46.115/#/mypaper" :underline="false">
            <el-menu-item index="3" :disabled="disabled">
                <i class="el-icon-document"></i>
                <span>我的问卷</span>
            </el-menu-item>
        </el-link>
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-user"></i>
            <span slot="title">个人中心</span>
          </template>
          <el-link :underline="false" href="http://47.94.46.115/#/login"><el-menu-item index="4-1" v-if="disabled">登录</el-menu-item></el-link>
          <el-link :underline="false" href="http://47.94.46.115/#/modifypwd"><el-menu-item index="4-1" v-if="!disabled">修改密码</el-menu-item></el-link>
          <el-link  :underline="false" href="http://47.94.46.115/#/register"><el-menu-item index="4-2" v-if="disabled">注册</el-menu-item></el-link>
          <el-menu-item index="4-3" @click="logout"  :disabled="disabled">注销</el-menu-item>
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
            },
            handleClose(key, keyPath) {
            },
            logout:function () {
                this.$cookies.remove("token");
                this.$cookies.remove("username");
                this.disabled=true;
                alert("注销成功");
                this.$router.push("/login");
            }
        },
        data(){
            return {
                disabled: true,
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
