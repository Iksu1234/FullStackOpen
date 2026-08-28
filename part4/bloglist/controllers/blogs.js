const blogsRouter = require('express').Router()
const testHelper = require('../utils/test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
  .find({}).populate('user', {username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  let body = request.body

  if (!body.userId) {
    const foundUsers = await testHelper.usersInDb()
    body.userId = foundUsers[0].id
  }

  const user = await User.findById(body.userId)

  /*
  if (!user) {
    return response.status(400).json({ error: 'userId missing or not valid' }) 
  }*/

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id
  })
  
  if (blog.likes === undefined) {
    blog.likes = 0
  }
  if (blog.title === undefined || blog.url === undefined){
    response.status(400).end()
  }
  else{
    const result = await blog.save()
    user.blogs = user.blogs.concat(result._id)
    await user.save()
    
    response.status(201).json(result)
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  const result = await Blog.findByIdAndDelete(request.params.id)
  if (result != null) {
    response.status(204).end()
  }
  else{
    response.status(404).end()
  }
})

blogsRouter.put('/:id', async (request, response) => {
  
  const { title, author,  url, likes } = request.body
  const result = await Blog.findById(request.params.id)
      if (!result) {
        response.status(404).end()
      }
      else{
        result.title = title
        result.author = author
        result.url = url
        result.likes = likes

        const saveResponse = await result.save()
        response.status(200).json(saveResponse).end()
      }
})

module.exports = blogsRouter