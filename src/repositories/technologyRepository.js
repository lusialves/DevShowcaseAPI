const db = require('../config/database');

async function create(data) {
  const [result] = await db.execute(
    'INSERT INTO technologies (name) VALUES (?)',
    [data.name]
  );
  const [rows] = await db.execute(
    'SELECT id, name, created_at AS createdAt FROM technologies WHERE id = ?',
    [result.insertId]
  );
  return rows[0];
}

async function findAll() {
  const [rows] = await db.execute(
    'SELECT id, name, created_at AS createdAt FROM technologies ORDER BY name ASC'
  );
  return rows;
}

async function findByIds(ids, connection = db) {
  if (!ids.length) return [];
  const placeholders = ids.map(() => '?').join(',');
  const [rows] = await connection.execute(
    `SELECT id, name FROM technologies WHERE id IN (${placeholders})`,
    ids
  );
  return rows;
}

module.exports = { create, findAll, findByIds };
