const controller = require("../controllers/user.controller");
const router = require("express").Router();

router.route("/").get(controller.get);

module.exports = router;