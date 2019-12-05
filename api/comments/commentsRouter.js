const express = require("express");
const Model = require("../Model");
const router = express.Router();

// | GET    | /api/posts/:id/comments | Returns an array of all the comment objects associated with the post with the specified id.  
router.get("/:id/comments", (req, res) => {
    id = req.params.id  

    Model.findPostComments(id) 
    .then(comments => {
        if (comments){res
        .status(200)
        .json({comments})
        } else {
          res.status(404)
          .json({ errorMessage: "The post with the specified ID does not exist." })
        }
    })
    .catch(error => {
        res
        .status(500)
        .json({
            errorMessage: "The comments information could not be retrieved by the server.", error
        })
    })

});



// POST   | /api/comments/:id/comments | Creates a comment for the post with the specified id using information sent inside of the `request body`. 
router.post("/:id/comments", (req, res) => {
    const id = req.params.id
     
        Model.findById(id)
          .then(posts => {
            if (!posts){
              res.status(404)
                 .json({ errorMessage: "The post with the specified ID does not exist." })
            } else if (!req.body.post_id || !req.body.text){
                  res
                  .status(400)
                  .json({ errorMessage: "Please provide post_id and text for the comment." })
                } else {
                  Model.insertComment(req.body)
                .then(comments => { 
                Model.findCommentById(comments.id)  
                .then(comment => {
                  res.status(201)
                  .json(comment)
                  })
                })
              .catch(error => {
                res
                  .status(500)
                  .json({errorMessage: "There was an error while saving the comment to the database", error })
              });   
          }
      })
})


module.exports = router;