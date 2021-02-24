const express = require("express");
const cors = require("cors");
const app = express();

const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config();

// connect to db
mongoose.connect(
  process.env.DB_CONNECT,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log("connected to db"),
);

const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const employeeRoutes = require("./routes/employees");
app.use([bodyParser.json(), cors()]);

// route middlewares
app.use("/api", authRoutes);
app.use("/employee", employeeRoutes);

app.listen(3001, () => console.log("Express server running....."));
