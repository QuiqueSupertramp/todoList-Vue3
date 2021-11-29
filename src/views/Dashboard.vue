<template>
  <div v-if="user">
    <h1>Dashboard</h1>
    <p>Hello {{ user.name }}</p>
    <!-- <div v-for="(folder, index) in AllFolders" :key="index">
      {{ folder.name }} - {{folder.tasks.length}}
    </div> -->
    <side-bar />
    <router-link :to="{ name: 'Folder', params: { folder: user.name } }"
      >folder</router-link
    >

    <router-view />
  </div>
</template>

<script>
import { inject, watch, ref, provide } from "vue";
import { useRouter } from "vue-router";
import SideBar from "../components/SideBar.vue";
export default {
  components: { SideBar },

  setup() {
    let router = useRouter();
    let user = inject("user");
    console.log(user.value);
    let folderId = ref('')
    provide("folderId", folderId)

    if (!user.value) {
      let idUser = localStorage.getItem("user");
      if (idUser) {
        fetch(`http://localhost:3001/api/usuarios/${idUser}`)
          .then((res) => res.json())
          .then((json) => (user.value = json));
      }
    }

    !user.value ? router.push("/dashboard") : null;

    watch(user, () => {
      !user.value ? router.push("/dashboard") : null;
    });

    let todoTasks = [];
    let completedTasks = [];

    return { user, folderId };
  },
};
</script>
