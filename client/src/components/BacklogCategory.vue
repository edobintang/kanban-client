<template>
  <div class="col-12 col-lg-6 col-xl-3" id="backlog-category">
    <!-- bagian task box -->
    <div class="card card-border-primary">
      <!-- bagian header -->
      <div class="card-header">
        <h5 class="card-title" id="back-log-title">Back-Log</h5>
        <h6 class="card-subtitle" id="back-log-sub">
          {{ numBacklog }} Outstanding Tasks
        </h6>
      </div>

      <!-- bagian penampung banyak card task -->
      <div class="card-body">
        <!-- masing2 card task ditaruh sini -->
        <draggable>
          <div
            class="card mb-3 bg-light"
            v-for="(item, idx) in backlog"
            :key="idx"
          >
            <div class="card-body p-3">
              <div class="float-right mr-n2">
                <label class="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    checked=""
                  />
                  <span class="custom-control-label"></span>
                </label>
              </div>
              <p>{{ item.title }}</p>
              <div class="float-right mt-n1">
                <img
                  src="https://bootdey.com/img/Content/avatar/avatar6.png"
                  width="32"
                  height="32"
                  class="rounded-circle"
                  alt="Avatar"
                /><br /><br />
              </div>
              <div class="btn-container">
                <a
                  class="btn btn-outline-primary btn-sm"
                  href="#"
                  @click.prevent="showDetail(item.id)"
                  >View Detail</a
                >
              </div>
            </div>
          </div>
        </draggable>

        <!-- tombol add -->
        <div class="btn-container">
          <a
            href="#"
            class="btn btn-primary btn-block"
            @click.prevent="showAdd('backlog')"
            >Add Task</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import draggable from "vuedraggable";

export default {
  name: "BacklogCategory",
  props: ["numBacklog", "backlog", "taskId", "task", "baseURL"],
  components: {
    draggable,
  },
  methods: {
    // show view detail form
    showDetail(id) {
      this.$emit("changeId", id);

      axios({
        method: "GET",
        url: this.baseURL + `/tasks/${id}`,
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then((response) => {
          const sent = {
            title: response.data.title,
            description: response.data.description,
            due_date: response.data.due_date.split("T")[0],
            category: response.data.category,
          };

          console.log(sent)
          this.$emit("changeTask", sent);
          this.$emit("changeConditional", "detail");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    showAdd(type) {
      this.$emit("changeConditional", "add");
      this.$emit("changeCategory", type);

      console.log("add", this.task.category);
    },
  },
};
</script>

<style>
</style>