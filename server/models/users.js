const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");

const UsersSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: [true, "Le prénom est obligatoire"]
    },
    last_name: {
        type: String,
        required: [true, "Le nom est obligatoire"]
    },
    email: {
        type: String,
        required: [true, "L'adresse mail est obligatoire"]
    },
    birth_date: {
        type: Date,
        required: [true, "La date de naissance est obligatoire"]
    },
    profile_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Le type de profil est obligatoire"]
    },
    login: {
        type: String,
        required: [true, "Le login est obligatoire"]
    },
    password: {
        type: String,
        required: [true, "Le mot de passe est obligatoire"]
    },
    city: {
        type: String
    }
});


UsersSchema.pre("save", function (next) {
    const user = this
  
    if (this.isModified("password") || this.isNew) {
      bcrypt.genSalt(10, function (saltError, salt) {
        if (saltError) {
          return next(saltError)
        } else {
          bcrypt.hash(user.password, salt, function(hashError, hash) {
            if (hashError) {
              return next(hashError)
            }
  
            user.password = hash
            next()
          })
        }
      })
    } else {
      return next()
    }
})

UsersSchema.methods.comparePassword = function(password, callback) {
    bcrypt.compare(password, this.password, function(error, isMatch) {
      if (error) {
        return callback(error)
      } else {
        callback(null, isMatch)
      }
    })
  }

module.exports = mongoose.model('Users', UsersSchema, 'users');