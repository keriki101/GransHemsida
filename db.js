const sqlite3 = require('sqlite3')

const db = new sqlite3.Database("database.db")

/*db.run(CREATE TABLE IF NOT EXISTS "blogPost" (
	"postTitle"	TEXT,
	"blogId"	INTEGER PRIMARY KEY AUTOINCREMENT,
	"postComment"	TEXT,
	"blogDate"	TEXT
))*/


exports.getAllProjects = function (callback) {
	const query = "SELECT * FROM projects"
	
	db.all(query, function (error, projects) {
		callback(error, projects)
	})
}

exports.editPortfolio = function(projectName, projectLink,  projectId, callback){
	const query = "UPDATE projects SET projectName = ?, projectLink = ? WHERE projectId = ?"
	const values = [projectName, projectLink, projectId]

	db.run(query, values, function(error){
		callback(error)
	})
}

exports.editGuestbook = function(guestName, guestSubject, guestContent, postId, callback){
	const query = "UPDATE guestbookPost SET guestName = ?, guestSubject = ?, guestContent = ? WHERE postId = ?"
	const values = [guestName, guestSubject, guestContent, postId]

	db.run(query, values, function(error){
		callback(error)
	})
}

exports.deleteProject = function (projectId, callback){
	const query = "DELETE FROM projects WHERE projectId = ?"
	const values = [projectId]

	db.get(query,values, function(error){
		callback(error)
	})
}

exports.getProjectById = function(projectId, callback) {
	const query = "SELECT * FROM projects WHERE projectId = ?"
	const values = [projectId]

	db.get(query,values, function(error, projects){
		callback(error, projects)
	})
}

exports.getGuestpostById = function(postId, callback){
	const query = "SELECT * FROM guestbookPost WHERE postId = ?"
	const values = [postId]

	db.get(query, values, function(error, guestbookPost){
		callback(error, guestbookPost)
	})
}


exports.createProject = function(projectName, projectLink, callback){
	const query = "INSERT INTO projects (projectName, projectLink) VALUES (?,?)"
	const values = [projectName, projectLink]

	db.run(query, values, function(error){
		const projectId = this.lastID
		callback(error, projectId)
	})
}

exports.editBlogPost = function (postTitle, postComment, blogId, callback) {

	const query = "UPDATE blogPost SET postTitle = ?, postComment = ? WHERE blogId = ?"
	const values = [postTitle, postComment, blogId]

	db.run(query, values, function (error) {
		callback(error)
	})
}

exports.deleteBlogPost = function (blogId, callback) {
	const query = "DELETE FROM blogPost WHERE blogId = ?"
	const values = [blogId]

	db.get(query, values, function (error) {
		callback(error)
	})
}

exports.deleteGuestbookPost = function (postId, callback) {
	const query = "DELETE FROM guestbookPost WHERE postId = ?"
	const values = [postId]

	db.get(query, values, function (error) {
		callback(error)
	})
}

exports.getBlogPostById = function (blogId, callback) {

	const query = "SELECT * FROM blogPost WHERE blogId = ?"
	const values = [blogId]

	db.get(query, values, function (error, blogPost) {
		callback(error, blogPost)
	})

}

exports.createBlogPost = function (postTitle, postComment, blogDate, callback) {
	const query = "INSERT INTO blogPost (postTitle, postComment, blogDate) VALUES (?,?,?)"
	const values = [postTitle, postComment, blogDate]
	
	db.run(query, values, function (error) {
		const blogId = this.lastID
		callback(error, blogId)
	})
}

exports.createGuestPost = function (guestName, guestSubject, guestContent, callback) {

	const query = "INSERT INTO guestbookPost(guestName, guestSubject, guestContent) VALUES (?, ?, ?)"
	const values = [guestName, guestSubject, guestContent]

	db.run(query, values, function (error) {
		const Id = this.lastID
		callback(error, Id)
	})

}

exports.getAllGuestPosts = function (callback) {

	const query = "SELECT * FROM guestbookPost"

	db.all(query, function (error, guestbook) {
		callback(error, guestbook)
	})

}

exports.getAllBlogposts = function (callback) {

	const query = "SELECT * FROM blogPost"

	db.all(query, function (error, blogPost) {
		callback(error, blogPost)
	})
}
