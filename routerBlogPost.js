const express = require('express')
const db = require('./db')

const router = express.Router()

router.get('/', function(request, response){
    db.getAllBlogposts(function(error, blogPost){

        if(error){

            const model = {
                somethingWentWrong: true
            }

            response.render("blog.hbs",model)

        }else{
            const model = {
                somethingWentWrong: false,
                blogPost
            }

            response.render("blog.hbs",model)
        }
    })
})

router.get('/create', function(request, response){
    if(request.session.isLoggedIn){    
        const model = {
            validationErrors: []
        }

        response.render('create.hbs', model)
    }else{
        response.status(401).render("error401.hbs")
      }
})



router.get('/:blogId', function(request,response){
    const blogId = request.params.blogId
    
    db.getBlogPostById(blogId, function(error, blogPost){
        if(error){
            console.log(error)
        }else{
            const model ={
                blogPost
            }
            
            response.render("readMore.hbs", model)
        
        }
    })
})

router.post("/create", function(request, response){
    if(request.session.isLoggedIn){
        const postTitle = request.body.postTitle
        const postComment = request.body.postComment

        const validationErrors = []

        const date = new Date()
        const blogDate = date.toDateString()
        
        if(postTitle == ""){
            validationErrors.push("Must enter a Title.")
        }
        if(postComment == ""){
            validationErrors.push("Must enter a comment.")
        }

        if(validationErrors.length == 0){
            
            db.createBlogPost(postTitle, postComment, blogDate, function(error, blogId){
                if(error){
                    console.log(error)
                }
                else{
                    response.redirect("/blog")
                }
            })
            
        }else{
            const model = {
                validationErrors,
                postTitle,
                postComment,
                blogDate
            }

            response.render("create.hbs", model)
        }
    }else{
        response.status(401).render("error401.hbs")
      }
})


module.exports = router