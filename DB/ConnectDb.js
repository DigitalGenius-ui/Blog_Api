const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
// connect database
const mongoDb = () => {
  mongoose
    .connect(process.env.DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((res) => console.log("Database is successfully connected"))
    .catch((err) => console.log(err));
};

module.exports = mongoDb