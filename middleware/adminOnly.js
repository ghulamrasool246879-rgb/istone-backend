const adminOnly = (...roles) => {
  return (req, res, next) => {

    if (!req.admin) {
      return res.status(401).json({
        message: "Not Authorized",
      });
    }

    if (!roles.includes(req.admin.role)) {
      return res.status(403).json({
        message: "Access Denied",
      });
    }

    next();
  };
};

export default adminOnly;