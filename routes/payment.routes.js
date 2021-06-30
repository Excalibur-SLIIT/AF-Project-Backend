const router = require("express").Router();
const controller = require("../controllers/payment.controller");
const auth = require("../middleware/auth");

router.route("/").get(auth, controller.get);

router.route("/:id").get(controller.getById);

router.route("/create").post(auth, controller.create);