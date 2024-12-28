const postList = document.getElementById('postList');
const postForm = document.getElementById('postForm');
const postIdInput = document.getElementById('postId');
const postTitleInput = document.getElementById('postTitle');

const fetchPosts = async () => {
    const response = await fetch('/posts');
    const posts = await response.json();
    renderPosts(posts);
};

const renderPosts = (posts) => {
    postList.innerHTML = '';
    posts.forEach(({ id, title }) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${id} - ${title}
            <button onclick="deletePost(${id})">Supprimer</button>
        `;
        postList.appendChild(li);
    });
};

postForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const newPost = {
        id: parseInt(postIdInput.value),
        title: postTitleInput.value,
    };

    const response = await fetch('/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPost),
    });

    if (response.ok) {
        fetchPosts();
        postForm.reset();
    } else {
        alert('Erreur lors de l\'ajout du post.');
    }
});

window.deletePost = async (id) => {
    const response = await fetch(`/posts/${id}`, { method: 'DELETE' });

    if (response.ok) {
        fetchPosts();
    } else {
        alert('Erreur lors de la suppression du post.');
    }
};

fetchPosts();
