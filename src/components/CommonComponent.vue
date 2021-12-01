<template>
  <nav-bar />
  <router-view />
</template>

<script>
import { provide, ref, watchEffect } from "@vue/runtime-core";
import { useRouter } from "vue-router";

import NavBar from "./NavBar.vue";

export default {
  components: { NavBar },
  async setup() {
    const router = useRouter();

    const user = ref(null);
    provide("user", user);

    let comprobarLocalStorage = async () => {
      let userStorageId = localStorage.getItem("user");
      if (userStorageId) {
        let data = await fetch(
          `http://localhost:3001/api/usuarios/${userStorageId}`
        );
        let json = await data.json();
        user.value = json;
      }
    };

    await comprobarLocalStorage();

    watchEffect(() => {
      !user.value
        ? router.push("/")
        : null
    });
  },
};
</script>
