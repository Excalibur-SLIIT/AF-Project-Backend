const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './public/research-papers');
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + "-" + Date.now() + ".pdf");
    }
});

const upload = multer({ storage: storage });

module.exports = upload;