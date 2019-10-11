const sqlite3 = require('sqlite3')

const db = new sqlite3.Database("database.db")


exports.getAllProjects = function(callback){
    const query = "SELECT * FROM projects"
    db.all(query, function(error, projects){
        callback(error, projects)
    })
}

exports.createBlogPost = function(blogpostHeader, blogpostText, callback){
    const query = "INSERT INTO blogpost (blogpostHeader, blogpostText) VALUES (?,?)"
    const values = [blogpostHeader, blogpostText]
    db.run(query, values, function(error){
        callback(error)
    })
}

exports.createGuestPost = function(name, age, callback){
	
	const query = "INSERT INTO guestbook(postId, guestName, guestsubject, guestComment) VALUES (?, ?, ?, ?)"
	const values = [postId, guestName, guestSubject, guestComment]
	
	db.run(query, values, function(error){
		
		const id = this.lastID
		
		callback(error, id)
		
	})
	
}

exports.getAllGuestPosts = function(callback){
	
	const query = "SELECT * FROM guestbookPost"
	
	db.all(query, function(error, guestbook){
		
		callback(error, guestbook)
		
	})
	
}

exports.createPost = function(guestName, guestSubject, guestComment, callback){


}