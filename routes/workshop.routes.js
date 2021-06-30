const controller = require("../controllers/workshop.controller");
const router = require("express").Router();
const auth = require("../middleware/auth");
const upload = require("../controllers/file.controller").workshopUpload;

router.route("/").get(controller.get);

router.route("/:id").get(controller.getById);

router.route("/").post(auth, upload.single("file"),controller.create);

router.route("/approve/:id").put(auth, controller.approve);

router.route("/approve/:id").put(auth, controller.decline);

router.route("/:id").put(controller.update);

router.route("/:id").delete(controller.remove);


module.exports = router;