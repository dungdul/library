const myLibrary = [];
myLibrary.push({
  title: "Harry",
  author: "JK",
  pages: 200,
  read: false
})

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
  const libraryDiv = document.querySelector("#library");
  myLibrary.forEach(book => {
    libraryDiv.append(createBookCard(book));
  })
}

function createBookCard(book) {
  // Create card's child elements
  let title = document.createElement("h2");
  title.classList.add("title");
  title.textContent = book.title;
  let author = document.createElement("p");
  author.textContent = `Author: ${book.author}`;
  let pages = document.createElement("p");
  pages.textContent = `${book.pages} pages`;
  let readStatus = document.createElement("p");
  readStatus.textContent = book.read ? "read" : "unread";

  // Create card and append children to it
  let card = document.createElement("div");
  card.classList.add("card");
  card.append(title, author, pages, readStatus);

  return card;
}