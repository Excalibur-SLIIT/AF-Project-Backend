//--------------------------node modules--------------------------------//

const express = require("express");
const cors = require("cors");
const mongo = require("mongoose");
const config = require("config");

//-----------------------------------------------------------------//

//--------------------------imports--------------------------------//

const userRoute = require("./routes/user.route");

//-----------------------------------------------------------------//

//--------------------------middleware--------------------------------//

const app = express();
app.use(express.json());
app.use(cors());

const url = config.get("db");

//-----------------------------------------------------------------//

//--------------------------database connection--------------------------------//

mongo.connect(url,{ useNewUrlParser : true, useCreateIndex : true, useUnifiedTopology : true, useFindAndModify: false }).catch(err => console.log(err));

const connection = mongo.connection;

connection.once("open", () => {
    console.log("Database connected!");
});

//-----------------------------------------------------------------//

//--------------------------routes--------------------------------//

app.use("/user", userRoute);

//-----------------------------------------------------------------//

//--------------------------server--------------------------------//

const port = config.get("port");
app.listen(port ,() => {
    console.log(`server started on port ${port}`);
});


//-----------------------------------------------------------------//