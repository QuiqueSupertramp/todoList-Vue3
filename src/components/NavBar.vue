<template>
  <nav class="nav">
    <router-link class="title" to="/"><h1>TODO LIST</h1></router-link>
    <div class="nav-links" v-if="!user.name">
      <router-link to="/register" class="btn-register"
        >Registrarse</router-link
      >
    </div>
    <div v-else class="nav-links">
      <p>Hello {{ user.name }}!</p>
      <span class="material-icons-outlined logout" @click="logout"> logout </span>
    </div>
  </nav>
</template>

<script>
import { inject } from "vue";
export default {
  setup() {
    let user = inject("user");
    let logout = ()=> {
      let r = confirm("seguro que quieres salir?")
      r ? (user.value = '', localStorage.removeItem("user")) : null
    }
    return { user, logout };
  },
};
</script>

<style>
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  background-color: var(--color-blue);
  height: 9vh;
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
  border: 2px solid orange;
  color: var(--color-white);
  background-color: orange;
}
.nav-links {
  display: flex;
  align-items: center;
  gap: 1rem;
  color: var(--color-white);
}

</style>
