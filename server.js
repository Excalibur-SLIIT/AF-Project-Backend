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
const reviewer = require("./routes/reviewer.routes");
const event = require("./routes/event.routes");
const rPaperRoute = require("./routes/research-paper.route");
//-----------------------------------------------------------------//

//--------------------------middleware--------------------------------//

const app = express();
app.use(express.json());
app.use(cors());

const url = config.get("db");

//-----------------------------------------------------------------//

//--------------------------database connection--------------------------------//

mongo.connect(url, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false }).catch(err => console.log(err));

const connection = mongo.connection;

connection.once("open", () => {
    console.log("Database connected!");
});

//-----------------------------------------------------------------//

//--------------------------routes--------------------------------//
router.use("/user", userRoute);
router.use("/workshop", workshopRoute);
router.use("/admin", admin);
router.use("/editor", editor);
router.use("/reviewer", reviewer);
router.use("/event", event);
router.use("/research_paper", rPaperRoute);
router.use("/profile_image",express.static('public/profile-images'));
router.use("/research_paper",express.static('public/research-papers'));
router.use("/workshop_proposal",express.static('public/workshop-proposals'));

app.use(config.get("root"), router);

//-----------------------------------------------------------------//

//--------------------------server--------------------------------//

const port = config.get("port");
app.listen(port, () => {
    console.log(`server started on port ${port}`);
});


//-----------------------------------------------------------------//