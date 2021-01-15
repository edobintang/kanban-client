<template>
  <main class="content">
            <div class="container p-0">

                <div class="navbar">
                    <h1 class="h3">Kanban Board</h1>
                    <div class="nav-right">
                        <button type="button" class="btn btn-info" id="add-category">Add Category</button>
                        <button type="button" class="btn btn-dark" @click.prevent="logout()"
                            id="logout-btn">LOGOUT</button>
                    </div>
                </div>

                <TaskBox 
                v-show="conditional === 'tasks'"
                :num="num"
                :baseURL="baseURL"
                :backlog="backlog"
                :todo="todo"
                :doing="doing"
                :done="done"
                :taskId="taskId"
                :task="task"
                :changeConditional="changeConditional"
                :conditonal="conditional"
                :changeId='changeId'
                :changeTask="changeTask"
                :changeCategory="changeCategory"
                :resetTask="resetTask"
                @changeId='changeId'
                @changeTask="changeTask"
                @changeConditional="changeConditional"
                @changeCategory="changeCategory"
                >
                </TaskBox>

            </div>

            <!-- form add task -->
            <AddForm :conditional="conditional"
            :task="task"
            :baseURL="baseURL"
            :resetTask="resetTask"
            @resetTask="resetTask"
            @checkAuth="checkAuth"
            >
            </AddForm>

            <!-- View Detail -->
            <ViewDetail :conditional="conditional" 
            :task="task"
            :baseURL="baseURL"
            :taskId="taskId"
            :resetId="resetId"
            @changeConditional="changeConditional"
            @changeTask="changeTask"
            @checkAuth="checkAuth"
            >
            </ViewDetail>

            <!-- form edit task -->
            <EditForm :conditional="conditional"
            :task="task"
            :baseURL="baseURL"
            :taskId="taskId"
            :resetId="resetId"
            @resetTask="resetTask"
            @changeConditional="changeConditional"
            >
            </EditForm>

        </main>
</template>

<script>
import TaskBox from './TaskBox'
import ViewDetail from './ViewDetail'
import AddForm from './AddForm'
import EditForm from './EditForm'

export default {
    name: 'MainPage',
    components: {
        TaskBox,
        ViewDetail,
        AddForm,
        EditForm
    },
    props: ['num', 'page', 'backlog', 'todo', 'doing', 'done', 'baseURL', 'taskId', 'task', 'changeConditional', 'conditional', 'changeId', 'changeTask', 'changeCategory', 'resetTask', 'resetId', 'checkAuth'],
    methods: {
        // fungsi logout akun user
        logout() {
            localStorage.clear()
            this.$emit('checkAuth')
            this.$emit('changeForm','register')
            console.log('logout')
        },
    }
}
</script>

<style>

</style>