<template>
  <div class="dashboard" @click="hideMenu">
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
    let matchMediaDetect = inject("matchMediaDetect");
    let folderId = ref("AllTasks");
    const currentFolder = reactive({
      data: {},
      todoTasks: [],
      completedTasks: [],
    });
    provide("currentFolder", currentFolder);
    provide("folderId", folderId);

    let hideMenu = (e) => {
      if (matchMediaDetect) {
        if (
          e.target.matches("#folderForm") ||
          e.target.matches("#folderForm *")
        ) {
          return;
        }
        document.querySelector(".folderList").classList.remove("showMenu");
      }
    };

    return { hideMenu };
  },
};
</script>

<style scoped>
.dashboard {
  margin-left: 7vw;
  margin-right: 7vw;
  min-height: calc(100vh - 5rem);
}

@media (hover: hover) {
  .dashboard {
    margin-left: 350px;
    margin-right: 50px;
    min-height: calc(100vh - 5rem);
  }
}
</style>
