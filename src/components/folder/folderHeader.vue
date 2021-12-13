<template>
  <div class="folderHeader">
    <h2>{{ currentFolder.data.name }}</h2>
    <button
      v-if="currentFolder.data.name !== 'All Tasks'"
      @click="deleteFolder"
    >
      Borrar Carpeta
    </button>
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
      await deleteFolderById(currentFolder.data._id);
      await getUser();
      router.push("/dashboard/AllTasks");
    };

    return { deleteFolder, currentFolder };
  },
};
</script>

<style scoped>
h2 {
    margin: 0;
}
.folderHeader {
    padding-bottom: 5px;
    /* border-bottom: 1px solid #f0f0f0; */
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
}
</style>