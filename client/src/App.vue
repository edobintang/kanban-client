<template>
  <div class="container">
    <!-- Register Form -->
    <RegisterForm 
    v-show="page === 'welcome'" 
    v-if="form === 'register'" 
    :user="user"
    :baseURL="baseURL"
    :form="form"
    :changeForm="changeForm"
    @changeForm="changeForm"
    @resetUser="resetUser"
    >
    </RegisterForm>

    <!-- Login Form -->
    <LoginForm 
    v-show="page === 'welcome'" 
    v-else
    :user="user"
    :baseURL="baseURL"
    :form="form"
    :changeForm="changeForm"
    :changeConditional="changeConditional"
    @checkAuth="checkAuth"
    @resetUser="resetUser"
    ></LoginForm>

    <!-- HOME/Main Page -->
    <MainPage 
    v-show="page === 'main'"
    :num="num"
    :page="page"
    :baseURL="baseURL"
    :backlog="backlog"
    :todo="todo"
    :doing="doing"
    :done="done"
    :taskId="taskId"
    :task="task"
    :changeConditional="changeConditional"
    :conditional="conditional"
    :changeId='changeId'
    :changeTask="changeTask"
    :changeCategory="changeCategory"
    :resetTask="resetTask"
    :resetId="resetId"
    :checkAuth="checkAuth"
    @checkAuth="checkAuth"
    @changeForm="changeForm"
    @changeId='changeId'
    @changeTask="changeTask"
    @changeConditional="changeConditional"
    @changeCategory="changeCategory"
    @resetTask="resetTask"
    ></MainPage>

  </div>
</template>

<script>
import axios from 'axios'

import LoginForm from "./components/LoginForm.vue";
import RegisterForm from "./components/RegisterForm.vue";
import MainPage from "./components/MainPage.vue";

export default {
  name: "App",
  data() {
    return {
      msg: "Belajar Vue dari App",
      page: 'main',
      form: 'register',
      conditional: 'tasks',
        baseURL: 'http://localhost:7000',
        user: {
            email: '',
            username: '',
            password: '',
            validator: ''
        },
        tasks: [],
        num: {
            backlog: 0,
            todo: 0,
            doing: 0,
            done: 0
        },
        task: {
            title: '',
            description: '',
            due_date: '',
            category: ''
        },
        taskId: ''
    };
  },
  components: {
    LoginForm,
    RegisterForm,
    MainPage
  },
  methods: {
        // mengubah status tampilan agar SPA
        changeForm(form) {
            this.form = form
        },
        changePage(page) {
            this.page = page
        },
        changeConditional(cond) {
            this.conditional = cond
            this.resetUser()
            this.checkAuth()
        },
        changeId(task_id) {
          this.taskId = task_id
        },
        changeTask(new_task) {
          this.task = new_task
        },
        changeCategory(task_cat) {
          this.task.category = task_cat
        },
        resetUser() {
            this.user.email = ''
            this.user.username = ''
            this.user.password = ''
            this.user.validator = ''
        },
        resetTask() {
            this.task.title = ''
            this.task.description = ''
            this.task.due_date = ''
            this.task.category = ''

            this.changeConditional('tasks')
        },
        resetId() {
            this.changeConditional('tasks')
            this.taskId = ''
            console.log(this.taskId)
        },
        checkAuth() {
            if (localStorage.access_token) {
                //console.log(this.conditional)
                //console.log(this.taskId)
                //console.log(this.task)
                this.changePage('main')
                this.getTasks()
            } else {
                this.changePage('welcome')
            }
        },

        // fungsi mendapatkan semua data task dari server
        getTasks() {
            axios({
                method: 'GET',
                url: this.baseURL + '/tasks',
                headers: {
                    access_token: localStorage.access_token
                }
            })
                .then(response => {
                    this.tasks = response.data
                })
                .catch(err => {
                    console.log(err)
                })
        }
    },

    // lifecycle created
    created() {
        console.log('di reload')
        this.checkAuth()
    },
    computed: {
        backlog() {
            let output = []

            for (let i = 0; i < this.tasks.length; i++) {
                let task = this.tasks[i]

                if (task.category === 'backlog') {
                    output.push(task)
                }
            }

            this.num.backlog = output.length
            return output
        },
        todo() {
            let output = []

            for (let i = 0; i < this.tasks.length; i++) {
                let task = this.tasks[i]

                if (task.category === 'todo') {
                    output.push(task)
                }
            }

            this.num.todo = output.length
            return output
        },
        doing() {
            let output = []

            for (let i = 0; i < this.tasks.length; i++) {
                let task = this.tasks[i]

                if (task.category === 'doing') {
                    output.push(task)
                }
            }

            this.num.doing = output.length
            return output
        },
        done() {
            let output = []

            for (let i = 0; i < this.tasks.length; i++) {
                let task = this.tasks[i]

                if (task.category === 'done') {
                    output.push(task)
                }
            }

            this.num.done = output.length
            return output
        }
    }
};
</script>

<style>
</style>