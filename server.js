const express = require("express");
const cors = require("cors");
const { UserRoutes } = require("./routes/User.routes");
const { connection } = require("./db/db");
const { ProductRoutes } = require("./routes/products.routes");
const app = express(); //by this line we are done with creation of server
app.use(cors());
require("dotenv").config();
app.use(express.json());
app.use("/users", UserRoutes);
app.use("/products", ProductRoutes);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("server got started");
    console.log("server connected to db");
  } catch (error) {
    console.log(error.message);
  }
});
