const sqlite3 = require('sqlite3')

const db = new sqlite3.Database("database.db")


exports.getAllProjects = function(callback){
    const query = "SELECT * FROM projects"
    db.all(query, function(error, projects){
        callback(error, projects)
    })
}