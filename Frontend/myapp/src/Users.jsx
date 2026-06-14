import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Users = ()=> {
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  async function getUsers() {
    try {
      const res = await axios.get("http://localhost:3000/users");

      setUsers(res.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="users-container">
      <h1 className="users-title">All Users</h1>

      <div className="users-grid">
        {users.map((user) => (
          <div className="user-card" key={user._id}>
            <h2>
              {user.name} {user.lastname}
            </h2>

            <p>{user.email}</p>

            <p>{user.city}</p>

            <button onClick={() => navigate(`/userinfo/${user._id}`)}>
              View More
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Users;
