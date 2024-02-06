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
    console.log(decoded);
    req.user = decoded; // Store user data in the request object
    next();
  });
};



// create middleware any name (checkRole)
const adminRole = (role) => {
  return (req, res, next) => {
    console.log(role);
    // console.log(req.user.user.role);
    console.log(role[0]);
     if (req.user.user.role == role[0] || req.user.user.role == role[1]) {
          return next();
    }
    res.status(403).send({
      success : false,
      message : "Access denied by admin"
    })

    // if (req.user.user.role !== "admin" || req.user.user.role !== "manager") {
    //   res.status(403).send({
    //     success : false,
    //     message : "Access denied only on admin permissions"
    //   })
    // }
  };
};

const managerRole = (role) => {
  return (req, res, next) => {
    if (req.user.user.role !== "manager") {
      res.status(403).send({
        success : false,
        message : "Access denied only on admin permissions"
      })
    }
    next(); // User has the required role
  };
}

module.exports = {
    verifyToken,
    adminRole,
    managerRole
}