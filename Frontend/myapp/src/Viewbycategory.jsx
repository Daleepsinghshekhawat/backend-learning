import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const  ViewByCategory = ()=> {
  const { category } = useParams();

  const [products, setProducts] = useState([]);

  async function fetchProducts() {
    try {
      const response = await axios.get(
        `http://localhost:3000/products/category/${category}`,
      );

      const data = response.data.result || response.data;

      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [category]);

  return (
    <div>
      <h1>{category}</h1>

      {products.map((item) => (
        <div key={item.id}>
          <img src={item.thumbnail} width="200" />

          <h2>{item.title}</h2>

          <p>{item.description}</p>

          <h3>Brand : {item.brand}</h3>

          <h3>Price : ${item.price}</h3>

          <h3>Discount : {item.discountPercentage}%</h3>

          <h3>Rating : {item.rating}</h3>

          <h3>Stock : {item.stock}</h3>
        </div>
      ))}
    </div>
  );
}

export default ViewByCategory;
