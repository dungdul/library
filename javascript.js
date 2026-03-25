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


function initializeDisplayManager() {
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
    // dataset.bookId will be used when user presses the button
    // For example, pressing delete button will call library.deleteBook(e.target.dataset.bookId)
    let toggleReadStatusButton = document.createElement("button");
    toggleReadStatusButton.textContent = book.readStatus ? 'Mark as read' : 'Mark as unread';
    toggleReadStatusButton.classList.add('toggle-read-status');
    toggleReadStatusButton.dataset.bookId = book.id;
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add('delete');
    deleteButton.dataset.bookId = book.id;
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
    const titleInput = document.querySelector('title');
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
      [...textInputs, ...numberInputs].forEach(input => {
        input.value = "";
      });
      radioButtons.forEach(button => {
        button.checked = false;
      });
  
      dialog.close();
      updateDisplay();
    });
  }

  function addEventListenersToButtons() {
    const buttons = document.querySelectorAll('#library button');

    // Each button has either 'toggle-read-status' or 'delete' class
    // Execute different function depending on the class
    buttons.forEach(button => {
      button.addEventListener('click', e => {
        const bookId = e.target.dataset.bookId;

        switch (e.target.className) {
          case 'toggle-read-status':
            library.getBookWithId(bookId).toggleReadStatus();
            break;
          case 'delete':
            library.deleteBook(bookId);
            break;
          default:
            throw new Error('Invalid class name for the button');
        }

        updateDisplay();
      });
    });
  }

  addEventListenersToDialog();
  addEventListenersToButtons();
  updateDisplay();
}

initializeDisplayManager();