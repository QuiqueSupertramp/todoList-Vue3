<template>
  <Suspense>
    <common-component></common-component>
  </Suspense>
</template>

<script>
import CommonComponent from "./components/CommonComponent.vue";

export default {
  components: { CommonComponent },
  setup() {

  },
};
</script>

<style>
:root {
  --color-white: #fafafa;
  --color-blue: #1061e6;
  --color-dark: #16233f;
  --color-grey: #a1a7b6;
  --color-ligthgrey: #f5f5f5;
}
body {
  margin: 0;
  background-color: var(--color-white);
}
* {
  box-sizing: border-box;
}
h1 {
  font-size: 2em;
}
#app {
  color: var(--color-dark);
  font-family: "Open Sans", sans-serif;
  font-size: 15px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

a {
  font-weight: 500;
  color: var(--color-white);
  text-decoration: none;
  line-height: 2;
  padding: 0 10px;
  border-radius: 5px;
  display: inline-block;
}

a:hover {
  color: orange;
}

a.router-link-exact-active {
  color: orange;
}

input {
  font-family: "Open Sans", sans-serif;
  outline: none;
  border: none;
  padding: 10px 10px;
  background-color: transparent;
  color: var(--color-black);
}

.material-icons-outlined {
  font-size: 20px;
}
</style>
