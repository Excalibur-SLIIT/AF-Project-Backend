const controller = require("../controllers/event.controller");
const router = require("express").Router();

router.route("/").get(controller.get);

router.route("/:id").get(controller.getById);

router.route("/").post(controller.create);

router.route("/:id").put(controller.update);

router.route("/:id").delete(controller.remove);


module.exports = router;