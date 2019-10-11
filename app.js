const dummyData = require('./dummy-data')
const express = require('express')
const expressHandlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const db = require('./db')
const blogRouter = require('./routerBlogPost')

const app = express()

app.use(express.static("public"))


app.use(bodyParser.urlencoded({
  extended: false
}))


app.engine("hbs", expressHandlebars({
  defaultLayout: 'main.hbs'
}))

app.use('/blog', blogRouter)

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

app.get('/guestbook', function(request, response){
  response.render('./guestbook.hbs')
})

app.get('/portfolio', function(request, response){
  db.getAllProjects(function(error, projects){

    const model = {
      projects
      
    }
    response.render('portfolio.hbs', model)
  })
})


app.get('/login', function(request, response){
  response.render('./login.hbs')
})

//app.get('/main.css', function(request,response){
//response.sendFile(__dirname + '/views/main.css')
//}) 

const username = "admin"
const password = "qwe123!!"

app.post("/login", function(request, response){
	
	if(request.body.username == username && request.body.password == password){
		request.session.isLoggedIn = true
		response.redirect("home.hbs")
	}else{
		response.render("login.hbs")
	}
	
})

app.listen(8080)