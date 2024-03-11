document.addEventListener('DOMContentLoaded', () => {
    const postsDiv = document.getElementById('posts');
    const postForm = document.getElementById('postForm');

    // Fetch posts from server
    fetch('/posts')
        .then(response => response.json())
        .then(posts => {
            posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.classList.add('post');
                postElement.innerHTML = `
                    <h2>${post.title}</h2>
                    <p>${post.content}</p>
                `;
                postsDiv.appendChild(postElement);
            });
        })
        .catch(error => console.error('Error fetching posts:', error));

    // Handle form submission
    postForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;

        fetch('/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, content })
        })
        .then(response => response.json())
        .then(newPost => {
            const postElement = document.createElement('div');
            postElement.classList.add('post');
            postElement.innerHTML = `
                <h2>${newPost.title}</h2>
                <p>${newPost.content}</p>
            `;
            postsDiv.appendChild(postElement);
            postForm.reset();
        })
        .catch(error => console.error('Error adding post:', error));
    });
});
