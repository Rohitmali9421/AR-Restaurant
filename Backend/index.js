require("dotenv").config();
const cors = require("cors");
const express = require("express");
const ProductRouter = require("./Routes/Product");
const CategoryRouter = require("./Routes/Category");
const OrderRouter = require("./Routes/Order");
const connectMongoDB = require("./config/connection");

const port = process.env.PORT || 8000;
const URI = process.env.MONGODB_URI;
const app = express();

//MongoDB Connection
connectMongoDB(URI);

//Middlerwares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.get("/",(req,res)=>{
  res.json("hello")
})
app.use("/api", CategoryRouter);
app.use("/api", ProductRouter);
app.use("/api/orders", OrderRouter);

app.listen(port, () => {
  console.log("server started");
});
