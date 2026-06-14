import axios from "axios";
import { useEffect, useState } from "react";

const DeletedUserbmi = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    InactiveUsers();
  }, []);

  const InactiveUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/bmi/inactive/users");

      setUsers(res.data.result);
      console.log(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const restoreUser = async (id) => {
    try {
      await axios.patch(`http://localhost:3000/bmi/restore/${id}`);

      alert("User Restored");

      InactiveUsers();
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/bmi/delete/${id}`);

      alert("User Deleted Permanently");

      InactiveUsers();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <h1>Deleted Users</h1>

      {users.map((user) => (
        <div key={user._id}>
          <h3>{user.name}</h3>
          <p>{user.email}</p>

          <button onClick={() => restoreUser(user._id)}>Restore</button>

          <button onClick={() => deleteUser(user._id)}>
            Delete Permanently
          </button>

          <hr />
        </div>
      ))}
    </div>
  );
};

export default DeletedUserbmi;
