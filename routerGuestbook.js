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

router.get('/create', function(request, response){
    const model = {
        validationErrors: []
    }
	
	response.render('createGuestpost.hbs', model)
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
		
		response.render("createGuestpost.hbs", model)
		
	}
		
})


module.exports = router