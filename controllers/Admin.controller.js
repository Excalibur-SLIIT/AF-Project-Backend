const Admin = require ("../models/Admin");
const Conference = require ("../models/Conference")
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcryptjs");

//get adminDetails
const GetAdminDetails = async (req, res) => {
    try {
      const user = await Admin.findById(req.user.id).select("-password");
      res.json(user);
    } catch {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  };


  const LoginAdmin = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      let user = await Admin.findOne({ email });
  
      if (!user) {
        return res.status(400).json({ errors: [{ msg: "Invalid Credentials!!..." }] });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        return res.status(400).json({ errors: [{ msg: "Invalid Credentials!..." }] });
      }
  
      //Return token
  
      const payload = {
        user: {
          id: user.id,
        },
      };
  
      jwt.sign(
        payload,
        config.get("excaliburTokenSecret"),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server Error");
    }
  };

//create Admin
  const CreateAdmin = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
  
    try {
     
      let user = await Admin.findOne({ email });
  
      if (user) {
        return res.status(400).json({ errors: [{ msg: "Admin already exist" }] });
      }
  
      const role = "admin";

      user = new Admin({
        firstName,
        lastName,
        email,
        password,
        role,
      });
  
 

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    await user.save();
  
  
      const payload = {
        user: {
          id: user.id,
        },
      };
  
      jwt.sign(
        payload,
        config.get("excaliburTokenSecret"),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server Error");
    }
  };

//update admin
const UpdateAdmin = async (req, res) => {
    await Admin.findOneAndUpdate({ _id: req.params.id }, req.body).
        then(result => {
            if (result == null) {
                res.json({
                    status: "not found"
                });
            } else {
                Admin.findOne({ _id: req.params.id }).then(result => {
                    res.status(200).json({
                        status: "susccessful",
                        result
                    })
                })
            }
        })
        .catch(err => res.json({
            status: "error",
            err
        }));
}





//conference approvement
  const AppovedConference = async (req, res) => {
    try {
      const condata = Conference.findByIdAndUpdate(req.body.id)
        .then((condata) => {
            condata.status = req.body.status;
            condata
            .save()
            .then(() =>
              req.body.status
                ? res.json("Conference Approved!")
                : res.json("Conference Unpproved!")
            )
            .catch((err) => res.status(400).json("Error: " + err));
        })
        .catch((err) => res.status(400).json("Error: " + err));
    } catch (err) {
      res.status(500).send("Server Error");
    }
  };

  
  module.exports ={
    GetAdminDetails,
    CreateAdmin,
    LoginAdmin,
    UpdateAdmin,
    AppovedConference
  };