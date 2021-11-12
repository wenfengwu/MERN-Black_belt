const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

module.exports = {

    // Register method -----------------
    register: (req, res) => {
        User.create(req.body)
          .then(user => {
              const userToken = jwt.sign({
                  id: user._id
              }, process.env.SECRET_KEY);
       
              res
                  .cookie("usertoken", userToken, process.env.SECRET_KEY, {
                      httpOnly: true
                  })
                  .json({ msg: "success!", user: user });
                  console.log(user);
          })
          .catch(err => {
            console.log(err);
            res.json(err);
          });
      },

    //   Login method --------------------
      login: async(req, res) => {
        const user = await User.findOne({ email: req.body.email });
     
        if(user === null) {
            // email not found in users collection
            console.log("Invalid information");
            return res.sendStatus(400);
        }
     
        // if we made it this far, we found a user with this email address
        // let's compare the supplied password to the hashed password in the database
        const correctPassword = await bcrypt.compare(req.body.password, user.password);
     
        if(!correctPassword) {
            // password wasn't a match!
            console.log("Invalid information");
            return res.sendStatus(400);
        }
     
        // if we made it this far, the password was correct
        const userToken = jwt.sign({
            id: user._id
        }, process.env.SECRET_KEY);
     
        // note that the response object allows chained calls to cookie and json
        res
            .cookie("usertoken", userToken, process.env.SECRET_KEY, {
                httpOnly: true
            })
            .json({ msg: "success!" });
    },

    // getAll users method------------------------
    getAll: (req, res) => {
        User.find()
        .then(allusers => res.json(allusers))
        .catch(err => res.status(400).json({ message: "error", error: err }))
    },

    // Login out method -----------------------
    logout: (req, res) => {
        res.clearCookie('usertoken');
        res.sendStatus(200);
    }
}