<template>
  <div class="folderView">
    <div class="folderHeader">
      <h2>{{ folderName }}</h2>
      <button @click="deleteFolder">Borrar Carpeta</button>
    </div>
    <div class="todoList">
      <div v-for="(task, index) in todoTasks" :key="index">
        {{ task.name }}
      </div>
    </div>
    <div class="completedList">
      <h3>COmpleted</h3>
      <div v-for="(task, index) in completedTasks" :key="index">
        {{ task.name }}
      </div>
    </div>
  </div>
</template>

<script>
import { inject, ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
export default {
  setup() {
    let router = useRouter();
    let folderId = inject("folderId");
    let AllTasks = inject("AllTasks");
    let AllFolders = inject("AllFolders");

    let folderName = ref("");
    let todoTasks = ref([]);
    let completedTasks = ref([]);

    let deleteFolder = async () => {
      let data = await fetch(`http://localhost:3001/api/carpetas/${folderId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (data.ok) {
        console.log(data);
        let json = await data.json()
        console.log(json.data._id)
        let i = AllFolders.value.map(folder => folder._id).indexOf(json.data._id);
        i !== -1 && AllFolders.value.splice(i, 1);
        folderId = "AllTasks";
        router.push("/dashboard/AllTasks");
      }
    };

    watchEffect(() => {
      todoTasks.value = [];
      completedTasks.value = [];

      folderId = router.currentRoute.value.params.idFolder;

      if (folderId === "AllTasks") {
        folderName.value = "All Tasks";
        AllTasks.value.forEach((task) => {
          !task.status
            ? todoTasks.value.push(task)
            : completedTasks.value.push(task);
        });
      } else {
        fetch(`http://localhost:3001/api/carpetas/${folderId}`)
          .then((res) => res.json())
          .then((json) => {
            folderName.value = json.name;
            json.tasks.forEach((task) => {
              !task.status
                ? todoTasks.value.push(task)
                : completedTasks.value.push(task);
            });
          });
      }
    });

    return { todoTasks, completedTasks, folderName, deleteFolder };
  },
};
</script>

<style scoped>
.folderView {
  margin-left: 300px;
}
</style>
