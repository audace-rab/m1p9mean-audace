const User = require("../models/users");
const bcrypt = require("bcryptjs");
const SALT_WORK_FACTOR = 10;

const login = ({ login, password }, next) => {
  if (!login || !password)
    return next(new Error("Erreur Login: Login ou mot de passe absent"));

  User.findOne()
    .or([{ login: login }, { email: login }])
    .exec((error, user) => {
      if (error) return next(error);
      if (!user) return next(new Error("Erreur Login: Utilisateur non trouvé"));

      user.comparePassword(password, function(error, match) {
        if (error) return next(error);
        if (!match)
          return next(
            new Error("Erreur Login: Le login ou le mot de passe est erroné")
          );
        user.generateToken((err, token) => {
          if(err) return next(err);
          user.token = token;
          next(null, user);
        })
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
    const newUser = new Users(user);
    await session.withTransaction(async () =>{
      await newUser.save((error, newUser) => {
        if (error) return next(error);
        newUser.generateToken((error, token) => {
          if(error) return next(error);
          newUser.token = token;
          next(null, newUser);
        });
      });
    })

    session.endSession();
  });
};


module.exports = {
  login,
  hashPassword,
  addNewUser
};
