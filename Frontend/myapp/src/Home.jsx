import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



const  Home= ()=> {
 
const navigate = useNavigate();
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
console.log(displayedProducts);


  const showAll = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/products");
      const data = response.data.result || response.data;
      setDisplayedProducts(data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };


  const searchProduct = async () => {
    setLoading(true);
    try {
      const query = search.trim();
      const url =
        query === ""
          ? "http://localhost:3000/products"
          : `http://localhost:3000/products/search/${encodeURIComponent(query)}`;
      const response = await axios.get(url);
      const data = response.data.result || response.data;
      setDisplayedProducts(data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleSort = async (event) => {
    const value = event.target.value;
    setLoading(true);
    try {
      let url = "http://localhost:3000/products";
      if (value === "low") url = "http://localhost:3000/products/lowtohigh";
      else if (value === "high")
        url = "http://localhost:3000/products/hightolow";
      else if (value === "rating")
        url = "http://localhost:3000/products/toprated";
      else if (value === "discount")
        url = "http://localhost:3000/products/bestdiscount";
      const response = await axios.get(url);
      const data = response.data.result || response.data;
      setDisplayedProducts(data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };




 const showProductById = (id) => {
   navigate(`/viewbyid/${id}`);
 };


const showProductByName = (name) => {
  navigate(`/viewbyname/${encodeURIComponent(name)}`);
};


 const showProductByCategory = (category) => {
   navigate(`/viewbycategory/${encodeURIComponent(category)}`);
 };
 

const brandproduct = (brand) => {
  navigate(`/viewbybrand/${encodeURIComponent(brand)}`);
};


  useEffect(() => {
    showAll();
  }, []);

  // ================= RETURN =================

  return (
    <div
      style={{
        backgroundColor: "#111827",
        minHeight: "100vh",
        padding: "20px",
        color: "white",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
        Products Dashboard
      </h1>

      {/* ================= SEARCH + SORT ================= */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "30px",
        }}
      >
        <div>
          <input
            type="text"
            placeholder="Search Product"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: "12px",
              width: "250px",
              borderRadius: "10px",
              border: "none",
              marginRight: "10px",
            }}
          />

          <button
            onClick={searchProduct}
            style={{
              padding: "12px",
              borderRadius: "10px",
              border: "none",
              backgroundColor: "#2563eb",
              color: "white",
              fontWeight: "bold",
            }}
          >
            Search
          </button>
        </div>

        <select
          onChange={handleSort}
          style={{
            padding: "12px",
            borderRadius: "10px",
          }}
        >
          <option value="all">Sort Products</option>

          <option value="low">Price Low To High</option>

          <option value="high">Price High To Low</option>

          <option value="rating">Top Rated</option>

          <option value="discount">Best Discount</option>
        </select>
      </div>

      {/* ================= TOP BUTTONS ================= */}

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          marginBottom: "40px",
        }}
      >
        <button onClick={showAll}>All Products</button>

        <button onClick={() => navigate("./categorybrand")}>
          category &brand
        </button>

        <button onClick={() => navigate("./discountcategory")}>
          {" "}
          Discount & category
        </button>

        <button onClick={() => navigate("./instockbrand")}>
          In Stock&brand
        </button>

        <button onClick={() => navigate("./newproductsbrand")}>
          New Products &brand
        </button>

        <button onClick={() => navigate("./ratingdiscount")}>
          rating & discountPercentage
        </button>
      </div>

      {loading ? (
        <h1
          style={{
            textAlign: "center",
          }}
        >
          Loading...
        </h1>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: "25px",
            width: "100%",
          }}
        >
          {displayedProducts.map((item) => {
            return (
              <div
                key={item._id}
                style={{
                  backgroundColor: "#1f2937",
                  border: "1px solid #4b5563",
                  borderRadius: "20px",
                  padding: "20px",
                  color: "white",
                }}
              >
                {/* IMAGE */}

                <img
                  src={item.thumbnail}
                  alt=""
                  width="100%"
                  height="220px"
                  style={{
                    borderRadius: "10px",
                    objectFit: "cover",
                    marginBottom: "15px",
                  }}
                />

                {/* ID */}

                <div
                  style={{
                    borderBottom: "1px solid gray",
                    paddingBottom: "10px",
                    marginBottom: "10px",
                  }}
                >
                  <span>
                    <b>Id :</b>
                  </span>

                  <span
                    style={{
                      float: "right",
                      color: "#facc15",
                    }}
                  >
                    {item._id}
                  </span>
                </div>

                {/* TITLE */}

                <div
                  style={{
                    borderBottom: "1px solid gray",
                    paddingBottom: "10px",
                    marginBottom: "10px",
                  }}
                >
                  <span>
                    <b>Title :</b>
                  </span>

                  <span
                    style={{
                      float: "right",
                      fontWeight: "bold",
                    }}
                  >
                    {item.title}
                  </span>
                </div>

                {/* BRAND */}

                <div
                  style={{
                    borderBottom: "1px solid gray",
                    paddingBottom: "10px",
                    marginBottom: "10px",
                  }}
                >
                  <span>
                    <b>Brand :</b>
                  </span>

                  <span
                    style={{
                      float: "right",
                    }}
                  >
                    {item.brand}
                  </span>
                </div>

                {/* CATEGORY */}

                <div
                  style={{
                    borderBottom: "1px solid gray",
                    paddingBottom: "10px",
                    marginBottom: "10px",
                  }}
                >
                  <span>
                    <b>Category :</b>
                  </span>

                  <span
                    style={{
                      float: "right",
                    }}
                  >
                    {item.category}
                  </span>
                </div>

                {/* PRICE */}

                <div
                  style={{
                    borderBottom: "1px solid gray",
                    paddingBottom: "10px",
                    marginBottom: "10px",
                  }}
                >
                  <span>
                    <b>Price :</b>
                  </span>

                  <span
                    style={{
                      float: "right",
                      color: "#22c55e",
                      fontWeight: "bold",
                    }}
                  >
                    ₹{item.price}
                  </span>
                </div>

                {/* BUTTONS */}

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "20px",
                  }}
                >
                  <button
                    onClick={() => showProductById(item.id)}
                    style={{
                      backgroundColor: "#2563eb",
                      color: "white",
                      border: "none",
                      padding: "10px 15px",
                      borderRadius: "10px",
                      fontWeight: "bold",
                    }}
                  >
                    View Details
                  </button>

                  <button
                    onClick={() => showProductByName(item.title)}
                    style={{
                      backgroundColor: "#d1d5db",
                      color: "black",
                      border: "none",
                      padding: "10px 15px",
                      borderRadius: "10px",
                      fontWeight: "bold",
                    }}
                  >
                    Name
                  </button>

                  <button
                    onClick={() => showProductByCategory(item.category)}
                    style={{
                      backgroundColor: "#d1d5db",
                      color: "black",
                      border: "none",
                      padding: "10px 15px",
                      borderRadius: "10px",
                      fontWeight: "bold",
                    }}
                  >
                    Category
                  </button>

                  <button
                    onClick={() => brandproduct(item.brand)}
                    style={{
                      backgroundColor: "#d1d5db",
                      color: "black",
                      border: "none",
                      padding: "10px 15px",
                      borderRadius: "10px",
                      fontWeight: "bold",
                    }}
                  >
                    Brand
                  </button>
                 
                  <br/>

                
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Home;
