import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ActiveUsers = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/bmi/active");

      setUsers(res.data.result);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      {users.map((user) => (
        <div key={user._id}>
          <h3>{user.name}</h3>

          <button onClick={() => navigate(`/viewbmi/${user._id}`)}>View</button>
          
        </div>
      ))}
    </div>
  );
}

export default ActiveUsers;
