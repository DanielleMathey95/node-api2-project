// implement your posts router here
const express = require("express");

const Posts = require("./posts-model");

const router = express.Router();

//ENDPOINTS HERE

//[GET] /api/posts (R of CRUD) returns an array of all post objects contained in the database

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

//[GET] api/posts/:id (R of CRUD) get posts with specific id

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Posts.findById(id).then((post) => {
    if (post) {
      res.status(200).json(post);
    } else {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist" });
    }
  });
});

//[POST] api/posts (C of CRUD) Creates a new post
router.post("/", (req, res) => {
  const postInfo = req.body;

  if (!postInfo.title || !postInfo.contents) {
    res
      .status(400)
      .json({ message: "Please provide title and contents for the post" });
  } else {
    Posts.insert(postInfo)
      .then((post) => {
        res.status(201).json(post);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({
          message: "There was an error while saving the post to the database",
        });
      });
  }
});

//[PUT] /api/posts/:id (U of CRUD) update post with specific id

router.put("/:id", (req, res) => {
  const changes = req.body;

  if (!changes.title || !changes.contents) {
    res.status(400).json({
      message: "Please provide title and contents for the post",
    });
  } else {
    Posts.update(req.params.id, changes)
      .then((post) => {
        if (post) {
          res.status(200).json(post);
        } else {
          res
            .status(404)
            .json({ message: "The post with the specified id does not exist" });
        }
      })
      .catch((error) => {
        console.log(error);
        res
          .status(500)
          .json({
            message: "There was an error while saving the post to the database",
          });
      });
  }
});

module.exports = router;
