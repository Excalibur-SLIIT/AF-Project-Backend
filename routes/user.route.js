const controller = require("../controllers/user.controller");
const router = require("express").Router();

router.route("/").get(controller.get);

router.route("/:id").get(controller.getUserById);

router.route("/").post(controller.create);

router.route("/:id").put(controller.update);

router.route("/:id").delete(controller.remove);

router.route("/login").post(controller.login);

module.exports = router;