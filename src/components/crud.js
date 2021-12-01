// let URL_Folders = "https://apiserver-todolist.herokuapp.com/api/carpetas";
// let URL_Tasks = "https://apiserver-todolist.herokuapp.com/api/tareas";
// let URL_Users = "https://apiserver-todolist.herokuapp.com/api/usuarios";

export const getUserById = async (id) => {
    let data = await fetch(`http://localhost:3001/api/usuarios/${id}`)
    if (data.ok) {
        let json = await data.json()
        return json
    }
}