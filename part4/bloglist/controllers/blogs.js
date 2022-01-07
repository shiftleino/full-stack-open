const blogsRouter = require("express").Router()
const Blog = require("../models/blog")

blogsRouter.get("/", async (request, response, next) => {
    try {
        const blogs = await Blog.find({})
        response.json(blogs.map(blog => blog.toJSON()))
    } catch(exception) {
        next(exception)
    }
})

blogsRouter.post("/", async (request, response, next) => {
    const body = request.body
    if (!body.likes) {
        const blog = new Blog({
            "title": body.title,
            "author": body.author,
            "url": body.url,
            "likes": 0
        })
        try {
            const result = await blog.save()
            response.status(201).json(result)
        } catch(exception) {
            next(exception)
        }
    } else {
        const blog = new Blog(body)
        try {
            const result = await blog.save()
            response.status(201).json(result)
        } catch(exception) {
            next(exception)
        }
    }
})

module.exports = blogsRouter