const { test, describe,after, beforeEach } = require('node:test')
const bcrypt = require('bcrypt')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const listHelper = require('../utils/list_helper')
const testHelper = require('../utils/test_helper')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)

const initialBlogs = [
  {
    title: "Blogi",
    url: "www.url.com",
    likes: 100
  },
  {
    title: "Blogi2",
    url: "www.url.fi",
    likes: 50
  },
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('list_helper tests', () => {
describe('total likes', () => {
  const listWithNoBlogs = []
  const listWithOneBlog = [
     {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }
  ]
  const listWithManyBlogs = [
     {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 10,
      __v: 0
    }
  ]

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes(listWithNoBlogs)
    assert.strictEqual(result, 0)
  })

  test('when list has one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(listWithManyBlogs)
    assert.strictEqual(result, 15)
  })


})

describe('Blog with highest likes', () => {

      const blogList = [
     {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 10,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d1123',
      title: 'Testiä varten blogi',
      author: 'Pekka Eevertti',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/juupatijuu.pdf',
      likes: 20,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d4321',
      title: 'Testiä varten blogi',
      author: 'Pekka Keevertti',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/juupatijoo.pdf',
      likes: 15,
      __v: 0
    }
  ]
  const correctBlog =     {
      _id: '5a422aa71b54a676234d1123',
      title: 'Testiä varten blogi',
      author: 'Pekka Eevertti',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/juupatijuu.pdf',
      likes: 20,
      __v: 0
    }

    test('higher likes blog returned', () => {
    const result = listHelper.favouriteBlog(blogList)
    assert.deepStrictEqual(result,correctBlog)
  })

})

describe('Blogger with most blogs', () => {

      const mostBlogsList = [
     {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Pekka Eevertti',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 15,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d4321',
      title: 'Testiä varten blogi',
      author: 'Ekka Peevertti',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/juupatijoo.pdf',
      likes: 20,
      __v: 0
    },
        {
      _id: '5a422aa71b54a676234d1123',
      title: 'Testiä varten blogi',
      author: 'Pekka Eevertti',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/juupatijuu.pdf',
      likes: 10,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d4321',
      title: 'Blogi blogi',
      author: 'Esko Blogi',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/juupatijoasd.pdf',
      likes: 10,
      __v: 0
    }
  ]
  const correctBlogger = 
  {
    author: "Pekka Eevertti",
    blogs: 2
  }

  test('blogger with most most blogs returned', () => {
    const result = listHelper.mostBlogs(mostBlogsList)
    assert.deepStrictEqual(result,correctBlogger)
  })

})

describe('Blog with most likes', () => {

      const mostBlogLikes = [
     {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Pekka Eevertti',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 15,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d4321',
      title: 'Testiä varten blogi',
      author: 'Ekka Peevertti',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/juupatijoo.pdf',
      likes: 20,
      __v: 0
    },
        {
      _id: '5a422aa71b54a676234d1123',
      title: 'Testiä varten blogi',
      author: 'Pekka Eevertti',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/juupatijuu.pdf',
      likes: 10,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d4321',
      title: 'Blogi blogi',
      author: 'Esko Blogi',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/juupatijoasd.pdf',
      likes: 10,
      __v: 0
    }
  ]
  const correctBlogger = 
  {
    author: "Pekka Eevertti",
    likes: 25
  }

  test('blogger with most likes returned', () => {
    const result = listHelper.mostLikes(mostBlogLikes)
    assert.deepStrictEqual(result,correctBlogger)
  })

})})

