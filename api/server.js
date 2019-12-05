const express = require("express");
const server = express();

//import router files
const postsRouter = require("./posts/postsRouter.js");
const commentsRouter = require("./comments/commentsRouter.js")

server.use(express.json());

//use routers
server.use("/api/posts", postsRouter)
server.use("/api/posts", commentsRouter)


server.get("/", (req, res) => {
    res.status(200).json({ message: "hello world"});
})


// export default server; // ES6 Modules
module.exports = server;