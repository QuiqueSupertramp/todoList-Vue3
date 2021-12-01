<template>
  <form @submit.prevent="addFolder()">
    <input type="text" v-model="newFolderName" />
    <input type="submit" value="Añadir carpeta" />
  </form>
</template>

<script>
import { inject, ref } from "vue";
import {router, useRouter} from 'vue-router'
export default {
  setup() {
      let router = useRouter()
    let user = inject("user");
    let AllFolders = inject("AllFolders");
    let newFolderName = ref("");
    console.log(newFolderName);
    let data = "";

    let addFolder = async () => {
      data = {
        name: newFolderName.value,
        user: user.value._id,
      };
      let fetchData = await fetch("http://localhost:3001/api/carpetas", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(fetchData);
      if (!fetchData.ok) {
        return;
      } else {
        newFolderName.value = "";
        let json = await fetchData.json();
        AllFolders.value.push(json.data);
        router.push(`/dashboard/${json.data._id}`)
        console.log(json);
      }
    };

    return { newFolderName, addFolder };
  },
};
</script>
