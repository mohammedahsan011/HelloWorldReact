// Import mysql module
var mysql = require('mysql');

// Import express module
var express = require("express");
const { TestScheduler } = require('jest');

// Define object of express module
var app = express();

// Make database connection to handle 10 concurrent users
var pool = mysql.createPool({
connectionLimit :10,
host : 'localhost',
user : 'root',
password : 'password',
database : 'hellodb',
debug : true
});

/* Make pooled connection with a database and read specific records from a table of that
 database */
function handle_database(request,response) {

// Make connection
pool.getConnection(function(e,connection){
if (e) {

  //Send error message for unsuccessful connection and terminate
  response.json({"code" : 300, "status" : "Database connection error"});
  return;
}

// Display success message in the terminal
console.log('Database connected');

// Read particular records from book table
connection.query("SELECT hellocol FROM hello WHERE helloid=1;",function(e,rows){ connection.release();
if(!e) {

  // Return the resultset of the query if it is successfully executed
  response.json(rows);
}
});

// Check the connection error occurs or not
connection.on('error', function(e) {
response.json({"code" : 300, "status" : "Database connection errror"});
return;
});
});
}

// Call the function for making connections
app.get("/",function(request,response){-
handle_database(request,response);
});

// Listen the connection request on port 5000
app.listen(5000);




