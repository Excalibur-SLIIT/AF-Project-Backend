//--------------------------node modules--------------------------------//

const express = require("express");
const router = express.Router();
const cors = require("cors");
const mongo = require("mongoose");
const config = require("config");

//-----------------------------------------------------------------//

//--------------------------imports--------------------------------//

const userRoute = require("./routes/user.route");
const workshopRoute = require("./routes/workshop.routes");
const admin = require("./routes/admin.routes");
const editor = require("./routes/editor.routes");
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
router.use("/user", userRoute);
router.use("/workshop", workshopRoute);
router.use("/admin", admin);
router.use("/editor" , editor);

 
app.use(config.get("root"), router);
//-----------------------------------------------------------------//

//--------------------------server--------------------------------//

const port = config.get("port");
app.listen(port ,() => {
    console.log(`server started on port ${port}`);
});


//-----------------------------------------------------------------//