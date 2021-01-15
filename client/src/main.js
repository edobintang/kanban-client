import Vue from 'vue'
import App from './App.vue'

new Vue({
    render: h => h(App),
}).$mount('#app')

import GoogleAuth from 'vue-google-oauth2'
const gauthOption = {
  clientId: '10483290903-pu7ekmqdkgj4vitucq02v5173fkm5mg9.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'select_account'
}
Vue.use(GoogleAuth, gauthOption)