<template>
  <button>todas tus tareas</button>
  <!-- <router-link :to="{name: 'Folder', params: {folder: user.name} }">folder</router-link> -->

  <div v-for="(folder, index) in AllFolders" :key="index">
    <router-link :to="{name: 'Folder', params: {folder: folder._id} }">{{ folder.name }} - {{ folder.tasks.length }}</router-link>
    <!-- {{ folder.name }} - {{ folder.tasks.length }} -->
  </div>
</template>

<script>
import { inject } from "vue";

export default {
  setup() {
    let user = inject("user");
    let AllFolders = [];
    let AllTasks = [];

    if (!user.value.name) {
      let idUser = localStorage.getItem("user");
      if (idUser) {
        fetch(`http://localhost:3001/api/usuarios/${idUser}`)
          .then((res) => res.json())
          .then((json) => (user.value = json));
      }
    } else {
      user.value.folders.forEach((folder) => {
        console.log(folder);
        AllFolders.push(folder);
      });
      user.value.tasks.forEach((task) => {
        AllTasks.push(task);
      });

      console.log(AllFolders);
      console.log(AllTasks);
    }

    return { AllFolders };
  },
};
</script>
