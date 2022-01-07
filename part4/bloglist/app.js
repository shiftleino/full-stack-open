const express = require("express")
const app = express()
const cors = require("cors")
const blogsRouter  = require("./controllers/blogs")
const middleware = require("./utils/middleware")

app.use(cors())
app.use(express.json())
app.use("/api/blogs", blogsRouter)
app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)

module.exports = app