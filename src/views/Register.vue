<template>
  <div class="registerForm">
    <form @submit.prevent="registerUser">
      <h3>Registro</h3>
      <input-form v-model="name" :input="inputs.name" />
      <input-form v-model="email" :input="inputs.email" />
      <input-form v-model="password" :input="inputs.password" />
      <input-form v-model="password2" :input="inputs.password2" />
      <input type="submit" value="Registrarse" />
    </form>
  </div>
</template>

<script>
import {
  ref,
  inject,
  onMounted,
  reactive,
  provide,
  watchEffect,
  watch,
} from "vue";
import { useRouter } from "vue-router";
import { addNewUser } from "@/components/crud.js";
import inputForm from "../components/inputForm.vue";

export default {
  components: { inputForm },
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

    let inputs = reactive({
      name: {
        id: "inputName",
        span: "Nombre",
        status: {
          active: false,
          error: false,
          value: name.value,
        },
        errorMessage: "Debes agregar un nombre (min: 3, max: 30)",
        error: {
          status: false,
          message: `Debes agregar un nombre (min: 3, max: 30)`,
        },
        type: "text",
        min: 3,
        max: 30,
        condition: () => {
          if (name.value.length < 3) {
            return (inputs.name.status.error = true);
          } else {
            return (inputs.name.status.error = false);
          }
        },
      },
      email: {
        id: "inputEmail",
        span: "Email",
        status: {
          active: false,
          error: false,
          value: email.value,
        },
        errorMessage: "El formato del email es incorrecto",
        error: {
          status: false,
          message: "El formato del email es incorrecto",
        },
        type: "email",
        min: 3,
        max: 100,
        condition: () => {
          if (email.value.includes("@")) {
            return (inputs.email.status.error = false);
          } else {
            return (inputs.email.status.error = true);
          }
        },
      },
      password: {
        id: "inputPassword",
        span: "Contraseña",
        status: {
          active: false,
          error: false,
          value: password.value,
        },
        errorMessage:
          "La contraseña debe tener mínimo 6 carácteres y máximo 30",
        error: {
          status: false,
          message: "La contraseña debe tener mínimo 6 carácteres y máximo 30",
        },
        type: "password",
        min: 6,
        max: 100,
        value: "",
        condition: () => {
          if (password.value === password2.value) {
            inputs.password2.status.error = false;
          } else {
            inputs.password2.status.error = true;
          }
          if (password.value.length < 6) {
            return (inputs.password.status.error = true);
          } else {
            return (inputs.password.status.error = false);
          }
        },
      },
      password2: {
        id: "inputPassword2",
        span: "Repite la contraseña",
        status: {
          active: false,
          error: false,
          value: password.value,
        },
        errorMessage:
          "La contraseña debe tener mínimo 6 carácteres y máximo 30",
        // error: {
        //   status: false,
        //   message: "Las contraseñas no coinciden",
        // },
        type: "password",
        min: 6,
        max: 30,
        value: "",
        condition: () => {
          if (
            password2.value.length > 5 &&
            password.value === password2.value
          ) {
            return (inputs.password2.status.error = false);
          } else {
            return (inputs.password2.status.error = true);
          }
        },
      },
    });

    // let valid = () => {
    //   let error = inputs.name.condition();
    //   console.log(error);
    //   if (error) {
    //     inputs.name.status.error = true;
    //     return;
    //   } else {
    //     inputs.name.status.error = false;
    //   }
    // };

    // onMounted(() => {
    //   let nameLogin = document.querySelector(".nameLogin");
    //   let nameSpan = document.querySelector(".nameSpan");
    //   let emailLogin = document.querySelector(".emailLogin");
    //   let emailSpan = document.querySelector(".emailSpan");
    //   let passwordLogin = document.querySelector(".passwordLogin");
    //   let passwordSpan = document.querySelector(".passwordSpan");
    //   let password2Login = document.querySelector(".password2Login");
    //   let password2Span = document.querySelector(".password2Span");

    //   // let error = document.getElementById("Error");

    //   document.addEventListener("focusin", (e) => {
    //     // if (e.target.matches("#inputName")) {
    //     //   nameSpan.classList.add("span--top");
    //     //   nameLogin.classList.add("login--top");
    //     //   nameLogin.lastElementChild.firstElementChild.style.display = "none";
    //     //   nameLogin.lastElementChild.lastElementChild.style.display = "none";
    //     // }
    //     if (e.target.matches("#inputEmail")) {
    //       emailSpan.classList.add("span--top");
    //       emailLogin.classList.add("login--top");
    //     }
    //     if (e.target.matches("#inputPassword")) {
    //       passwordSpan.classList.add("span--top");
    //       passwordLogin.classList.add("login--top");
    //     }
    //     if (e.target.matches("#inputPassword2")) {
    //       password2Span.classList.add("span--top");
    //       password2Login.classList.add("login--top");
    //     }
    //   });
    //   document.addEventListener("focusout", (e) => {
    //     // if (e.target.matches("#inputName")) {
    //     //   // nameLogin.classList.remove("login--top");
    //     //   if (name.value.trim() == "") {
    //     //     console.log("hola");
    //     //     // nameLogin.lastElementChild.firstElementChild.style.display = "none";
    //     //     // nameLogin.lastElementChild.lastElementChild.style.display = "block";
    //     //     // nameSpan.classList.remove("span--top");
    //     //     inputs.name.status.error = true;
    //     //     console.log(inputs);
    //     //   } else {
    //     //     nameLogin.lastElementChild.firstElementChild.style.display =
    //     //       "block";
    //     //     nameLogin.lastElementChild.lastElementChild.style.display = "none";
    //     //     inputs.name.status.error = false;
    //     //   }
    //     // }
    //     if (e.target.matches("#inputEmail")) {
    //       emailLogin.classList.remove("login--top");
    //       if (email.value == "") {
    //         emailLogin.lastElementChild.firstElementChild.style.display =
    //           "none";
    //         emailLogin.lastElementChild.lastElementChild.style.display =
    //           "block";
    //         emailSpan.classList.remove("span--top");
    //         inputs.email.status = true;
    //       } else if (email.value.includes("@") == false) {
    //         emailLogin.lastElementChild.firstElementChild.style.display =
    //           "none";
    //         emailLogin.lastElementChild.lastElementChild.style.display =
    //           "block";
    //         inputs.email.status = true;
    //       } else {
    //         emailLogin.lastElementChild.firstElementChild.style.display =
    //           "block";
    //         emailLogin.lastElementChild.lastElementChild.style.display = "none";
    //         inputs.email.status = false;
    //       }
    //     }
    //     if (e.target.matches("#inputPassword")) {
    //       passwordLogin.classList.remove("login--top");
    //       if (password.value === "") {
    //         passwordSpan.classList.remove("span--top");
    //       }
    //     }
    //     if (e.target.matches("#inputPassword2")) {
    //       password2Login.classList.remove("login--top");
    //       if (password2.value === "") {
    //         password2Span.classList.remove("span--top");
    //       }
    //     }
    //   });
    // });

    let registerUser = async () => {
      let error = document.getElementById("Error");

      if (name.value.trim().length < 1) {
        inputs.name.status.error = true;
        return;
      } else {
        inputs.name.status.error = false;
      }
      if (email.value.length < 1) {
        inputs.email.status.error = true;
        return;
      } else {
        inputs.email.status.error = false;
      }
      if (password.value.length < 4) {
        inputs.password.status.error = true;
        return;
      } else {
        inputs.password.status.error = false;
      }
      if (password.value !== password2.value) {
        inputs.password2.status.error = true;
        return;
      } else {
        inputs.password2.status.error = false;
      }

      newUser = {
        name: name.value,
        email: email.value,
        password: password.value,
      };

      try {
        let { data, json } = await addNewUser(newUser);

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

    // watchEffect(() => {
    //   console.log(name.value);
    // });

    // watch([name, email, password, password2, inputs], () => {
    //   inputs.name.condition();
    //   inputs.email.condition();
    //   inputs.password.condition();
    //   inputs.password2.condition();
    // });

    return { name, email, password, password2, registerUser, inputs };
  },
};
</script>

<style scoped>
.icons {
  width: 2rem;
}

.fa-check {
  display: none;
  color: springgreen;
}

.fa-times {
  display: none;
  color: red;
}

.registerForm {
  padding-top: 6rem;
}

form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  width: 40vw;
  max-width: 400px;
  box-shadow: 0px 0px 10px lightgray;
  padding: 1rem 2rem 2rem;
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

.registerName {
  width: 100%;
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
  width: 100%;
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
  margin-top: 1rem;
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

#Error p {
  margin: 0;
}

.errorSpan {
  color: red;
  font-size: 12px;
}
</style>
