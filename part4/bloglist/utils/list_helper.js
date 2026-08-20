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

const mostBlogs = (blogs) => {
    let bloggerArray = blogs.map(blog => ({author: blog.author, blogs: 1}))
    console.log(bloggerArray);
    
    let newArray = []
    for (let i = 0; i < bloggerArray.length; i++) {
        const element = bloggerArray[i];
        const result = newArray.map(e => e.author).indexOf(element.author)
       
        //console.log("result: "+ result);
        
        if (result == -1) {
            newArray.push(element)
        }
        else{
            const newBlogCount = (element.blogs + 1)
            //console.log(newBlogCount);
            
            const newElement = ({author: element.author, blogs: newBlogCount})
            //console.log(newElement);
            newArray.splice(result,1,newElement)
        }
    }
    //console.log("newArray:");
    //console.log(newArray);

    const highestCount = Math.max.apply(Math, newArray.map(e => e.blogs))
    const result = newArray.find(e => e.blogs === highestCount)
    //console.log("result of function:");
    //console.log(result);
    
    return result
}

    

module.exports = {
    dummy,totalLikes,favouriteBlog,mostBlogs
}