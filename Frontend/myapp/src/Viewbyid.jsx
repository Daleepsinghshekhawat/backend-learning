import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ViewById = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  async function fetchProduct() {
    try {
      const response = await axios.get(`http://localhost:3000/products/${id}`);

      const data = response.data.result || response.data;

      setProduct(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchProduct();
  }, [id]);

  return (
    <div>
      {product && (
        <div>
          <img src={product.thumbnail} width="200" />

          <h1>{product.title}</h1>

          <p>{product.description}</p>

          <h3>Category : {product.category}</h3>

          <h3>Brand : {product.brand}</h3>

          <h3>Price : ${product.price}</h3>

          <h3>Rating : {product.rating}</h3>

          <h3>Stock : {product.stock}</h3>
        </div>
      )}
    </div>
  );
}

export default ViewById;
