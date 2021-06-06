const express = require("express");
const moangoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyparser = require("body-parser");

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyparser.json());


const PORT = process.env.PORT || 8090;
const MONGODB_URI = process.env.MONGODB_URI;
 
moangoose.connect(
  MONGODB_URI,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  (error) => {
    if (error) {
      console.log("Database Error: ", error.message);
    }
  }
);
moangoose.connection.once("open", () => {
  console.log("DataBase Synced!");
});


app.listen(PORT, () => {
  console.log(`Server is up and running on PORT ${PORT}`);
});
