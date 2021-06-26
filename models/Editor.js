const mongo = require("mongoose");

const Editor = new mongo.Schema({
  firstName: {
    type: String,
    require: true
  },
  lastName: {
    type: String,
    require: true
  },
  email: {
    type: String,
    unique: true,
    require: true
  },
  password: {
    type: String,
    require: true
  }, 
  role: {
    type: String,
    require: true
  },
});
module.exports = mongo.model("Editor", Editor);