const mongoose = require("mongoose");

const connectDB = () => {
  mongoose
    .connect(
      "mongodb+srv://arusha7:arusha7@cluster0.5pbhmur.mongodb.net/?retryWrites=true&w=majority"
    )
    .then((res) =>
      console.log(
        `MongoDB Connected: ${res.connection.host}`.cyan.underline.bold
      )
    )
    .catch((err) => {
      console.error(`Error: ${err.message}`.red.underline.bold);
      process.exit(1);
    });
};

export default connectDB;
