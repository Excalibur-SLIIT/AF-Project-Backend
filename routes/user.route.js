const controller = require("../controllers/user.controller");
const router = require("express").Router();
const auth = require("../middleware/auth");
const upload = require("../controllers/image.controller");

router.route("/").get(controller.get);

router.route("/auth").get(auth ,controller.authUser);

router.route("/:id").get(controller.getUserById);

router.route("/login").post(controller.login);

router.route("/").post(upload.single("image"), controller.create);

router.route("/:id").put(controller.update);

router.route("/:id").delete(controller.remove);


module.exports = router;