const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")
const jwt = require("jsonwebtoken")

blogsRouter.get("/", async (request, response) => {
    const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 })
    response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post("/", async (request, response) => {
    const body = request.body

    if (!body.title || !body.url) {
        response.status(400).end()
    }
    const token = request.token

    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: "token missing or invalid" })
    }
    const user = await User.findById(decodedToken.id)

    if (!body.likes) {
        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: 0,
            user: user._id
        })
        const result = await blog.save()
        user.blogs = user.blogs.concat(result._id)
        await User.findByIdAndUpdate(user._id, user)
        response.status(201).json(result.toJSON())
    } else {
        const blog = new Blog({...body, user: user._id})
        const result = await blog.save()
        user.blogs = user.blogs.concat(result._id)
        await User.findByIdAndUpdate(user._id, user)
        response.status(201).json(result.toJSON())
    }
})

blogsRouter.delete("/:id", async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()    
})

blogsRouter.put("/:id", async (request, response) => {
    const body = request.body
    const result = await Blog.findByIdAndUpdate(request.params.id, body, { new: true })
    response.json(result)
})

module.exports = blogsRouter