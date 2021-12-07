<template>
  <form @submit.prevent="addFolder()" id="folderForm">
    <input class="inputIcon" type="submit" value="+" />
    <input
      @focus="focusOn"
      @focusout="focusOut"
      type="text"
      placeholder="Añadir carpeta"
      v-model="newFolderName"
    />
  </form>
</template>

<script>
import { inject, ref } from "vue";
import { useRouter } from "vue-router";
export default {
  setup() {
    let router = useRouter();
    let user = inject("user");
    let AllFolders = inject("AllFolders");
    let newFolderName = ref("");
    let data = "";

    let focusOn = (e) => {
      document.querySelector(".inputIcon").style.color = "var(--color-grey)";
      document.querySelector(".inputIcon").style.opacity = "1";
      e.target.placeholder = "Nombre carpeta";
      e.target.style.fontStyle = "italic"
      document.getElementById("folderForm").style.backgroundColor = "#ebebeb";

    };

    let focusOut = (e) => {
      document.querySelector(".inputIcon").style.color = "var(--color-blue)";
      document.querySelector(".inputIcon").style.opacity = ".8";
      if (e.target.value !== "") {return} 
      e.target.placeholder = "Añadir carpeta";
      e.target.style.fontStyle = "normal"
      document.getElementById("folderForm").style.backgroundColor = "transparent";

    };

    let addFolder = async () => {
      data = {
        name: newFolderName.value,
        user: user.data._id,
      };
      let fetchData = await fetch("http://localhost:3001/api/carpetas", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!fetchData.ok) {
        return;
      } else {
        newFolderName.value = "";
        let json = await fetchData.json();
        AllFolders.value.push(json.data);
        router.push(`/dashboard/${json.data._id}`);
      }
    };

    return { newFolderName, addFolder, focusOn, focusOut };
  },
};
</script>

<style scoped>
form {
  display: flex;
  align-items: center;
  padding: 8px 10px;
  border-radius: 5px;
}
input {
  padding: 0;
}

.inputIcon {
  width: 24px;
  padding: 0;
  font-size: 22px;
  font-weight: bold;
  line-height: 1;
  color: var(--color-blue);
  opacity: .9;
  margin-right: 0.7rem;
}
</style>
