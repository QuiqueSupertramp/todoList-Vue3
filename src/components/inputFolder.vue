<template>
  <form
    @submit.prevent="addFolder"
    id="folderForm"
    @mouseenter="mouseOn"
    @mouseleave="mouseOut"
  >
    <input class="inputIcon" type="submit" value="+" />
    <input
      @focus="focusOn"
      @focusout="focusOut"
      type="text"
      placeholder="Añadir carpeta"
      v-model="newFolderName"
      class="inputNewFolderName"
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
      document.getElementById("folderForm").style.border =
        "2px solid var(--color-mediumgrey)";
    };

    let focusOut = (e) => {
      document.getElementById("folderForm").style.border =
        "2px solid transparent";
      e.target.parentElement.firstElementChild.style.backgroundColor = "var(--color-ligthgrey)";
      e.target.value = "";
    };

    let mouseOn = (e) => {
      if (document.activeElement.matches(".inputNewFolderName")) {
        return;
      }
      e.target.firstElementChild.style.backgroundColor =
        "#ebebeb";
    };

    let mouseOut = (e) => {
      if (document.activeElement.matches(".inputNewFolderName")) {
        return;
      }
      e.target.firstElementChild.style.backgroundColor =
        "var(--color-ligthgrey)";
    };

    let addFolder = async (e) => {
      data = {
        name: newFolderName.value,
        user: user.data._id,
      };
      let fetchData = await fetch("https://apiserver-todolist.herokuapp.com/api/carpetas", {
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
        e.target.lastElementChild.blur()
      }
    };

    return { newFolderName, addFolder, focusOn, focusOut, mouseOn, mouseOut };
  },
};
</script>

<style scoped>
form {
  display: flex;
  align-items: center;
  padding: 8px 10px;
  border-radius: 5px;
  border: 2px solid transparent;
}
input {
  padding: 0;
}

.inputIcon {
  border-radius: 50%;
  width: 24px;
  height: 24px;
  padding: 0;
  font-size: 22px;
  font-weight: bold;
  line-height: 1;
  color: var(--color-blue);
  margin-right: 0.7rem;
}
</style>
