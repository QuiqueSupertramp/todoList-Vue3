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
        @keyup="validate"
        @focus="focusOn"
        @focusout="focusOff"
        autocomplete="off"
      />
      <div class="dynamicInput__icons">
        <i
          v-if="!input.status.error && modelValue.length != 0"
          class="fas fa-check dynamicInput__checkIcon"
        ></i>
        <i
          v-if="input.status.error && modelValue.length != 0"
          class="fas fa-times dynamicInput__errorIcon"
        ></i>
      </div>
    </div>

    <div
      class="dynamicInput__errorSpan"
      id="errorSpan"
      v-if="input.status.error && modelValue.length != 0"
    >
      <span>{{ input.errorMessage }}</span>
    </div>
  </div>
</template>

<script>
import { watch, watchEffect, reactive } from "@vue/runtime-core";
export default {
  props: {
    input: Object,
    modelValue: String,
  },

  setup(props, { emit }) {
    const infoSpanToggle = () => {
      const span = document.getElementById(props.input.id).firstElementChild;

      if (props.input.status.active) {
        span.classList.add("span--top");
        span.classList.add("span--active");
        span.classList.remove("span--inactive");
        span.classList.remove("span--error");
        return;
      }

      if (props.modelValue.length == 0) {
        span.classList.remove("span--top");
        span.classList.remove("span--active");
        span.classList.add("span--inactive");
        span.classList.remove("span--error");
        return;
      }

      if (!props.input.status.error) {
        span.classList.add("span--inactive");
        span.classList.remove("span--active");
        span.classList.remove("span--error");
        return;
      }

      if (props.input.status.error) {
        span.classList.remove("span--inactive");
        span.classList.remove("span--active");
        span.classList.add("span--error");
        return;
      }
    };

    const setBorderColor = () => {
      validate();
      const dynamicInput = document.getElementById(props.input.id);

      if (props.input.status.active) {
        console.log("status");
        dynamicInput.classList.add("dynamicInput--active");
        dynamicInput.classList.remove("dynamicInput--inactive");
        dynamicInput.classList.remove("dynamicInput--invalid");
        return;
      }

      if (props.modelValue.length == 0) {
        console.log("value");
        dynamicInput.classList.add("dynamicInput--inactive");
        dynamicInput.classList.remove("dynamicInput--active");
        dynamicInput.classList.remove("dynamicInput--invalid");
        return;
      }

      if (!props.input.status.error) {
        console.log("no error");
        dynamicInput.classList.add("dynamicInput--inactive");
        dynamicInput.classList.remove("dynamicInput--active");
        dynamicInput.classList.remove("dynamicInput--invalid");
        return;
      }

      if (props.input.status.error) {
        console.log("error");
        dynamicInput.classList.add("dynamicInput--invalid");
        dynamicInput.classList.remove("dynamicInput--active");
        dynamicInput.classList.remove("dynamicInput--inactive");
        return;
      }
    };

    const focusOn = () => {
      props.input.status.active = true;
      infoSpanToggle();
      setBorderColor();
    };

    const focusOff = () => {
      props.input.status.active = false;
      //   infoSpanToggle();
      //   setBorderColor();
    };

    const validate = () => {
      if (props.modelValue.length == 0) {
        props.input.status.error = false;
        return;
      }

      let hasError = props.input.condition();

      if (hasError) {
        props.input.status.error = true;
      } else {
        props.input.status.error = false;
      }
    };

    const sendInputValue = (event) => {
      emit("update:modelValue", event.target.value);
    };

    // watchEffect(() => {
    //   if (props.input.status.error) {
    //     console.log(`${props.input.id} esta mal`);
    //   } else {
    //     console.log(`${props.input.id} esta correcto`);
    //   }
    // });

    watch(props, () => {
      infoSpanToggle();
      setBorderColor();
    });

    return { sendInputValue, validate, focusOn, focusOff };
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
  border: 2px solid transparent;
  box-shadow: none;
  background-color: rgb(255, 240, 240);
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
  /* color: var(--color-blue); */
  padding: 0 5px;
  z-index: 1;
}

.span--active {
  color: var(--color-blue);
}
.span--inactive {
  color: var(--color-grey);
}
.span--error {
  /* color: red; */
}
/* 
#inputDiv,
#inputEmail,
#inputPassword,
#inputPassword2 {
  border: none;
  width: 100%;
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
}
</style>
