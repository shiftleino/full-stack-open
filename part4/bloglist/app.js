const express = require("express")
require("express-async-errors")
const app = express()
const cors = require("cors")
const blogsRouter  = require("./controllers/blogs")
const usersRouter = require("./controllers/users")
const middleware = require("./utils/middleware")

app.use(cors())
app.use(express.json())
app.use("/api/blogs", blogsRouter)
app.use("/api/users", usersRouter)
app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)

module.exports = app