const db = require('../config/database');

async function createWithTechnologies(data) {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    const [result] = await connection.execute(
      `INSERT INTO projects (profile_id, title, description, repository_url, demo_url)
       VALUES (?, ?, ?, ?, ?)`,
      [data.profileId, data.title, data.description || null, data.repositoryUrl, data.demoUrl || null]
    );

    for (const technologyId of [...new Set(data.technologyIds)]) {
      await connection.execute(
        'INSERT INTO project_technologies (project_id, technology_id) VALUES (?, ?)',
        [result.insertId, technologyId]
      );
    }

    await connection.commit();
    return result.insertId;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

async function findAll() {
  const [projects] = await db.execute(
    `SELECT p.id,
            p.title,
            p.description,
            p.repository_url AS repositoryUrl,
            p.demo_url AS demoUrl,
            p.created_at AS createdAt,
            pr.id AS profileId,
            pr.name AS profileName,
            pr.email AS profileEmail
       FROM projects p
       JOIN profiles pr ON pr.id = p.profile_id
      ORDER BY p.id DESC`
  );

  if (!projects.length) return [];
  const ids = projects.map((p) => p.id);
  const placeholders = ids.map(() => '?').join(',');

  const [techRows] = await db.execute(
    `SELECT pt.project_id AS projectId, t.id, t.name
       FROM project_technologies pt
       JOIN technologies t ON t.id = pt.technology_id
      WHERE pt.project_id IN (${placeholders})
      ORDER BY t.name`,
    ids
  );

  const [feedbackRows] = await db.execute(
    `SELECT id, project_id AS projectId, author_name AS authorName,
            comment, rating, created_at AS createdAt
       FROM feedbacks
      WHERE project_id IN (${placeholders})
      ORDER BY id DESC`,
    ids
  );

  const technologiesByProject = new Map();
  for (const row of techRows) {
    if (!technologiesByProject.has(row.projectId)) technologiesByProject.set(row.projectId, []);
    technologiesByProject.get(row.projectId).push({ id: row.id, name: row.name });
  }

  const feedbacksByProject = new Map();
  for (const row of feedbackRows) {
    if (!feedbacksByProject.has(row.projectId)) feedbacksByProject.set(row.projectId, []);
    feedbacksByProject.get(row.projectId).push({
      id: row.id,
      authorName: row.authorName,
      comment: row.comment,
      rating: row.rating,
      createdAt: row.createdAt
    });
  }

  return projects.map((p) => ({
    id: p.id,
    title: p.title,
    description: p.description,
    repositoryUrl: p.repositoryUrl,
    demoUrl: p.demoUrl,
    createdAt: p.createdAt,
    profile: { id: p.profileId, name: p.profileName, email: p.profileEmail },
    technologies: technologiesByProject.get(p.id) || [],
    feedbacks: feedbacksByProject.get(p.id) || []
  }));
}

module.exports = { createWithTechnologies, findAll };
