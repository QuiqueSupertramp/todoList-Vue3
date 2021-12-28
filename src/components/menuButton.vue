<template>
  <div v-if="isInside" class="menuButton" @click="toggleMenu">
    <img class="menuButton__img" src="@/assets/logo.png" alt="" />
  </div>
</template>

<script>
import { watchEffect, ref } from "@vue/runtime-core";
import { useRouter } from "vue-router";
import { checkRoute } from "./helpers/checkRoute.js";

export default {
  setup() {
    let router = useRouter();
    let isInside = ref(false);

    let toggleMenu = () => {
      let menu = document.querySelector(".folderList");
      menu.classList.toggle("showMenu");
    };

    watchEffect(() => {
      checkRoute(router, "Folder", isInside);
    });

    return { toggleMenu, isInside };
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

@media (hover: hover) {
  .menuButton {
    display: none;
  }
}
</style>
