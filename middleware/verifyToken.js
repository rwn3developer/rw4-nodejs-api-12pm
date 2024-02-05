const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  console.log(token);

  jwt.verify(token, 'rnw4', (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token is not valid' });
    }
    console.log(decoded);
    req.user = decoded; // Store user data in the request object
    next();
  });
};



// create middleware any name (checkRole)
const adminRole = (role) => {
  
  return (req, res, next) => {
    // console.log(req.user.user.role);
    if (req.user.user.role === "admin") {
      next(); // User has the required role
    } else {
      res.status(403).json({ message: 'Access denied only on admin permissions' });
    }
  };
};

module.exports = {
    verifyToken,
    adminRole
}