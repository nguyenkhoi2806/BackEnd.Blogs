const express = require("express");

const postController = require("../controllers/post");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

// GET /feed/posts
router.get("/get-all", postController.getAll);

// POST /feed/post
router.post("/create", isAuth, postController.createPost);

router.get("/get-post-view/:postId",  postController.getPostView);

router.put("/update/:postId", isAuth, postController.updatePost);

router.delete("/delete/:postId", isAuth, postController.deletePost);
router.get("/my-post-list", isAuth, postController.getMyPosts);
router.get("/get-post-edit/:postId", isAuth, postController.postEdit);

module.exports = router;
