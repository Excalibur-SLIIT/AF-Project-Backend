const controller = require("../controllers/Editor.controller");
const router = require("express").Router();
const auth = require("../middleware/auth");

//create editor
router.route("/create").post(controller.CreateEditor);
//Login
router.route("/login").post(controller.LoginEditor);
//getadmin details
router.route("/").get(auth, controller.GetEditorDetails);
//get all editor details
router.route("/all").get(controller.GetAllEditorsDetails);
//update editor deatils
router.route("/update/:id").put(auth, controller.UpdateEditor);


module.exports = router;