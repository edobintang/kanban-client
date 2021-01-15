<template>
  <div class="form-add" v-show="conditional === 'add'">
                <form>
                    <div class="add-form-title" style="margin-bottom: 20px;">
                        <h2>Add Task Here!</h2>
                    </div>
                    <div class="form-group">
                        <label for="title">Title :</label>
                        <input type="text" class="form-control" id="add-title" v-model="task.title"
                            aria-describedby="emailHelp" placeholder="Task Title">
                    </div>
                    <div class="form-group">
                        <label for="due_date">Due Date :</label>
                        <input type="date" class="form-control" id="add-due_date" v-model="task.due_date"
                            aria-describedby="emailHelp">
                    </div>
                    <div class="form-group">
                        <label for="description">Description :</label>
                        <textarea class="form-control" id="add-description" v-model="task.description" rows="3"
                            placeholder="Describe Your Task..."></textarea>
                    </div>
                    <div class="submit-add">
                        <button type="submit" class="btn btn-primary" @click.prevent="addTask()">Add</button>
                        <button type="submit" class="btn btn-danger" @click.prevent="resetTask()">Cancel</button>
                    </div>

                </form>
            </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'AddForm',
    props: ['conditional', 'task', 'baseURL', 'resetTask'],
    methods: {
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
                    this.$emit('resetTask')
                    this.$emit('checkAuth')
                })
                .catch(err => {
                    console.log(err)
                })
        },
    }
}
</script>

<style>

</style>