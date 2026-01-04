const express = require('express');
const app = express();
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');

// ✅ Render-compatible PORT
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Public folder
app.use(express.static(path.join(__dirname, 'public')));

// Sample posts
let posts = [
    { id: uuidv4(), username: 'hardik_pandya', title: 'i love coding !!' },
    { id: uuidv4(), username: 'Ankit.jaiswal', title: 'work hard !!' },
    { id: uuidv4(), username: 'nirajxxk', title: 'heyy buddy !!' },
    { id: uuidv4(), username: 'its.ishwar', title: 'i got selected for my first internship !!' },
    { id: uuidv4(), username: 'yoursSona', title: 'be positive !!' },
    { id: uuidv4(), username: 'itsRam12.jaxx', title: 'heyy buddy !!' }
];

// Redirect root to /posts
app.get('/', (req, res) => {
    res.redirect('/posts');
});

// Show all posts
app.get('/posts', (req, res) => {
    res.render('index.ejs', { posts });
});

// Show new post form
app.get('/posts/new', (req, res) => {
    res.render('new.ejs');
});

// Create new post
app.post('/posts', (req, res) => {
    const { username, title } = req.body;

    posts.push({
        id: uuidv4(),
        username,
        title
    });

    res.redirect('/posts');
});

// Show post details
app.get('/posts/:id', (req, res) => {
    const { id } = req.params;
    const post = posts.find(p => p.id === id);

    if (!post) {
        return res.send("Post not found!");
    }

    res.render('show.ejs', { post });
});

// Edit form
app.get('/posts/:id/edit', (req, res) => {
    const { id } = req.params;
    const post = posts.find(p => p.id === id);

    if (!post) {
        return res.send("Post not found!");
    }

    res.render('edit.ejs', { post });
});

// Update post
app.patch('/posts/:id', (req, res) => {
    const { id } = req.params;
    const newTitle = req.body.title;
    const post = posts.find(p => p.id === id);

    if (!post) {
        return res.send("Post not found!");
    }

    post.title = newTitle;
    res.redirect(`/posts/${id}`);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
