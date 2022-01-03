<template>
  <div class="registerForm">
    <form @submit.prevent="registerUser">
      <h3>Registro</h3>
      <div class="submitError off">
        <img src="@/assets/attention.png" alt="attention" class="attention" />
        <p></p>
      </div>
      <input-form
        v-model="registerInputs.name.status.value"
        :input="registerInputs.name"
      />
      <input-form
        v-model="registerInputs.email.status.value"
        :input="registerInputs.email"
      />
      <input-form
        v-model="registerInputs.password.status.value"
        :input="registerInputs.password"
      />
      <input-form
        v-model="registerInputs.password2.status.value"
        :input="registerInputs.password2"
      />
      <div class="buttons">
        <router-link to="/" class="link-login">Ya tengo una cuenta</router-link>
        <input type="submit" value="Registrarse" />
      </div>
    </form>
  </div>
</template>

<script>
import { inject, reactive } from "vue";
import { useRouter } from "vue-router";
import { addNewUser } from "@/components/crud.js";
import inputForm from "../components/inputs/inputForm.vue";
import { infoRegisterInputs } from "@/components/helpers/inputsInfo.js";

export default {
  components: { inputForm },

  setup() {
    // Traemos variables externas
    let router = useRouter();
    let getUser = inject("getUser");

    // Hacemos reactivo el objeto importado que contiene la info de los inputs
    let registerInputs = reactive(infoRegisterInputs);

    // FUNCION: Registro de usuario
    let registerUser = async () => {
      let error = document.querySelector(".submitError");
      let errorText = document.querySelector(".submitError").lastElementChild;
      let arrayInputs = Object.values(registerInputs);
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

      // Si hay algún error, salimos de la función
      if (!validation) return;

      // Construimos objeto con los datos que ha introducido el usuario
      let newUser = {
        name: registerInputs.name.status.value,
        email: registerInputs.email.status.value,
        password: registerInputs.password.status.value,
      };

      // Enviamos POST a la base de datos
      try {
        // Agregamos usuario a la base de datos
        let { data, json } = await addNewUser(newUser);

        // Si hay error, mostramos mensaje
        if (!data.ok) {
          error.classList.remove("off");
          errorText.innerHTML = json.message;
          return;
        }

        // Si es correcto, entramos
        if (data.status === 201) {
          localStorage.setItem("user", json.newUser._id);
          await getUser();
          router.push(`/dashboard/AllTasks`);
        }
      } catch (error) {
        errorText.innerHTML = "Algo no ha funcionado. Prueba de nuevo";
        console.log(error);
      }
    };

    return { registerUser, registerInputs };
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

@media screen and (max-width: 500px) {
  form {
    width: 100%;
    box-shadow: none;
  }

  form h3 {
    font-size: 2.2em;
  }
}

@media (hover: hover) {
  .link-login:hover {
    text-decoration: underline;
  }

  input[type="submit"]:hover {
    box-shadow: 0 0 10px var(--color-mediumblue);
  }
}
</style>
