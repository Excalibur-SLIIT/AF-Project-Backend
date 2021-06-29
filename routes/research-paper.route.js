const controller = require("../controllers/research-paper.controller");
const router = require("express").Router();
const upload = require("../controllers/file.controller");

router.route("/").get(controller.get);

router.route("/").post(upload.single("file"),controller.create);

module.exports = router;