const express = require('express');
const { getAllPosts, getPostById, createPost, updatePost, deletePost } = require('../services/postService');
const { default: axios } = require('axios');

const router = express.Router();

// Route : Obtenir tous les posts
router.get('/', async (req, res) => {
    const posts = await getAllPosts();
    res.json(posts);
});

// Route : Obtenir un post par ID
router.get('/:id', async (req, res) => {
    const post = await getPostById(req.params.id);
    if (!post) {
        return res.status(404).json({ message: "Post non trouvé" });
    }
    res.json(post);
});

// Route : Créer un nouveau post
router.post('/', async (req, res) => {
    const { id, title } = req.body;
    const newPost = await createPost(id, title);
    res.status(201).json(newPost);
});

// Route : Mettre à jour un post
router.put('/:id', async (req, res) => {
    const { title } = req.body;
    const updatedPost = await updatePost(req.params.id, title);
    if (!updatedPost) {
        return res.status(404).json({ message: "Post non trouvé" });
    }
    res.json(updatedPost);
});

// Route : Supprimer un post
router.delete('/:id', async (req, res) => {
    const deletedPost = await deletePost(req.params.id);
    if (!deletedPost) {
        return res.status(404).json({ message: "Post non trouvé" });
    }
    res.json(deletedPost);
});


//Route :post-holder
// Route pour obtenir les 5 premiers posts depuis JSONPlaceholder
router.get('/placeholder-posts', async (req, res) => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        const limitedPosts = response.data.slice(0, 5); // Limiter à 5 posts
        res.json(limitedPosts); // Envoi de la réponse au client
    } catch (error) {
        console.error('Erreur lors de la récupération des posts :', error.message);
        res.status(500).json({ message: "Erreur lors de la récupération des posts." });
    }
});




module.exports = router;
