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
    const model = {
        validationErrors: []
    }

    response.render('create.hbs', model)
})


router.post("/create", function(request, response){
    const blogTitle = request.body.postTitle
    const blogComment = request.body.postComment

    const validationErrors = []

    const date = new Date()
    const blogDate = date.toDateString()
    
    if(blogTitle == ""){
		validationErrors.push("Must enter a Title.")
    }
    if(blogComment == ""){
		validationErrors.push("Must enter a comment.")
	}

    if(validationErrors.length == 0){
        
        db.createBlogPost(blogTitle, blogComment, blogDate, function(error, blogId){
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
            blogTitle,
            blogComment,
            blogDate
        }

        response.render("create.hbs", model)
    }

})


module.exports = router