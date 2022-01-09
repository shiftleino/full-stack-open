import React, { useState } from 'react'

const Blog = ({blog, likeBlog}) => {
  const [visible, setVisible] = useState(false) 
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleClick = () => {
    likeBlog({...blog, likes: blog.likes + 1})
  }

  if (visible) {
    return (
      <div style={blogStyle}>
        {blog.title} {blog.author} <button onClick={() => setVisible(false)}>hide</button>
        <div>{blog.url}</div>
        <div>likes {blog.likes} <button onClick={handleClick}>like</button></div>
        <div>{blog.user.name}</div>
      </div>
    )
  } else {
    return (
      <div>
        {blog.title} {blog.author} <button onClick={() => setVisible(true)}>view</button>
      </div>  
    )
  }
}

export default Blog