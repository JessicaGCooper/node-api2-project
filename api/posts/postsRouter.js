const express = require("express");
const Model = require("../Model");
const router = express.Router();

router.get("/", (req, res) => {
    Model.find() 
    .then(posts => {
        res
        .status(200)
        .json({posts})
    })
    .catch(error => {
        res
        .status(500)
        .json({
            errorMessage: "The posts could not be retrieved by the server.", error
        })
    })

});

router.get("/:id", (req, res) => {
   Model.findById(req.params.id)
    .then(user => {
        if (user){
           res.status(200)
           .json({user}) 
        } else {
            res.status(404)
            .json({ errorMessage: "No user with that ID exists"})
        }
    })
    .catch(error => {
        res
        .status(500)
        .json({
            errorMessage: "The posts could not be retrieved by the server.", error
        })
    })
});

//post
router.post("/", (req, res) => {
    const {title, contents} = req.body

    if (!title || !contents) {
        res.status(400)
        .json({errorMessage: "Please provide the title and contents for the post.", error})
    } else {

     Model.insert(req.body)
          .then(post => {
             res
             .status(201)
             .json({...post, title, contents})
          })
          .catch(error => { 
            res
            .status(500)
            .json({ errorMessage: "There was an error while saving the user to the database", error })
          })
    }
})

router.put("/:id", (req, res) => {
    const id = req.params.id
    const {title, contents} = req.body

    Model.update(id, req.body)
    .then(post => { if (!post){
      res.status(404)
      .json({ errorMessage: "The post with the specified ID does not exist." })
      } else if (!title || !contents){
      res.status(400)
      .json({ errorMessage: "Please provide title and contents for the post." })
      } else {
      Model.findById(id)  
      .then(post => {
        res.status(200)
        .json(post)
        })
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({errorMessage: "The post information could not be modified.", error })
    });
  });
  

  //DELETE
router.delete("/:id", (req, res) => {
    const id = req.params.id
  
    Model.findById(id)
      .then(post => {
      Model.remove(id)
        .then(removePost => {
          if(removePost) {
              res.status(200)
              .json({message: `The post with ID number ${id} has been successfully removed.`, post})
          } else {
              res.status(404).json({ errorMessage: "The post with the specified ID does not exist." })
          }
        })
      })
      .catch (error => {
          console.log("error on DELETE /posts/:id", error);
          res
          .status(500)
          .json({ errorMessage: "The post could not be removed." })
      });
  });
  


module.exports = router;