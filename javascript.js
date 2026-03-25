class Library {
  #books;

  constructor() {
    this.#books = [];
  }

  addBook(book) {
    this.#books.push(book);
  }

  deleteBook(bookId) {
    this.#books = this.#books.filter(currentbook => currentbook.id !== bookId);
  }

  getBookWithId(bookId) {
    return this.#books.find(book => book.id === bookId);
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


function initializeDisplay() {
  const library = new Library();

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
    readStatus.textContent = book.readStatus ? "read" : "unread";
    let textBox = document.createElement("div");
    textBox.append(title, author, pages, readStatus);

    // Buttons
    // Each button will call a function with book id as an argument when clicked
    // For example, pressing delete button will call library.deleteBook(book.id)
    let toggleReadStatusButton = document.createElement("button");
    toggleReadStatusButton.textContent = book.readStatus ? 'Mark as read' : 'Mark as unread';
    toggleReadStatusButton.onclick = function() {
      library.getBookWithId(book.id).toggleReadStatus();
      updateDisplay();
    };
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = function() {
      library.deleteBook(book.id);
      updateDisplay();
    };
    let buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");
    buttonContainer.append(toggleReadStatusButton, deleteButton)

    // Create card and append children to it
    let card = document.createElement("div");
    card.classList.add("card");
    card.append(textBox, buttonContainer);

    return card;
  }

  function updateDisplay() {
    const libraryDiv = document.querySelector("#library");

    libraryDiv.textContent = '';
    library.books.forEach(book => {
      libraryDiv.append(createBookCard(book));
    });
  }
  
  function addEventListenersToDialog() {
    const dialog = document.querySelector('#add-book-dialog');
    const titleInput = document.querySelector('#title');
    const authorInput = document.querySelector('#author');
    const pagesInput = document.querySelector('#pages');
    const readStatusButtons = document.querySelectorAll('input[name="read"]');
    const cancelButton = document.querySelector('#cancel');
    const confirmButton = document.querySelector('#confirm');
  
    cancelButton.addEventListener("click", event => {
      event.preventDefault();
      dialog.close();
    })
  
    // When user adds a new book, add the book to the array, clear input fields, and update the display
    confirmButton.addEventListener("click", event => {
      event.preventDefault();

      // Process read status
      let readStatus = Array.from(readStatusButtons).filter(button => button.checked)[0].value;
      readStatus = readStatus === "yes" ? true : false;

      library.addBook(new Book(
        titleInput.value,
        authorInput.value,
        +pagesInput.value,
        readStatus,
      ));
  
      // Clear all input fields
      [titleInput, authorInput, pagesInput].forEach(input => {
        input.value = "";
      });
      readStatusButtons.forEach(button => {
        button.checked = false;
      });
  
      dialog.close();
      updateDisplay();
    });
  }

  // For testing
  library.addBook(new Book("The Pragmatic Programmer", "Andrew Hunt", 352, true));
  library.addBook(new Book("Clean Code", "Robert C. Martin", 464, false));
  library.addBook(new Book("You Don't Know JS Yet", "Kyle Simpson", 143, true));
  library.addBook(new Book("Eloquent JavaScript", "Marijn Haverbeke", 472, false));
  library.addBook(new Book("JavaScript: The Good Parts", "Douglas Crockford", 176, true));
  library.addBook(new Book("Refactoring", "Martin Fowler", 448, false));
  library.addBook(new Book("Design Patterns", "Erich Gamma", 395, false));
  library.addBook(new Book("Introduction to Algorithms", "Thomas H. Cormen", 1312, true));

  addEventListenersToDialog();
  updateDisplay();
}

initializeDisplay();