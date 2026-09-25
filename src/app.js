const express = require('express');
const cors = require('cors');

const profileRoutes = require('./routes/profileRoutes');
const technologyRoutes = require('./routes/technologyRoutes');
const projectRoutes = require('./routes/projectRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'DevShowcase API' });
});

app.use('/api/profiles', profileRoutes);
app.use('/api/technologies', technologyRoutes);
app.use('/api/projects', projectRoutes);

app.use((req, res) => res.status(404).json({ message: 'Rota não encontrada.' }));
app.use(errorHandler);

module.exports = app;
