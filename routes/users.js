const express = require('express');
const router = express.Router();
const User = require('../models/User')
const Post = require('../models/Post.js')

//Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(400).json({
            message: err
        })
    }
})

//Get user posts from specific user
router.get('/:userName', async (req, res) => {
    try {
        const userposts = await Post.find({
            "poster": req.params.userName
        });
        if (userposts.lenght > 0) {
            res.status(200).json(userposts);
        } else {
            res.status(406).json({
                "message": "The user does not exist or the user has no posts yet"
            })
        }
    } catch (err) {
        res.status(400).json({
            message: err
        })
    }
})

//New user
router.post('/', async (req, res) => {
    const user = new User({
        username: req.body.username,
        fullname: req.body.fullname,
        age: req.body.age,
        contact: req.body.contact
    });

    try {
        const savedUser = await user.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(400).json({
            message: err
        });
    }
})

//Delete user
router.delete('/:userID', async (req, res) => {
    try {
        const deletedUser = await User.remove({
            "_id": req.params.userID
        });
        res.status(200).json(deletedUser);
    } catch (err) {
        res.status(400).json({
            message: err
        })
    }
})

module.exports = router;