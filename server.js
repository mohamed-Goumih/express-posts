const express = require('express');
const axios = require('axios');
const app = express();

// Middleware pour analyser les requêtes JSON (optionnel si nécessaire dans d'autres routes)
app.use(express.json());

// Route pour obtenir les 5 premiers posts depuis JSONPlaceholder
app.get('/placeholder-posts', async (req, res) => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        const limitedPosts = response.data.slice(0, 5); // Limiter à 5 posts
        res.json(limitedPosts); // Envoi de la réponse au client
    } catch (error) {
        console.error('Erreur lors de la récupération des posts :', error.message);
        res.status(500).json({ message: "Erreur lors de la récupération des posts." });
    }
});

// Démarrage du serveur
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
