const controller = require("../controllers/Reviewer.controller");
const router = require("express").Router();
const auth = require("../middleware/auth");

//create reviewer
router.route("/create").post(controller.CreateReviewer);
//Login
router.route("/login").post(controller.LoginReviewer);
//get reviwer details
router.route("/").get(auth,controller.GetReviewerDetails);
//get all reviewer details
router.route("/all").get(controller.GetAllReviewerDetails);


module.exports = router;