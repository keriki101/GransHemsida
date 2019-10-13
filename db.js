const sqlite3 = require('sqlite3')

const db = new sqlite3.Database("database.db")


exports.getAllProjects = function(callback){
    const query = "SELECT * FROM projects"
    db.all(query, function(error, projects){
        callback(error, projects)
    })
}

exports.editBlogPost = function(postTitle, postComment, blogId, callback){

	const query = "UPDATE blogPost SET postTitle = ?, postComment = ? WHERE blogId = ?"
	const values = [postTitle, postComment, blogId]

	db.run(query, values, function(error){
		callback(error)
	})
}

exports.deleteBlogPost = function(blogId, callback){
	const query = "DELETE FROM blogPost WHERE blogId = ?"
	const values = [blogId]

	db.get(query, values, function(error){
		callback(error)
	})
}

exports.deleteGuestbookPost = function(postId, callback){
	const query = "DELETE FROM guestbookPost WHERE postId = ?"
	const values = [postId]

	db.get(query, values, function(error){
		callback(error)
	})
}

exports.getBlogPostById = function(blogId, callback){
	
	const query = "SELECT * FROM blogPost WHERE blogId = ?"
	const values = [blogId]
	
	db.get(query, values, function(error, blogPost){
		callback(error, blogPost)
	})
	
}

exports.createBlogPost = function(postTitle, postComment, blogDate, callback){
    const query = "INSERT INTO blogPost (postTitle, postComment, blogDate) VALUES (?,?,?)"
    const values = [postTitle, postComment, blogDate]
    db.run(query, values, function(error){
		const blogId = this.lastID
		callback(error, blogId)
    })
}

exports.createGuestPost = function(guestName, guestSubject, guestContent, callback){
	
	const query = "INSERT INTO guestbookPost(guestName, guestSubject, guestContent) VALUES (?, ?, ?)"
	const values = [guestName, guestSubject, guestContent]
	
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