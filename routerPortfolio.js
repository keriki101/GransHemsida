const express = require('express')
const db = require('./db')

const router = express.Router()

app.get('/portfolio', function(request, response){
    db.getAllProjects(function(error, projects){
  
      const model = {
        projects
        
      }
      response.render('portfolio.hbs', model)
    })
  })

