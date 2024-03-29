<template>
  <div class="folderList">
    <router-link
      class="folderItem folderItemAll"
      :to="{ name: 'Folder', params: { idFolder: 'AllTasks' } }"
    >
      <div class="folderItemImg">
        <img src="@/assets/task.png" alt="" />
      </div>
      <div class="folderItemText">
        <p>Show all Tasks</p>
        <span>{{ AllTodoTasks.length }}</span>
      </div>
    </router-link>
    <h3>Carpetas</h3>
    <div class="userFolders">
      <div
        class="folder"
        @mouseenter="mouseEnter"
        @mouseleave="mouseLeave"
        v-for="(folder, index) in data.folders"
        :key="index"
      >
        <router-link
          class="folderItem"
          :to="{
            name: 'Folder',
            params: { idFolder: folder._id, name: folder.name },
          }"
        >
          <div class="folderItemImg">
            <img src="@/assets/folder.png" alt="" />
          </div>
          <div class="folderItemText">
            <p>{{ folder.name }}</p>
            <span>{{
              folder.tasks.filter((task) => task.status === false).length
            }}</span>
            <div class="itemOptions">
              <i
                class="fas fa-trash"
                @click="deleteFolder(folder._id)"
                title="Borrar carpeta"
              ></i>
            </div>
          </div>
        </router-link>
      </div>
    </div>
    <div class="folderListEmpty" v-if="data.folders.length == 0">
      <p>Agrega tu primera carpeta 🡳</p>
    </div>
    <input-folder />
  </div>
</template>

<script>
import { inject, toRefs } from "vue";
import { useRouter } from "vue-router";
import inputFolder from "@/components/inputs/inputFolder.vue";
import { deleteFolderById } from "./crud";

export default {
  components: { inputFolder },
  setup() {
    // Variables
    let router = useRouter();
    let getUser = inject("getUser");
    let user = inject("user");

    // FUNCION PARA BORRAR CARPETA
    let deleteFolder = async (folder) => {
      // Obtenemos el id de la carpeta de la ruta atual
      let folderId = router.currentRoute.value.params.idFolder;

      // Confirmamos que el usuario desea borrar la carpeta
      let r = confirm("Quieres borrar esta carpeta?");

      // Si acepta, borramos
      if (r) {
        await deleteFolderById(folder);

        // Redirigimos
        folder == folderId
          ? router.push("/dashboard/AllTasks")
          : router.push(`/dashboard/${folderId}`);
        await getUser();
      }
    };

    // FUNCIONES ESCUCHA PARA EL RATÓN
    let mouseEnter = (e) => {
      if (matchMedia("(hover:hover)").matches) {
        e.target.querySelector(".itemOptions").style.display = "flex";
        e.target.firstElementChild.style.backgroundColor = "#ebebeb";
      }
    };
    let mouseLeave = (e) => {
      e.target.querySelector(".itemOptions").style.display = "none";
      e.target.firstElementChild.style.backgroundColor = "inherit";
    };

    // Extramos los datos de user que vamos a utilizar en el template
    const { data, AllTodoTasks } = toRefs(user);

    return {
      mouseEnter,
      mouseLeave,
      deleteFolder,
      AllTodoTasks,
      data,
    };
  },
};
</script>

<style scoped>
h3 {
  margin-top: 2rem;
}

span {
  cursor: pointer;
}

a {
  color: var(--color-black);
  line-height: 1;
  font-weight: 400;
  font-size: 14px;
}

a.router-link-exact-active {
  background-color: #ebebeb !important;
}

.folderList {
  background-color: var(--color-ligthgrey);
  width: 300px;
  height: calc(100% - 3rem);
  position: fixed;
  top: 3rem;
  left: -300px;
  padding: 1.8rem 1.5rem;
  z-index: 991;
  transition: left 0.2s ease-out;
}

.folderItemAll {
  margin-top: 0rem;
}

.userFolders {
  max-height: 55%;
  overflow: auto;
  margin-bottom: 1.5rem;
}

.userFolders::-webkit-scrollbar {
  display: none;
}

@media screen and (orientation: landscape) and (hover: none) {
  h3 {
    margin-top: 1rem;
  }

  .userFolders {
    max-height: 31%;
    overflow: auto;
  }

  .userFolders::-webkit-scrollbar {
    display: none;
  }
}

@media (hover: hover) {
  .folderList {
    left: 0;
  }

  .userFolders {
    max-height: 55%;
    overflow: auto;
  }

  .userFolders::-webkit-scrollbar {
    display: none;
  }
}

.showMenu {
  left: 0;
}

.folder {
  border-radius: 5px;
}

.folderItemAll:hover {
  background-color: #ebebeb;
}

.folderItem {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  width: 100%;
  padding: 0.4rem 10px;
  margin-bottom: 5px;
}

.folderItemImg img {
  width: 24px;
}

.folderItem span {
  color: black;
}

.folderItemText {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.7rem;
  width: 100%;
}

.folderItemText p {
  width: 100%;
  margin: 0;
  padding-right: 0.5rem;
}

.folderItemText p::first-letter {
  text-transform: uppercase;
}

.folderItemText span {
  font-size: 12px;
  color: var(--color-grey);
  width: 25px;
  text-align: center;
}

.itemOptions {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: inherit;
  display: none;
  align-items: center;
  /* width: 24px;
  height: 24px; */
  margin: auto;
}

.itemOptions i {
  color: var(--color-grey);
  font-size: 12px;
  margin: 0;
  padding: 0.4rem;
  background-color: #ebebeb;
  border-radius: 50%;
}

.itemOptions i:hover {
  color: var(--color-white);
  background-color: var(--color-mediumred);
}
</style>
