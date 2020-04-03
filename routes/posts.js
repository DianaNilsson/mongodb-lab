const express = require('express');
const router = express.Router();
const Post = require('../models/Post.js')
const User = require('../models/User.js')

//Get all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (err) {
        res.status(400).json({
            message: err
        })
    }
})

//Get specific post
router.get('/:postID', async (req, res) => {
    //res.send('This is test: ' + req.params.postID)
    try {
        const posts = await Post.find({
            "_id": req.params.postID
        });
        res.status(200).json(posts);
    } catch (err) {
        res.status(400).json({
            message: err
        })
    }
})

//Create post
router.post('/', async (req, res) => {
    const post = new Post({
        poster: req.body.poster,
        title: req.body.title,
        body: req.body.body
    });

    console.log(req.body.poster);

    try {
        const users = await User.findOne({
            "username": req.body.poster
        })
        console.log(users)

        if (users) {
            //Write to database - post.save()
            const savedPost = await post.save();
            res.status(201).json(savedPost);
        } else {
            res.status(406).json({
                "message": "User not found, please control the name of the poster"
            })
        }

    } catch (err) {
        res.status(400).json({
            message: err
        });
    }
})

//Delete post
router.delete('/:postID', async (req, res) => {
    try {
        const deletedPost = await Post.remove({
            "_id": req.params.postID
        });
        res.status(200).json(deletedPost);
    } catch (err) {
        res.status(400).json({
            message: err
        })
    }
})

//Update post
router.patch('/:postID', async (req, res) => {
    try {
        const updatedPost = await Post.updateOne({
            "_id": req.params.postID
        }, {
            $set: {
                title: req.body.title,
                body: req.body.body
            }
        });
        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(400).json({
            message: err
        })
    }
})

module.exports = router;