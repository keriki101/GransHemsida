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

const password = "$2a$10$ZPXN3UGS1KZHrFCpxIhbAez/dfFj6PXLKXCvdvrmqomMCBhoqL2pq"

const username = "admin"

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

  if (request.body.username == username && bcrypt.compareSync(request.body.password, password)) {
    request.session.isLoggedIn = true
    response.redirect("/")
  } else {
    response.render("login.hbs")
  }
})

app.use('/blog', blogRouter)

app.use('/portfolio', portfolioRouter)

app.use('/adminpage', adminRouter)

app.engine("hbs", expressHandlebars({
  defaultLayout: 'main.hbs'
}))

app.get('/', function (request, response) {
  response.render("home.hbs")
})

app.get('/home', function (request, response) {
  response.render("home.hbs")
})

app.get('/about', function (request, response) {
  response.render("about.hbs")
})

app.get('/contact', function (request, response) {
  response.render("contact.hbs")
})

app.get('/resume', function (request, response){
  response.render("resume.hbs")
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
  response.render("login.hbs")
})

app.listen(8080)

app.get('*', function (req, res) {
  res.send('ERROR 404: Could Not Find', 404);
});