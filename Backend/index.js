const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
app.use(express.json());

app.use(cors());

const port = 3000;

// const url = "mongodb://localhost:27017/products";
const url = "mongodb://localhost:27017/userdb";

mongoose
  .connect(url)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

// const schema = mongoose.Schema;
// const productschema = new schema({
//   data: schema.Types.Mixed,
// });

// const productmodel = mongoose.model("items", productschema);
// const ProductModel = productmodel;
// console.log(productmodel);

const schema = mongoose.Schema;
const bmischema = new schema({
  name: String,
  email: String,
  gender: String,
  age: Number,
  height: Number,
  weight: Number,
  status: Boolean,
  bmitotal: Number,
});

const bmimodel = mongoose.model("bmidata", bmischema);

app.post("/bmi", async (req, res) => {
  try {
    const { name, email, age, gender, height, weight } = req.body;
    if (!name || !email || !age || !gender || !height || !weight) {
      return res.status(400).json({
        message: "All fields are required!!",
      });
    }
    const heightinMeter = height / 100;

    const bmitotal = weight / (heightinMeter * heightinMeter);

    console.log(bmitotal);

    const result = await bmimodel.create({ ...req.body, bmitotal });

    if (!result) {
      return res.status(404).json({
        message: "NO record found",
      });
    }

    return res.status(200).json({ result, bmitotal });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      err: err.message,
    });
  }
});

// to get all  active users

app.get("/bmi/active", async (req, res) => {
  try {
    const result = await bmimodel.find({ status: true });

    if (result.length === 0) {
      return res.status(404).json({
        message: "No active users found",
      });
    }

    res.status(200).json({
      message: "Active users fetched successfully",
      result,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

// to get data from id
app.get("/bmi/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    if (!req.params.id) {
      return res.status(400).json({
        message: "Id not Found",
      });
    }
    const id = req.params.id;

    const result = await bmimodel.findById(id);
    if (!result) {
      return res.status(404).json({
        message: "no record found",
      });
    }
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      err: err.message,
    });
  }
});

// to soft delete the data
app.patch("/bmi/softdelete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await bmimodel.findByIdAndUpdate(
      id,
      { status: false },
      { new: true },
    );
    if (!result) {
      return res.status(404).json({
        message: "no record found",
      });
    }
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      err: err.message,
    });
  }
});

// update the data
app.patch("/bmi/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const result = await bmimodel.findByIdAndUpdate(id, data, { new: true });

    if (!result) {
      return res.status(404).json({
        message: "No record found",
      });
    }

    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      err: err.message,
    });
  }
});

// to delete permannent data

app.delete("/bmi/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await bmimodel.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({
        message: "no record found",
      });
    }
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      err: err.message,
    });
  }
});





//to get inactive user data
app.get("/bmi/inactive/users", async (req, res) => {
  try {
    const result = await bmimodel.find({ status: false });

    console.log("Inactive users:", result);

    return res.status(200).json({
      result,
    });
  } catch (err) {
    console.log("ERROR:", err);

    return res.status(500).json({
      message: "Internal Server Error",
      err: err.message,
    });
  }
});



//  to restore the data
app.patch("/bmi/restore/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await bmimodel.findByIdAndUpdate(
      id,
      { status: true },
      { new: true },
    );
    if (!result) {
      return res.status(404).json({
        message: "no record found",
      });
    }
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      err: err.message,
    });
  }
});



// const userSchema = new schema({
//   name: String,
//   lastname: String,
//   email: String,
//   phone: String,
//   city: String,
//   country: String,
//   gender: String,
//   age: Number,
//   course: String,
//   address: String,
//   pincode: Number,
//   company: String,
//   salary: Number,
//   skill: String,
//   experience: String,
//   status: {
//     type: String,
//     default: "active",
//   },
// });

// const UserModel = mongoose.model("user", userSchema);

