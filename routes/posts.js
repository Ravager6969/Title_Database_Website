const express = require('express');
const res = require('express/lib/response');
const Post = require('../models/Post'); //model to post data

const router = express.Router();

//GET BACK ALL THE POSTS
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch(err){
        res.json({message: err});
    }
});

router.get('/specific', (req, res) => {
    res.send('Specific post')
})

//SUBMIT A POST
router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    })
    try {
    const savedPost = await post.save();
    res.json(savedPost);
    } catch(err) {
        res.json({message: err});
    }
})

//SPECIFIC POST
router.get('/:postId', async (req, res) => { //dynamic parameter create a dynamic endpoint
    try {
    const post = await Post.findById(req.params.postId);
    res.json(post);
    } catch(err) {
        res.json({message: err});
    }
})

//Delete Post
router.delete('/:postId', async (req, res) => {
    try {
    const removedPost = await Post.remove({_id: req.params.postId}); //mongo generates _id 
    res.json(removedPost);
    } catch(err) {
        res.json({message: err});
    }
})

//Update Post
router.patch('/:postId', async (req, res) => {
    try {
    const updatedPost = await Post.updateOne(
        {_id: req.params.postId}, 
        {$set: {title: req.body.title}}
    );
    res.json(updatedPost);
    } catch(err) {
        res.json({message: err});
    }
})

module.exports = router;