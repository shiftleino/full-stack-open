import React, { useState, useEffect } from "react"
import Blog from "./components/Blog"
import Notification from "./components/Notification"
import BlogForm from "./components/BlogForm"
import blogService from "./services/blogs"
import loginService from "./services/login"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState(null)
  const [username, setUsername] = useState("") 
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")
  const [success, setSuccess] = useState(true)
  const [blogFormVisible, setBlogFormVisible] = useState(false)

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

  const handleCreate = async (event) => {
    try {
      event.preventDefault()
      const blog = await blogService.create({title, author, url})
      setSuccess(true)
      setNotification(`A new blog ${title} by ${author} added`)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
      setTitle("")
      setAuthor("")
      setUrl("")
      setBlogs(blogs.concat(blog))
      setBlogFormVisible(false)
    } catch (exception) {
      setTitle("")
      setAuthor("")
      setUrl("")
      setSuccess(false)
      setNotification(exception)
      setBlogFormVisible(false)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
    
  }

  const hideWhenVisible = { display: blogFormVisible ? "none": "hidden" }
  const showWhenVisible = { display: blogFormVisible ? "" : "none" }

  if (user === null) {
    return (
      <div>
        <Notification message={notification} success={success} />
        <h2>log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
              <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
              <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
  )}
  return (
    <>
      <Notification message={notification} success={success} />
      <h2>blogs</h2>
      <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
      <div style={hideWhenVisible}>
        <button onClick={() => setBlogFormVisible(true)}>create new blog</button>
      </div>
      <div style={showWhenVisible}>
        <h2>create new</h2>
        <BlogForm 
          title={title}
          author={author}
          url={url}
          handleTitleChange={({ target }) => setTitle(target.value)}
          handleAuthorChange={({ target }) => setAuthor(target.value)}
          handleUrlChange={({ target }) => setUrl(target.value)}
          handleSubmit={handleCreate}
        />
        <button onClick={() => setBlogFormVisible(false)}>cancel</button>
      </div>
      {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} />
      )}
    </>
  )
}

export default App