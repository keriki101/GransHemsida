const dummyData = require('./dummy-data')
const express = require('express')
const expressHandlebars = require('express-handlebars')

const app = express()

app.use(express.static("public"))

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

app.get('/portfolio', function(request, response){
  response.render('./portfolio.hbs')
})

//app.get('/main.css', function(request,response){
//response.sendFile(__dirname + '/views/main.css')
//}) 

app.listen(8080)