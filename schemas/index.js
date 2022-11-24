const mongoose = require("mongoose");

const connect = () => {
  mongoose
    .connect("mongodb+srv://test:sparta@cluster0.1wag9ha.mongodb.net/?retryWrites=true&w=majority")
    .catch(err => console.log(err));
};

mongoose.connection.on("error", err => {
  console.error("MongoDB connection error", err);
});

module.exports = connect;