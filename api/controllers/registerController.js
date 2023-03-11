const data = {
  users: require('../models/users.json'),
  setUsers: function (data) { this.users = data }
};
const fsPromises = require('fs').promises;
const path = require('path');
const { v4: uuid } = require('uuid');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ 'message': 'Email and password are required' });
  const foundUser = data.users.find(person => person.email === email);
  if (foundUser) return res.sendStatus(409);
  try {
    const hashedPwd = await bcrypt.hash(password, 10);
    const newUser = {
      "uuid": uuid(),
      "email": email,
      "password": hashedPwd
    };
    data.setUsers([...data.users, newUser]);
    await fsPromises.writeFile(
      path.join(__dirname, '..', 'models', 'users.json'),
      JSON.stringify(data.users)
    );
    res.sendStatus(201);
  } catch (error) {
    res.status(500).json({ 'message': error.message });
  }
};

module.exports = { handleNewUser };