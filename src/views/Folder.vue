<template>
  <h3>Todo Tasks</h3>
  <div class="todoTasks" v-for="(task, index) in todoTasks" :key="index">
    {{ task.name }}
  </div>
  <div class="todoTasks" v-for="(task, index) in completedTasks" :key="index">
    {{ task.name }}
  </div>
</template>

<script>
import { ref, watch, inject } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    let router = useRouter();
    let completedTasks = ref([]);
    let todoTasks = ref([]);
    let id = inject("folderId");

    id.value = router.currentRoute.value.params.folder;

    router.afterEach(() => {
      id.value = router.currentRoute.value.params.folder;
    });

    router.beforeEach(() => {
      todoTasks.value = [];
    });

    fetch(`http://localhost:3001/api/carpetas/${id.value}`)
      .then((res) => res.json())
      .then((json) => {
        json.tasks.forEach((task) => {
          task.status === true
            ? completedTasks.value.push(task)
            : todoTasks.value.push(task);
        });
      });

    console.log(id.value);

    watch(id, () => {
      if (id.value !== "") {
        fetch(`http://localhost:3001/api/carpetas/${id.value}`)
          .then((res) => res.json())
          .then((json) => {
            json.tasks.forEach((task) => {
              task.status === true
                ? completedTasks.value.push(task)
                : todoTasks.value.push(task);
            });
          });
      }
    });

    return { todoTasks, completedTasks };
  },
};
</script>
