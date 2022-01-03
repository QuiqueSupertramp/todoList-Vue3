// Aqui guardamos los objetos que contienen la información de los inputs

// Login Form
export let infoLoginInputs = {
  email: {
    id: "LoginInputEmail",
    span: "Correo electrónico",
    status: {
      active: false,
      error: false,
      value: "",
    },
    errorMessage: "El formato del email es incorrecto",
    type: "email",
    min: 5,
    max: 30,
    condition: () => {
      if (infoLoginInputs.email.status.value.includes("@")) {
        return (infoLoginInputs.email.status.error = false);
      } else {
        return (infoLoginInputs.email.status.error = true);
      }
    },
  },
  password: {
    id: "LoginInputPassword",
    span: "Contraseña",
    status: {
      active: false,
      error: false,
      value: "",
    },
    errorMessage: "Contraseña no válida (min: 6, max: 30)",
    type: "password",
    min: 6,
    max: 30,
    condition: () => {
      if (infoLoginInputs.password.status.value.length < 6) {
        return (infoLoginInputs.password.status.error = true);
      } else {
        return (infoLoginInputs.password.status.error = false);
      }
    },
  },
};

// Register Form
export let infoRegisterInputs = {
  name: {
    id: "inputName",
    span: "Nombre",
    status: {
      active: false,
      error: false,
      value: "",
    },
    errorMessage: "Debes agregar un nombre (min: 3, max: 30)",
    type: "text",
    min: 3,
    max: 30,
    condition: () => {
      if (infoRegisterInputs.name.status.value.length < 3) {
        return (infoRegisterInputs.name.status.error = true);
      } else {
        return (infoRegisterInputs.name.status.error = false);
      }
    },
  },
  email: {
    id: "inputEmail",
    span: "Correo electrónico",
    status: {
      active: false,
      error: false,
      value: "",
    },
    errorMessage: "El formato del email es incorrecto",
    type: "email",
    min: 5,
    max: 30,
    condition: () => {
      if (infoRegisterInputs.email.status.value.includes("@")) {
        return (infoRegisterInputs.email.status.error = false);
      } else {
        return (infoRegisterInputs.email.status.error = true);
      }
    },
  },
  password: {
    id: "inputPassword",
    span: "Contraseña",
    status: {
      active: false,
      error: false,
      value: "",
    },
    errorMessage: "Contraseña no válida (min: 6, max: 30)",
    type: "password",
    min: 6,
    max: 30,
    condition: () => {
      if (
        infoRegisterInputs.password.status.value ===
        infoRegisterInputs.password2.status.value
      ) {
        infoRegisterInputs.password2.status.error = false;
      } else {
        infoRegisterInputs.password2.status.error = true;
      }
      if (infoRegisterInputs.password.status.value.length < 6) {
        return (infoRegisterInputs.password.status.error = true);
      } else {
        return (infoRegisterInputs.password.status.error = false);
      }
    },
  },
  password2: {
    id: "inputPassword2",
    span: "Repite la contraseña",
    status: {
      active: false,
      error: false,
      value: "",
    },
    errorMessage: "Las contraseñas no coinciden",
    type: "password",
    min: 6,
    max: 30,
    condition: () => {
      if (
        infoRegisterInputs.password2.status.value.length > 5 &&
        infoRegisterInputs.password.status.value ===
          infoRegisterInputs.password2.status.value
      ) {
        return (infoRegisterInputs.password2.status.error = false);
      } else {
        return (infoRegisterInputs.password2.status.error = true);
      }
    },
  },
};
