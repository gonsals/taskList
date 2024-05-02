import { useState } from "react";
import { access } from '../../app/services/tasks'
import { UserType } from '../../common/UserType'

const Home = () => {

  const [user, setUser] = useState<UserType>()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      user && await access(user?.userName).then((data) => setUser({ ...user, id: data }))
    } catch (error) {
      console.log(error)
    }
  }

  return (

    < div >
      <h4>Introduce tu nombre. Si no está en la base de datos, se creará.</h4>

      <form onSubmit={handleSubmit}>
        <input type="text" placeholder='Name' onChange={
          (e) => setUser({ ...user, userName: e.target.value })}
        />
        <button type="submit">Send</button>
      </form>

      {user && <p>{user.id}</p>}
    </div >
  )
};


export default Home;
