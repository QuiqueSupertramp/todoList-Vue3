<template>
  <div class="registerForm">
    <form @submit.prevent="registerUser">
      <h3>Registro</h3>
      <div class="submitError off">
        <img src="@/assets/attention.png" alt="attention" class="attention" />
        <p></p>
      </div>
      <input-form v-model="inputs.name.status.value" :input="inputs.name" />
      <input-form v-model="inputs.email.status.value" :input="inputs.email" />
      <input-form
        v-model="inputs.password.status.value"
        :input="inputs.password"
      />
      <input-form
        v-model="inputs.password2.status.value"
        :input="inputs.password2"
      />
      <div class="buttons">
        <router-link to="/" class="link-login">Ya tengo una cuenta</router-link>
        <input type="submit" value="Registrarse" />
      </div>
      <div id="registerError"></div>
    </form>
  </div>
</template>

<script>
import { ref, inject, reactive } from "vue";
import { useRouter } from "vue-router";
import { addNewUser } from "@/components/crud.js";
import inputForm from "../components/inputForm.vue";

export default {
  components: { inputForm },

  setup() {
    // Traemos variables externas
    let router = useRouter();
    let user = inject("user");
    let getUser = inject("getUser");

    // Diseño de los objetos que forman los inputs
    let inputs = reactive({
      name: {
        id: "inputName",
        span: "Nombre",
        status: {
          active: false,
          error: false,
          value: "",
        },
        errorMessage: "Debes agregar un nombre (min: 3, max: 30)",
        type: "text",
        min: 3,
        max: 30,
        condition: () => {
          if (inputs.name.status.value.length < 3) {
            return (inputs.name.status.error = true);
          } else {
            return (inputs.name.status.error = false);
          }
        },
      },
      email: {
        id: "inputEmail",
        span: "Correo electrónico",
        status: {
          active: false,
          error: false,
          value: "",
        },
        errorMessage: "El formato del email es incorrecto",
        type: "email",
        min: 5,
        max: 30,
        condition: () => {
          if (inputs.email.status.value.includes("@")) {
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
          value: "",
        },
        errorMessage: "Contraseña no válida (min: 6, max: 30)",
        type: "password",
        min: 6,
        max: 30,
        condition: () => {
          if (inputs.password.status.value === inputs.password2.status.value) {
            inputs.password2.status.error = false;
          } else {
            inputs.password2.status.error = true;
          }
          if (inputs.password.status.value.length < 6) {
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
          value: "",
        },
        errorMessage: "Las contraseñas no coinciden",
        type: "password",
        min: 6,
        max: 30,
        condition: () => {
          if (
            inputs.password2.status.value.length > 5 &&
            inputs.password.status.value === inputs.password2.status.value
          ) {
            return (inputs.password2.status.error = false);
          } else {
            return (inputs.password2.status.error = true);
          }
        },
      },
    });

    // FUNCION: Registro de usuario
    let registerUser = async () => {
      let error = document.querySelector(".submitError");
      let errorText = document.querySelector(".submitError").lastElementChild;
      let arrayInputs = Object.values(inputs);
      var validation = false;

      // Comprobamos que ningún input tenga error ni esté vacío
      arrayInputs.forEach((el) => {
        if (el.status.error && el.status.value !== "") {
          errorText.innerText = `${el.errorMessage}`;
          validation = false;
        } else {
          validation = true;
        }
      });

      if (!validation) return;

      // Construimos nuevo usuario
      let newUser = {
        name: inputs.name.status.value,
        email: inputs.email.status.value,
        password: inputs.password.status.value,
      };

      // Enviamos POST a la base de datos
      try {
        let { data, json } = await addNewUser(newUser);

        if (!data.ok) {
          error.classList.remove("off");
          errorText.innerHTML = json.message;
          return;
        }

        if (data.status === 201) {
          user.value = json.newUser;
          localStorage.setItem("user", user.value._id);
          getUser();
          router.push(`/dashboard/AllTasks`);
        }
      } catch (error) {
        errorText.innerHTML = "Algo no ha funcionado. Prueba de nuevo";
        console.log(error);
      }
    };

    return { registerUser, inputs };
  },
};
</script>

<style scoped>
.registerForm {
  padding-top: 6rem;
}

form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  width: 100%;
  max-width: 400px;
  box-shadow: 0px 0px 10px lightgray;
  padding: 1rem 2rem 2rem;
  margin: 0 auto;
  z-index: 8;
}

form h3 {
  font-size: 1.8em;
  text-align: center;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
}

#registerError {
  color: red;
}

.submitError {
  padding: 0 15px;
  margin-bottom: 1rem;
  width: 90%;
  background-color: #ff0000;
  border-radius: 5px;
  color: var(--color-white);
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.off {
  display: none;
}

.attention {
  width: 40px;
  height: 35px;
}

.buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 1rem;
  font-size: 14px;
}

input[type="submit"] {
  background-color: var(--color-blue);
  color: var(--color-white);
  border-radius: 5px;
  padding: 10px 40px;
  font-weight: 500;
}

.link-login {
  font-weight: 400;
  color: var(--color-blue);
}

.link-login:hover {
  text-decoration: underline;
}

@media screen and (max-width: 500px) {
  form {
    width: 100vw;
    box-shadow: none;
  }
}
</style>
