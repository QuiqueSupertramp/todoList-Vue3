<template>
  <nav class="nav">
    <router-link class="title" to="/"><h1>TODO LIST</h1></router-link>
    <div class="nav-links" v-show="!user.data.name && !isInside2">
      <router-link to="/register" class="btn-register">Registrarse</router-link>
    </div>
    <div v-show="user.data.name" class="nav-links">
      <p>Hola {{ user.data.name }}!</p>
      <span class="material-icons-outlined logout" @click="logout">
        logout
      </span>
    </div>
  </nav>
</template>

<script>
import { inject, watchEffect, ref } from "vue";
import { checkRoute } from "@/components/helpers/checkRoute.js";
import { useRouter } from "vue-router";
export default {
  setup() {
    let user = inject("user");
    let getUser = inject("getUser");
    let router = useRouter();
    let isInside2 = ref(false);

    let logout = () => {
      let r = confirm("seguro que quieres salir?");
      r ? (localStorage.removeItem("user"), getUser()) : null;
    };

    watchEffect(() => {
      checkRoute(router, "Register", isInside2);
    });

    return { user, logout, isInside2 };
  },
};
</script>

<style scoped>
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  background-color: var(--color-blue);
  height: 3rem;
  margin-bottom: 2rem;
  position: fixed;
  width: 100vw;
  z-index: 992;
}

h1 {
  margin: 0;
}
.title:hover {
  color: var(--color-white);
}
.title.router-link-exact-active {
  color: var(--color-white);
}
.btn-register {
  border: 2px solid var(--color-white);
  border-radius: 5px;
  padding: 0 10px;
}
.btn-register:hover {
  border: 2px solid var(--color-orange);
  color: var(--color-dark);
  background-color: var(--color-orange);
}
.nav-links {
  display: flex;
  align-items: center;
  gap: 1rem;
  color: var(--color-white);
}

.nav-links p {
  font-weight: bold;
}

.logout {
  color: var(--color-white);
}
</style>
