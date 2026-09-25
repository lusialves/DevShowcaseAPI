const db = require('../config/database');

async function create(data) {
  const [result] = await db.execute(
    `INSERT INTO profiles (name, email, bio, github_url, linkedin_url)
     VALUES (?, ?, ?, ?, ?)`,
    [data.name, data.email, data.bio || null, data.githubUrl || null, data.linkedinUrl || null]
  );
  return findById(result.insertId);
}

async function findById(id) {
  const [rows] = await db.execute(
    `SELECT id, name, email, bio,
            github_url AS githubUrl,
            linkedin_url AS linkedinUrl,
            created_at AS createdAt
       FROM profiles
      WHERE id = ?`,
    [id]
  );
  return rows[0] || null;
}

module.exports = { create, findById };
