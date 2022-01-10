import React, { useState, useEffect, useRef } from "react"
import Blog from "./components/Blog"
import Notification from "./components/Notification"
import BlogForm from "./components/BlogForm"
import blogService from "./services/blogs"
import loginService from "./services/login"
import Togglable from "./components/Togglable"

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [notification, setNotification] = useState(null)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [user, setUser] = useState(null)
    const [success, setSuccess] = useState(true)

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs(blogs)
        )
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser")
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const blogFormRef = useRef()

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username, password,
            })
            window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user))
            blogService.setToken(user.token)
            setUser(user)
            setUsername("")
            setPassword("")
            setSuccess(true)
            setNotification("Logged in successfully")
            setTimeout(() => {
                setNotification(null)
            }, 5000)
        } catch (exception) {
            setSuccess(false)
            setNotification("wrong credentials")
            setTimeout(() => {
                setNotification(null)
            }, 5000)
        }
    }

    const handleLogout = () => {
        window.localStorage.removeItem("loggedBlogappUser")
        setUser(null)
        setSuccess(true)
        setNotification("Logged out successfully")
        setTimeout(() => {
            setNotification(null)
        }, 5000)
    }

    const createBlog = async ({ title, author, url }) => {
        try {
            const blog = await blogService.create({ title, author, url })
            blogService.getAll().then(blogs =>
                setBlogs(blogs))
            setSuccess(true)
            setNotification(`A new blog ${title} by ${author} added`)
            setTimeout(() => {
                setNotification(null)
            }, 5000)
            setBlogs(blogs.concat(blog))
            blogFormRef.current.toggleVisibility()
        } catch (exception) {
            setSuccess(false)
            setNotification("Couldn't create the blog")
            setTimeout(() => {
                setNotification(null)
            }, 5000)
        }
    }

    const compareFunction = (a, b) => {
        if (a.likes > b.likes) {
            return -1
        } else if (a.likes < b.likes) {
            return 1
        } else {
            return 0
        }
    }

    const likeBlog = async (blog) => {
        try {
            const theBlog = {
                user: blog.user.id,
                likes: blog.likes,
                author: blog.author,
                title: blog.title,
                url: blog.url
            }
            await blogService.like(theBlog, blog.id)
            setBlogs(blogs.map(blog2 => blog2.id !== blog.id ? blog2 : blog).sort(compareFunction))
            setSuccess(true)
            setNotification(`Blog ${blog.title} by ${blog.author} liked successfully`)
            setTimeout(() => {
                setNotification(null)
            }, 5000)
        } catch (exception) {
            setSuccess(false)
            setNotification("Couldn't like the blog.")
            setTimeout(() => {
                setNotification(null)
            }, 5000)
        }
    }

    const deleteBlog = async (blog) => {
        try {
            window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)
            await blogService.deleteBlog(blog.id)
            setBlogs(blogs.filter(blog2 => blog2.id !== blog.id))
            setSuccess(true)
            setNotification("Blog deleted successfully")
            setTimeout(() => {
                setNotification(null)
            }, 5000)
        } catch (exception) {
            setSuccess(false)
            setNotification("Couldn't delete the blog.")
            setTimeout(() => {
                setNotification(null)
            }, 5000)
        }
    }

    if (user === null) {
        return (
            <div>
                <Notification message={notification} success={success} />
                <h2>log in to application</h2>
                <form onSubmit={handleLogin} id="loginForm" >
                    <div>
                username
                        <input
                            id="username"
                            type="text"
                            value={username}
                            name="Username"
                            onChange={({ target }) => setUsername(target.value)}
                        />
                    </div>
                    <div>
            password
                        <input
                            id="password"
                            type="password"
                            value={password}
                            name="Password"
                            onChange={({ target }) => setPassword(target.value)}
                        />
                    </div>
                    <button type="submit" id="loginButton" >login</button>
                </form>
            </div>
        )}
    return (
        <>
            <Notification message={notification} success={success} />
            <h2>blogs</h2>
            <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
            <Togglable buttonLabel="create new blog" ref={blogFormRef} >
                <h2>create new</h2>
                <BlogForm createBlog={createBlog} />
            </Togglable>
            {blogs.sort(compareFunction).map(blog =>
                <Blog key={blog.id} blog={blog} likeBlog={likeBlog} deleteBlog={deleteBlog} user={user} />
            )}
        </>
    )
}

export default App