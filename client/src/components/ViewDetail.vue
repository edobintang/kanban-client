<template>
<div class="container">
    <div class="detail-content" v-show="conditional === 'detail'" v-if="task.category === 'backlog'">
                <div class="detail-header">
                    <h2>Detail About Task</h2>
                </div>
                <div class="detail-body">
                    <p>Title : <span>{{ task.title }}</span></p>
                    <p>Description : <span>{{ task.description }}</span></p>
                    <p>Due Date : <span>{{ task.due_date }}</span></p>
                </div>
                <div class="detail-footer">
                    <button type="submit" class="btn btn-warning btn-view" @click.prevent="showEdit()">Edit</button>
                    <button type="submit" class="btn btn-danger btn-view" @click="deleteTask()">Delete</button>
                    <button type="submit" class="btn btn-secondary btn-view" @click.prevent="resetId()">Cancel</button>
                    <button type="submit" class="btn btn-secondary btn-view" @click.prevent="changeCategory('todo')">Todo</button>
                </div>
            </div>

            <div class="detail-content" v-show="conditional === 'detail'" v-if="task.category === 'todo'">
                <div class="detail-header">
                    <h2>Detail About Task</h2>
                </div>
                <div class="detail-body">
                    <p>Title : <span>{{ task.title }}</span></p>
                    <p>Description : <span>{{ task.description }}</span></p>
                    <p>Due Date : <span>{{ task.due_date }}</span></p>
                </div>
                <div class="detail-footer">
                    <button type="submit" class="btn btn-warning btn-view" @click.prevent="showEdit()">Edit</button>
                    <button type="submit" class="btn btn-danger btn-view" @click="deleteTask()">Delete</button>
                    <button type="submit" class="btn btn-secondary btn-view" @click.prevent="resetId()">Cancel</button>
                    <button type="submit" class="btn btn-secondary btn-view" @click.prevent="changeCategory('backlog')">Backlog</button>
                    <button type="submit" class="btn btn-secondary btn-view" @click.prevent="changeCategory('doing')">Doing</button>
                </div>
            </div>

            <div class="detail-content" v-show="conditional === 'detail'" v-if="task.category === 'doing'">
                <div class="detail-header">
                    <h2>Detail About Task</h2>
                </div>
                <div class="detail-body">
                    <p>Title : <span>{{ task.title }}</span></p>
                    <p>Description : <span>{{ task.description }}</span></p>
                    <p>Due Date : <span>{{ task.due_date }}</span></p>
                </div>
                <div class="detail-footer">
                    <button type="submit" class="btn btn-warning btn-view" @click.prevent="showEdit()">Edit</button>
                    <button type="submit" class="btn btn-danger btn-view" @click="deleteTask()">Delete</button>
                    <button type="submit" class="btn btn-secondary btn-view" @click.prevent="resetId()">Cancel</button>
                    <button type="submit" class="btn btn-secondary btn-view" @click.prevent="changeCategory('todo')">Todo</button>
                    <button type="submit" class="btn btn-secondary btn-view" @click.prevent="changeCategory('done')">Done</button>
                </div>
            </div>

            <div class="detail-content" v-show="conditional === 'detail'" v-if="task.category === 'done'">
                <div class="detail-header">
                    <h2>Detail About Task</h2>
                </div>
                <div class="detail-body">
                    <p>Title : <span>{{ task.title }}</span></p>
                    <p>Description : <span>{{ task.description }}</span></p>
                    <p>Due Date : <span>{{ task.due_date }}</span></p>
                </div>
                <div class="detail-footer">
                    <button type="submit" class="btn btn-warning btn-view" @click.prevent="showEdit()">Edit</button>
                    <button type="submit" class="btn btn-danger btn-view" @click="deleteTask()">Delete</button>
                    <button type="submit" class="btn btn-secondary btn-view" @click.prevent="resetId()">Cancel</button>
                    <button type="submit" class="btn btn-secondary btn-view" @click.prevent="changeCategory('doing')">Doing</button>
                </div>
            </div>
</div>
      
</template>

<script>
import axios from 'axios'

export default {
    name: 'ViewDetail',
    props: ['conditional', 'task', 'baseURL', 'taskId', 'changeConditional', 'resetId'],
    methods: {
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
                    const sent = {
                        title: response.data.title,
                        description: response.data.description,
                        due_date: response.data.due_date.split('T')[0],
                        category: response.data.category
                    }

                    this.$emit('changeTask', sent)
                    this.$emit('changeConditional','edit')
                })
                .catch(err => {
                    console.log(err)
                })
        },
        changeCategory(cat) {
            axios({
                method: 'PATCH',
                url: this.baseURL+`/tasks/${this.taskId}`,
                headers: {
                    access_token: localStorage.access_token
                },
                data: {
                    category: cat
                }
            })
                .then(response => {
                    this.$emit('changeConditional', 'tasks')
                    this.$emit('checkAuth')
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
                    this.$emit('changeConditional','tasks')
                    console.log(response)
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