# Getting started with App

Dependencies used: Mongoose, Express Nodemon

### To install dependencies

run: "npm i mongoose express nodemon"

### To start App

run: "npm run server"
server will start at: "http://localhost:2345/books"

## MongoDB Configuration

Domain: mongodb://127.0.0.1,
Port: 27017,
Database: BookLibrary,
Full Website: "mongodb://127.0.0.1:27017/BookLibrary"

So, A mongo server should have open at "mongodb://127.0.0.1:27017/BookLibrary" to run this App

### Schema Details

    title: string, required
    author: string, required
    category: string, required
    inStore: boolean, default : true
    trackings: array of objects
 
 
 # APIs
 
 ### To get list of books
 visit: "http://localhost:2345/books"
 result: result will be an array
 
 ### To post a books
 visit: "http://localhost:2345/books"
 body should be:{
  title: string, required
    author: string, required
    category: string, required
    inStore: boolean, default : true
    trackings: object with keys "taken","returned"
}

 ### To get books sorted by category 
 visit:"http://localhost:2345/books/categories"
 result: result will be an array
 
 ### To get books searched by category 
 visit:"http://localhost:2345/books/categories/{category_name}"
 result: result will be an array
 
 ### To search by title or author
 visit:"http://localhost:2345/books/search/{name}"
 result: result will be an array
 
  ### To get books is out or in the store
 visit:"http://localhost:2345/books/status/{id_of_book}"
 result: result will be string
 
  ### To get imformation about book's taking dates and returning dates
 visit:"http://localhost:2345/books/track/{id_of_book}"
 result: result will be array of objects
 
