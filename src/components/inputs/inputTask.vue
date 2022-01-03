<template>
  <form
    @submit.prevent="addTask"
    id="taskForm"
    @mouseenter="mouseOn"
    @mouseleave="mouseOut"
  >
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
import { ref, inject } from "vue";
import { addNewTask } from "@/components/crud.js";

export default {
  setup() {
    // Variables
    let newTaskName = ref("");
    let user = inject("user");
    const activeFolder = inject("activeFolder");
    const getUser = inject("getUser");

    // FUNCIONES DE ESCUCHA
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

    // FUNCIÓN DE AGREGAR TAREA
    let addTask = async (e) => {
      // Creamos objeto con los datos de la nueva tarea
      let body = {
        name: newTaskName.value,
        folder: activeFolder.data._id,
        user: user.data._id,
      };

      // Añadimos tarea a la base de datos
      let { data } = await addNewTask(body);

      // Si es correcto, limpiamos y actualizamos usuario
      if (data.ok) {
        newTaskName.value = "";
        e.target.lastElementChild.blur();
        await getUser();
      }
    };

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
