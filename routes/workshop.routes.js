const controller = require("../controllers/workshop.controller");
const router = require("express").Router();

router.route("/").get(controller.get);

router.route("/:id").get(controller.getById);

router.route("/").post(controller.create);

router.route("/register").put(controller.register);

router.route("/unregister").put(controller.unregister);

router.route("/:id").put(controller.update);

router.route("/:id").delete(controller.remove);


module.exports = router;