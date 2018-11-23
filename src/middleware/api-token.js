module.exports = (req, res, next) => {
  try {
    const [_, token] = req.get('Authorization').split(' ');

    if (!token) return res.status(401).end();

    req.token = token;

    return next();
  } catch (err) {
    return res.status(401).end();
  }
};
