const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Customer = require("./models/Customer");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/crmDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Test Route
app.get("/", (req, res) => {
  res.send("CRM API Running");
});

// POST API
app.post("/customers", async (req, res) => {
  try {
    const newCustomer = new Customer(req.body);
    const savedCustomer = await newCustomer.save();
    res.json(savedCustomer);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET API
app.get("/customers", async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

app.get("/customers/:id", async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.json(customer);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put("/customers/:id", async (req, res) => {
  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedCustomer);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/customers/:id", async (req, res) => {
  await Customer.findByIdAndDelete(req.params.id);
  res.json({ message: "Customer deleted" });
});

app.put("/customers/:id", async (req, res) => {
  const updatedCustomer = await Customer.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(updatedCustomer);
});