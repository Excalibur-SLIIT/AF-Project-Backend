const controller = require("../controllers/Admin.controller");
const router = require("express").Router();
const auth = require("../middleware/auth");

//create admin
router.route("/create").post(controller.CreateAdmin);
//Login
router.route("/login").post(controller.LoginAdmin);
//getadmin details
router.route("/").get(auth, controller.GetAdminDetails);
//update admin deatils
router.route("/upadate/:id").put(auth, controller.UpdateAdmin);
//appovedcaonference datails
router.route("/approvedconf/:id").put(auth, controller.AppovedConference);

module.exports = router;