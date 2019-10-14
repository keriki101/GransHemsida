const dummyData = require('./dummy-data')
const express = require('express')
const expressHandlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')
const SQLiteStore = require('connect-sqlite3')(expressSession)

const portfolioRouter = require('./routerPortfolio')
const blogRouter = require('./routerBlogPost')
const guestbookRouter = require('./routerGuestbook')

const db = require('./db')

const username = "admin"
const password = "qwe123!!"

const app = express()

app.use(express.static("public"))


app.use(bodyParser.urlencoded({
  extended: false
}))

app.use(cookieParser())

app.use(expressSession({
  secret: "hfkjdsahflkjdsahkjf",
  saveUninitialized: false,
  resave: false,
  store: new SQLiteStore()
}))

app.use(function(request, response, next){
	
	response.locals.isLoggedIn = request.session.isLoggedIn
	
	next()
	
})

app.use('/blog', blogRouter)

app.use('/guestbook', guestbookRouter)

app.use('/portfolio', portfolioRouter)

app.engine("hbs", expressHandlebars({
  defaultLayout: 'main.hbs'
}))

app.get('/', function(request, response){
  
  response.render("home.hbs")
})

app.get('/home', function(request, response){
  response.render('./home.hbs')
})

app.get('/about', function(request, response){
  response.render('./about.hbs')
})

app.get('/Contact', function(request, response){
  response.render('./contact.hbs')
})



app.get('/logout', function(request, response){
  request.session.isLoggedIn = false
  response.redirect("/")
})

app.get('/login', function(request, response){
  response.render('./login.hbs')
})

app.post("/login", function(request, response){
	
	if(request.body.username == username && request.body.password == password){
		request.session.isLoggedIn = true
		response.redirect("/")
	}else{
		response.render("login.hbs")
	}
	
})

app.listen(8080)