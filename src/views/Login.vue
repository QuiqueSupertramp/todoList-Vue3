<template>
  <form @submit.prevent="loginUser">
    <div class="nameInput">
      <span class="inputSpan">Email</span>
      <input
        id="loginInputName"
        class="loginInputs"
        type="email"
        placeholder="Email"
        v-model="name"
      />
      <div class="icons">
        <span id="nameCheck" class="material-icons-outlined check off"
          >check_circle_outline</span
        >
        <span id="nameCancel" class="material-icons-outlined cancel off">
          highlight_off
        </span>
      </div>
    </div>
    <div class="passwordInput">
      <input
        id="loginInputPassword"
        type="password"
        class="loginInputs"
        placeholder="Contraseña"
        v-model="password"
        autocomplete="off"
      />
      <div class="icons">
        <span id="passwordCheck" class="material-icons-outlined check off"
          >check_circle_outline</span
        >
        <span id="passwordCancel" class="material-icons-outlined cancel off">
          highlight_off
        </span>
      </div>
    </div>
    <input type="submit" value="Acceder" />
  </form>

  <router-link to="/register">Register</router-link>
</template>

<script>
import { ref, inject, onMounted } from "vue";
import { useRouter } from "vue-router";
export default {
  setup() {
    let name = ref("");
    let password = ref("");
    let user = inject("user");
    let router = useRouter();

    let loginUser = () => {
      user.value = {
        name: name.value,
        password: password.value,
      };
      name.value = "";
      password.value = "";
      router.push("/dashboard");
    };

    onMounted(() => {
      let nameInput = document.querySelector(".nameInput");
      let passwordInput = document.querySelector(".passwordInput");
      let nameCheck = document.getElementById("nameCheck");
      let nameCancel = document.getElementById("nameCancel");
      document.addEventListener("keyup", (e) => {
        if (e.target.matches("#loginInputName")) {
          if (name.value === "") {
            nameInput.classList.add("error");
            nameInput.classList.remove("done");
            nameCheck.classList.add("off");
            nameCancel.classList.remove("off");
          } else {
            nameInput.classList.add("done");
            nameInput.classList.remove("error");
            nameCheck.classList.remove("off");
            nameCancel.classList.add("off");
          }
        }
        if (e.target.matches("#loginInputPassword")) {
          if (password.value === "") {
            passwordInput.classList.add("error");
            passwordInput.classList.remove("done");
            passwordCheck.classList.add("off");
            passwordCancel.classList.remove("off");
          } else {
            passwordInput.classList.add("done");
            passwordInput.classList.remove("error");
            passwordCheck.classList.remove("off");
            passwordCancel.classList.add("off");
          }
        }
      });
      document.addEventListener("focusout", (e) => {
        if (e.target.matches("#loginInputName")) {
          if (name.value === "") {
            nameInput.classList.add("error");
            nameInput.classList.remove("done");
            nameCheck.classList.add("off");
            nameCancel.classList.remove("off");
          } else {
            nameInput.classList.add("done");
            nameInput.classList.remove("error");
            nameCheck.classList.remove("off");
            nameCancel.classList.add("off");
          }
        }
        if (e.target.matches("#loginInputPassword")) {
          if (password.value === "") {
            passwordInput.classList.add("error");
            passwordInput.classList.remove("done");
            passwordCheck.classList.add("off");
            passwordCancel.classList.remove("off");
          } else {
            passwordInput.classList.add("done");
            passwordInput.classList.remove("error");
            passwordCheck.classList.remove("off");
            passwordCancel.classList.add("off");
          }
        }
      });
    });

    return { name, password, loginUser };
  },
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  width: 50%;
  margin: 0 auto;
}
input {
  outline: none;
  border: none;
  padding: 10px 10px;
  background-color: var(--color-white);
}

.off {
  display: none;
}

.error {
  border: 2px solid #ff0000 !important;
}

.done {
  border: 2px solid #47c547 !important;
}

.check {
  color: #47c547;
}

.cancel {
  color: #ff0000;
}

.nameInput,
.passwordInput {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  height: 50px;
  border: 1px solid var(--color-dark);
  width: 300px;
}

.inputSpan {
  position: absolute;
  top: 11px;
  left: 9px;
  display: none;
}

#loginInputName,
#loginInputPassword {
  border: none;
  width: 250px;
}

.icons {
  display: flex;
  width: 25px;
}
</style>
