const db = require("../models");
const User = db.user;


/**
 * GET USER ROLE WITH GIVEN TOKEN : return user role
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function rolesMiddleware(user_role) {
  const userData = user_role;

  const thisUser = await User.findOne({ where: { 
    id: userData.id
  }})
  return thisUser.roles;
}


module.exports = {
  rolesMiddleware
}