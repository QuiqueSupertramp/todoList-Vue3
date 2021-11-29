<template>
    <button>todas tus tareas</button>
</template>

<script>
import { inject } from 'vue'
export default {
    setup() {
        let user = inject("user")
        console.log(user.value)
    },
}
</script>