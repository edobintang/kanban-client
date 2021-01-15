<template>
  <div class="row">
                    <!-- pembagian column tabel yang isinya 4 tabel -->
                    <!-- BACKLOG CATEGORY-->
                    <BacklogCategory
                    :numBacklog="num.backlog"
                    :backlog="backlog"
                    :baseURL="baseURL"
                    :taskId="taskId"
                    :task="task"
                    @changeId='changeId'
                    @changeTask="changeTask"
                    @changeConditional="changeConditional"
                    @changeCategory="changeCategory"
                    ></BacklogCategory>

                    <!-- pembagian column tabel yang isinya 4 tabel -->
                    <!-- TODO CATEGORY-->
                    <TodoCategory
                    :numTodo="num.todo"
                    :todo="todo"
                    :baseURL="baseURL"
                    :taskId="taskId"
                    :task="task"
                    @changeId='changeId'
                    @changeTask="changeTask"
                    @changeConditional="changeConditional"
                    @changeCategory="changeCategory"
                    ></TodoCategory>

                    <!-- pembagian column tabel yang isinya 4 tabel -->
                    <!-- DOING CATEGORY-->
                    <DoingCategory
                    :numDoing="num.doing"
                    :doing="doing"
                    :baseURL="baseURL"
                    :taskId="taskId"
                    :task="task"
                    @changeId='changeId'
                    @changeTask="changeTask"
                    @changeConditional="changeConditional"
                    @changeCategory="changeCategory"
                    ></DoingCategory>

                    <!-- pembagian column tabel yang isinya 4 tabel -->
                    <!-- DONE CATEGORY-->
                    <DoneCategory
                    :numDone="num.done"
                    :done="done"
                    :baseURL="baseURL"
                    :taskId="taskId"
                    :task="task"
                    @changeId='changeId'
                    @changeTask="changeTask"
                    @changeConditional="changeConditional"
                    @changeCategory="changeCategory"
                    ></DoneCategory>
                </div>
</template>

<script>
import BacklogCategory from './BacklogCategory'
import TodoCategory from './TodoCategory'
import DoingCategory from './DoingCategory'
import DoneCategory from './DoneCategory'

export default {
    name: 'TaskBox',
    components: {
        BacklogCategory,
        TodoCategory,
        DoingCategory,
        DoneCategory
    },
    props: ['num', 'backlog', 'todo', 'doing', 'done', 'baseURL', 'taskId', 'task', 'changeConditional', 'changeId', 'changeTask', 'changeCategory']
}
</script>

<style>

</style>