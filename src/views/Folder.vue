<template>
  <div class="folderView">
    <folder-header />
    <div v-if="activeFolder.todoTasks.length > 0">
      <folder-item
        :task="task"
        v-for="(task, index) in activeFolder.todoTasks"
        :key="index"
      />
    </div>
    <div v-else>
      <p>No hay tareas pendientes</p>
      <img class="notodoImg" src="@/assets/notodotasks.png" alt="" />
    </div>
    <input-task v-if="activeFolder.data.name !== 'All Tasks'" />
    <div class="completedList" v-if="activeFolder.completedTasks.length > 0">
      <h3>Completed</h3>
      <folder-item
        :task="task"
        v-for="(task, index) in activeFolder.completedTasks"
        :key="index"
      />
    </div>
  </div>
</template>

<script>
import { inject, onMounted, ref, watch, watchEffect } from "vue";
import inputTask from "../components/inputs/inputTask.vue";
import FolderHeader from "../components/folder/folderHeader.vue";
import FolderItem from "../components/folder/folderItem.vue";

export default {
  components: { inputTask, FolderHeader, FolderItem },
  setup() {
    // Importamos variables de la carpeta actual
    let activeFolder = inject("activeFolder");
    let getActiveFolder = inject("getActiveFolder");

    // Seguimiento de la carpeta actual
    watchEffect(async () => {
      await getActiveFolder();
    });

    return {
      activeFolder,
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
  opacity: 0.8;
}
</style>
