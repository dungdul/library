const myLibrary = [];
myLibrary.push({
  title: "Harry",
  author: "JK",
  pages: 200,
  read: false
})

const dialog = document.querySelector("#add-book-dialog");
const textInputs = document.querySelectorAll('input[type="text"]');
const numberInputs = document.querySelectorAll('input[type="number"]');
const radioButtons = document.querySelectorAll('input[type="radio"]');
const cancelButton = document.querySelector('#cancel');
const confirmButton = document.querySelector('#confirm');
const libraryDiv = document.querySelector("#library");

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
  libraryDiv.innerHTML = "";
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

function getInputValues() {
  let inputObject = {};
  textInputs.forEach(input => {
    inputObject[input.id] = input.value;
  })
  numberInputs.forEach(input => {
    inputObject[input.id] = +input.value;
  })
  let read = Array.from(radioButtons).filter(button => button.checked)[0].value;
  inputObject.read = read === "yes" ? true : false;
  return inputObject;
}

cancelButton.addEventListener("click", event => {
  event.preventDefault();
  dialog.close();
})

// When user adds a new book, add the book to the array, clear input fields, and update the display
confirmButton.addEventListener("click", event => {
  event.preventDefault();
  addBookToLibrary(getInputValues());

  // Clear all input fields
  textInputs.forEach(input => {
    input.value = "";
  })
  numberInputs.forEach(input => {
    input.value = "";
  })
  radioButtons.forEach(button => {
    button.checked = false;
  })

  dialog.close();
  displayLibrary();
})

displayLibrary();