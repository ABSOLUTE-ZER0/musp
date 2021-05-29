const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const Post = require("../models/Post");

// get all posts

router.get("/", auth, async (req, res) => {
  try {
    const post = await Post.find({}).sort({ date: "descending" });
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// search posts

router.post("/search", auth, async (req, res) => {
  try {
    let filter = req.body.filter;
    let type = req.body.type;

    filter = filter.toLowerCase()

    const post = await Post.find({
      $or: [
        { title: { $regex: filter } },
        { desc: { $regex: filter } },
        { author_name: { $regex: filter } },
        { tags: { "$in": [filter] } },
      ]}).sort({ date: "descending" });

    let result = []
    if(type){
      post.forEach(form => {
        if(form.type === type){
          result.push(form)
        }
      });
      res.json(result);
    } else{
      res.json(post)
    }
    

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// get favourite post

router.get("/favourite", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const posts = await Post.find({}).sort({ date: "descending" });

    let result = [];

    posts.forEach((post) => {
      if (post.favouriteList.includes(userId)) {
        result.push(post);
      }
    });
    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});



// get user created post

router.get("/created/:id", auth, async (req, res) => {
  try {
    const userId = req.params.id;
    const posts = await Post.find({author: userId});

    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});


// create a post

router.post(
  "/",
  [
    [
      check("title", "Please enter the title").not().isEmpty(),
      check("desc", "Please enter a description").not().isEmpty(),
      check("tags", "Please enter a tag! Its useful for others while searching")
        .not()
        .isEmpty(),
    ],
    auth,
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const {
      author,
      author_color,
      author_name,
      title,
      desc,
      type,
      tags,
      post_color,
    } = req.body;

    try {
      let post = await Post.findOne({
        title: title.toLowerCase(),
      });

      if (post) {
        const error = [
          {
            msg: "Similar post already exists! Please search before you post you question",
          },
        ];
        return res.status(400).json({
          errors: error,
        });
      }

      post = new Post({
        author,
        author_name,
        author_color,
        title,
        desc,
        type,
        tags,
        post_color,
      });

      await post.save();

      res.json({ post });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// Find post

router.post("/filter", auth, async (req, res) => {
  try {
    const filter = req.body;
    const post = await Post.find(filter).sort({ date: "descending" });
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// upvote a post

router.post("/upvote", auth, async (req, res) => {
  try {
    const id = req.body.id;
    const post = await Post.findById(id);
    const userId = req.user.id;

    if (post.upvoteList.includes(userId)) {
      post.upvoteList.pop(userId);
    } else {
      post.upvoteList.push(userId);
    }

    await post.save();

    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// favourite a post

router.post("/favourite", auth, async (req, res) => {
  try {
    const id = req.body.id;
    const post = await Post.findById(id);
    const userId = req.user.id;

    if (post.favouriteList.includes(userId)) {
      post.favouriteList.pop(userId);
    } else {
      post.favouriteList.push(userId);
    }

    await post.save();

    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// get a post by id

router.get("/:id", auth, async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Post.findById(id).sort({ date: "descending" });

    if(!post){
      const error = [
        {
          msg: "Post not found!",
        },
      ];
      return res.status(400).json({
        errors: error,
      });
    }
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// post a comment

router.post("/:id", auth, async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Post.findById(id).sort({ date: "ascending" });
    const comment = req.body.comment;

    post.comments.push(comment);
    await post.save();

    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
