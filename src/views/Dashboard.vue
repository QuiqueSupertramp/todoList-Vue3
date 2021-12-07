<template>
  <div class="dashboard">
    <side-bar />
    <router-view></router-view>
  </div>
</template>

<script>
import { inject, ref, provide, reactive } from "vue";
import { useRouter } from "vue-router";
import SideBar from "../components/SideBar.vue";

export default {
  components: { SideBar },

  setup() {
    let router = useRouter();
    let user = inject("user");
    let folderId = ref("AllTasks");
    const currentFolder = reactive({
      data: {},
      todoTasks: [],
      completedTasks: [],
    });
    provide("currentFolder", currentFolder);
    provide("folderId", folderId);


  },
};
</script>

<style scoped></style>
