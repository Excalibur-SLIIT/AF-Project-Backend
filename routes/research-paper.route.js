const controller = require("../controllers/research-paper.controller");
const router = require("express").Router();
const upload = require("../controllers/file.controller").upload;
const auth = require("../middleware/auth");

router.route("/").get(controller.get);

router.route("/").post(upload.single("file"),controller.create);

router.route("/approve/id").post(auth, controller.approve);

router.route("/decline/:id").post(auth, controller.decline);

module.exports = router;