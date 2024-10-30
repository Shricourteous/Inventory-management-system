const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cors = require("cors");
require("dotenv").config();

// Import models
const Product = require("./models/Product");
const ProductSale = require("./models/ProductSale");
const Employee = require("./models/Employee");

const app = express();

const port = 8000;

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB using Mongoose"))
  .catch((error) => console.error("MongoDB connection error:", error));

app.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    const productsale = await ProductSale.find();

    res
      .status(200)
      .json({ products: [...products], productsold: [...productsale] });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Error fetching products", error });
  }
});

// Routes
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await Employee.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ ...user });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ message: "Error logging in", error });
  }
});

app.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    const productsale = await ProductSale.find();

    res
      .status(200)
      .json({ products: [...products], productsold: [...productsale] });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Error fetching products", error });
  }
});

// Login Routes
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log({ username, password });
  try {
    const user = await Employee.findOne({ username });
    console.log("Hello", user);

    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("Is password valid:", isPasswordValid); // Log the result of the password comparison

    if (!isPasswordValid) {
      console.log("Invalid password");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ ...user });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ message: "Error logging in", error });
  }
});

const authenticateJWT = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

app.get("/private", authenticateJWT, (req, res) => {
  res.status(200).json({ message: "You have Signed in", user: req.user });
});

app.post("/products", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(200).json({
      message: "Product added successfully",
      product: savedProduct,
    });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Error adding product", error });
  }
});

app.put("/products/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedProduct = req.body;

    const result = await Product.findByIdAndUpdate(productId, updatedProduct, {
      new: true,
    });

    if (result) {
      res
        .status(200)
        .json({ message: "Product updated successfully", product: result });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Error updating product", error });
  }
});

app.delete("/products/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const result = await Product.findByIdAndDelete(productId);

    if (result) {
      res.status(200).json({ message: "Product deleted successfully" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Error deleting product", error });
  }
});

// Route to update products based on cart items
app.post("/products/cart", async (req, res) => {
  const { items } = req.body; // Get items from the request body
  let totalAmount = 0;

  try {
    // Loop through each item in the cart to update stock
    for (const item of items) {
      const { _id, quantity, price } = item; // Destructure item to get ID and quantity

      // Update the product's stock in the database
      await Product.findByIdAndUpdate(_id, {
        $inc: { stock: -quantity }, // Decrement stock by quantity
      });
      totalAmount += price * quantity;
    }

    // After stock is updated, save the sale transaction
    const newSale = new ProductSale({ items, totalAmount });
    const savedSale = await newSale.save();

    res.status(200).json({
      message: "Products checked out and sale recorded successfully",
      sale: savedSale,
    });
  } catch (error) {
    console.error("Error processing sale:", error);
    res.status(500).json({ message: "Failed to process sale", error });
  }
});
// GET route - Fetch all employees
app.get("/employees", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json({ employees });
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ message: "Error fetching employees", error });
  }
});

// POST route - Create a new employee
app.post("/employees", async (req, res) => {
  try {
    const newEmployee = new Employee(req.body);
    const savedEmployee = await newEmployee.save();
    res.status(200).json({
      message: "Employee added successfully",
      employee: savedEmployee,
    });
  } catch (error) {
    console.error("Error adding employee:", error);
    res.status(500).json({ message: "Error adding employee", error });
  }
});

// PUT route - Update an employee by ID
app.put("/employees/:id", async (req, res) => {
  try {
    const employeeId = req.params.id;
    const updatedEmployee = req.body;

    const result = await Employee.findByIdAndUpdate(
      employeeId,
      updatedEmployee,
      {
        new: true,
      }
    );

    if (result) {
      res
        .status(200)
        .json({ message: "Employee updated successfully", employee: result });
    } else {
      res.status(404).json({ message: "Employee not found" });
    }
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).json({ message: "Error updating employee", error });
  }
});

// DELETE route - Delete an employee by ID
app.delete("/employees/:id", async (req, res) => {
  try {
    const employeeId = req.params.id;
    const result = await Employee.findByIdAndDelete(employeeId);

    if (result) {
      res.status(200).json({ message: "Employee deleted successfully" });
    } else {
      res.status(404).json({ message: "Employee not found" });
    }
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).json({ message: "Error deleting employee", error });
  }
});

// Start
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