// POST user
app.post("/users", async (req, res) => {
  try {
    const result = await UserModel.create(req.body);

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// GET users
app.get("/users", async (req, res) => {
  try {
    const result = await UserModel.find();

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// GET single user
app.get("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const result = await UserModel.findById(id);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// get deleted user

app.get("/users/deletedusers/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const result = await UserModel.findById(id);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// DELETE user
app.delete("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;

    await UserModel.findByIdAndDelete(id);

    res.status(200).json({
      message: "User deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

app.patch("/users", async (req, res) => {
  try {
    const { id, name, city, salary } = req.body;
    if (!(id, name, city, salary)) {
      return res.status(400).json({ message: "not found  data" });
    }

    const result = await UserModel.findByIdAndUpdate(
      id,
      {
        name,
        city,
        salary,
      },
      { new: true },
    );

    res.status(200).json({
      message: "User Updated",
      result,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

app.patch("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "no id found" });
    }

    const result = await UserModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json({
      message: "User Updated",
      result,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

app.patch("/users", async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({ message: "no id found" });
    }

    const result = await UserModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json({
      message: "User Updated",
      result,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// // soft delete

app.patch("/users/softdelete/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const result = await UserModel.findByIdAndUpdate(
      id,
      {
        status: "deleted",
      },
      { new: true },
    );

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// // restore endpoint
app.patch("/users/restore/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const result = await UserModel.findByIdAndUpdate(
      id,
      {
        status: "active",
      },
      { new: true },
    );

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// app.get("/serch/:name/:operator", async (req, res) => {

//     const { name,operation } = req.body;
//      const vowels = "aeiouAEIOU";

//     if(operation === "vowels"){
//       const data  = name.map((items)=>{
//         if(vowels.includes(items)){
//           res.status(200).json({message:"vowels",items})
//         }
//       }
//     }

// });

// // endpoint start

//  all product

app.get("/products", async (req, res) => {
  try {
    const result = await productmodel.find();
    if (result.length == 0) {
      return res.status(404).json({ message: "no data fetched in result " });
    }
    res.status(200).json({ result });
  } catch (err) {
    res.status(404).json({ message: "no data found" });
  }
});

// product by name
app.get("/users/search/:name", async (req, res) => {
  try {
    const name = req.params.name;

    const result = await UserModel.find({ name });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// product by id endpoint
app.get("/products/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const result = await productmodel.findById(id);

    if (!result) {
      return res.status(404).json({
        message: "no data fetched in result",
      });
    }
    res.status(200).json({
      result,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// category endpoint

app.get("/products/category/:categoryName", async (req, res) => {
  try {
    const categoryName = req.params.categoryName;

    const result = await ProductModel.find({
      category: categoryName,
    });
    if (result.length === 0) {
      return res.status(404).json({
        message: "No products found",
      });
    }
    res.status(200).json({
      result,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// brand endpoint

app.get("/products/brands/:brandname", async (req, res) => {
  try {
    const brandname = req.params.brandname;

    const result = await ProductModel.find({
      brand: brandname,
    });
    if (result.length === 0) {
      return res.status(404).json({
        message: "No products found",
      });
    }
    res.status(200).json({
      result,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// //2nd endpoint
app.get("/products/data1", async (req, res) => {
  try {
    const { category, brand } = req.query;

    const result = await ProductModel.find({
      category,
      brand,
    });

    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// //3rd endpoint
// app.get("/products/data2", async (req, res) => {
//   try {
//     const { minPrice, maxPrice, category } = req.query;

//     const result = await ProductModel.find({
//       category,
//       price: {
//         $gte: Number(minPrice),
//         $lte: Number(maxPrice),
//       },
//     });

//     res.status(200).json({ result });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// //4rd endpoint

// app.get("/products/data3", async (req, res) => {
//   try {
//     const { rating, stock } = req.query;
//     const result = await ProductModel.find({
//       rating: { $gte: Number(rating) },
//       stock: { $gte: Number(stock) },
//     });
//     res.status(200).json({ result });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // 5th endpoint
// app.get("/products/data4", async (req, res) => {
//   try {
//     const { brand, category } = req.query;

//     const result = await ProductModel.find({
//       brand,
//       category,
//     });

//     res.status(200).json({ result });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// //6th endpoint

// app.get("/products/filter6", async (req, res) => {
//   try {
//     const { status, stock } = req.query;
//     const result = await ProductModel.find({
//       availabilityStatus: status,
//       stock: { $gte: Number(stock) },
//     });
//     res.status(200).json({ result });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// //7th endpoint

// app.get("/products/filter7", async (req, res) => {
//   try {
//     const { warranty, shipping } = req.query;

//     const result = await ProductModel.find({
//       warrantyInformation: warranty,
//       shippingInformation: shipping,
//     });

//     res.status(200).json({ result });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// //8th endpoint
// app.get("/products/filter8", async (req, res) => {
//   try {
//     const { tag, rating } = req.query;

//     const result = await ProductModel.find({
//       tags: tag,
//       rating: { $gte: Number(rating) },
//     });

//     res.status(200).json({ result });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });


// next endpoint
  app.get("/products/filter81", async (req, res) => {
  try {
    const { brand, rating } = req.query;

    const result = await ProductModel.find({
      brand: brand,
      rating: { $gte: Number(rating) },
    });

    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// //9th endpoint

// app.get("/products/filter9", async (req, res) => {
//   try {
//     const { category, brand, rating } = req.query;

//     const result = await ProductModel.find({
//       $and: [{ category }, { brand }, { rating: { $gte: Number(rating) } }],
//     });

//     res.status(200).json({ result });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// 10th endpoint top rated products

app.get("/products/toprated", async (req, res) => {
  const result = await ProductModel.find().sort({ rating: -1 });

  res.status(200).json({ result });
});

// // 11th endpoint

app.get("/products/lowtohigh", async (req, res) => {
  const result = await ProductModel.find().sort({ price: 1 });

  res.status(200).json({ result });
});

// // 12th endpoint
app.get("/products/hightolow", async (req, res) => {
  const result = await ProductModel.find().sort({ price: -1 });

  res.status(200).json({ result });
});

// // 13th endpoint
app.get("/products/instock", async (req, res) => {
  const result = await ProductModel.find({ stock: { $gt: 0 } });
  res.status(200).json({ result });
});

// // 14th endpoint
app.get("/products/newproducts", async (req, res) => {
  const result = await ProductModel.find().sort({ releaseDate: -1 }).limit(10);

  res.status(200).json({ result });
});

// // 15th endpoint
app.get("/products/outofstock", async (req, res) => {
  const result = await ProductModel.find({ stock: 0 });
  res.status(200).json({ result });
});

// //16th endpoint
app.get("/products/limit/:number", async (req, res) => {
  const limit = parseInt(req.params.number);
  const result = await ProductModel.find().limit(limit);
  res.status(200).json({ result });
});

// //17th endpoint
app.get("/products/bestdiscount", async (req, res) => {
  const result = await ProductModel.find().sort({ discountPercentage: -1 });

  res.status(200).json({ result });
});

// //18th endpoint - lowest rated

app.get("/products/lowestrated", async (req, res) => {
  const result = await ProductModel.find().sort({ rating: 1 });
  res.status(200).json({ result });
});

// //19th endpoint brand name

app.get("/products/brand/:brandName", async (req, res) => {
  const brandName = req.params.brandName;
  const result = await ProductModel.find({ brand: brandName });
  res.status(200).json({ result });
});

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
