// In-memory users.
// NOTE: Everything in this file is lost when the server restarts.
// Passwords are stored as bcrypt hashes, never plaintext passwords.

const users = [];

module.exports = users;