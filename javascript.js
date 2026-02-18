const myLibrary = [];

function Book(inputObject) {
  this.id = crypto.randomUUID();
  Object.assign(this, inputObject);
}

function addBookToLibrary(inputObject) {
  // take params, create a book then store it in the array
  let book = new Book(inputObject);
  myLibrary.push(book);
}

function displayLibrary() {
  
}