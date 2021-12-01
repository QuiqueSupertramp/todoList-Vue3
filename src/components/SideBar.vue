<template>
  <div class="folderList">
    <router-link
      class="folderItem"
      :to="{ name: 'Folder', params: { idFolder: 'AllTasks' } }"
    >
      <img src="@/assets/task.png" alt="" />
      <div class="folderItemText">
        <p>Show all Tasks</p>
        <span>{{ AllTasks.length }}</span>
      </div>
    </router-link>
    <div>
      <h3>Carpetas</h3>
      <router-link
        v-for="(folder, index) in AllFolders"
        :key="index"
        class="folderItem"
        :to="{
          name: 'Folder',
          params: { idFolder: folder._id, name: folder.name },
        }"
      >
        <img src="@/assets/folder.png" alt="" />
        <div class="folderItemText">
          <p>{{ folder.name }}</p>
          <span>{{ folder.tasks.length }}</span>
        </div>
      </router-link>
    </div>
    <input-folder />
  </div>
</template>

<script>
import { inject, provide, ref } from "vue";
import inputFolder from "./inputFolder.vue";

export default {
  components: { inputFolder },
  setup() {
    let user = inject("user");
    let AllFolders = inject("AllFolders")
    let AllTasks = inject("AllTasks");

    user.value.folders.forEach((folder) => {
      AllFolders.value.push(folder);
    });

    return { AllFolders, AllTasks };
  },
};
</script>

<style scoped>
a {
  color: var(--color-black);
}

.folderList {
  background-color: var(--color-ligthgrey);
  width: 300px;
  height: 91vh;
  position: fixed;
  top: 9vh;
  left: 0;
  padding: 1.5rem;
}

.folderItem {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  width: 100%;
}

.folderItem img {
  width: 24px;
}

.folderItem span {
  color: black;
}

.folderItemText {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.7rem;
  width: 100%;
}

.folderItemText span {
  font-size: 12px;
  color: var(--color-grey);
}
</style>
