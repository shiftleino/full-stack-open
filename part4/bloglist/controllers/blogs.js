const blogsRouter = require("express").Router()
const Blog = require("../models/blog")

blogsRouter.get("/", async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post("/", async (request, response) => {
    const body = request.body
    if (!body.title || !body.url) {
        response.status(400).end()
    }
    if (!body.likes) {
        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: 0
        })
        const result = await blog.save()
        response.status(201).json(result)
    } else {
        const blog = new Blog(body)
        const result = await blog.save()
        response.status(201).json(result)
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