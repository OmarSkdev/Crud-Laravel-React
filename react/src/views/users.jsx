import { useEffect, useState } from "react"
import axiosClient from "../axiosClient";
import { Link } from "react-router-dom";

export default function users(){
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(()=> {
        getUsers();
    },[])

    const onDeleteClick = user => {
        if(!window.confirm("Estás seguro que deseas eliminar el usuario?")){
            return
        }
        axiosClient.delete(`/users/${user.id}`)
            .then(() => {
                getUsers()
            })
    }

    const getUsers = () => {
        setLoading(true)
        axiosClient.get('/users')
            .then(({ data })=>{
                setLoading(false)
                setUsers(data.data)
            })
            .catch(()=>{
                setLoading(false)
            })
    }
    return(
        <div>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <h1>Usuarios</h1>
                <Link className="btn-add" to="/users/new">Agregar nuevo</Link>
            </div>
            <div className="card animated fadeInDown">
          <table>
            <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Acciones</th>
            </tr>
            </thead>
            {loading &&
              <tbody>
              <tr>
                <td colSpan="5" className="text-center">
                  Loading...
                </td>
              </tr>
              </tbody>
            }
            {!loading &&
              <tbody>
              {users?.map(u => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>
                    <Link className="btn-edit" to={'/users/' + u.id}>Edit</Link>
                    &nbsp;
                    <button className="btn-delete" onClick={ev => onDeleteClick(u)}>Delete</button>
                  </td>
                </tr>
              ))}
              </tbody>
            }
          </table>
        </div>
            
        </div>


    )
    
}
