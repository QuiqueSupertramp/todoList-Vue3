<template>
  <div v-if="matchMediaDetect" class="menuButton" @click="toggleMenu">
    <img class="menuButton__img" src="@/assets/logo.png" alt="" />
  </div>
</template>

<script>
import { inject } from "@vue/runtime-core";
export default {
  setup() {
    let matchMediaDetect = inject("matchMediaDetect");
    let toggleMenu = () => {
      let menu = document.querySelector(".folderList");
      menu.classList.toggle("showMenu");
    };

    return { toggleMenu, matchMediaDetect };
  },
};
</script>

<style scoped>
.menuButton {
  width: 60px;
  height: 60px;
  background-color: var(--color-blue);
  border-radius: 50%;
  position: fixed;
  right: 1rem;
  bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999999;
}

.menuButton__img {
  width: 30px;
}
</style>
