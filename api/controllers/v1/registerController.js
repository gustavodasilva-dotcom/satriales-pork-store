const User = require('../../models/User');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ 'message': 'Email and password are required' });

  const foundUser = await User.findOne({ email: email }).exec();
  if (foundUser) return res.sendStatus(409);

  try {
    const hashedPwd = await bcrypt.hash(password, 10);

    const result = await User.create({
      "email": email,
      "password": hashedPwd
    });

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ 'message': error.message });
  }
};

module.exports = { handleNewUser };