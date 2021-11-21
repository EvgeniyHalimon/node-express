const express = require('express')
const path = require('path')
const morgan = require('morgan')

const app = express()

app.set('view engine', 'ejs')

const PORT = 3001

const createPath = (page) => path.resolve(__dirname, 'ejs-views', `${page}.ejs`)

app.listen(PORT, (error) => {
  error ? console.log(error) : console.log(`listening port ${PORT}`)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

app.use(express.urlencoded({ extended: false }))

app.use(express.static('styles'))

app.get('/', (req, res) => {
  const title = 'Home'
  res.render(createPath('index'), { title })
})

app.get('/contacts', (req, res) => {
  const title = 'Contacts'
  const contacts = [
    { name: 'YouTube', link: 'http://youtube.com/YauhenKavalchuk' },
    { name: 'Twitter', link: 'http://github.com/YauhenKavalchuk' },
    { name: 'GitHub', link: 'http://twitter.com/YauhenKavalchuk' },
  ]
  res.render(createPath('contacts'), { contacts, title });
})

app.get('/posts/:id', (req, res) => {
  const title = 'Post'
  const post = {
    id: '1', 
    text: 'I have no idea what im doing',
    title: 'Post title',
    date: '21.11.2021',
    author: 'Fabulous Me',
  }
  res.render(createPath('post'), { title, post })
})

app.get('/posts', (req, res) => {
  const title = 'Posts'
  const posts = [
    {
        id: '1', 
        text: 'I have no idea what im doing',
        title: 'Post title',
        date: '21.11.2021',
        author: 'Fabulous Me',
    }
  ]
  res.render(createPath('posts'), { title, posts })
})

app.post('/add-post', (req, res) => {
  const { title, author, text } = req.body
  const post = {
    id: new Date(),
    date: (new Date()).toLocaleDateString(),
    title,
    author,
    text,
  }
  res.render(createPath('post'), { post, title })
})

app.get('/add-post', (req, res) => {
  const title = 'Add Post';
  res.render(createPath('add-post'), { title })
})

app.use((req, res) => {
  const title = 'Error Page'
  res
    .status(404)
    .render(createPath('error'), { title })
})