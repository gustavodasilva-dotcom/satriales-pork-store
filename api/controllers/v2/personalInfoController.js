const User = require('../../models/User');

const handleGetUser = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);

  const refreshToken = cookies.jwt;

  try {
    const user = await User.findOne({ refreshToken: refreshToken }).select('name email');
    if (!user) return res.sendStatus(404);

    res.json(user);
  } catch (error) {
    res.status(500).json({ 'message': error.message }); 
  }
};

const handleUpdateUser = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);

  if (!req?.body) return res.sendStatus(400);

  const refreshToken = cookies.jwt;

  try {
    const user = await User.findOne({ refreshToken: refreshToken });
    if (!user) return res.sendStatus(404);

    if (req.body?.name) user.name = req.body.name;
    if (req.body?.email) user.email = req.body.email;

    const result = await user.save();

    res.json(result);
  } catch (error) {
    res.status(500).json({ 'message': error.message });
  }
};

module.exports = { handleGetUser, handleUpdateUser };