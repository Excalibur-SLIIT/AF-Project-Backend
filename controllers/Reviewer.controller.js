const bcrypt = require('bcryptjs');
const Reviewer = require('../models/Reviewer');
const jwt = require('jsonwebtoken');
const config = require('config');

//get All Reviewer details
const GetAllReviewerDetails = async (req, res) => {
  try {
    const Rev = await Reviewer.find().select("-password");
    res.json(Rev);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

//get Reviewer details
const GetReviewerDetails = async (req, res) => {
  try {
    const user = await Reviewer.findById(req.user.id).select('-password');
    res.json(user);
  } catch {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
};

//login
const LoginReviewer = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await Reviewer.findOne({ email });

    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
    }

    const load = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      load,
      config.get('jwtsecret'),
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
};

//create Reviewer
const CreateReviewer = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    let user = await Reviewer.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Reviewer already exist' }] });
    }

    const role = 'reviewer';
    user = new Reviewer({
      role,
      firstName,
      lastName,
      email,
      password,
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
      config.get('jwtsecret'),
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
};

module.exports = { 
    GetReviewerDetails,
    LoginReviewer, 
     CreateReviewer,
     GetAllReviewerDetails 
    };
