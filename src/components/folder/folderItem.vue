<template>
  <div class="taskItem">
    <span class="doneButton">
      <i
        class="far fa-circle"
        @mouseleave="mouseOff"
        @mouseenter="mouseOn"
        @click="changeStatus(task)"
        v-if="task.status == false"
        title="Tarea completada"
      ></i>
      <i v-else class="fas fa-check-circle" @click="changeStatus(task)"></i>
    </span>
    <p>{{ task.name }}</p>
    <form
      class="editForm"
      @focusout="updateTaskName"
      @submit.prevent="updateTaskName"
      :data-task="task._id"
    >
      <input
        type="text"
        class="editTaskInput"
        :value="task.name"
        @focusout="editTaskOff"
      />
    </form>
    <div class="taskItem__icons">
      <span class="editButton" v-if="task.status == false">
        <i class="fas fa-pen" @click="editTaskOn" title="Editar tarea"></i>
      </span>
      <span class="deleteButton">
        <i
          class="far fa-trash-alt"
          @click="deleteTask(task._id)"
          title="Borrar tarea"
        ></i>
      </span>
    </div>
  </div>
</template>

<script>
import { inject } from "vue";
import { deleteTaskById, updateTask } from "../crud.js";

export default {
  props: {
    task: Object,
  },

  setup() {
    // Variables
    let getUser = inject("getUser");

    // FUNCIÓN PARA BORRAR TAREA
    let deleteTask = async (taskId) => {
      await deleteTaskById(taskId);
      await getUser();
    };

    // FUNCIÓN PARA CAMBIAR ESTADO DE LA TAREA
    let changeStatus = async (task) => {
      let body = { status: task.status };
      task.status === false ? (body.status = true) : (body.status = false);
      await updateTask(task._id, body);
      await getUser();
    };

    // FUNCIÓN PARA EDITAR LA TAREA
    let updateTaskName = async (e) => {
      if (e.target.matches(".editForm")) {
        let body = { name: e.target.firstElementChild.value };
        let taskId = e.target.dataset.task;
        await updateTask(taskId, body);
        await getUser();
        e.target.firstElementChild.blur();
      }
    };

    // FUNCIONES DE ESCUCHA
    let editTaskOn = (e) => {
      let editButton = e.target.parentElement;
      let taskItem = e.target.parentElement.parentElement.parentElement;
      let taskText = taskItem.children[1];
      let editInput = taskItem.children[2];

      editButton.style.color = "var(--color-white)";
      editButton.style.backgroundColor = "#0066ff88";
      taskText.style.display = "none";
      editInput.style.display = "block";
      editInput.children[0].focus();
      taskItem.style.borderBottom = "1px solid transparent";
      taskItem.style.boxShadow = "1px 1px 10px #0004, -1px -1px 10px #fff4";
    };

    let editTaskOff = (e) => {
      let editButton = e.target.parentElement.nextElementSibling.children[0];
      let taskItem = e.target.parentElement.parentElement;
      let taskText = taskItem.children[1];
      let editInput = taskItem.children[2];

      editButton.style.color = "var(--color-mediumblue)";
      editButton.style.backgroundColor = "var(--color-white)";
      taskText.style.display = "block";
      editInput.style.display = "none";
      taskItem.style.borderBottom = "1px solid #f0f0f0";
      taskItem.style.boxShadow = "none";
    };

    let mouseOn = (e) => {
      e.target.classList.add("fas", "fa-check-circle");
      e.target.classList.remove("far", "fa-circle");
    };

    let mouseOff = (e) => {
      e.target.classList.remove("fas", "fa-check-circle");
      e.target.classList.add("far", "fa-circle");
    };

    return {
      deleteTask,
      changeStatus,
      editTaskOn,
      editTaskOff,
      updateTaskName,
      mouseOn,
      mouseOff,
    };
  },
};
</script>

<style scoped>
.taskItem {
  min-height: 45px;
  padding: 0 0.4rem;
  /* border: 2px solid var(--color-white); */
  border-bottom: 1px solid #f0f0f088;
  /* border-top: 1px solid transparent; */
  display: flex;
  align-items: center;
  border-radius: 5px;
}

i {
  font-size: 12px;
  padding: 0.2rem;
  border-radius: 50%;
}

.taskItem__icons {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.1rem;
}

p {
  width: 100%;
  padding: 0 10px;
  margin: 0;
}

p::first-letter {
  text-transform: uppercase;
}

form {
  width: 100%;
  display: none;
}

input {
  font-size: 14px;
}

span {
  font-size: 16px;
  color: var(--color-mediumgrey);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 24px;
  height: 24px;
}

.doneButton {
  color: var(--color-orange);
}
.doneButton i {
  font-size: 16px;
}

.editTaskInput {
  width: 100%;
}

.deleteButton,
.editButton {
  color: var(--color-mediumblue);
}

.deleteButton {
  color: var(--color-mediumred);
}

.deleteButton,
.editButton {
  border-radius: 50%;
}

@media (hover: hover) {
  .editButton {
    color: var(--color-mediumblue);
  }

  .deleteButton {
    color: red;
  }
  .doneButton i:hover {
    color: var(--color-orange);
  }

  .deleteButton:hover {
    color: white;
    background-color: var(--color-mediumred);
  }

  .editButton:hover {
    color: white !important;
    background-color: var(--color-mediumblue) !important;
  }
}
</style>
