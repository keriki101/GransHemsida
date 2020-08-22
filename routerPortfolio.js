const express = require('express')
const db = require('./db')

const router = express.Router()

router.get('/', function (request, response) {
  db.getAllProjects(function (error, projects) {
  
    if (error) {
      const model = {
        somethingWentWrong: true
      }
      response.render("portfolio.hbs", model)
    } else {
      const model = {
        projects

      }
      
      response.render('portfolio.hbs', model)
    
    }
  })
})

router.get("/addProjects", function (request, response) {
  if(request.session.isLoggedIn){
    const model = {
      validationErrors: []
    }
    
    response.render("addProjects.hbs", model)
  }else{
    response.status(401).render("error401.hbs")
  }
})

router.post("/addProjects", function (request, response) {
  if(request.session.isLoggedIn){
    const projectName = request.body.projectName
    const projectLink = request.body.projectLink

    const validationErrors = []

    if (projectName == "") {
      validationErrors.push("Must enter project name.")
    }

    if (projectLink == "") {
      validationErrors.push("Must enter a link to project.")
    }

    if (validationErrors.length == 0) {

      db.createProject(projectName, projectLink, function (error, projectId) {
        if (error) {
          console.log(error)
        } else {
          response.redirect("/portfolio")
        }
      })
    } else {
      const model = {
        validationErrors,
        projectName,
        projectLink
      }
      
      response.render("addProjects.hbs", model)
    
    }
  }else{
    response.status(401).render("error401.hbs")
  }
})

router.get('/:projectId', function (request, response) {
  if(request.session.isLoggedIn){
    const projectId = request.params.projectId

    db.getProjectById(projectId, function (error, projects) {
      if (error) {
        console.log(error)
      } else {
        const model = {
          projects
        }
        
        response.render("readMorePortfolio.hbs", model)
      
      }
    })
  }else{
    response.status(401).render("error401.hbs")
  }
})

router.get('/editProjects/:projectId', function (request, response) {
  if(request.session.isLoggedIn){
    const projectId = request.params.projectId

    db.getProjectById(projectId, function (error, projects) {
      if (error) {
        console.log(error)
      } else {
        const model = {
          projects
        }
        
        response.render("editProjects.hbs", model)
      
      }
    })
  }else{
    response.status(401).render("error401.hbs")
  }
})

router.post("/editProjects/:projectId", function (request, response) {
  if(request.session.isLoggedIn){
    const projectId = request.params.projectId
    const projectName = request.body.projectName
    const projectLink = request.body.projectLink

    db.editPortfolio(projectName, projectLink, projectId, function (error) {
      if (error) {

      } else {
        response.redirect("/portfolio/" + projectId)
      }
    })
  }else{
    response.status(401).render("error401.hbs")
  }
})


module.exports = router