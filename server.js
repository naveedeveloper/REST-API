const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/productModel");
const app = express();
const PORT = process.env.PORT | 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Home</h1>");
});

app.post("/product", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json({ data: product, error: false });
  } catch (error) {
    res.status(500).json({ message: error.message, data: null, error: true });
  }
});

app.get("/product", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message, data: null, error: true });
  }
});

app.get("/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message, data: null, error: true });
  }
});

app.put("/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message, data: null, error: true });
  }
});

app.delete("/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      res.status(400).json({
        error: true,
        message: `Cannot find any product with ID ${id}`,
        data: null,
      });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message, data: null, error: true });
  }
});

mongoose
  .connect("mongodb://localhost:27017/node-api")
  .then(() => {
    console.log("Database is connected");
    app.listen(PORT, () => {
      console.log(`Server is listening on PORT ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
