const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  
  if (blog.likes === undefined) {
    blog.likes = 0
  }
  if (blog.title === undefined || blog.url === undefined){
    response.status(400).end()
  }
  else{
    const result = await blog.save()
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
  
  const { title, url, likes } = request.body
  const result = await Blog.findById(request.params.id)
      if (!result) {
        response.status(404).end()
      }
      else{
        result.title = title
        result.url = url
        result.likes = likes

        const saveResponse = await result.save()
        response.status(200).json(saveResponse).end()
      }
})

module.exports = blogsRouter