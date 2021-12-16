<template>
  <form @submit.prevent="addTask" id="taskForm" @mouseenter="mouseOn" @mouseleave="mouseOut">
    <input class="inputIcon" type="submit" value="+" />
    <input
      type="text"
      class="inputNewTaskName"
      v-model="newTaskName"
      placeholder="Añadir tarea"
      @focus="focusOn"
      @focusout="focusOut"
    />
  </form>
</template>

<script>
import { ref, inject, watchEffect, watch } from "vue";
import { useRouter } from "vue-router";
export default {
  setup() {
    let router = useRouter();
    let newTaskName = ref("");
    let user = inject("user");
    let folderId = inject("folderId");
    const AllTasks = inject("AllTasks");
    let AllFolders = inject("AllFolders");
    let todoTasks = inject("todoTasks");
    const currentFolder = inject("currentFolder");
    const getUser = inject("getUser");

    let focusOn = (e) => {
      document.getElementById("taskForm").style.border =
        "2px solid var(--color-mediumgrey)";      
    };

    let focusOut = (e) => {
      document.getElementById("taskForm").style.border =
        "2px solid var(--color-white)";
      e.target.parentElement.firstElementChild.style.backgroundColor =
        "var(--color-white)";
      e.target.value = "";
    };

    let mouseOn = (e) => {
      e.target.firstElementChild.style.backgroundColor =
        "var(--color-ligthgrey)";
    };

    let mouseOut = (e) => {
      if (document.activeElement.matches(".inputNewTaskName")) {
        return;
      }
      e.target.firstElementChild.style.backgroundColor = "var(--color-white)";
    };

    let addTask = async (e) => {
      let data = {
        name: newTaskName.value,
        folder: currentFolder.data._id,
        user: user.data._id,
      };

      let fetchData = await fetch("https://apiserver-todolist.herokuapp.com/api/tareas", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      let json = await fetchData.json();

      if (fetchData.ok) {
        AllTasks.value.push(json);
        currentFolder.todoTasks.push(json);
        currentFolder.data.tasks.push(json);
        newTaskName.value = "";
        e.target.lastElementChild.blur()
        await getUser();
      }
    };

    // watchEffect(() => {
    //   folderId = router.currentRoute.value.params.idFolder;
    // });

    return { newTaskName, addTask, mouseOn, mouseOut, focusOn, focusOut };
  },
};
</script>

<style scoped>
form {
  height: 45px;
  display: flex;
  align-items: center;
  padding: 0 0.4rem;
  border-radius: 5px;
  border: 2px solid var(--color-white);
  width: 100%;
  min-width: fit-content;
}

input {
  width: calc(100% - 48px);
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
}
</style>
