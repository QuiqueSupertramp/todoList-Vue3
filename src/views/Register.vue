<template>
  <form @submit.prevent="registerUser">
    <h3>Registro</h3>
    <div class="nameLogin">
      <span class="nameSpan">Name</span>
      <input
        id="inputName"
        class="loginInputs"
        type="text"
        v-model="name"
        autocomplete="off"
      />
    </div>
    <div class="emailLogin">
      <span class="emailSpan">Email</span>
      <input
        id="inputEmail"
        class="loginInputs"
        type="email"
        v-model="email"
        autocomplete="off"
      />
    </div>
    <div class="passwordLogin">
      <span class="passwordSpan">Contraseña</span>
      <input
        id="inputPassword"
        class="loginInputs"
        type="password"
        v-model="password"
        autocomplete="off"
      />
    </div>
    <div class="password2Login">
      <span class="password2Span">Repita la contraseña</span>
      <input
        id="inputPassword2"
        class="loginInputs"
        type="password"
        v-model="password2"
        autocomplete="off"
      />
    </div>
    <div id="Error"></div>
    <input type="submit" value="Registrarse" />
  </form>
</template>

<script>
import { ref, inject, onMounted } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    let name = ref("");
    let email = ref("");
    let password = ref("");
    let password2 = ref("");
    let router = useRouter();
    let newUser = {};
    let user = inject("user");
    let getUser = inject("getUser");

    name.value = "";
    email.value = "";
    password.value = "";
    password2.value = "";

    onMounted(() => {
      let nameLogin = document.querySelector(".nameLogin");
      let nameSpan = document.querySelector(".nameSpan");
      let emailLogin = document.querySelector(".emailLogin");
      let emailSpan = document.querySelector(".emailSpan");
      let passwordLogin = document.querySelector(".passwordLogin");
      let passwordSpan = document.querySelector(".passwordSpan");
      let password2Login = document.querySelector(".password2Login");
      let password2Span = document.querySelector(".password2Span");

      document.addEventListener("focusin", (e) => {
        if (e.target.matches("#inputName")) {
          nameSpan.classList.add("span--top");
          nameLogin.classList.add("login--top");
        }
        if (e.target.matches("#inputEmail")) {
          emailSpan.classList.add("span--top");
          emailLogin.classList.add("login--top");
        }
        if (e.target.matches("#inputPassword")) {
          passwordSpan.classList.add("span--top");
          passwordLogin.classList.add("login--top");
        }
        if (e.target.matches("#inputPassword2")) {
          password2Span.classList.add("span--top");
          password2Login.classList.add("login--top");
        }
      });
      document.addEventListener("focusout", (e) => {
        if (e.target.matches("#inputName")) {
          nameLogin.classList.remove("login--top");
          if (name.value == "") {
            nameSpan.classList.remove("span--top");
          }
        }
        if (e.target.matches("#inputEmail")) {
          emailLogin.classList.remove("login--top");
          if (email.value == "") {
            emailSpan.classList.remove("span--top");
          }
        }
        if (e.target.matches("#inputPassword")) {
          passwordLogin.classList.remove("login--top");
          if (password.value === "") {
            passwordSpan.classList.remove("span--top");
          }
        }
        if (e.target.matches("#inputPassword2")) {
          password2Login.classList.remove("login--top");
          if (password2.value === "") {
            password2Span.classList.remove("span--top");
          }
        }
      });
    });

    let registerUser = async () => {
      let error = document.getElementById("Error");

      if (password.value.length <= 4) {
        error.innerHTML = "La contraseña debe tener mínimo 4 carácteres";
        return;
      }

      if (password.value !== password2.value) {
        error.innerHTML = "Las contraseñas no coinciden";
        return;
      }

      newUser = {
        name: name.value,
        email: email.value,
        password: password.value,
      };

      try {
        let data = await fetch(
          "https://apiserver-todolist.herokuapp.com/api/usuarios",
          {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
          }
        );
        let json = await data.json();

        if (data.status === 403) {
          error.innerHTML = json.message;
        }

        if (data.status === 201) {
          user.value = json.newUser;
          localStorage.setItem("user", user.value._id);
          getUser();
          router.push(`/dashboard/AllTasks`);
        }
      } catch (error) {
        console.log(error);
      }
    };

    return { name, email, password, password2, registerUser };
  },
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  width: 40vw;
  max-width: 400px;
  box-shadow: 0px 0px 10px lightgray;
  padding: 1rem 1rem 2rem;
  margin: 0 auto;
}

form h3 {
  font-size: 1.8em;
  text-align: center;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
}

input {
  outline: none;
  border: none;
  padding: 15px;
  background-color: transparent;
  color: var(--color-black);
}

.nameLogin,
.emailLogin,
.passwordLogin,
.password2Login {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 2px solid transparent;
  box-shadow: 0 0 2px var(--color-grey);
  border-radius: 5px;
  width: 90%;
}

.nameSpan,
.emailSpan,
.passwordSpan,
.password2Span {
  position: absolute;
  top: 15px;
  left: 15px;
  /* font-size: 16px; */
  color: var(--color-grey);
  background-color: var(--color-white);
  z-index: -1;
  transition: all 0.2s;
}

.span--top {
  top: -10px;
  left: 10px;
  font-size: 12px;
  color: var(--color-blue);
  padding: 0 5px;
  z-index: 1;
}

.login--top {
  border: 2px solid var(--color-blue);
  box-shadow: none;
}

#inputName,
#inputEmail,
#inputPassword,
#inputPassword2 {
  border: none;
  width: 100%;
}

input[type="submit"] {
  /* margin-top: 1rem; */
  background-color: var(--color-blue);
  color: var(--color-white);
  border-radius: 5px;
  padding: 10px 40px;
  width: 90%;
}

.link-login {
  color: var(--color-grey);
  padding: 0;
}

.link-login:hover {
  background-color: transparent;
  color: var(--color-blue);
}

#Error {
  color: red;
}
</style>
