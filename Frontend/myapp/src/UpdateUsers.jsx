import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const  UpdateUsers = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    phone: "",
    city: "",
    country: "",
    gender: "",
    age: "",
    course: "",
    address: "",
    pincode: "",
    company: "",
    salary: "",
    skill: "",
    experience: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const getSingleUser = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/users/${id}`);

      setFormData(res.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  const updateUser = async (e) => {
    e.preventDefault();

    try {
      await axios.patch(`http://localhost:3000/users/${id}`, formData);

      alert("User Updated");

      navigate(`/userinfo/${id}`);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getSingleUser();
  }, []);

  return (
    <div className="form-container">
      <form onSubmit={updateUser} className="user-form">
        <h1>Update User</h1>

        <input
          type="text"
          name="name"
          placeholder="name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="text"
          name="lastname"
          placeholder="lastname"
          value={formData.lastname}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="text"
          name="phone"
          placeholder="phone"
          value={formData.phone}
          onChange={handleChange}
        />

        <input
          type="text"
          name="city"
          placeholder="city"
          value={formData.city}
          onChange={handleChange}
        />

        <input
          type="text"
          name="country"
          placeholder="country"
          value={formData.country}
          onChange={handleChange}
        />

        <input
          type="text"
          name="gender"
          placeholder="gender"
          value={formData.gender}
          onChange={handleChange}
        />

        <input
          type="number"
          name="age"
          placeholder="age"
          value={formData.age}
          onChange={handleChange}
        />

        <input
          type="text"
          name="course"
          placeholder="course"
          value={formData.course}
          onChange={handleChange}
        />

        <input
          type="text"
          name="address"
          placeholder="address"
          value={formData.address}
          onChange={handleChange}
        />

        <input
          type="number"
          name="pincode"
          placeholder="pincode"
          value={formData.pincode}
          onChange={handleChange}
        />

        <input
          type="text"
          name="company"
          placeholder="company"
          value={formData.company}
          onChange={handleChange}
        />

        <input
          type="number"
          name="salary"
          placeholder="salary"
          value={formData.salary}
          onChange={handleChange}
        />

        <input
          type="text"
          name="skill"
          placeholder="skill"
          value={formData.skill}
          onChange={handleChange}
        />

        <input
          type="text"
          name="experience"
          placeholder="experience"
          value={formData.experience}
          onChange={handleChange}
        />

        <button type="submit">Update User</button>
      </form>
    </div>
  );
}

export default UpdateUsers;
