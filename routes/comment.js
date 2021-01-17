const express = require('express');
const { body } = require('express-validator/check');

const isAuth = require('../middleware/is-auth');
const CommentController = require("../controllers/comment");

const router = express.Router();

//post comment
router.post('/save', isAuth, CommentController.comment);

module.exports = router;