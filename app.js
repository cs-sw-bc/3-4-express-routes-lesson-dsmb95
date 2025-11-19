// With third party packages, you must use their own names in the import statement.
import express from "express";
import books from "./data/books.json" with {type: 'json'};

const app = express();
const PORT = 3000;

/* ---------------------------------------------
   SERVER LISTEN
---------------------------------------------- */
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  // console.log(`This library has ${books.length} books.`);
});

app.get('/books', (req, res) => {
  // Copy to a different variable to not mess up the parent variable.
  //let results = books: // if you change books, results will also change.
  let result = [...books] // It will cpy books to results and unlink them. If you change result, books will not change.
  // res.send(result) this returns a string.

  if (req.query.maxPages) {
    result = [result.find(book => book.pageCount <= req.query.maxPages)];
  }

  if (req.query.minYear) {
    result = [result.find(book => book.year >= req.query.minYear)];
  }

  res.json(result); // this returns a json object.
});

app.get('/books/:id', (req, res) => {
  let result = null;
  // The parameter returns a string, so if you use numbers for 'id' parameter, you must convert it into a number/integer to be able to use it.
  let searchId = Number(req.params.id);
  
  // FILTER functions - goes hrough a list of objects and find your object based on your condition.
  result = books.find(book => book.id === searchId); // Declarative/ functional programming.
  /*
  From the list of books
  Find the book Id
  which has an id(book.id) equals to the search Id.
   */

  // display result
  if (result) {
    //result variable is not null
    res.json(result);
  } else {
    // 404 NOT FOUND
    res.status(404).send("The book you are looking for does not exist.");
  }
  
  // for (let i = 0; i < books.length; i++) {
  //   if (books[i].id === searchId) {
  //     result = books[i];
  //     break;
  //   }
  // }
});

app.get('/books/:id/author', (req, res) => {
  let searchId = Number(req.params.id);
  let result = books.find(book => book.id === searchId); // find the book

  // display result
  if (result) {
    //result variable is not null
    res.json(result.author); // return only the author of the book.
  } else {
    // 404 NOT FOUND
    res.status(404).send("The book you are looking for does not exist.");
  }
});

app.get('/books/:id/reviews', (req, res) => {
  let searchId = Number(req.params.id);
  let result = books.find(book => book.id === searchId);
  let indexId = books.indexOf(result);

  if (result) {
    res.json(books[indexId].reviews);
  } else {
    res.status(404).send("I could not get reviews.")
  }
});

