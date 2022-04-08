const createHttpError = require("http-errors");
require("../models/profile");

const restrict = ({ profile, rank }) => {
    return async (req, res, next) => {
      const currentProfile = req.user.profile_id;
      let canAccess = true;
      if (profile) {
        if (Array.isArray(profile)) {
          canAccess = profile.includes(currentProfile.profile_name);
        } else {
          if (currentProfile.profile_name !== profile) canAccess = false;
        }
      } else {
          if(rank && rank > currentProfile.rank) canAccess = false;
      }
  
      if(!canAccess) return next(new createHttpError.Forbidden(`Accès refusé`));
      
      next();
    };
  };

module.exports = restrict;