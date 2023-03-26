const User = require('../../models/User');

const handleLogout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);

  const refreshToken = cookies.jwt;

  try {
    const foundUser = await User.findOne({ refreshToken: refreshToken });

    if (!foundUser) {
      res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
      return res.sendStatus(204);
    }

    foundUser.refreshToken = '';
    await foundUser.save();

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ 'message': error.message });
  }
};

module.exports = { handleLogout };