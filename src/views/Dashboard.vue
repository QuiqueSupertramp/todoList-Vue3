<template>
  <div>
    <h1>Dashboard</h1>
    <p>Hello {{ user.name }}</p>
    <div v-for="(folder, index) in AllFolders" :key="index">
      {{ folder }}
    </div>
    <side-bar />
  </div>
</template>

<script>
import { inject, watch } from "vue";
import { useRouter } from "vue-router";
import SideBar from "../components/SideBar.vue";
export default {
  components: { SideBar },

  setup() {
    let router = useRouter();
    let user = inject("user");

    !user.value ? router.push("/") : null;

    watch(user, () => {
      !user.value ? router.push("/") : null;
    });

    let AllFolders = [];
    let AllTasks = []
    let todoTasks = []
    let completedTasks = []

    user.value.folders.forEach((folder) => {
      AllFolders.push(folder.name);
    });

    return { user, AllFolders };
  },
};
</script>
