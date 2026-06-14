import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Modify = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    age: "",
    height: "",
    weight: "",
    status: true,
  });

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/bmi/${id}`);

      setFormData(res.data
        // name: res.data.name,
        // email: res.data.email,
        // gender: res.data.gender,
        // age: res.data.age,
        // height: res.data.height,
        // weight: res.data.weight,
        // status: res.data.status,
    );
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.patch(
        `http://localhost:3000/bmi/update/${id}`,
        formData,
      );

      console.log(res.data);

      alert("User Updated Successfully");

      navigate(`/viewbmi/${id}`);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  return (
    <div>
      <h2>Update User</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
        <br />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <br />

        <input
          type="text"
          name="gender"
          placeholder="Gender"
          value={formData.gender}
          onChange={handleChange}
        />
        <br />

        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
        />
        <br />

        <input
          type="number"
          name="height"
          placeholder="Height"
          value={formData.height}
          onChange={handleChange}
        />
        <br />

        <input
          type="number"
          name="weight"
          placeholder="Weight"
          value={formData.weight}
          onChange={handleChange}
        />
        <br />

        <button type="submit">Update User</button>
      </form>
    </div>
  );
};

export default Modify;
