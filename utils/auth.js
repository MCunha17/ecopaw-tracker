const withAuth = (req, res, next) => {
  // Check if the user is authenticated
  if (req.session.loggedIn) {
    next();
  } else {
    res.redirect('/signup');
  }
};

module.exports = withAuth;