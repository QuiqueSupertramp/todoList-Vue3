// Funcion que define una referencia en función de si la ruta actual tiene un componente o no
// Sirve para definir si algunos elementos se han de ver o no en función de la localización
export const checkRoute = (router, nameComponent, reference) => {
  let route = router.currentRoute.value.name;
  route === nameComponent
    ? (reference.value = true)
    : (reference.value = false);
};
