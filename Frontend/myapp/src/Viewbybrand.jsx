import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Viewbybrand = ()=> {
  const { brand } = useParams();

  const [products, setProducts] = useState([]);

  async function getProductsByBrand() {
    try {
      const res = await axios.get(
        `http://localhost:3000/products/brands/${brand}`,
      );

      setProducts(res.data.result);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getProductsByBrand();
  }, []);

  return (
    <div className="products-container">
      <h1>Brand : {brand}</h1>

      <div className="products-grid">
        {products.map((product) => (
          <div className="product-card" key={product._id}>
            <h2>{product.title}</h2>

            <p>Brand : {product.brand}</p>

            <p>Category : {product.category}</p>

            <p>Price : ₹{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Viewbybrand;
