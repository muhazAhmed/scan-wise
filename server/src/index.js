const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 8800;
require("dotenv").config();
require("./utils/db");
const route = require("./route");
const cookieParser = require("cookie-parser");

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/", route);

app.listen(PORT, () => {
  console.log("Server is running on " + PORT);
});
