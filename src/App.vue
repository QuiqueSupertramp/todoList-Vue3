<template>
  <Suspense>
    <common-component></common-component>
  </Suspense>
</template>

<script>
import CommonComponent from "./components/CommonComponent.vue";

export default {
  components: { CommonComponent },
  setup() {},
};
</script>

<style>
:root {
  --color-white: #fafafa;
  --color-blue: #0066ff;
  --color-mediumblue: #62a1ffbb;
  --color-dark: #16233f;
  --color-grey: #a1a7b6;
  --color-mediumgrey: #cccccc;
  --color-ligthgrey: #f5f5f5;
  --color-orange: #f7b859;
  --color-mediumred: #fa8383;
}
body {
  margin: 0;
  background-color: var(--color-white);
}
* {
  box-sizing: border-box;
  word-break: break-word;
}
h1 {
  font-size: 1.8em;
}

#app {
  color: var(--color-dark);
  font-family: "Open Sans", sans-serif;
  font-size: 14px;
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

input[type="submit"] {
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
}

.material-icons-outlined {
  font-size: 20px;
}
</style>
