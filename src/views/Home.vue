<template>
  <main>
    <div class="introduction">
      <h2>Bienvenido</h2>
      <p>Administra tus tareas de forma sencilla</p>
      <router-link to="/register" class="btn-try-free"
        >Pruebalo gratis!</router-link
      >
      <img src="@/assets/app.png" alt="mockapp" class="img-todos" />
    </div>
    <form @submit.prevent="loginUser">
      <h3>Iniciar sesión</h3>
      <div class="loginError off">
        <img src="@/assets/attention.png" alt="attention" class="attention" />
        <p></p>
      </div>
      <input-form
        v-model="loginInputs.email.status.value"
        :input="loginInputs.email"
      />
      <input-form
        v-model="loginInputs.password.status.value"
        :input="loginInputs.password"
      />
      <input type="submit" value="Acceder" />
      <p>
        No tienes una cuenta?
        <router-link to="/register" class="link-register"
          >Registrate</router-link
        >
      </p>
    </form>
  </main>
</template>

<script>
import { inject, reactive } from "vue";
import { useRouter } from "vue-router";
import InputForm from "../components/inputs/inputForm.vue";
import { checkUserLogin } from "../components/crud.js";
import { infoLoginInputs } from "@/components/helpers/inputsInfo.js";

export default {
  components: {
    InputForm,
  },
  setup() {
    let router = useRouter();
    let getUser = inject("getUser");

    // Hacemos reactivo el objeto importado que contiene la info de los inputs
    let loginInputs = reactive(infoLoginInputs);

    // FUNCIÓN PARA LOGEARSE
    let loginUser = async () => {
      // Variables
      let loginError = document.querySelector(".loginError");

      // Creamos objeto con los datos que introduce el usuario
      let userData = {
        email: loginInputs.email.status.value,
        password: loginInputs.password.status.value,
      };

      // Comprobamos si el login es correcto
      let { data, json } = await checkUserLogin(userData);

      // Si es correcto entramos, sino mostramos mensaje de error del backend
      if (data.ok) {
        localStorage.setItem("user", json.user._id);
        await getUser();
        loginInputs.email.status.value = "";
        loginInputs.password.status.value = "";
        router.push("/dashboard/AllTasks");
      } else {
        loginError.classList.remove("off");
        loginError.lastElementChild.innerText = json.msg;
      }
    };

    return { loginUser, loginInputs };
  },
};
</script>

<style scoped>
main {
  padding: 6rem 2rem 3rem;
  margin: auto;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2vw;
}

.introduction {
  width: 100%;
  max-width: 450px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

.introduction h2 {
  font-size: 2.5em;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
}

.btn-try-free {
  background-color: var(--color-blue);
  color: var(--color-white);
  border-radius: 5px;
  padding: 5px 15px;
}

.img-todos {
  width: 80%;
  margin-top: 3rem;
  border-radius: 5px;
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
  padding: 1rem 2rem 3rem;
}

form h3 {
  font-size: 1.8em;
  text-align: center;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
}

.loginError {
  padding: 5px 15px;
  margin-bottom: 1rem;
  width: 100%;
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

input[type="submit"] {
  margin-top: 0.5rem;
  background-color: var(--color-blue);
  color: var(--color-white);
  border-radius: 5px;
  width: 100%;
}

.link-register {
  color: var(--color-blue);
  padding: 0;
}

@media screen and (max-width: 992px) {
  .loginError p {
    font-size: 13px;
  }
}

@media screen and (max-width: 750px) {
  main {
    flex-direction: column;
    padding: 5rem 0 3rem;
    gap: 2vh;
  }

  .introduction {
    align-items: center;
  }

  .img-todos {
    margin-top: 1.5rem;
  }

  form {
    box-shadow: none;
  }

  form h3 {
    font-size: 2.2em;
  }
}

@media (hover: hover) {
  .btn-try-free:hover {
    background-color: var(--color-orange);
    color: var(--color-black);
    border-radius: 5px;
    padding: 5px 15px;
  }

  .link-register:hover {
    text-decoration: underline;
  }

  input[type="submit"]:hover {
    box-shadow: 0 0 10px var(--color-mediumblue);
  }
}
</style>
