<template>
  <div id="login" class="h-100">
    <BaseHeader text="登录"></BaseHeader>
    <main class="main-top">
      <div class="form x-ctr">
        <el-form :model="form">
          <el-form-item label="用户名或邮箱">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="form.password" show-password></el-input>
          </el-form-item>
        </el-form>
        <div>
          <el-button type="primary" @click="submit">登录</el-button>
          <el-button @click="$router.push('/register')" class="f-r"
            >注册</el-button
          >
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { login } from '@/services/user'
import BaseHeader from 'c/app/BaseHeader'
import Cookies from 'universal-cookie'

export default {
  name: 'Login',
  data() {
    return {
      form: {
        username: '',
        password: '',
      },
    }
  },
  components: { BaseHeader },
  methods: {
    async submit() {
      try {
        let res = await login(this.form)
        console.log(res)
        this.$store.dispatch('setUser', res.user)
        this.$store.dispatch('setList', res.contacts)
        this.$store.commit('SET_ALL_LIST', res.moments)
        this.$router.push('/')
        this.$store.dispatch('connect')
      } catch (e) {
        this.$message.error(e)
      }
    },
  },
  mounted() {
    const cookies = new Cookies()
    cookies.remove('wechat')
    cookies.remove('wechat.sig')
    localStorage.getItem('vuex') && localStorage.removeItem('vuex')
    this.$store.dispatch('close')
  },
}
</script>

<style scoped>
#login {
  width: 100vw;
  height: 100vh;
}

.form {
  width: 40%;
  min-width: 300px;
  padding: 20px;
}
</style>
