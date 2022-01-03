<template>
  <div class="dashboard">
    <side-bar />
    <router-view></router-view>
  </div>
</template>

<script>
import { ref, provide, reactive, inject, computed } from "vue";
import { useRouter } from "vue-router";
import SideBar from "../components/SideBar.vue";

export default {
  components: { SideBar },

  setup() {
    // Variables
    let router = useRouter();
    let folderId = ref("AllTasks");
    let user = inject("user");

    // Creamos objeto con datos reactivos de la carpeta que está visualizando el usuario
    const activeFolder = reactive({
      data: {
        name: "AllTasks",
        tasks: [],
      },
      todoTasks: computed(() => {
        return activeFolder.data.tasks.filter((task) => task.status == false);
      }),
      completedTasks: computed(() => {
        return activeFolder.data.tasks.filter((task) => task.status == true);
      }),
    });

    provide("activeFolder", activeFolder);

    // FUNCIÓN PARA OBTENER DATOS DE LA CARPETA ACTIVA
    const getActiveFolder = () => {
      // Obtenemos el Id de la carpeta de los parametros de la ruta
      folderId = router.currentRoute.value.params.idFolder;

      // Si es undefined, salimos
      if (folderId === undefined) return;

      // Rellenamos el objeto activeFolder
      if (folderId === "AllTasks") {
        activeFolder.data = {
          name: "All Tasks",
          tasks: user.data.tasks,
        };
      } else {
        let folder = user.data.folders.find((item) => item._id == folderId);
        if (folder) {
          activeFolder.data = {
            name: folder.name,
            tasks: folder.tasks,
            _id: folder._id,
          };
        }
      }
    };

    provide("getActiveFolder", getActiveFolder);
  },
};
</script>

<style scoped>
.dashboard {
  margin-left: 7vw;
  margin-right: 7vw;
  min-height: calc(100vh - 5rem);
}

@media (hover: hover) {
  .dashboard {
    margin-left: 350px;
    margin-right: 50px;
    min-height: calc(100vh - 5rem);
  }
}
</style>
