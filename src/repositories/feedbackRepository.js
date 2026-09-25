const db = require('../config/database');

async function create(data) {
  const [result] = await db.execute(
    `INSERT INTO feedbacks (project_id, author_name, comment, rating)
     VALUES (?, ?, ?, ?)`,
    [data.projectId, data.authorName, data.comment, data.rating || null]
  );
  return result.insertId;
}

async function findByProjectId(projectId) {
  const [rows] = await db.execute(
    `SELECT id, project_id AS projectId, author_name AS authorName,
            comment, rating, created_at AS createdAt
       FROM feedbacks
      WHERE project_id = ?
      ORDER BY id DESC`,
    [projectId]
  );
  return rows;
}

module.exports = { create, findByProjectId };
