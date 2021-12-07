<template>
  <nav-bar />
  <router-view />
</template>

<script>
import {
  provide,
  ref,
  reactive,
  watchEffect,
  computed,
  watch,
} from "@vue/runtime-core";
import { useRouter } from "vue-router";
import { getUserById } from "./crud.js";

import NavBar from "./NavBar.vue";

export default {
  components: { NavBar },
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

    provide("user", user);
    provide("AllTasks", AllTasks);
    provide("AllFolders", AllFolders);

    let getUser = async () => {
      let res = await getUserById();
      if (res !== undefined) {
        user.data = res;
        AllFolders.value = user.data.folders;
        AllTasks.value = user.data.tasks;
      } else {
        user.data = "";
        router.push("/");
      }
    };

    user.data ? router.push("/dashboard/AllTasks") : null;

    provide("getUser", getUser);

    watchEffect(async () => {
      await getUser();
      // user.data = '' ? router.push("/") : null;
    });
  },
};
</script>
