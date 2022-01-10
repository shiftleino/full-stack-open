import React, { useState } from "react"

const BlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [url, setUrl] = useState("")

    const addBlog = (event) => {
        event.preventDefault()
        createBlog({ title, author, url })
        setTitle("")
        setAuthor("")
        setUrl("")
    }

    const handleTitleChange = (event) => {
        setTitle(event.target.value)
    }

    const handleAuthorChange = (event) => {
        setAuthor(event.target.value)
    }

    const handleUrlChange = (event) => {
        setUrl(event.target.value)
    }

    return (
        <div>
            <form onSubmit={addBlog}>
                <div>
                title:
                    <input
                        id="title"
                        type="text"
                        value={title}
                        name="Title"
                        onChange={handleTitleChange}
                    />
                </div>
                <div>
                    author:
                    <input
                        id="author"
                        type="text"
                        value={author}
                        name="Author"
                        onChange={handleAuthorChange}
                    />
                </div>
                <div>
                    url:
                    <input
                        id="url"
                        type="text"
                        value={url}
                        name="Url"
                        onChange={handleUrlChange}
                    />
                </div>
                <button type="submit" id="createButton" >create</button>
            </form>
        </div>
    )
}

export default BlogForm