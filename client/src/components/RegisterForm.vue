<template>
  <div
      class="registration-form">
      <form>
        <div class="form-title">
          <h3>Register Your Account</h3>
        </div>
        <div class="form-icon">
          <span><i class="icon icon-user"></i></span>
        </div>
        <div class="form-group">
          <input
            type="text"
            class="form-control item"
            id="username"
            v-model="user.username"
            placeholder="Username"
          />
        </div>
        <div class="form-group">
          <input
            type="text"
            class="form-control item"
            id="email"
            v-model="user.email"
            placeholder="Email"
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
            @click.prevent="register()"
            id="create-account"
          >
            Create Account
          </button>
          <button
            type="button"
            class="btn btn-block btn-success create-account"
            @click.prevent="changeForm('login')"
            id="have-acoount"
          >
            I Have an Account
          </button>
        </div>
      </form>
      <div class="social-media">
        <h5>Sign up with social media</h5>
        <div class="social-icons">
          <a href="#"><i class="icon-social-facebook" title="Facebook"></i></a>
          <a href="#"><i class="icon-social-google" title="Google"></i></a>
          <a href="#"><i class="icon-social-twitter" title="Twitter"></i></a>
        </div>
      </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'RegisterForm',
    props: ['user', 'baseURL', 'changeForm', 'form'],
    methods: {
      // fungsi register akun user
        register() {
            axios({
                method: 'POST',
                url: this.baseURL + '/register',
                data: {
                    email: this.user.email,
                    username: this.user.username,
                    password: this.user.password
                }
            })
                .then(response => {
                    this.$emit('changeForm','login')
                    this.$emit('resetUser')
                    console.log(response.data)
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