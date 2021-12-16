<template>
  <div class="folderHeader">
    <h2>{{ currentFolder.data.name }}</h2>
    <img
      src="@/assets/delete.png"
      alt="Borrar carpeta"
      title="Borrar carpeta"
      v-if="currentFolder.data.name !== 'All Tasks'"
      @click="deleteFolder"
    />
  </div>
</template>

<script>
import { inject } from "vue";
import { useRouter } from "vue-router";
import { deleteFolderById } from "../crud.js";

export default {
  props: {
    name: {
      type: String,
      default: "All Tasks",
    },
  },

  setup() {
    let router = useRouter();
    let getUser = inject("getUser");
    let currentFolder = inject("currentFolder");

    let deleteFolder = async () => {
      let r = confirm("Deseas borrar esta carpeta");
      if (r) {
        await deleteFolderById(currentFolder.data._id);
        await getUser();
        router.push("/dashboard/AllTasks");
      }
    };

    return { deleteFolder, currentFolder };
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
}
</style>
