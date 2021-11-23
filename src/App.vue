<template>
  <nav-bar />
  <router-view />
</template>

<script>
import { provide, ref, watchEffect } from "@vue/runtime-core";
import NavBar from "./components/NavBar.vue";
export default {
  components: { NavBar },
  setup() {
    const user = ref({});
    provide("user", user);
    watchEffect(() => console.log(user.value));
  },
};
</script>

<style>
:root {
  --color-white: #fafafa;
  --color-blue: #0052cc;
  --color-dark: #111111;
  --color-grey: #888;
}
body {
  margin: 0;
  background-color: var(--color-white);
}
* {
  box-sizing: border-box;
}
#app {
  color: var(--color-dark);
  font-family: "Open Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* color: #2c3e50; */
}

a {
  font-weight: 500;
  color: var(--color-grey);
  text-decoration: none;
  font-size: 13px;
  line-height: 2;
}

a.router-link-exact-active {
  color: var(--color-dark);
}

.material-icons-outlined {
  font-size: 18px;
}
</style>
