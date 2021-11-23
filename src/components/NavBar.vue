<template>
  <nav class="nav">
    <h1>TODO LIST</h1>
    <div class="nav-links" v-if="!user.name">
      <router-link to="/login">Login</router-link>
      <router-link to="/register" class="btn-register"
        >Pruebalo gratis!</router-link
      >
    </div>
    <div v-else class="nav-links">
      <p>Hello {{ user.name }}!</p>
      <span class="material-icons-outlined"> logout </span>
    </div>
  </nav>
</template>

<script>
import { inject } from "vue";
export default {
  setup() {
    let user = inject("user");
    return { user };
  },
};
</script>

<style>
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 1rem;
}

h1 {
  color: var(--color-blue);
}
.btn-register {
  border: 1px solid var(--color-blue);
  border-radius: 5px;
  color: var(--color-blue);
  padding: 0 10px;
  font-size: 12px;
}
.nav-links {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
</style>
