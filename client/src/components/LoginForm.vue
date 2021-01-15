<template>
  <div class="login-form">
      <form>
        <div class="form-title">
          <h3>Sign In Your Account</h3>
        </div>
        <div class="form-icon">
          <span><i class="icon icon-user"></i></span>
        </div>
        <div class="form-group">
          <input
            type="text"
            class="form-control item"
            id="validator"
            v-model="user.validator"
            placeholder="Username or Email"
          />
        </div>
        <div class="form-group">
          <input
            type="password"
            class="form-control item"
            id="password"
            v-model="user.password"
            placeholder="Password"
          />
        </div>
        <div class="form-group">
          <button
            type="button"
            class="btn btn-block btn-primary create-account"
            @click.prevent="login()"
            id="sign-in"
          >
            Sign In
          </button>
          <button
            type="button"
            class="btn btn-block btn-success create-account"
            @click.prevent="changeForm('register')"
            id="register"
          >
            Register
          </button>
        </div>
      </form>
      <div class="social-media">
        <h5>Sign up with social media</h5>
        <div class="social-icons">
          <div class="g-signin2" data-onsuccess="onSignIn"></div>
          <LoginGoogle></LoginGoogle>
          <a href="#"><i class="icon-social-facebook" title="Facebook"></i></a>
          <a href="#"><i class="icon-social-google" title="Google"></i></a>
          <a href="#"><i class="icon-social-twitter" title="Twitter"></i></a>
        </div>
      </div>
    </div>
</template>

<script>
import axios from 'axios'
import LoginGoogle from './login_signup_social'

export default {
  name: "LoginForm",
  props: ['user', 'baseURL', 'changeForm', 'form'],
  components: {
    LoginGoogle
  },
  methods: {
    // fungsi login akun user
        login() {
            axios({
                method: 'POST',
                url: this.baseURL + '/login',
                data: {
                    validator: this.user.validator,
                    password: this.user.password
                }
            })
                .then(response => {
                    let access_token = response.data.access_token

                    localStorage.setItem('access_token', access_token)
                    this.$emit('checkAuth')
                    this.$emit('resetUser')
                })
                .catch(err => {
                    console.log(err)
                })
        }
  }
}
</script>

<style>
</style>