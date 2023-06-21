const db = require("../models");
const User = db.user


/**
 * GET USER ROLE WITH GIVEN TOKEN
 * return 0 if not authenticated
 * return 1 if role is USER
 * return 2 if role is ADMIN
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function securityMiddleware(token, id) {
  const userToken = token;

  const user = await User.findOne({ 
    attributes: [
      'id',
      'username',
      'roles', 
    ],
    where: { 
      id: userToken.id
    }
  })
  const userRole = user.roles

  if ((userRole === 'USER') && userToken.id == id) {
    return 1;
  } else if (userRole === 'ADMIN') {
    return 2;
  } else {
    return 0;
  }
}


module.exports = {
  securityMiddleware
}