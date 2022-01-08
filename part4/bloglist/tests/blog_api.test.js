const supertest = require("supertest")
const app = require("../app")
const mongoose = require("mongoose")
const Blog = require("../models/blog")
const api = supertest(app)
const blogs = require("./test_helper").blogs

beforeEach(async () => {
    await Blog.deleteMany({})
    for (const blog of blogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
    }
})

test("blogs returned", async () => {
    const response = await api.get("/api/blogs")
    expect(response.body).toHaveLength(blogs.length)
})

test("id is defined", async () => {
    const response = await api.get("/api/blogs")
    expect(response.body[0].id).toBeDefined()
})

test("post works", async () => {
    const newBlog = {
        "title": "Errors in Statistical Modeling",
        "author": "Meera Sharma",
        "url": "https://towardsdatascience.com/errors-in-statistical-modeling-c22978a98269",
        "likes": 150
    }
    await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/)

        const response = await api.get("/api/blogs")
        const titles = response.body.map(b => b.title)
        expect(response.body).toHaveLength(blogs.length + 1)
        expect(titles).toContainEqual("Errors in Statistical Modeling")
})

test("if likes empty", async () => {
    const newBlog = {
        title: "Errors in Statistical Modeling",
        author: "Meera Sharma",
        url: "https://towardsdatascience.com/errors-in-statistical-modeling-c22978a98269",
    }
    await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/)
        const response = await api.get("/api/blogs")
        const likes = response.body.map(b => b.likes)
        expect(likes[blogs.length]).toBe(0)
})

test("title and url empty", async () => {
    const newBlog = {
        author: "Meera Sharma",
        likes: 150
    }
    await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(400)
})

afterAll(() => {
    mongoose.connection.close()
})