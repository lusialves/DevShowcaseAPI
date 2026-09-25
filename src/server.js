require('dotenv').config();
const app = require('./app');
const db = require('./config/database');

const PORT = Number(process.env.PORT || 3000);

async function start() {
  try {
    await db.query('SELECT 1');
    app.listen(PORT, () => {
      console.log(`DevShowcase API executando em http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Falha ao conectar ao MySQL:', error.message);
    process.exit(1);
  }
}

if (require.main === module) start();
module.exports = { start };
