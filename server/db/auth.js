const pool = require("./database");
const bcrypt = require("bcrypt");

async function register(username, password, color = "blue") {
  try {
    const hash = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `
      INSERT INTO users (username, password, color)
      VALUES ($1, $2, $3)
      RETURNING id, username, color
      `,
      [username, hash, color]
    );

    return result.rows[0];

  } catch (err) {
    if (err.code === "23505") {
      return null; // username already exists
    }
    throw err;
  }
}

async function login(username, password) {
  const result = await pool.query(
    "SELECT * FROM users WHERE username = $1",
    [username]
  );

  const user = result.rows[0];
  if (!user) return null;

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return null;

  return {
    id: user.id,
    username: user.username
  };
}

module.exports = { register, login };