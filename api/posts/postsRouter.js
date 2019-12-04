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
            message: "The posts could not be retrieved by the server.", error
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
            .json({ message: "No user with that ID exists"})
        }
    })
    .catch(error => {
        res
        .status(500)
        .json({
            message: "The posts could not be retrieved by the server.", error
        })
    })
});

//post - finish post
// router.post("/", (req, res) => {
//     const {title, contents} = req.body
//     if (!title || !contents) {
//         res.status(400)
//         .json({message: "Please provide the title and contents."})
//     } else {

//      Model.insert(posts)
//          .then(posts => {
//              res.status(201)
//              .json({posts})
//          })
//          .catch( error => 
//             res
//             .status(500)
//             .json({
//              message: "There was an error while saving the user to the datbase", error
//             })
     
//     }
// })


module.exports = router;