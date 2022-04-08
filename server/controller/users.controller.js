const User = require("../models/users");
require("../models/profile");
require("../models/restaurants");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SALT_WORK_FACTOR = 10;

const login = ({ login, password }, next) => {
  if (!login || !password)
    return next(new Error("Erreur Login: Login ou mot de passe absent"));

  User.findOne()
    .or([{ login: login }, { email: login }])
    .populate(["profile_id","resto"])
    .exec((error, user) => {
      if (error) return next(error);
      if (!user) return next(new Error("Erreur Login: Utilisateur non trouvé"));

      user.comparePassword(password, function(error, match) {
        if (error) return next(error);
        if (!match)
          return next(
            new Error("Erreur Login: Le login ou le mot de passe est erroné")
          );
          const token = generateToken(user);
          user.token = token;
          user.password = '😂';
          next(null, user);
      });
    });
};

const hashPassword = ({ password: password }, callback) => {
  bcrypt.genSalt(SALT_WORK_FACTOR, function(saltError, salt) {
    if (saltError) {
      throw saltError;
    } else {
      try {
        bcrypt.hash(password, salt, callback);
      } catch (error) {
        console.log(error);
      }
    }
  });
};

const addNewUser = (user, next) => {
  User.startSession().then(async (session) => {
    const newUser = new User(user);
    await session.withTransaction(async () =>{
      await newUser.save((error, newUser) => {
        if (error) return next(error);
        const token = generateToken(newUser);
        newUser.token = token;
        
        // next(null, newUser);
      });
    })

    session.endSession();
  }).then(() => {
    User.findOne({_id:user._id}).populate("profile_id").exec((err, usr) => {
      if(err) return next(err);
      next(null, usr);
    })
  })
  ;
};

const generateToken = ({_id, email, profile_id}) => {
  return jwt.sign({ _id,email, profile_id}, process.env.TOKEN_KEY, {
    expiresIn: "2h"
  });
};



module.exports = {
  login,
  hashPassword,
  addNewUser
};
