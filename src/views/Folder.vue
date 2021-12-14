<template>
  <div class="folderView">
    <div class="loading" v-if="loading === true">
      <img src="../assets/logo.png" alt="" />
    </div>
    <folder-header />
    <div v-if="currentFolder.todoTasks.length > 0">
      <div
        class="taskItem"
        v-for="(task, index) in currentFolder.todoTasks"
        :key="index"
      >
        <folder-item :task="task" />
      </div>
    </div>
    <div v-else-if="(currentFolder.todoTasks.length = 0)">
      <p>No hay tareas pendientes</p>
    </div>
    <input-task v-if="currentFolder.data.name !== 'All Tasks'" />
    <div class="completedList">
      <h3>Completed</h3>
      <div
        class="taskItem"
        v-for="(task, index) in currentFolder.completedTasks"
        :key="index"
      >
        <folder-item :task="task" />
      </div>
    </div>
  </div>
</template>

<script>
import { inject, ref, watchEffect, provide, computed } from "vue";
import { useRouter } from "vue-router";
import inputTask from "../components/inputTask.vue";
import FolderHeader from "../components/folder/folderHeader.vue";
import FolderItem from "../components/folder/folderItem.vue";

export default {
  components: { inputTask, FolderHeader, FolderItem },
  setup() {
    let router = useRouter();
    let folderId = inject("folderId");
    let AllTasks = inject("AllTasks");
    let AllFolders = inject("AllFolders");
    let user = inject("user");
    let currentFolder = inject("currentFolder");
    let getUser = inject("getUser");

    let folderName = ref("");
    let todoTasks = ref([]);
    let completedTasks = ref([]);

    let loading = false;

    provide("todoTasks", todoTasks);
    provide("completedTasks", completedTasks);

    let getCurrentFolder = async () => {
      loading = true;
      folderId = router.currentRoute.value.params.idFolder;

      currentFolder.todoTasks = [];
      currentFolder.completedTasks = [];

      if (folderId === "AllTasks") {
        currentFolder.data = { name: "All Tasks" };
        AllTasks.value.forEach((task) => {
          !task.status
            ? currentFolder.todoTasks.push(task)
            : currentFolder.completedTasks.push(task);
        });
      } else {
        try {
          let data = await fetch(
            `http://localhost:3001/api/carpetas/${folderId}`
          );
          console.log(data)
          let json = await data.json();
          currentFolder.data = json;
          json.tasks.forEach((task) => {
            !task.status
              ? currentFolder.todoTasks.push(task)
              : currentFolder.completedTasks.push(task);
          });
        } catch (error) {
          console.log(error);
        }
      }
      loading = false
    };

    provide("getCurrentFolder", getCurrentFolder);

    watchEffect(async () => {
      folderId = router.currentRoute.value.params.idFolder;
      await getCurrentFolder();
    });

    return {
      folderId,
      todoTasks,
      completedTasks,
      folderName,
      currentFolder,
      loading
    };
  },
};
</script>

<style scoped>
.folderView {
  margin: 0 auto;
  max-width: 800px;
  position: relative;
}

.taskItem {
  height: 45px;
  padding: 0 0.4rem;
  border: 2px solid var(--color-white);
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  align-items: center;
  border-radius: 5px;
}

input {
  font-size: 15px;
}

.loading {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #fff;
}
</style>
