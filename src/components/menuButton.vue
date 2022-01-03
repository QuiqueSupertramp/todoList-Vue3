<template>
  <div v-if="isInside" class="menuButton">
    <div class="menuButton__lines">
      <div id="menuButtonOne" class="menuButton__line"></div>
      <div id="menuButtonTwo" class="menuButton__line"></div>
      <div id="menuButtonThree" class="menuButton__line"></div>
    </div>
  </div>
</template>

<script>
import { watchEffect, ref, inject } from "@vue/runtime-core";
import { useRouter } from "vue-router";
import { checkRoute } from "./helpers/checkRoute.js";

export default {
  setup() {
    // Variables
    let router = useRouter();
    let isInside = ref(false);
    let loading = inject("loading");

    // ELEMENTO DE ESCUCHA
    document.addEventListener("click", (e) => {
      // Si no existe el botón, salimos
      if (matchMedia("(hover:hover)").matches || !isInside.value) return;

      // Elementos del DOM
      let menuButton = document.querySelector(".menuButton");
      let menu = document.querySelector(".folderList");
      let showMenu = menu.classList.contains("showMenu");
      let btnOne = document.getElementById("menuButtonOne");
      let btnTwo = document.getElementById("menuButtonTwo");
      let btnThree = document.getElementById("menuButtonThree");

      // Si clickamos en el botón
      if (
        e.target.matches(".menuButton") ||
        e.target.matches(".menuButton *")
      ) {
        menu.classList.toggle("showMenu");
        btnOne.classList.toggle("menuButton__line--one");
        btnTwo.classList.toggle("menuButton__line--two");
        btnThree.classList.toggle("menuButton__line--three");
        menuButton.classList.toggle("active");

        loading.value === true
          ? (loading.value = false)
          : (loading.value = true);
        return;
      }

      // Si el menú está cerrado, salimos
      if (!showMenu) return;

      // Si clickamos en el input, salimos de la función, sino cerramos menú
      if (
        e.target.matches("#folderForm") ||
        e.target.matches("#folderForm *")
      ) {
        return;
      } else {
        menu.classList.remove("showMenu");
        btnOne.classList.remove("menuButton__line--one");
        btnTwo.classList.remove("menuButton__line--two");
        btnThree.classList.remove("menuButton__line--three");
        menuButton.classList.remove("active");

        loading.value === true
          ? (loading.value = false)
          : (loading.value = true);
      }
    });

    // Seguimiento de la ruta actual
    watchEffect(() => {
      checkRoute(router, "Folder", isInside);
    });

    return { isInside };
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
  box-shadow: 2px 2px 10px #000b, -2px -2px 10px #fffb;
}

.active {
  box-shadow: inset 2px 2px 10px #000b, inset -2px -2px 10px #fffb;
  transition: all 2s;
}

.menuButton__img {
  width: 30px;
}

@media (hover: hover) {
  .menuButton {
    display: none;
  }
}

.menuButton__lines {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 48%;
  height: 35%;
}

.menuButton__line {
  width: 100%;
  height: 4px;
  background-color: var(--color-white);
  border-radius: 5px;
  transition: all 0.3s;
}

.menuButton__line--one {
  transform: rotate(45deg) translate(6px, 7px);
  transition: all 0.3s;
}
.menuButton__line--two {
  width: 0px;
  transition: all 0.3s;
}
.menuButton__line--three {
  transform: rotate(-45deg) translate(6px, -6px);
  transition: all 0.3s;
}
</style>
