const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    if (username && password) {
        if (!isValid(username)) {
            users.push({ "username": username, "password": password });
            return res.status(200).json({ message: "User successfully registered. Now you can login" });
        } else {
            return res.status(404).json({ message: "User already exists!" });
        }
    }

    return res.status(404).json({ message: "Unable to register user." });

});

// Get the book list available in the shop
public_users.get('/', function (req, res) {

    

    return res.send(books);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    const updatedBooks = [];
    Object.keys(books).forEach(key => {
        if (books[key].isbn === isbn) {
            updatedBooks.push(books[key])
        }
    });
    return res.send({"booksByIsbn": updatedBooks}); 
});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
    const author = req.params.author;
    const updatedBooks = [];
    Object.keys(books).forEach(key => {
        if (books[key].author === author) {
            updatedBooks.push(books[key])
        }
    });
    return res.send({"booksByAuthor": updatedBooks}); 
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
    const title = req.params.title;
    const updatedBooks = [];
    Object.keys(books).forEach(key => {
        if (books[key].title === title) {
            updatedBooks.push(books[key])
        }
    });
    return res.send({"booksByTitle": updatedBooks}); 
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
    //Write your code here
    const isbn = req.params.isbn;
    let reviews;
    Object.keys(books).forEach(key => {
        if (books[key].isbn === isbn) {
            reviews = books[key].reviews;
        }
    });
    return res.send(reviews);
});

module.exports.general = public_users;
