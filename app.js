const express = require("express");
const path = require("path");
const logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("./middlewares/cors")

mongoose.connect("mongodb://localhost:27017/ecommerce", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Database connected");
});

/* *********************************************** */
const productsRouter = require("./routes/products");
const adminProductsRouter = require("./routes/adminProducts");
/* *********************************************** */

const app = express();

const port = "8080";

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors.handle);

/* *********************************************** */
app.use("/products/", productsRouter);
app.use("/", productsRouter);
app.use("/admin/products/", adminProductsRouter);
/* *********************************************** */

app.listen(port, () => {
  console.log("running on port " + port);
});
