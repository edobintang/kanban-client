<template>
  <div class="form-edit" v-show="conditional === 'edit'">
                <form>
                    <div class="edit-form-title" style="margin-bottom: 20px;">
                        <h2>Edit Task Here!</h2>
                    </div>
                    <div class="form-group">
                        <label for="title">Title :</label>
                        <input type="text" class="form-control" id="edit-title" aria-describedby="emailHelp"
                            v-model="task.title">
                    </div>
                    <div class="form-group">
                        <label for="due_date">Due Date :</label>
                        <input type="date" class="form-control" id="edit-due_date" aria-describedby="emailHelp" v-model="task.due_date">
                    </div>
                    <div class="form-group">
                        <label for="description">Description :</label>
                        <textarea class="form-control" id="edit-description" rows="3"
                        v-model="task.description"></textarea>
                    </div>
                    <div class="submit-edit">
                        <button type="submit" class="btn btn-primary" @click.prevent="editTask()">Edit</button>
                        <button type="submit" class="btn btn-danger" @click.prevent="resetId()">Cancel</button>
                    </div>

                </form>
            </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'EditForm',
    props: ['conditional', 'task', 'baseURL', 'taskId', 'resetId'],
    methods: {
        editTask() {
            console.log(this.taskId)

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
                    console.log(this.task)

                    this.$emit('changeConditional','tasks')
                    this.$emit('resetTask')
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