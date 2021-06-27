const bcrypt = require("bcryptjs");
const Editor = require("../models/Editor");
const jwt = require("jsonwebtoken");
const config = require("config");

//get All Editor details for admin purpose
const GetAllEditorsDetails = async (req, res) => {
  try {
    const editors = await Editor.find().select("-password");
    res.json(editors);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

//get Editor details
const GetEditorDetails = async (req, res) => {
  try {
    const user = await Editor.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};


//Create Editor
const CreateEditor = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
  
    try {
      let user = await Editor.findOne({ email });
  
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Editor already exist" }] });
      }
  
      const role = "editor";
      user = new Editor({
        firstName,
        lastName,
        email,
        password,
        role,
      });
      
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt); 
      await user.save();
  
      const load = {
        user: {
          id: user.id,
        },
      };
  
      jwt.sign(
        load,
        config.get("jwtsecret"),
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



//login editor
const LoginEditor = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await Editor.findOne({ email });

    if (!user) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }


    const load = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      load,
      config.get("jwtSecret"),
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (error) {
   
    console.error(error.message);
    return res.status(500).send("Server Error");
  }
};


//update Editor
const UpdateEditor = async (req, res) => {
    await Editor.findOneAndUpdate({ _id: req.params.id }, req.body).
        then(result => {
            if (result == null) {
                res.json({
                    status: "not found"
                });
            } else {
                Editor.findOne({ _id: req.params.id }).then(result1 => {
                    res.status(200).json({
                        status: "susccessful",
                        result1
                    })
                })
            }
        })
        .catch(err => res.json({
            status: "error",
            err
        }));
}


module.exports = {
  GetAllEditorsDetails,
  GetEditorDetails,
  LoginEditor,
  UpdateEditor,
  CreateEditor
};
