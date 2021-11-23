<template>
  <div>
    <h1>Dashboard</h1>
  </div>
</template>

<script>
import { onBeforeMount, inject } from "vue";
import { useRouter } from "vue-router";
export default {
  setup() {
    let router = useRouter();

    onBeforeMount(() => {
      let user = inject("user");
      console.log(user.value.name);
      !user.value.name ? router.push("/login") : null
    });
  },
};
</script>
