const express = require('express')
const db = require('./db')

const router = express.Router()

router.get('/', function (request, response) {
  
  response.render("adminPage.hbs")

})

router.get('/manageguestbook', function (request, response) {
  if(request.session.isLoggedIn){
    db.getAllGuestPosts(function (error, guestbook) {

      if (error) {
        const model = {
          somethingWentWrong: true
        }
  
        response.render("manageGuestbook.hbs", model)
  
      } else {
        const model = {
          somethingWentWrong: false,
          guestbook
        }
  
        response.render("ManageGuestbook.hbs", model)
      
      }
    })
  }else{
    response.status(401).render("error401.hbs")
  }
})

router.post('/manageguestbook/deleteById/:postId', function (request, response) {
  if(request.session.isLoggedIn){
    const postId = request.params.postId
      if (request.session.isLoggedIn){
        db.deleteGuestbookPost(postId, function (error) {
          response.redirect("/adminpage/manageguestbook")
        })
      } 
  }else{
    response.status(401).render("error401.hbs")
  }
})

router.get('/manageguestbook/editguestbook/:postId', function (request, response) {
  if(request.session.isLoggedIn){
    const postId = request.params.postId
    if (request.session.isLoggedIn){
      db.getGuestpostById(postId, function (error, guestbookPost) {
        if (error) {
          console.log(error)
        } else {
          const model = {
            guestbookPost
          }
          
          response.render("editGuestbook.hbs", model)
        
        }
      })
    }
  }else{
    response.status(401).render("error401.hbs")
  }
})

router.post('/manageguestbook/editguestbook/:postId', function (request, response) {
  if(request.session.isLoggedIn){
    const postId = request.params.postId
    const guestName = request.body.guestName
    const guestSubject = request.body.guestSubject
    const guestContent = request.body.guestContent
    if (request.session.isLoggedIn){
      db.editGuestbook(guestName, guestSubject, guestContent, postId, function (error) {
        if (error) {
          console.log(error)
        } else {
          response.redirect("/adminpage/manageguestbook/")
        }
      })
    }
  }else{
    response.status(401).render("error401.hbs")
  }
})


router.get('/manageblog', function (request, response) {
  if(request.session.isLoggedIn){
    db.getAllBlogposts(function (error, blogPost) {
      if (error) {
        const model = {
          somethingWentWrong: true
        }

        response.render("manageBlog.hbs", model)

      } else {
        const model = {
          somethingWentWrong: false,
          blogPost
        }

        response.render("ManageBlog.hbs", model)
      
      }
    })
  }else{
    response.status(401).render("error401.hbs")
  }
})


router.get('/manageportfolio', function (request, response) {
  if(request.session.isLoggedIn){
    db.getAllProjects(function (error, projects) {
      if (error) {
        const model = {
          somethingWentWrong: true
        }
        response.render("managePortfolio.hbs", model)
      } else {
        const model = {
          projects

        }
        
        response.render('managePortfolio.hbs', model)
      
      }
    })
  }else{
    response.status(401).render("error401.hbs")
  }
})

router.post("/manageportfolio/deleteById/:projectId", function (request, response) {
  if(request.session.isLoggedIn){
    const projectId = request.params.projectId
    if (request.session.isLoggedIn){
      db.deleteProject(projectId, function (error) {
        response.redirect("/adminpage/manageportfolio")
      })
    }
  }else{
    response.status(401).render("error401.hbs")
  }
})


router.get('/:blogId', function (request, response) {
  if(request.session.isLoggedIn){
    const blogId = request.params.blogId

    db.getBlogPostById(blogId, function (error, blogPost) {
      if (error) {
        console.log(error)
      } else {
        const model = {
          blogPost
        }
        
        response.render("manageBlog.hbs", model)
      
      }
    })
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

router.post('/manageblog/deleteById/:blogId', function (request, response) {
  if(request.session.isLoggedIn){
    const blogId = request.params.blogId
    if (request.session.isLoggedIn){
      db.deleteBlogPost(blogId, function (error) {
        response.redirect("/adminpage/manageblog")
      })
    }
  }else{
    response.status(401).render("error401.hbs")
  }
})

router.get('/manageblog/edit/:blogId', function (request, response) {
  if(request.session.isLoggedIn){
    const blogId = request.params.blogId

    if (request.session.isLoggedIn){
      db.getBlogPostById(blogId, function (error, blogPost) {
        if (error) {
          console.log(error)
        } else {
          const model = {
            blogPost
          }
          
          response.render("edit.hbs", model)
        
        }
      })
    }
  }else{
    response.status(401).render("error401.hbs")
  }
})


router.post('/manageblog/edit/:blogId', function (request, response) {
  if(request.session.isLoggedIn){
    const blogId = request.params.blogId
    const postName = request.body.postTitle
    const postLink = request.body.postComment

    if (request.session.isLoggedIn){
      db.editBlogPost(postName, postLink, blogId, function (error) {
        if (error) {

        } else {
          response.redirect("/adminpage/manageblog/")
        }
      })
    }
  }else{
    response.status(401).render("error401.hbs")
  }
})

router.get('/manageportfolio/editprojects/:projectId', function (request, response) {
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

router.post("/adminpage/manageportfolio/editprojects/:projectId", function (request, response) {
  if(request.session.isLoggedIn){
    const projectId = request.params.projectId
    const projectName = request.body.projectName
    const projectLink = request.body.projectLink
    
    if (request.session.isLoggedIn){
      db.editPortfolio(projectName, projectLink, projectId, function (error) {
        if (error) {

        } else {
          response.redirect("/manageportfolio/" + projectId)
        }
      })
    }
  }else{
    response.status(401).render("error401.hbs")
  }
})

module.exports = router