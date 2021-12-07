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
        <span>{{ AllTasks.length }}</span>
      </div>
    </router-link>
    <div>
      <h3>Carpetas</h3>
      <div
        class="folder"
        @mouseenter="mouseEnter"
        @mouseleave="mouseLeave"
        v-for="(folder, index) in AllFolders"
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
            <span>{{ folder.tasks.length }}</span>
          </div>
        </router-link>
        <div class="itemOptions">
          <span
            class="material-icons-outlined"
            @click="deleteFolder(folder._id)"
          >
            highlight_off
          </span>
        </div>
      </div>
    </div>
    <input-folder />
  </div>
</template>

<script>
import { inject } from "vue";
import { router, useRouter } from "vue-router";
import inputFolder from "./inputFolder.vue";

export default {
  components: { inputFolder },
  setup() {
    let router = useRouter();
    let AllFolders = inject("AllFolders");
    let AllTasks = inject("AllTasks");
    let getUser = inject("getUser");

    let deleteFolder = async (folder) => {
      let folderId = router.currentRoute.value.params.idFolder

      console.log(folderId);

      let r = confirm("Quieres borrar esta carpeta?");
      if (r) {
        let data = await fetch(`http://localhost:3001/api/carpetas/${folder}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (data.ok) {
          console.log(data);
          let json = await data.json();
          console.log(json);
          await getUser();
          folder == folderId ? router.push("/dashboard/AllTasks") : null;
        }
      }
    };

    let mouseEnter = (e) => {
      e.target.querySelector(".itemOptions").style.display = "flex";
      e.target.firstElementChild.style.backgroundColor = "#ebebeb";
    };
    let mouseLeave = (e) => {
      e.target.querySelector(".itemOptions").style.display = "none";
      e.target.firstElementChild.style.backgroundColor = "inherit";
    };

    return { AllFolders, AllTasks, mouseEnter, mouseLeave, deleteFolder };
  },
};
</script>

<style scoped>
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
  height: 91vh;
  position: fixed;
  top: 9vh;
  left: 0;
  padding: 1.5rem;
}

.folder {
  position: relative;
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.7rem;
  width: 100%;
}

.folderItemText p {
  width: 100%;
  margin: 0;
}

.folderItemText span {
  font-size: 12px;
  color: var(--color-grey);
}

.itemOptions {
  position: absolute;
  right: 0;
  background-color: inherit;
  display: none;
  padding-right: 7.5px;
  align-items: center;
  top: 0;
  bottom: 0;
}

.itemOptions span {
  color: var(--color-grey);
  font-size: 16px;
  margin: 0;
  background-color: #ebebeb;
}

.itemOptions span:hover {
  color: red;
}
</style>
