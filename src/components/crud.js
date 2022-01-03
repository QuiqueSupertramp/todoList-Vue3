let URL_Folders = "https://apiserver-todolist.herokuapp.com/api/carpetas";
let URL_Tasks = "https://apiserver-todolist.herokuapp.com/api/tareas";
let URL_Users = "https://apiserver-todolist.herokuapp.com/api/usuarios";
let URL_CheckUser =
  "https://apiserver-todolist.herokuapp.com/api/usuarios/checkUser";

export const getUserById = async () => {
  let userStorageId = localStorage.getItem("user");
  if (userStorageId) {
    try {
      let data = await fetch(`${URL_Users}/${userStorageId}`);
      let json = data.json();
      return json;
    } catch (error) {
      console.log(error);
    }
  }
};

export const getFolderById = async (folderId) => {
  let data = await fetch(`${URL_Folders}/${folderId}`);
  let json = await data.json();
  return json;
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

export let addNewUser = async (body) => {
  try {
    let data = await fetch(URL_Users, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    let json = await data.json();
    return { json, data };
  } catch (error) {
    console.log(error);
  }
};

export const addNewFolder = async (body) => {
  try {
    let data = await fetch(URL_Folders, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    let json = data.json();
    return json;
  } catch (error) {
    console.log(error);
  }
};

export const addNewTask = async (body) => {
  try {
    let data = await fetch(URL_Tasks, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    let json = await data.json();
    return { data, json };
  } catch (error) {
    console.log(error);
  }
};

export const checkUserLogin = async (body) => {
  try {
    let data = await fetch(URL_CheckUser, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(body),
    });
    let json = await data.json();
    return { data, json };
  } catch (error) {
    console.log(error);
  }
};
