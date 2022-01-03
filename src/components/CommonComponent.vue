<template>
  <div v-if="loading" class="loader">
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

    // Creamos el modelo de User
    const user = reactive({
      data: {
        _id: "",
        name: "",
        email: "",
        password: "",
        folders: [],
        tasks: [],
      },
      AllTodoTasks: computed(() => {
        return user.data.tasks.filter((task) => task.status == false);
      }),
      AllCompletedTasks: computed(() => {
        return user.data.tasks.filter((task) => task.status == true);
      }),
    });

    provide("user", user);

    let loading = ref(false);
    provide("loading", loading);

    // FUNCIÓN PARA OBTENER EL USUARIO
    let getUser = async () => {
      // Activamos loader si tarda mas de medio segundo
      let load = setInterval(() => {
        loading.value = true;
      }, 500);
      // Buscamos el usuario por Id en la base de datos
      let res = await getUserById();
      // Si existe, lo añadimos, sino salimos
      if (res !== undefined) {
        user.data = res;
        loading.value = false;
        clearInterval(load);
      } else {
        loading.value = false;
        clearInterval(load);
        router.push("/");
      }
    };

    provide("getUser", getUser);

    // Seguimiento del usuario
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
  background-color: #00000044;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 990;
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
