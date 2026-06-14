import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const DeletedUsers = ()=> {
  const { id } = useParams();

  console.log(id);
  const navigate = useNavigate();

  const [user, setUser] = useState({});

  async function getDeletedUser() {
    try {
      const res = await axios.get(`http://localhost:3000/users/deletedusers/${id}`);
  console.log(res.data);
      setUser(res.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function restoreUser() {
    try {
      await axios.patch(`http://localhost:3000/users/restore/${id}`);

      alert("User Restored");

      navigate("/users");
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getDeletedUser();
  }, []);

  return (
    <div className="user-card">
      <h1>Deleted User</h1>

      <h2>
        {user.name} {user.lastname}
      </h2>

      <p>Email : {user.email}</p>

      <p>Phone : {user.phone}</p>

      <p>City : {user.city}</p>

      <p>Status : {user.status}</p>

      <button onClick={restoreUser}>Restore User</button>
    </div>
  );
}

export default DeletedUsers;
