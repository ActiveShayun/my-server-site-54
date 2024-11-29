
import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'

function App() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])

  const handleAddUser=(e)=>{
    e.preventDefault()

    const form =new FormData(e.target)
    const name = form.get('name')
    const email = form.get('email')

    const user = {name, email}
    console.log(user);
    fetch('http://localhost:5000/users',{
      method: 'POST',
      headers:{
        'content-type': 'application/json'
      },
      body:JSON.stringify(user)
    })
    .then(res =>res.json())
    .then(data =>{
      console.log(data);
      const newUsers = [...users, data]
      setUsers(newUsers)
      form.reset()
    })
    
  }


  return (
    <>

      <h1>server management</h1>
      <h2>All users {users.length}</h2>
     <form onSubmit={handleAddUser}>
      <input type="text" name='name' placeholder='enter your name'/>
      <br />
      <input type="email" name="email" id="" placeholder='enter your email' />
      <br />
      <input type="submit" value="Add user" />
     </form>

      {
        users.map(user => <p key={user.id}>{user.id} : {user.name} {user.email}</p>)
      }

    </>
  )
}

export default App
