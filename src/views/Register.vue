<template>
  <form @submit.prevent="registerUser">
    <input type="text" placeholder="name" v-model="name" autocomplete="off" />
    <input type="email" v-model="email" autocomplete="off" />
    <input
      type="password"
      placeholder="Contraseña"
      v-model="password"
      autocomplete="off"
    />
    <input
      type="password"
      placeholder="Repita la contraseña"
      v-model="password2"
      autocomplete="off"
    />
    <input type="submit" value="Registrarse" />
  </form>
  <div id="Error"></div>

  <router-link to="/">Login</router-link>
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

    name.value = "";
    email.value = "";
    password.value = "";
    password2.value = "";

    onMounted(() => {});

    let registerUser = async () => {
      let error = document.getElementById("Error");

      if (password.value !== password2.value) {
        error.innerHTML = "Las contraseñas no coinciden"
        return;
      }

      newUser = {
        name: name.value,
        email: email.value,
        password: password.value,
      };

      try {
        let data = await fetch("http://localhost:3001/api/usuarios", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        });
        let json = await data.json();

        if (data.status === 403) {
          error.innerHTML = json.message;
        }

        if (data.status === 201) {
          user.value = json.newUser;
          router.push(`/dashboard/${user.value.name}`);
        }
      } catch (error) {
        console.log(error);
      }
    };

    return { name, email, password, password2, registerUser };
  },
};
</script>
