const dummy = (blogs) => {
    if (blogs) {
        return 1
    }
    else return 0
}

const totalLikes = (blogs) => {
    let result = 0
    blogs.forEach(blog => {
        result += blog.likes
    });
    return result
}

const favouriteBlog = (blogs) => {
    const likesArray = blogs.map(blog => blog.likes )
    const highestLikes = Math.max(...likesArray)
    const result = blogs.find(blog => blog.likes === highestLikes)
    return result
}

module.exports = {
    dummy,totalLikes,favouriteBlog
}