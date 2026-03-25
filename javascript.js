class Library {
  #books;

  constructor() {
    this.#books = [];
  }

  addBook(book) {
    this.#books.push(book);
  }

  deleteBook(bookToDelete) {
    this.#books = this.#books.filter(currentbook => currentbook.id !== bookToDelete.id);
  }

  get books() {
    // Return a copy, not the array itself
    // This makes books array unable to modify from outside
    return [...this.#books];
  }
}

class Book {
  #id;
  #title;
  #author;
  #pages;
  #readStatus;

  constructor(title, author, pages, readStatus) {
    this.#id = crypto.randomUUID();
    this.#title = title;
    this.#author = author;
    this.#pages = pages;
    this.#readStatus = readStatus;
  }

  get id() {
    return this.#id;
  }

  get title() {
    return this.#title;
  }

  get author() {
    return this.#author;
  }

  get pages() {
    return this.#pages;
  }
  
  get readStatus() {
    return this.#readStatus;
  }

  toggleReadStatus() {
    this.#readStatus = !this.readStatus;
  }
}

const dialog = document.querySelector("#add-book-dialog");
const textInputs = document.querySelectorAll('input[type="text"]');
const numberInputs = document.querySelectorAll('input[type="number"]');
const radioButtons = document.querySelectorAll('input[type="radio"]');
const cancelButton = document.querySelector('#cancel');
const confirmButton = document.querySelector('#confirm');
const libraryDiv = document.querySelector("#books");

function displayLibrary() {
  libraryDiv.innerHTML = "";
  myLibrary.forEach(book => {
    libraryDiv.append(createBookCard(book));
  })
}

function createBookCard(book) {
  // Text content
  let title = document.createElement("h2");
  title.classList.add("title");
  title.textContent = book.title;
  let author = document.createElement("p");
  author.textContent = `Author: ${book.author}`;
  let pages = document.createElement("p");
  pages.textContent = `${book.pages} pages`;
  let readStatus = document.createElement("p");
  readStatus.textContent = book.read ? "read" : "unread";
  let textBox = document.createElement("div");
  textBox.append(title, author, pages, readStatus);

  // Button to toggle read status
  let toggleReadButton = document.createElement("button");
  toggleReadButton.textContent = book.read ? "Mark as unread" : "Mark as read";
  toggleReadButton.onclick = function() {
    book.toggleReadStatus();
    displayLibrary();
  };

  // Delete button
  let deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.onclick = function() {
    myLibrary = myLibrary.filter(item => item.id !== book.id);
    displayLibrary();
  };

  // Add buttons to a container
  let buttonContainer = document.createElement("div");
  buttonContainer.classList.add("button-container");
  buttonContainer.append(toggleReadButton, deleteButton)

  // Create card and append children to it
  let card = document.createElement("div");
  card.classList.add("card");
  card.append(textBox, buttonContainer);

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
});

// Random initial books for testing
myLibrary.push(new Book({
  title: 'The Silent Orbit',
  author: 'L. Navarro',
  pages: 318,
  read: true,
}))
myLibrary.push(new Book({
  title: 'Fragments of Winter',
  author: 'Aiko Tanabe',
  pages: 247,
  read: false,
}))
myLibrary.push(new Book({
  title: 'Quantum Harbor',
  author: 'M. O’Connell',
  pages: 412,
  read: true,
}))
myLibrary.push(new Book({
  title: 'Echoes in Amber',
  author: 'R. Petrov',
  pages: 189,
  read: false,
}))
myLibrary.push(new Book({
  title: 'Garden of Mechanical Birds',
  author: 'S. Ibrahim',
  pages: 356,
  read: true,
}))
myLibrary.push(new Book({
  title: 'The Last Cartographer',
  author: 'H. Schmidt',
  pages: 271,
  read: false,
}))

displayLibrary();