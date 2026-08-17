const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const users = require("../data/users");

const JWT_SECRET = process.env.JWT_SECRET || "development-only-secret";

async function registerUser(username, password) {
  const normalizedUsername = username.trim();

  if (!normalizedUsername || !password) {
    const error = new Error("Username and password are required");
    error.status = 400;
    throw error;
  }

  const existingUser = users.find(
    user => user.username.toLowerCase() === normalizedUsername.toLowerCase()
  );

  if (existingUser) {
    const error = new Error("Username already exists");
    error.status = 409;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    id: users.length === 0 ? 1 : users[users.length - 1].id + 1,
    username: normalizedUsername,
    password: hashedPassword
  };

  users.push(newUser);

  return {
    id: newUser.id,
    username: newUser.username
  };
}

async function loginUser(username, password) {
  const normalizedUsername = username.trim();

  const user = users.find(
    user => user.username.toLowerCase() === normalizedUsername.toLowerCase()
  );

  if (!user) {
    const error = new Error("Invalid username or password");
    error.status = 401;
    throw error;
  }

  const passwordMatches = await bcrypt.compare(password, user.password);

  if (!passwordMatches) {
    const error = new Error("Invalid username or password");
    error.status = 401;
    throw error;
  }

  const token = jwt.sign(
    {
      userId: user.id,
      username: user.username
    },
    JWT_SECRET,
    {
      expiresIn: "15m"
    }
  );

  return {
    token,
    user: {
      id: user.id,
      username: user.username
    }
  };
}

function getUserById(userId) {
  const user = users.find(user => user.id === userId);

  if (!user) {
    const error = new Error("User not found");
    error.status = 404;
    throw error;
  }

  return {
    id: user.id,
    username: user.username
  };
}

module.exports = {
  registerUser,
  loginUser,
  getUserById
};