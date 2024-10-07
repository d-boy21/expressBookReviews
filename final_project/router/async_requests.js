const axios = require('axios/dist/node/axios.cjs'); // node

const getBooks = async () => {
    await axios.get('/');
}


const getBooksByIsbn = async (isbn) => {
    await axios.get(`/isbn/${isbn}`);
}


const getBooksByAuthor = async (author) => {
    await axios.get(`/author/${author}`);
}


const getBooksByTitle = async (title) => {
    await axios.get(`/title/${title}`);
}
