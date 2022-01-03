<template>
  <div class="folderHeader">
    <h2>{{ activeFolder.data.name }}</h2>
    <img
      src="@/assets/delete.png"
      alt="Borrar carpeta"
      title="Borrar carpeta"
      v-if="activeFolder.data.name !== 'All Tasks'"
      @click="deleteFolder"
    />
  </div>
</template>

<script>
import { inject } from "vue";
import { useRouter } from "vue-router";
import { deleteFolderById } from "../crud.js";

export default {
  setup() {
    // Variables
    let router = useRouter();
    let getUser = inject("getUser");
    let activeFolder = inject("activeFolder");

    // FUNCIÓN PARA BORRAR CARPETA
    let deleteFolder = async () => {
      // Confirmamos si el susuario desea borrar la carpeta
      let r = confirm("Deseas borrar esta carpeta");

      // Si acepta, borramos, actualizamos usuario y redirigimos
      if (r) {
        await deleteFolderById(activeFolder.data._id);
        await getUser();
        router.push("/dashboard/AllTasks");
      }
    };

    return { deleteFolder, activeFolder };
  },
};
</script>

<style scoped>
h2 {
  margin: 0;
}

h2::first-letter {
  text-transform: uppercase;
}

.folderHeader {
  padding-bottom: 5px;
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  gap: 2rem;
}

img {
  width: 24px;
  cursor: pointer;
}
</style>
