<template>
  <main class="home">
    <div class="introduction">
      <h2>Bienvenido</h2>
      <p>Administra tus tareas de forma sencilla</p>
      <router-link to="/register" class="btn-try-free"
        >Pruebalo gratis!</router-link
      >
    </div>
    <div class="img-home">
      <img class="img-todos" src="@/assets/todos.jpg" alt="" />
    </div>
  </main>
</template>

<style>
h2 {
    margin-block-start: 0em;
    margin-block-end: 0em;
    font-size: 2em;
}
.home {
    margin: 3rem auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 90vw;
    gap: 4vw;
}

.introduction {
    width: 43vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
}

.img-home {
    width: 43vw;
}
.img-todos {
    width: 100%;
}
.btn-try-free {
  background-color: var(--color-blue);
  color: var(--color-white);
  border-radius: 2px;
  padding: 0 10px;
}

</style>
