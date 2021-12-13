<template>
  <span class="material-icons-outlined" @click="changeStatus(task)">
    radio_button_unchecked
  </span>
  <p>{{ task.name }}</p>
  <form>
    <input type="text" class="editTaskInput" :value="task.name" @focusout="editTaskOff"/>
  </form>
  <div class="taskItem__icons">
    <span class="material-icons-outlined" @click="editTaskOn"> edit </span>
    <span class="material-icons-outlined" @click="deleteTask(task._id)">
      highlight_off
    </span>
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
      let data = await deleteTaskById(taskId);
      console.log(data);
      await getUser();
      await getCurrentFolder();
    };

    let changeStatus = async (task) => {
      let body = { status: task.status };
      task.status === false ? (body.status = true) : (body.status = false);
      let data = await updateTask(task._id, body);
      console.log(data);
      await getUser();
      await getCurrentFolder();
    };

    let editTaskOn = (e) => {
      e.target.style.color = "var(--color-blue)"
      e.target.parentElement.parentElement.children[1].style.display = "none";
      e.target.parentElement.parentElement.children[2].children[0].style.display = "block";
      e.target.parentElement.parentElement.children[2].children[0].focus()
      e.target.parentElement.parentElement.style.border =
        "2px solid var(--color-mediumgrey)";
    };


    let editTaskOff = (e) => {
      e.target.parentElement.parentElement.children[3].children[0].style.color = "var(--color-grey)"
      e.target.parentElement.parentElement.children[1].style.display = "block";
      e.target.parentElement.parentElement.children[2].children[0].style.display = "none";
      e.target.parentElement.parentElement.style.border =
        "2px solid var(--color-white)";
      e.target.parentElement.parentElement.style.borderBottom =
        "1px solid #f0f0f0";
    };

    let updateTaskName = async(task)=> {
        console.log()
        await updateTask(task._id, body)
    }

    
    return { deleteTask, changeStatus, editTaskOn, editTaskOff };
  },
};
</script>

<style scoped>
.taskItem__icons {
  display: flex;
  align-items: center;
}

p {
  width: 100%;
  padding: 0 10px;
}

form {
    width: 100%;
}

input {
  font-size: 14px;
}

span {
  font-size: 16px;
  color: var(--color-grey);
  display: flex;
  justify-content: center;
  cursor: pointer;
  margin-right: .2rem;
  margin-left: .2rem;
}

.editTaskInput {
  display: none;
  width: 100%;
}
</style>
