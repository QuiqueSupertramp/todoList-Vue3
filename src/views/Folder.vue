<template>
  <div class="folderView">
    <div class="loader" v-if="loading === true">
      <div class="spinner"></div>
    </div>
    <folder-header />
    <div v-if="currentFolder.todoTasks.length > 0">
      <folder-item
        :task="task"
        v-for="(task, index) in currentFolder.todoTasks"
        :key="index"
      />
    </div>
    <div v-else>
      <p>No hay tareas pendientes</p>
      <img class="notodoImg" src="@/assets/notodotasks.png" alt="">
    </div>
    <input-task v-if="currentFolder.data.name !== 'All Tasks'" />
    <div class="completedList">
      <h3>Completed</h3>
        <folder-item
          :task="task"
          v-for="(task, index) in currentFolder.completedTasks"
          :key="index"
        />
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
    let currentFolder = inject("currentFolder");

    let folderName = ref("");
    let todoTasks = ref([]);
    let completedTasks = ref([]);
    let loading = ref(false);

    provide("todoTasks", todoTasks);
    provide("completedTasks", completedTasks);

    let getCurrentFolder = async () => {
      loading.value = true;
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
        loading.value = false;
      } else {
        try {
          let data = await fetch(
            `https://apiserver-todolist.herokuapp.com/api/carpetas/${folderId}`
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
        } finally {
          loading.value = false;
        }
      }
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
      loading,
    };
  },
};
</script>

<style scoped>
.folderView {
  margin: 0 auto;
  max-width: 800px;
  position: relative;
  padding-top: 5rem;
}

input {
  font-size: 15px;
}

.completedList {
  margin-top: 2rem;
}

.notodoImg {
  width: 100%;
  max-width: 350px;
  margin: auto;
  display: flex;
  opacity: .8;
}
</style>
