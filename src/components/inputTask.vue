<template>
  <form @submit.prevent="addTask">
    <input type="text" v-model="newTaskName" />
    <input type="submit" value="Agregar Tarea" />
  </form>
</template>

<script>
import { ref, inject, watchEffect, watch } from "vue";
import { useRouter } from "vue-router";
export default {
  setup() {
    let router = useRouter();
    let newTaskName = ref("");
    let user = inject("user");
    let folderId = inject("folderId");
    const AllTasks = inject("AllTasks");
    let AllFolders = inject("AllFolders");
    let todoTasks = inject("todoTasks");
    const currentFolder = inject("currentFolder");
    const getUser = inject("getUser");

    let addTask = async () => {
      let data = {
        name: newTaskName.value,
        folder: currentFolder.data._id,
        user: user.data._id,
      };

      let fetchData = await fetch("http://localhost:3001/api/tareas", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      let json = await fetchData.json();

      if (fetchData.ok) {
        AllTasks.value.push(json);
        currentFolder.todoTasks.push(json);
        currentFolder.data.tasks.push(json);
        newTaskName.value = "";
        await getUser();
      }
    };

    // watchEffect(() => {
    //   folderId = router.currentRoute.value.params.idFolder;
    // });

    return { newTaskName, addTask };
  },
};
</script>
