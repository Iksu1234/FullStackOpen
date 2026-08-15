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



module.exports = {
    dummy,totalLikes
}