<template>
  <div v-if="loading === true" class="loader">
    <div class="spinner"></div>
  </div>
  <nav-bar />
  <router-view />
  <menu-button />
</template>

<script>
import {
  provide,
  ref,
  reactive,
  watchEffect,
  computed,
} from "@vue/runtime-core";
import { useRouter } from "vue-router";
import { getUserById } from "./crud.js";

import NavBar from "./NavBar.vue";
import menuButton from "./menuButton.vue";

export default {
  components: { NavBar, menuButton },
  async setup() {
    const router = useRouter();

    const user = reactive({
      data: {
        tasks: [],
        folders: [],
      },
    });
    const AllTasks = ref([]);
    const AllFolders = ref([]);
    const AllTodoTasks = computed(() => {
      return AllTasks.value.filter((task) => task.status === false);
    });

    provide("user", user);
    provide("AllTasks", AllTasks);
    provide("AllFolders", AllFolders);
    provide("AllTodoTasks", AllTodoTasks);

    let loading = ref(false);

    let getUser = async () => {
      loading.value = true;
      let res = await getUserById();
      if (res !== undefined) {
        user.data = res;
        AllFolders.value = user.data.folders;
        AllTasks.value = user.data.tasks;
        loading.value = false;
      } else {
        user.data = "";
        loading.value = false;
        router.push("/");
      }
    };

    user.data ? router.push("/dashboard/AllTasks") : null;

    provide("getUser", getUser);

    watchEffect(async () => {
      await getUser();
    });

    return { loading };
  },
};
</script>

<style>
.loader {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #fafafabb;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.spinner {
  width: 36px;
  height: 36px;
  border: 4px solid transparent;
  border-radius: 50%;
  border-left: 4px solid var(--color-blue);
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
