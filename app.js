const express = require('express')
const expressHandlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')
const SQLiteStore = require('connect-sqlite3')(expressSession)
const bcrypt = require('bcryptjs')
const csurf = require('csurf')

const portfolioRouter = require('./routerPortfolio')
const blogRouter = require('./routerBlogPost')
const guestbookRouter = require('./routerGuestbook')
const adminRouter = require('./routerAdmin')

const app = express()

app.use(bodyParser.urlencoded({
  extended: false
}))

app.use(cookieParser())

const csrfProtection = csurf({
  cookie: true 
})

app.use(csrfProtection)

const db = require('./db')

const salt = bcrypt.genSaltSync(10)
const hash = bcrypt.hashSync("qwe123!!", salt)

const username = "admin"
const password = "$2a$10$W/4ZuP5hG0ZZTR/799SdzO.ZGSkRVbIZY9Aq2UZPif0IuEY5J8oWG"



app.use(express.static("public"))





app.use(expressSession({
  secret: "hfkjdsahflkjdsahkjf",
  saveUninitialized: false,
  resave: false,
  store: new SQLiteStore()
}))

app.use(function (request, response, next) {

  response.locals.isLoggedIn = request.session.isLoggedIn

  response.locals.csrfToken = request.csrfToken

  next()

})

app.post("/login", function (request, response) {

  if (request.body.username == username && bcrypt.compareSync(request.body.password, hash)) {
    request.session.isLoggedIn = true
    response.redirect("/")
  } else {
    response.render("login.hbs")
  }

})

app.use('/blog', blogRouter)

app.use('/guestbook', guestbookRouter)

app.use('/portfolio', portfolioRouter)

app.use('/adminpage', adminRouter)

app.engine("hbs", expressHandlebars({
  defaultLayout: 'main.hbs'
}))

app.get('/', function (request, response) {
  response.render("home.hbs")
})

app.get('/home', function (request, response) {
  response.render('./home.hbs')
})

app.get('/about', function (request, response) {
  response.render('./about.hbs')
})

app.get('/Contact', function (request, response) {
  response.render('./contact.hbs')
})

app.post('/logout', function (request, response) {
  if (request.session.isLoggedIn) {
    request.session.isLoggedIn = false;
    response.redirect("/")
  } else {
    response.render("home.hbs")
  }
})

app.get('/login', function (request, response) {
  response.render('./login.hbs')
})



app.listen(8080)

app.get('*', function (req, res) {
  res.send('ERROR 404: Could Not Find', 404);
});

app.use(function (error, req, res, next) {
  res.send('500: Internal Server Error', 500);
  console.log(error);
});