describe('Blog list database tests', () => {

  test('correct amount of blogs are returned in the json format', async () => {
    const response = await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
      assert.strictEqual(response.body.length, 2)
  })
  test('unique identifier property is named "id"', async () => {
    const response = await api.get('/api/blogs')
      const object = response.body[0]
      const keys = Object.keys(object)
      const result = keys.find((key) => key === 'id')
      assert.strictEqual(result, 'id')
  })
  test('making an HTTP POST request to the /api/blogs URL successfully creates a new blog post', async () => {
    const newBlog =   
    {
    title: "Blogi3",
    url: "www.url.org",
    likes: 150
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const titles = response.body.map(r => r.title)
    assert.strictEqual(response.body.length, initialBlogs.length + 1)
    assert(titles.includes('Blogi3'))
  })
  test('if the likes property is missing from HTTP POST, defaults to 0', async () => {
        const newBlog =   
        {
          title: "Blogi no likes",
          url: "www.url.swe"
        }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const likesArray = response.body.map(r => r.likes)
    assert.strictEqual(response.body.length, initialBlogs.length + 1)
    assert(likesArray.includes(0))
  })
  test('if the url is missing from the request data, the backend responds to the request with the status code 400 Bad Request.',
    async () => {
      const newBlog =   
        {
          title: "Blogi no url",
          likes: 3
        }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

    const response = await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
      assert.strictEqual(response.body.length, 2)
  })
  test('if the title is missing from the request data, the backend responds to the request with the status code 400 Bad Request.',
    async () => {
      const newBlog =   
        {
          url: "www.noTitle.com",
          likes: 3
        }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

    const response = await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
      assert.strictEqual(response.body.length, 2)
  })

describe ('HTTP DELETE tests',() => {

  test('Returns 204 if successful', async () => {
    const getResponse = await api.get('/api/blogs')
    const idToDelete = getResponse.body[1].id

    await api.del(`/api/blogs/${idToDelete}`)
      .expect(204)
  })
  test('Returns 404 if id not found', async () => {
    const id = "123412341234123412341234"
    await api.del(`/api/blogs/${id}`)
      .expect(404)
  })
})
})

describe ('HTTP PUT tests',() => {

    const updateBlog =   
    {
      likes: 90
    }

  test('Returns 200 if successful', async () => {

    const getResponse = await api.get('/api/blogs')
    const idToUpdate = getResponse.body[1].id

    await api
      .put(`/api/blogs/${idToUpdate}`)
      .send(updateBlog)
      .expect(200)
  })

  test('Returns 404 if id not found', async () => {

    const id = "123412341234123412341234"
    await api
      .put(`/api/blogs/${id}`)
      .send(updateBlog)
      .expect(404)
  })
  
  test('database updated with the correct value', async () => {

    const getResponse = await api.get('/api/blogs')
    const idToUpdate = getResponse.body[1].id

    const response = await api
      .put(`/api/blogs/${idToUpdate}`)
      .send(updateBlog)
      assert.strictEqual(response.body.likes, updateBlog.likes)
  })
})

describe('User tests', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('secret', 10 )
    const user = new User({ username: 'root', passwordHash})
    
    await user.save()
  })

  test.only('creation succeeds with a fresh username', async () => {
    const usersAtStart =  await testHelper.usersInDb()

    const newUser = {
      username: 'pekkaE',
      name: 'Pekka Eevert',
      password: 'salasana',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await testHelper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))
  })

  test.only('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await testHelper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await testHelper.usersInDb()
    assert(result.body.error.includes('expected `username` to be unique'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

    test.only('username cannot be less than 3 characters', async () => {
    const usersAtStart = await testHelper.usersInDb()

    const newUser = {
      username: 'ro',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await testHelper.usersInDb()
    assert(result.body.error.includes('username must be atleast 3 characters long'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

   test.only('username must be given in request', async () => {
    const usersAtStart = await testHelper.usersInDb()

    const newUser = {
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await testHelper.usersInDb()
    assert(result.body.error.includes('must have a username'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

   test.only('password cannot be less than 3 characters', async () => {
    const usersAtStart = await testHelper.usersInDb()

    const newUser = {
      username: 'doooo',
      name: 'Superuser',
      password: 'sa',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await testHelper.usersInDb()
    assert(result.body.error.includes('password must be atleast 3 characters long'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test.only('password must be given in request', async () => {
    const usersAtStart = await testHelper.usersInDb()

    const newUser = {
      username: 'poooo',
      name: 'Superuser',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await testHelper.usersInDb()
    assert(result.body.error.includes('must have a password'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })
    
})

after(async () => {
  await mongoose.connection.close()
})