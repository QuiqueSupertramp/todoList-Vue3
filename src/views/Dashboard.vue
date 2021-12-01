<template>
  <div class="dashboard">
    <side-bar />
    <router-view></router-view>
  </div>
</template>

<script>
import { inject, ref, provide } from "vue";
import { useRouter } from "vue-router";
import SideBar from "../components/SideBar.vue";

export default {
  components: { SideBar },

  setup() {
    let router = useRouter();
    let user = inject("user");
    let folderId = ref("AllTasks");
    let AllTasks = ref([]);
    let AllFolders = ref([]);

    folderId = router.currentRoute.value.params.idFolder;

    provide("folderId", folderId);
    provide("AllTasks", AllTasks);
    provide("AllFolders", AllFolders);

    if (user.value) {
      user.value.tasks.forEach((task) => {
        AllTasks.value.push(task);
      });
    }

    let todoTasks = [];
    let completedTasks = [];
  },
};
</script>

<style scoped></style>
