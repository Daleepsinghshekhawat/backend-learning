import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UserInfo = ()=> {
  const { id } = useParams();

  const navigate = useNavigate();

  const [user, setUser] = useState({});

  async function getSingleUser() {
    try {
      const res = await axios.get(`http://localhost:3000/users/${id}`);

      setUser(res.data);
    } catch (error) {
      console.log(error.message);
    }
  }



  async function softDeleteUser(id) {
    navigate(`/deleteuser/${id}`);
  }

  useEffect(() => {
    getSingleUser();
  }, []);

  return (
    <div>
      <h1>User Full Details</h1>

      <h2>
        {user.name} {user.lastname}
      </h2>

      <p>Email : {user.email}</p>

      <p>Phone : {user.phone}</p>

      <p>City : {user.city}</p>

      <p>Country : {user.country}</p>

      <p>Gender : {user.gender}</p>

      <p>Age : {user.age}</p>

      <p>Course : {user.course}</p>

      <p>Address : {user.address}</p>

      <p>Pincode : {user.pincode}</p>

      <p>Company : {user.company}</p>

      <p>Salary : {user.salary}</p>

      <p>Skill : {user.skill}</p>

      <p>Experience : {user.experience}</p>


      <button onClick={() => navigate(`/updateusers/${id}`)}>
        Update User
      </button>

      <button onClick={() => softDeleteUser(user._id)}>Soft Delete</button>
    </div>
  );
}

export default UserInfo;
