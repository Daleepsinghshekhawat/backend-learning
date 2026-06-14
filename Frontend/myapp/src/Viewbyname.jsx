import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ViewByName = () => {
  const { name } = useParams();

  const [products, setProducts] = useState([]);

  async function fetchProducts() {
    try {
      const response = await axios.get(
        `http://localhost:3000/products/search/${name}`,
      );

      const data = response.data.result || response.data;

      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [name]);

  return (
    <div>
      <h1>{name}</h1>

      {products.map((item) => (
        <div key={item.id}>
          <img src={item.thumbnail} width="200" />

          <h2>{item.title}</h2>

          <p>{item.description}</p>

          <h3>Category : {item.category}</h3>

          <h3>Brand : {item.brand}</h3>

          <h3>Price : ${item.price}</h3>

          <h3>Rating : {item.rating}</h3>
        </div>
      ))}
    </div>
  );
}

export default ViewByName;
