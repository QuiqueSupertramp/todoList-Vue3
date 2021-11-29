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
        <p>El correo electrónico o el password son incorrectos</p>
      </div>
      <div class="nameLogin">
        <span class="nameSpan">Correo electrónico</span>
        <input
          id="inputName"
          class="loginInputs"
          type="email"
          v-model="email"
          autocomplete="off"
        />
      </div>
      <div class="passwordLogin">
        <span class="passwordSpan nameSpan">Contraseña</span>
        <input
          id="inputPassword"
          type="password"
          class="loginInputs"
          v-model="password"
          autocomplete="off"
        />
      </div>
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
import { ref, inject, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
export default {
  setup() {
    let email = ref("");
    let password = ref("");
    let user = inject("user");
    let router = useRouter();

    email.value = "";
    password.value = "";

    let idUser = localStorage.getItem("user");
    if (idUser) {
      // getUserById(idUser)
      fetch(`http://localhost:3001/api/usuarios/${idUser}`).then(res=> res.json()).then(json=> user.value = json)
    }

    // let getUserById = async (id) => {
    //   let data = await fetch(`http://localhost:3001/api/usuarios/${id}`);
    //   let json = await data.json();
    //   user.value = json;
    // };

    let loginUser = async () => {
      let loginError = document.querySelector(".loginError");

      let loginUser = {
        email: email.value,
        password: password.value,
      };

      let data = await fetch(`http://localhost:3001/api/usuarios/checkUser`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(loginUser),
      });
      let json = await data.json();

      if (data.ok) {
        user.value = json.user;
        localStorage.setItem("user", user.value._id);
      } else {
        loginError.classList.remove("off");
      }
    };

    onMounted(() => {
      user.value = "";
      let nameLogin = document.querySelector(".nameLogin");
      let nameSpan = document.querySelector(".nameSpan");
      let passwordLogin = document.querySelector(".passwordLogin");
      let passwordSpan = document.querySelector(".passwordSpan");

      document.addEventListener("focusin", (e) => {
        if (e.target.matches("#inputName")) {
          nameSpan.classList.add("span--top");
          nameLogin.classList.add("login--top");
        }
        if (e.target.matches("#inputPassword")) {
          passwordSpan.classList.add("span--top");
          passwordLogin.classList.add("login--top");
        }
      });
      document.addEventListener("focusout", (e) => {
        if (e.target.matches("#inputName")) {
          if (email.value == "") {
            nameSpan.classList.remove("span--top");
            nameLogin.classList.remove("login--top");
          }
        }
        if (e.target.matches("#inputPassword")) {
          if (password.value === "") {
            passwordSpan.classList.remove("span--top");
            passwordLogin.classList.remove("login--top");
          }
        }
      });
    });

    watch(user, () => {
      user.value ? router.push(`/dashboard/${user.value.name}`) : null;
    });

    return { email, password, loginUser };
  },
};
</script>

<style scoped>
main {
  margin-top: 3rem;
  margin-left: 0;
  width: 95vw;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2vw;
}

.introduction {
  width: 40vw;
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
  width: 40vw;
  max-width: 400px;
  box-shadow: 0px 0px 10px lightgray;
  padding: 1rem 1rem 3rem;
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

.nameLogin,
.passwordLogin {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 2px solid transparent;
  box-shadow: 0 0 2px var(--color-grey);
  border-radius: 5px;
  width: 90%;
}

.nameSpan {
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
#inputPassword {
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

.link-register {
  color: var(--color-grey);
  padding: 0;
}

.link-register:hover {
  background-color: transparent;
  color: var(--color-blue);
}

@media screen and (max-width: 1200px) {
  main {
    margin-left: auto;
  }
}

@media screen and (max-width: 992px) {
  .loginError p {
    font-size: 13px;
  }
}
</style>
