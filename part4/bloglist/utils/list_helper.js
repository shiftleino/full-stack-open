const dummy = (blogs) => 1

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return {}
    } else {
        const maximum = Math.max(...blogs.map((blog) => blog.likes))
        return blogs.find((blog) => blog.likes === maximum)
    }
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return {}
    } else {
        const objects = blogs.map((blog) => {
            return ({
                author: blog.author,
                blogs: blogs.reduce((sum, blog2) => blog2.author === blog.author ? sum + 1 : sum, 0)
            }
        )})    
        const maximum = Math.max(...objects.map((obj) => obj.blogs))
        return objects.find((obj) => obj.blogs === maximum)
    }
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return {}
    } else {
        const objects = blogs.map((blog) => {
            return ({
                author: blog.author,
                likes: blogs.reduce((sum, blog2) => blog2.author === blog.author ? sum + blog2.likes : sum, 0)
            }
        )})    
        const maximum = Math.max(...objects.map((obj) => obj.likes))
        return objects.find((obj) => obj.likes === maximum)
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}