<template>
  <nav class="nav">
    <router-link class="title" to="/"><h1>TODO LIST</h1></router-link>
    <div class="nav-links" v-show="!data.name && !isInside2">
      <router-link to="/register" class="btn-register">Registrarse</router-link>
    </div>
    <div v-if="data.name" class="nav-links">
      <p>Hola {{ data.name }}!</p>
      <span class="material-icons-outlined logout" @click="logout">
        logout
      </span>
    </div>
  </nav>
</template>

<script>
import { inject, watchEffect, ref, toRefs } from "vue";
import { checkRoute } from "@/components/helpers/checkRoute.js";
import { useRouter } from "vue-router";
export default {
  setup() {
    // Variables
    let user = inject("user");
    let getUser = inject("getUser");
    let router = useRouter();
    let isInside2 = ref(false);

    // FUNCIÓN PARA CERRAR SESIÓN
    let logout = () => {
      // Confirmamos que el usuario desea salir
      let r = confirm("seguro que quieres salir?");
      r ? (localStorage.removeItem("user"), getUser()) : null;
    };

    // Seguimiento para saber si estamos dentro o no
    watchEffect(() => {
      checkRoute(router, "Register", isInside2);
    });

    // Extraemos los datos de user que pasaremos al template
    const { data } = toRefs(user);

    return { data, logout, isInside2 };
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
  width: 100%;
  z-index: 992;
}

@media screen and (max-width: 600px) {
  .nav {
    padding: 0 1rem;
  }
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
  text-transform: capitalize;
}

.logout {
  color: var(--color-white);
  cursor: pointer;
}
</style>
