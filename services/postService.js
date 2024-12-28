let posts = []; // État de stockage simulé

// Obtenir tous les posts
const getAllPosts = async () => {
    return posts;
};

// Obtenir un post par ID
const getPostById = async (id) => {
    return posts.find(p => p.id === parseInt(id));
};

// Créer un nouveau post
const createPost = async (id, title) => {
    if (posts.some(p => p.id === id)) {
        throw new Error("Un post avec cet ID existe déjà");
    }
    const newPost = { id, title };
    posts.push(newPost);
    return newPost;
};

// Mettre à jour un post
const updatePost = async (id, title) => {
    const post = posts.find(p => p.id === parseInt(id));
    if (!post) return null;
    post.title = title;
    return post;
};

// Supprimer un post
const deletePost = async (id) => {
    const index = posts.findIndex(p => p.id === parseInt(id));
    if (index === -1) return null;
    return posts.splice(index, 1)[0];
};

module.exports = {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
};
