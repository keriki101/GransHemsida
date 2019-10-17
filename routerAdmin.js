const express = require('express')
const db = require('./db')

const router = express.Router()

router.get('/', function (request, response) {
  response.render("adminpage.hbs")
})

router.get('/manageguestbook', function (request, response) {
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
})

router.post('/manageguestbook/delete/:postId', function (request, response) {
  const postId = request.params.postId

  db.deleteGuestbookPost(postId, function (error) {
    response.redirect("/adminpage/manageguestbook")
  })
})

router.get('/manageguestbook/editguestbook/:postId', function (request, response) {

  const postId = request.params.postId  

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
})

router.post('/manageguestbook/editguestbook/:postId', function (request, response) {

  const postId = request.params.postId
  const guestName = request.body.guestName
  const guestSubject = request.body.guestSubject
  const guestContent = request.body.guestContent

  db.editGuestbook(guestName, guestSubject, guestContent, postId, function (error) {
    if (error) {
      console.log(error)
    } else {
      response.redirect("/adminpage/manageguestbook/")
    }
  })
})

//blog starts here
router.get('/manageblog', function (request, response) {

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
})

//portfolio starts here
router.get('/manageportfolio', function (request, response) {
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
})

router.post("/manageportfolio/delete/:projectId", function (request, response) {
  const projectId = request.params.projectId

  db.deleteProject(projectId, function (error) {
    response.redirect("/adminpage/manageportfolio")
  })
})


router.get('/:blogId', function (request, response) {

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
})

router.get('/:projectId', function (request, response) {

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
}) 

router.post('/manageblog/delete/:blogId', function (request, response) {
  const blogId = request.params.blogId

  db.deleteBlogPost(blogId, function (error) {
    response.redirect("/adminpage/manageblog")
  })
})

router.get('/manageblog/edit/:blogId', function (request, response) {

  const blogId = request.params.blogId

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
})

router.post('/manageblog/edit/:blogId', function (request, response) {

  const blogId = request.params.blogId
  const postName = request.body.postTitle
  const postLink = request.body.postComment

  db.editBlogPost(postName, postLink, blogId, function (error) {
    if (error) {

    } else {
      response.redirect("/adminpage/manageblog/")
    }
  })
})

router.get('/manageportfolio/editProjects/:projectId', function (request, response) {

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
})

router.post("/adminpage/manageportfolio/editProjects/:projectId", function (request, response) {

  const projectId = request.params.projectId
  const projectName = request.body.projectName
  const projectLink = request.body.projectLink

  db.editPortfolio(projectName, projectLink, projectId, function (error) {
    if (error) {

    } else {
      response.redirect("/manageportfolio/" + projectId)
    }
  })
})

module.exports = router