// let URL_Folders = "https://apiserver-todolist.herokuapp.com/api/carpetas";
// let URL_Tasks = "https://apiserver-todolist.herokuapp.com/api/tareas";
// let URL_Users = "https://apiserver-todolist.herokuapp.com/api/usuarios";

export const getUserById = async () => {
  let userStorageId = localStorage.getItem("user");
  if (userStorageId) {
    try {
      const data = await fetch(
        `http://localhost:3001/api/usuarios/${userStorageId}`
      );
      const json = data.json();
      return json;
    } catch (error) {}
    console.log(error);
  }
};

export const deleteFolderById = async (folderId) => {
  try {
    let data = await fetch(`http://localhost:3001/api/carpetas/${folderId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let json = await data.json();
    return json;
  } catch (error) {
    console.log(error);
  }
};

export const deleteTaskById = async (taskId) => {
  try {
    let data = await fetch(`http://localhost:3001/api/tareas/${taskId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let json = data.json();
    return json;
  } catch (error) {
    console.log(error);
  }
};

export const updateTask = async (taskId, body) => {
  try {
    let data = await fetch(`http://localhost:3001/api/tareas/${taskId}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
    let json = await data.json()
    return json
  } catch (error) {
    console.log(error)
  }
}

// export const comprobarLocalStorage = async () => {
//   let userStorageId = localStorage.getItem("user");
//   let data = {};
//   if (userStorageId) {
//     data = await getUserById(userStorageId);
//   } else {
//     return (data = "");
//   }
//   return data;
// };
