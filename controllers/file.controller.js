const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './public/research-papers');
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + "-" + Date.now() + ".pdf");
    }
});

const workshopStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './public/workshop-proposals');
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + "-" + Date.now() + ".pdf");
    }
});

const upload = multer({ storage: storage });

const workshopUpload = multer({ storage: workshopStorage });

module.exports = { upload, workshopUpload };