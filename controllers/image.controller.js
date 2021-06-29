const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './public/profile-images');
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + "-" + Date.now() + ".png");
    }
});

const upload = multer({ storage: storage });

module.exports = upload;