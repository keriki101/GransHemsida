const express = require('express')
const db = require('./db')

const router = express.Router()



router.get("/", function(request, response){
	
	db.getAllGuestPosts(function(error, guestbook){
		
		if(error){
			
			const model = {
				somethingWentWrong: true
			}
			
			response.render("guestbook.hbs", model)
			
		}else{
			
			const model = {
				somethingWentWrong: false,
				guestbook
			}
			
			response.render("guestbook.hbs", model)
			
		}
		
	})
	
})

router.post("/delete/:postId", function(request,response){
    const postId = request.params.postId

    db.deleteGuestbookPost(postId, function(error){
        response.redirect("/guestbook")
    })
})

router.get('/create', function(request, response){
    const model = {
        validationErrors: []
    }
    
    response.render('create-guestpost.hbs', model)
})


router.post("/create", function(request, response){
	
	const Id = request.body.postId
    const name = request.body.guestName
    const subject = request.body.guestSubject
    const content = request.body.guestContent
	
	const validationErrors = []
	
	if(name == ""){
		validationErrors.push("Must enter a name.")
	}
	
	if(subject == ""){
		validationErrors.push("Must enter a subject.")
    }
    
    if(content == ""){
		validationErrors.push("Must enter content.")
	}
	
	// TODO: you probably want to use other validation rules (min/max length on username, min/max values on age).
	
	if(validationErrors.length == 0){
		
		db.createGuestPost(name, subject, content, function(error, id){
			if(error){
				
			}else{
				response.redirect("/guestbook/")
			}
		})
		
	}else{
		
		const model = {
			validationErrors,
			name,
            subject,
            content
		}
		
		response.render("create-guestpost.hbs", model)
		
	}
		
})


module.exports = router