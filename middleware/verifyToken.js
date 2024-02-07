const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if(!token){
    return res.status(403).send({ 
      success : false,
      message: 'Token is blank' 
    });
  }
  var doneToken = token.split(' ')[1];
  jwt.verify(doneToken, 'rnw4', (err, decoded) => {
    if (err) {
      return res.status(403).send({ 
        success : false,
        message: 'Token is not valid' 
      });
    }
    req.user = decoded; // Store user data in the request object
    next();
  });
};



// create middleware any name (checkRole)
const adminRole = (role) => {
  return (req, res, next) => {
    if (req.user && role.includes(req.user.user.role)) {
      return next(); // User has one of the required roles, proceed
    }
    res.status(403).send({
      success : false,
      message : "Access denied by admin"
    })
  };
};

module.exports = {
    verifyToken,
    adminRole,
}