const express = require('express');
const { body } = require('express-validator/check');

const postController = require('../controllers/post');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

// GET /feed/posts
router.get('/posts', isAuth, postController.getPosts);

// POST /feed/post
router.post(
  '/post',
  isAuth,
  [
    body('title')
      .trim()
      .isLength({ min: 5 }),
    body('content')
      .trim()
      .isLength({ min: 5 })
  ],
  postController.createPost
);

router.get('/post/:postId', isAuth, postController.getPost);

router.put(
  '/post/:postId',
  isAuth,
  [
    body('title')
      .trim()
      .isLength({ min: 5 }),
    body('content')
      .trim()
      .isLength({ min: 5 })
  ],
  postController.updatePost
);

router.delete('/post/:postId', isAuth, postController.deletePost);

module.exports = router;
