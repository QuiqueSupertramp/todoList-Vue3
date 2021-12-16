let URL_Folders = "https://apiserver-todolist.herokuapp.com/api/carpetas";
let URL_Tasks = "https://apiserver-todolist.herokuapp.com/api/tareas";
let URL_Users = "https://apiserver-todolist.herokuapp.com/api/usuarios";

export const getUserById = async () => {
  let userStorageId = localStorage.getItem("user");
  if (userStorageId) {
    try {
      const data = await fetch(`${URL_Users}/${userStorageId}`);
      const json = data.json();
      return json;
    } catch (error) {
      console.log(error);
    }
  }
};

export const deleteFolderById = async (folderId) => {
  try {
    let data = await fetch(`${URL_Folders}/${folderId}`, {
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
    let data = await fetch(`${URL_Tasks}/${taskId}`, {
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
    let data = await fetch(`${URL_Tasks}/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    let json = await data.json();
    return json;
  } catch (error) {
    console.log(error);
  }
};

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
