const sqlite3 = require('sqlite3')

const db = new sqlite3.Database("database.db")


exports.getAllProjects = function(callback){
    const query = "SELECT * FROM projects"
    db.all(query, function(error, projects){
        callback(error, projects)
    })
}



exports.createBlogPost = function(blogTitle, blogComment, blogDate, callback){
    const query = "INSERT INTO blogPost (postTitle, postComment, blogDate) VALUES (?,?,?)"
    const values = [blogTitle, blogComment, blogDate]
    db.run(query, values, function(error){
		const blogId = this.lastID
		callback(error, blogId)
    })
}

exports.createGuestPost = function(guestName, guestSubject, guestComment, callback){
	
	const query = "INSERT INTO guestbookPost(guestName, guestSubject, guestComment) VALUES (?, ?, ?)"
	const values = [guestName, guestSubject, guestComment]
	
	db.run(query, values, function(error){
		
		const Id = this.lastID
		callback(error, Id)
		
	})
	
}

exports.getAllGuestPosts = function(callback){
	
	const query = "SELECT * FROM guestbookPost"
	
	db.all(query, function(error, guestbook){
		
		callback(error, guestbook)
		
	})
	
}

exports.getAllBlogposts = function(callback){

	const query = "SELECT * FROM blogPost"

	db.all(query, function(error, blogPost){

		callback(error, blogPost)
	})
}

exports.createPost = function(guestName, guestSubject, guestComment, callback){


}