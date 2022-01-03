<template>
  <form
    @submit.prevent="addFolder"
    id="folderForm"
    @mouseenter="mouseOn"
    @mouseleave="mouseOut"
  >
    <input class="inputIcon" type="submit" value="+" />
    <input
      @focus="focusOn"
      @focusout="focusOut"
      type="text"
      placeholder="Añadir carpeta"
      v-model="newFolderName"
      class="inputNewFolderName"
    />
  </form>
</template>

<script>
import { inject, ref } from "vue";
import { useRouter } from "vue-router";
import { addNewFolder } from "@/components/crud.js";

export default {
  setup() {
    // Variables
    let router = useRouter();
    let user = inject("user");
    let getUser = inject("getUser");
    let newFolderName = ref("");

    // FUNCIONES DE ESCUCHA
    let focusOn = (e) => {
      document.getElementById("folderForm").style.border =
        "2px solid var(--color-mediumgrey)";
      e.target.parentElement.firstElementChild.style.backgroundColor =
        "#ebebeb";
    };

    let focusOut = (e) => {
      document.getElementById("folderForm").style.border =
        "2px solid transparent";
      e.target.parentElement.firstElementChild.style.backgroundColor =
        "var(--color-ligthgrey)";
      e.target.value = "";
    };

    let mouseOn = (e) => {
      if (document.activeElement.matches(".inputNewFolderName")) {
        return;
      }
      if (matchMedia("(hover:hover)").matches) {
        e.target.firstElementChild.style.backgroundColor = "#ebebeb";
      }
    };

    let mouseOut = (e) => {
      if (document.activeElement.matches(".inputNewFolderName")) {
        return;
      }
      e.target.firstElementChild.style.backgroundColor =
        "var(--color-ligthgrey)";
    };

    // FUNCIÓN PARA AÑADIR CARPETA
    let addFolder = async (e) => {
      // Creamos objeto con los datos de la nueva carpeta a enviar
      let data = {
        name: newFolderName.value,
        user: user.data._id,
      };
      // Agregamos la carpeta a la base de datos
      let json = await addNewFolder(data);
      // Si es correto, actualizamos usuario, enviamos a carpeta nueva y cerramos menu
      if (json) {
        newFolderName.value = "";
        await getUser();
        router.push(`/dashboard/${json.data._id}`);
        e.target.lastElementChild.blur();
        document.querySelector(".folderList").classList.remove("showMenu");
        document
          .getElementById("menuButtonOne")
          .classList.remove("menuButton__line--one");
        document
          .getElementById("menuButtonTwo")
          .classList.remove("menuButton__line--two");
        document
          .getElementById("menuButtonThree")
          .classList.remove("menuButton__line--three");
        document.querySelector(".menuButton").classList.remove("active");
      }
    };

    return { newFolderName, addFolder, focusOn, focusOut, mouseOn, mouseOut };
  },
};
</script>

<style scoped>
form {
  display: flex;
  align-items: center;
  padding: 8px 10px;
  border-radius: 5px;
  border: 2px solid transparent;
}

input {
  padding: 0;
}

.inputIcon {
  border-radius: 50%;
  width: 24px;
  height: 24px;
  padding: 0;
  font-size: 22px;
  font-weight: bold;
  line-height: 1;
  color: var(--color-blue);
  margin-right: 0.7rem;
}
</style>
