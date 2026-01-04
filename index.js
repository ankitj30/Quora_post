const express = require('express');
const app = express();
const port = 8080;
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');

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
    { id: uuidv4(), username: 'Ankit.jaiswal', title: 'work hard  !!' },
    { id: uuidv4(), username: 'nirajxxk', title: 'heyy buddy !!' },
    { id: uuidv4(), username: 'its.ishwar', title: 'i got selected for my first internship !!' },
    { id: uuidv4(), username: 'yoursSona', title: 'be positive !!' },
    { id: uuidv4(), username: 'itsRam12.jaxx', title: 'heyy buddy !!' }
];

// Show all posts
app.get('/posts', (req, res) => {
    res.render('index.ejs', { posts: posts });
});

// Redirect root to /posts
app.get('/', (req, res) => {
    res.redirect('/posts');
});

// Show new post form
app.get('/posts/new', (req, res) => {
    res.render('new.ejs');
});

// Create new post FIXED (added id)
app.post('/posts', (req, res) => {
    let { username, title } = req.body;

    posts.push({
        id: uuidv4(),  // <-- IMPORTANT FIX
        username,
        title
    });

    res.redirect('/posts');
});

// Show post details
app.get('/posts/:id', (req, res) => {
    let { id } = req.params;
    let post = posts.find(p => p.id === id);

    if (!post) {
        return res.send("Post not found!");
    }

    res.render('show.ejs', { post: post });
});


app.patch('/posts/:id', (req, res) => {
    let { id } = req.params;
    let newtitle = req.body.title;
    let post = posts.find(p => p.id === id);
    if (!post) {
        return res.send("Post not found!");
    }
    post.title = newtitle;
    res.redirect(`/posts/${id}`);
});

app.get('/posts/:id/edit', (req, res) => {
    let { id } = req.params;
    let post = posts.find(p => p.id === id);
    res.render('edit.ejs' , { post: post });
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
