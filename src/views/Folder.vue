<template>
  <div class="folderView">
    <folder-header />
    <div class="todoList">
      <div v-for="(task, index) in currentFolder.todoTasks" :key="index">
        <p>{{ task.name }}</p>
        <span class="material-icons-outlined"> highlight_off </span>
      </div>
    </div>
    <div class="completedList">
      <h3>Completed</h3>
      <div v-for="(task, index) in currentFolder.completedTasks" :key="index">
        <p>{{ task.name }}</p>
        <span class="material-icons-outlined"> highlight_off </span>
      </div>
    </div>
    <input-task v-if="currentFolder.data.name !== 'All Tasks'" />
  </div>
</template>

<script>
import { inject, ref, watchEffect, provide, reactive, computed } from "vue";
import { useRouter } from "vue-router";
import inputTask from "../components/inputTask.vue";
import FolderHeader from '../components/folder/folderHeader.vue';
export default {
  components: { inputTask, FolderHeader },
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

    provide("todoTasks", todoTasks);
    provide("completedTasks", completedTasks);

    let getCurrentFolder = async () => {
      folderId = router.currentRoute.value.params.idFolder;
      console.log(folderId);

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
    };

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
    };
  },
};
</script>

<style scoped>
.folderView {
  margin-left: 350px;
  margin-top: 2rem;
}
</style>
