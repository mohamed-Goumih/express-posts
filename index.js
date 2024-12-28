const express = require('express');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');

const loggerMiddleware = require('./middleware/logger');
const postRoutes = require('./routes/posts');

const app = express();
const PORT = 3000;

// Middlewares globaux
app.use(express.json());
app.use(cors());
app.use(compression());
app.use(helmet());
app.use(loggerMiddleware);

// Servir les fichiers statiques du dossier public
app.use(express.static('public'));

// Routes
app.use('/posts', postRoutes);

// Gestion des erreurs
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Une erreur interne est survenue !' });
});

// Lancer le serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
