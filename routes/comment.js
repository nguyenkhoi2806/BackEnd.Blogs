const express = require('express');
const { body } = require('express-validator/check');

const isAuth = require('../middleware/is-auth');
const CommentController = require("../controllers/comment");

const router = express.Router();

//post comment
router.get('/comment', isAuth, CommentController.comment);
router.get('/delete/:id', isAuth, CommentController.delete);
