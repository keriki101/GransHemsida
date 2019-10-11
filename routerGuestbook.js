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
    
    response.render('create-guestpost.hbs', model)
  })

router.post("/", function(request, response){
	
	const Id = request.body.postId
    const name = request.body.guestName
    const subject = request.body.guestSubject
    const comment = request.body.guestComment
	
	const validationErrors = []
	
	if(name == ""){
		validationErrors.push("Must enter a name.")
	}
	
	if(subject == ""){
		validationErrors.push("Must enter a subject.")
    }
    
    if(comment == ""){
		validationErrors.push("Must enter a comment.")
	}
	
	// TODO: you probably want to use other validation rules (min/max length on username, min/max values on age).
	
	if(validationErrors.length == 0){
		
		db.createHuman(name, subject, comment, function(error, id){
			if(error){
				
			}else{
				response.redirect("/blogpost/")
			}
		})
		
	}else{
		
		const model = {
			validationErrors,
			name,
            subject,
            comment
		}
		
		response.render("create-guestpost.hbs", model)
		
	}
		
})


module.exports = router