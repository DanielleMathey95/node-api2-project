// implement your posts router here
const express = require("express");

const Posts = require("./posts-model");

const router = express.Router();

//ENDPOINTS HERE

//[GET] /api/posts returns an array of all post objects contained in the database

router.get("/", (req, res) => {
  Posts.find()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "The posts information could not be retrieved",
      });
    });
});

//[GET] api/posts/:id get posts with specific id

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Posts.findById(id).then((post) =>
    !post
      ? res.status(404).json("The post with the specified ID does not exist")
      : res.json(post)
  )
  .catch((error) => {
    res.status(500).json({message: "The post information could not be retrieved"})
  })
});

module.exports = router;
