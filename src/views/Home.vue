<template>
  <main>
    <div class="introduction">
      <h2>Bienvenido</h2>
      <p>Administra tus tareas de forma sencilla</p>
      <router-link to="/register" class="btn-try-free"
        >Pruebalo gratis!</router-link
      >
      <img src="@/assets/todos.jpg" alt="" class="img-todos" />
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
import { ref, inject, onMounted, watchEffect, reactive } from "vue";
import { useRouter } from "vue-router";
import InputForm from "../components/inputForm.vue";

export default {
  components: {
    InputForm,
  },
  setup() {
    let router = useRouter();
    let user = inject("user");
    let getUser = inject("getUser");

    let loginInputs = reactive({
      email: {
        id: "LoginInputEmail",
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
          if (loginInputs.email.status.value.includes("@")) {
            return (loginInputs.email.status.error = false);
          } else {
            return (loginInputs.email.status.error = true);
          }
        },
      },
      password: {
        id: "LoginInputPassword",
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
          if (loginInputs.password.status.value.length < 6) {
            return (loginInputs.password.status.error = true);
          } else {
            return (loginInputs.password.status.error = false);
          }
        },
      },
    });

    let loginUser = async () => {
      let loginError = document.querySelector(".loginError");

      let userData = {
        email: loginInputs.email.status.value,
        password: loginInputs.password.status.value,
      };

      let data = await fetch(
        "https://apiserver-todolist.herokuapp.com/api/usuarios/checkUser",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );
      let json = await data.json();

      if (data.ok) {
        user.data = json.user;
        localStorage.setItem("user", user.data._id);
        getUser();
      } else {
        console.log(data);
        user.data = "";
        loginError.classList.remove("off");
        loginError.lastElementChild.innerText = json.msg;
      }
    };

    watchEffect(() => {
      // user.data == '' ? router.push("/") : router.push('/dashboard/AllTasks')
      user.data ? router.push("/dashboard/AllTasks") : null;
    });

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
.btn-try-free:hover {
  background-color: var(--color-orange);
  color: var(--color-black);
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

input[type="submit"] {
  margin-top: 0.5rem;
  background-color: var(--color-blue);
  color: var(--color-white);
  border-radius: 5px;
  width: 100%;
}

input[type="submit"]:hover {
  /* background-color: var(--color-orange);
  color: var(--color-dark); */
  box-shadow: 0 0 10px var(--color-mediumblue);
}

.link-register {
  color: var(--color-blue);
  padding: 0;
}

.link-register:hover {
  text-decoration: underline;
}

@media screen and (max-width: 992px) {
  .loginError p {
    font-size: 13px;
  }
}

@media screen and (max-width: 750px) {
  main {
    flex-direction: column;
    padding: 6rem 0 3rem;
    gap: 2vh;
  }

  .introduction {
    align-items: center;
  }

  form {
    box-shadow: none;
  }
}
</style>
