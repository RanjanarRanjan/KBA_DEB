const readline = require("readline");

// Define a Map to store books
const books = new Map();

// Create an interface for user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// Function to add a book
function addBook(bookId, title, author) {
    if (books.has(bookId)) {
        console.log(`Book with ID ${bookId} already exists.`);
        return;
    }
    books.set(bookId, { title, author, status: "Available" });
    console.log(`Book added: ${title} by ${author}`);
}

// Function to list all books
function listBooks() {
    if (books.size === 0) {
        console.log("No books in the library.");
        return;
    }
    console.log("\nLibrary Books:");
    books.forEach((details, id) => {
        console.log(`ID: ${id} | Title: ${details.title} | Author: ${details.author} | Status: ${details.status}`);
    });
}

// Function to borrow a book
function borrowBook(bookId) {
    if (books.has(bookId)) {
        let book = books.get(bookId);
        if (book.status === "Available") {
            book.status = "Borrowed";
            console.log(`You have borrowed "${book.title}".`);
        } else {
            console.log(`Sorry, "${book.title}" is already borrowed.`);
        }
    } else {
        console.log(`Book with ID ${bookId} not found.`);
    }
}

// Function to return a book
function returnBook(bookId) {
    if (books.has(bookId)) {
        let book = books.get(bookId);
        if (book.status === "Borrowed") {
            book.status = "Available";
            console.log(`You have returned "${book.title}".`);
        } else {
            console.log(`"${book.title}" was not borrowed.`);
        }
    } else {
        console.log(`Book with ID ${bookId} not found.`);
    }
}

// Function to delete a book
function deleteBook(bookId) {
    if (books.has(bookId)) {
        books.delete(bookId);
        console.log(`Book with ID ${bookId} has been deleted.`);
    } else {
        console.log(`Book with ID ${bookId} not found.`);
    }
}

// Function to prompt user for book details
function promptForBook() {
    rl.question("Enter book ID: ", (id) => {
        rl.question("Enter book title: ", (title) => {
            rl.question("Enter book author: ", (author) => {
                addBook(Number(id), title, author);
                mainMenu();
            });
        });
    });
}

// Main menu function
function mainMenu() {
    console.log("\nLibrary Management System");
    console.log("1. Add a book");
    console.log("2. Display all books");
    console.log("3. Borrow a book");
    console.log("4. Return a book");
    console.log("5. Delete a book");
    console.log("6. Exit");

    rl.question("Choose an option: ", (choice) => {
        switch (choice) {
            case "1":
                promptForBook();
                break;
            case "2":
                listBooks();
                mainMenu();
                break;
            case "3":
                rl.question("Enter book ID to borrow: ", (id) => {
                    borrowBook(Number(id));
                    mainMenu();
                });
                break;
            case "4":
                rl.question("Enter book ID to return: ", (id) => {
                    returnBook(Number(id));
                    mainMenu();
                });
                break;
            case "5":
                rl.question("Enter book ID to delete: ", (id) => {
                    deleteBook(Number(id));
                    mainMenu();
                });
                break;
            case "6":
                console.log("Exiting...");
                rl.close();
                break;
            default:
                console.log("Invalid option. Try again.");
                mainMenu();
                break;
        }
    });
}

// Start the program
mainMenu();
