const app = new Vue({
    el: '#app',
    data: {
        page: 'welcome',
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
                this.changePage('main')
                this.getTasks()
            } else {
                this.changePage('welcome')
            }
        },

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
                    this.changeForm('login')
                    this.resetUser()
                    console.log(response.data)
                })
                .catch(err => {
                    console.log(err)
                })
        },

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
                    this.checkAuth()
                    this.resetUser()
                })
                .catch(err => {
                    console.log(err)
                })
        },

        // fungsi logout akun user
        logout() {
            localStorage.clear()
            this.checkAuth()
            this.changeForm('register')
            console.log('logout')
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
                    console.log(response.data)
                })
                .catch(err => {
                    console.log(err)
                })
        },

        // fungsi show add form dan kirim category
        showAdd(type) {
            this.changeConditional('add')
            this.task.category = type

            console.log('add', this.task.category)
        },

        // fungsi add task server
        addTask() {
            axios({
                method: 'POST',
                url: this.baseURL + '/tasks',
                headers: {
                    access_token: localStorage.access_token
                },
                data: {
                    title: this.task.title,
                    description: this.task.description,
                    due_date: this.task.due_date,
                    category: this.task.category
                }
            })
                .then(response => {
                    this.resetTask()
                    this.checkAuth()
                })
                .catch(err => {
                    console.log(err)
                })
        },

        // show view detail form
        showDetail(id) {
            this.taskId = id
            
            console.log(this.taskId)

            axios({
                method: 'GET',
                url: this.baseURL+`/tasks/${this.taskId}`,
                headers: {
                    access_token: localStorage.access_token
                }
            })
                .then(response => {
                    this.task.title = response.data.title
                    this.task.description = response.data.description
                    this.task.due_date = response.data.due_date.split('T')[0]

                    this.changeConditional('detail')

                    console.log(this.task)
                })
                .catch(err => {
                    console.log(err)
                })
        },
        showEdit() {
            console.log(this.taskId)

            axios({
                method: 'GET',
                url: this.baseURL+`/tasks/${this.taskId}`,
                headers: {
                    access_token: localStorage.access_token
                }
            })
                .then(response => {
                    this.task.title = response.data.title
                    this.task.description = response.data.description
                    this.task.due_date = response.data.due_date.split('T')[0]
                    this.task.category = response.data.category

                    this.changeConditional('edit')

                    console.log(this.task)
                })
                .catch(err => {
                    console.log(err)
                })
        },
        editTask() {
            axios({
                method: 'PUT',
                url: this.baseURL+`/tasks/${this.taskId}`,
                headers: {
                    access_token: localStorage.access_token
                },
                data: {
                    title: this.task.title,
                    description: this.task.description,
                    due_date: this.task.due_date,
                    category: this.task.category
                }
            })
                .then(response => {
                    console.log(response)

                    this.changeConditional('tasks')
                    this.resetTask()
                })
                .catch(err => {
                    console.log(err)
                })
        },
        deleteTask() {
            axios({
                method: 'DELETE',
                url: this.baseURL+`/tasks/${this.taskId}`,
                headers: {
                    access_token: localStorage.access_token
                }
            })
                .then(response => {
                    this.changeConditional('tasks')
                    console.log(response)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    },
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
})

