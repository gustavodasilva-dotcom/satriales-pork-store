const User = require('../../models/User');
const jwt = require('jsonwebtoken');

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);

  const refreshToken = cookies.jwt;

  try {
    const foundUser = await User.findOne({ refreshToken: refreshToken }).exec();
    if (!foundUser) return res.sendStatus(403);

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (error, decoded) => {
        if (error || foundUser.email !== decoded.email) return res.sendStatus(403);

        const accessToken = jwt.sign(
          { "email": decoded.email },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: '15m' }
        );

        res.json({ accessToken });
      }
    );
  } catch (error) {
    res.status(500).json({ 'message': error.message });
  }
};

module.exports = { handleRefreshToken };