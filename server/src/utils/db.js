const mongoose = require("mongoose");

mongoose
  .connect(process.env.DB, { useNewUrlParser: true })
  .then(() => {
    console.log("MongoDB is Connected..");
  })
  .catch((err) => {
    console.log(err.message);
  });
