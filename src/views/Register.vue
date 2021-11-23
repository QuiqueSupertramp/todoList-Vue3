<template>
  <form @submit.prevent="registerUser">
    <input type="text" placeholder="Email" v-model="name" >
    <input type="password" placeholder="Contraseña" v-model="password" autocomplete="off">
    <input type="submit" value="Registrarse">
  </form>

  <router-link to="/">Login</router-link>
</template>

<script>
import {inject, ref} from 'vue'
import {useRouter} from 'vue-router'
export default {
  setup() {
    let name = ref("")
    let password = ref("")
    let user = inject("user")
    let router = useRouter()

    let registerUser = ()=> {
      user.value = {
          name: name.value,
          password: password.value
      }
      name.value = ''
      password.value = ''
      router.push('/login')
    }

    return {name, password, registerUser}
    
  },
}
</script>
