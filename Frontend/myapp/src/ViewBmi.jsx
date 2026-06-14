import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ViewBmi() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/bmi/${id}`);
      setUser(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleUpdate = () => {
    navigate(`/modify/${id}`);
  };

  const handleSoftDelete = async () => {
    try {
      await axios.patch(`http://localhost:3000/bmi/softdelete/${id}`);

      alert("User Deleted");

      //  navigate("/deleteduserbmi");
    } catch (error) {
      console.log(error.message);
    }
  };

  if (!user) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <h2>User BMI Details</h2>

      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Gender: {user.gender}</p>
      <p>Age: {user.age}</p>
      <p>Height: {user.height}</p>
      <p>Weight: {user.weight}</p>
      <p>BMI: {user.bmitotal}</p>

      <button onClick={handleUpdate}>Update</button>

      <button onClick={handleSoftDelete}>Soft Delete</button>
    </div>
  );
}

export default ViewBmi;
