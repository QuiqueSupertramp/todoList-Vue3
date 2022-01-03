// Función para comprobar si existe un usuario o no
export const checkUser = () => {
  let x = localStorage.getItem("user");
  if (x) return true;
  else return false;
};
