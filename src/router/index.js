import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/Index'
import Login from '@/views/Login'
import Register from '@/views/Register'
import Questionnaire from '@/views/Questionnaire'
import Home from '@/views/Home'
import Modifypwd from "@/views/Modifypwd";
import MyPaper from "@/views/MyPaper";
import Post from "@/views/Post";
import Result from "@/views/Result";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/questionnaire',
      name: 'Questionnaire',
      component: Questionnaire
    },
    {
      path: '/modifypwd',
      name: 'Modifypwd',
      component: Modifypwd
    },
    {
      path: '/post',
      name: 'Post',
      component: Post
    },
    {
      path: '/mypaper',
      name: 'MyPaper',
      component: MyPaper
    },
    {
      path: '/result',
      name: 'Result',
      component: Result
    }
  ]
})
