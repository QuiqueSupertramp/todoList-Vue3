<template>
  <div class="container">
    <div class="dynamicInput dynamicInput--inactive" :id="input.id">
      <span class="dynamicInput__infoSpan">
        {{ input.span }}
      </span>
      <input
        class="dynamicInput__input"
        :type="input.type"
        :minlength="input.min"
        :maxlength="input.max"
        :value="modelValue"
        @input="sendInputValue"
        @focus="focusOn"
        @focusout="focusOff"
        autocomplete="off"
      />
      <div class="dynamicInput__icons">
        <i
          v-if="!input.status.error && input.status.value.length != 0"
          class="fas fa-check dynamicInput__checkIcon"
        ></i>
        <i
          v-if="input.status.error && input.status.value.length != 0"
          class="fas fa-times dynamicInput__errorIcon"
        ></i>
      </div>
    </div>

    <div
      v-if="input.status.error && modelValue.length != 0"
      class="dynamicInput__errorSpan"
    >
      <span>* {{ input.errorMessage }}</span>
    </div>
  </div>
</template>

<script>
import { watch } from "@vue/runtime-core";

export default {
  props: {
    input: Object,
    modelValue: String,
  },

  setup(props, { emit }) {
    //   v-model
    const sendInputValue = (event) => {
      emit("update:modelValue", event.target.value);
    };

    // Estilos de borde y span según estado
    const infoSpanToggle = () => {
      const span = document.getElementById(props.input.id).firstElementChild;

      // Funcion para limpiar clases antes de agregar por estado
      let cleanClassList = () => {
        span.classList.remove("span--inactive");
        span.classList.remove("span--error");
        span.classList.remove("span--top");
        span.classList.remove("span--active");
      };

      // Validación segun la condición de cada input
      props.input.condition();

      // ASIGNACIÓN DE ESTILOS SEGÚN ESTADO
      // Si input esta activo
      if (props.input.status.active) {
        cleanClassList();
        span.classList.add("span--top");
        span.classList.add("span--active");
        return;
      }

      // Si está inactivo y no hay value
      if (props.input.status.value.length == 0) {
        cleanClassList();
        span.classList.add("span--inactive");
        return;
      }

      // Si está inactivo y tiene errores
      if (!props.input.status.error) {
        cleanClassList();
        span.classList.add("span--top");
        span.classList.add("span--inactive");
        return;
      }

      // Si está inactivo y se cumple la condición
      if (props.input.status.error) {
        cleanClassList();
        span.classList.add("span--top");
        span.classList.add("span--error");
        return;
      }
    };

    const setBorderColor = () => {
      const dynamicInput = document.getElementById(props.input.id);

      // Validación segun la condición de cada input
      props.input.condition();

      // ASIGNACIÓN DE ESTILOS SEGÚN ESTADO
      // Si input esta activo
      if (props.input.status.active) {
        dynamicInput.classList.add("dynamicInput--active");
        dynamicInput.classList.remove("dynamicInput--inactive");
        dynamicInput.classList.remove("dynamicInput--invalid");
        return;
      }

      // Si está inactivo y no hay value
      if (props.input.status.value.length == 0) {
        dynamicInput.classList.add("dynamicInput--inactive");
        dynamicInput.classList.remove("dynamicInput--active");
        dynamicInput.classList.remove("dynamicInput--invalid");
        return;
      }

      // Si está inactivo y hay error
      if (!props.input.status.error) {
        dynamicInput.classList.add("dynamicInput--inactive");
        dynamicInput.classList.remove("dynamicInput--active");
        dynamicInput.classList.remove("dynamicInput--invalid");
        return;
      }

      // Si está inactivo y es correcto
      if (props.input.status.error) {
        dynamicInput.classList.add("dynamicInput--invalid");
        dynamicInput.classList.remove("dynamicInput--active");
        dynamicInput.classList.remove("dynamicInput--inactive");
        return;
      }
    };

    // Manejo de estados
    const focusOn = () => {
      props.input.status.active = true;
    };

    const focusOff = () => {
      props.input.status.active = false;
    };

    // WATCHERS
    watch(props, () => {
      // Estilos segun estado
      infoSpanToggle();
      setBorderColor();

      // Manejo errores
      props.input.condition();
    });

    return { sendInputValue, focusOn, focusOff };
  },
};
</script>

<style scoped>
.container {
  width: 100%;
}

.dynamicInput {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  width: 100%;
}

.dynamicInput--inactive {
  border: 2px solid transparent;
  box-shadow: 0 0 2px var(--color-grey);
}

.dynamicInput--active {
  border: 2px solid var(--color-blue);
  box-shadow: none;
}

.dynamicInput--invalid {
  border: 2px solid var(--color-mediumred);
  box-shadow: none;
}

.dynamicInput__icons {
  width: 2rem;
}

.dynamicInput__checkIcon {
  color: springgreen;
}

.dynamicInput__errorIcon {
  color: red;
}

.registerForm {
  padding-top: 6rem;
}

.dynamicInput__input {
  outline: none;
  border: none;
  width: 100%;
  padding: 15px;
  background-color: transparent;
  color: var(--color-black);
}

.registerName {
  width: 100%;
}

.dynamicInput__infoSpan {
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
  padding: 0 5px;
  z-index: 1;
}

.span--active {
  color: var(--color-blue);
}
.span--inactive {
  color: var(--color-grey);
}
/* .span--error {
  color: red;
} */

input[type="submit"] {
  /* margin-top: 1rem; */
  background-color: var(--color-blue);
  color: var(--color-white);
  border-radius: 5px;
  padding: 10px 40px;
  width: 90%;
}

.link-login {
  color: var(--color-grey);
  padding: 0;
}

.link-login:hover {
  background-color: transparent;
  color: var(--color-blue);
}

#Error {
  color: red;
}

#Error p {
  margin: 0;
}

.dynamicInput__errorSpan {
  color: red;
  font-size: 12px;
  margin-top: 4px;
  margin-left: 10px;
}
</style>
