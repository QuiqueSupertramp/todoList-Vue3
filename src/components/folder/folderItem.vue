<template>
  <div class="taskItem">
    <span class="doneButton">
      <i
        class="far fa-circle"
        @mouseleave="mouseOffDone"
        @mouseenter="mouseOnDone"
        @click="changeStatus(task)"
        v-if="task.status == false"
        title="Tarea completada"
      ></i>
      <i v-else class="fas fa-check-circle" @click="changeStatus(task)"></i>
    </span>
    <p>{{ task.name }}</p>
    <form @submit.prevent="updateTaskName" :data-task="task._id">
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
          class="fas fa-trash"
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
    let getCurrentFolder = inject("getCurrentFolder");
    let getUser = inject("getUser");

    let deleteTask = async (taskId) => {
      await deleteTaskById(taskId);
      await getUser();
      await getCurrentFolder();
    };

    let changeStatus = async (task) => {
      let body = { status: task.status };
      task.status === false ? (body.status = true) : (body.status = false);
      await updateTask(task._id, body);
      await getUser();
      await getCurrentFolder();
    };

    let editTaskOn = (e) => {
      e.target.parentElement.style.color = "var(--color-white)";
      e.target.parentElement.style.backgroundColor = "#0066ff88";
      e.target.parentElement.parentElement.parentElement.children[1].style.display =
        "none";
      e.target.parentElement.parentElement.parentElement.children[2].style.display =
        "block";
      e.target.parentElement.parentElement.parentElement.children[2].children[0].focus();
      e.target.parentElement.parentElement.parentElement.style.border =
        "2px solid var(--color-mediumgrey)";
    };

    let editTaskOff = (e) => {
      e.target.parentElement.nextElementSibling.children[0].style.color =
        "var(--color-mediumgrey)";
      e.target.parentElement.nextElementSibling.children[0].style.backgroundColor = "var(--color-white)";
      e.target.parentElement.parentElement.children[1].style.display = "block";
      e.target.parentElement.parentElement.children[2].style.display = "none";
      e.target.parentElement.parentElement.style.border =
        "2px solid var(--color-white)";
      e.target.parentElement.parentElement.style.borderBottom =
        "1px solid #f0f0f0";
    };

    let updateTaskName = async (e) => {
      let body = { name: e.target.firstElementChild.value };
      let taskId = e.target.dataset.task;
      e.target.firstElementChild.blur();
      await updateTask(taskId, body);
      await getUser();
      await getCurrentFolder();
    };

    let mouseOnDone = (e) => {
      e.target.classList.add("fas", "fa-check-circle");
      e.target.classList.remove("far", "fa-circle");
    };

    let mouseOffDone = (e) => {
      e.target.classList.remove("fas", "fa-check-circle");
      e.target.classList.add("far", "fa-circle");
    };

    return {
      deleteTask,
      changeStatus,
      editTaskOn,
      editTaskOff,
      updateTaskName,
      mouseOnDone,
      mouseOffDone,
    };
  },
};
</script>

<style scoped>

.taskItem {
  min-height: 45px;
  padding: 0 0.4rem;
  border: 2px solid var(--color-white);
  border-bottom: 1px solid #f0f0f088;
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
  gap: .1rem;
  /* width: 60px; */
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
  color: var(--color-grey)
}
.doneButton i {
  font-size: 14px;
}

.doneButton i:hover {
  color: var(--color-orange);
}

.editTaskInput {
  width: 100%;
}

.deleteButton,
.editButton {
  border-radius: 50%;
}

.deleteButton:hover {
  color: white;
  background-color: #ff000088;
}

.editButton:hover {
  color: white !important;
  background-color: #0066ff88 !important;
}
</style>
