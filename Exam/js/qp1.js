const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const expenses = [];

function showMenu() {
    console.log(`
Expense Tracker Menu:
1. Add Expense
2. View Expenses
3. Exit
    `);
    rl.question("Choose an option (1, 2, 3): ", handleOption);
}

function handleOption(option) {
    switch (option.trim()) {
        case '1':
            addExpense();
            break;
        case '2':
            viewExpenses();
            break;
        case '3':
            console.log("Exiting the Expense Tracker...");
            rl.close();
            break;
        default:
            console.log("Invalid option. Please try again.");
            showMenu();
    }
}

function addExpense() {
    rl.question("Enter the type of expense (e.g., hospital, travel): ", (type) => {
        if (type.trim() === '') {
            console.log("Expense type cannot be empty.");
            showMenu();
            return;
        }
        rl.question("Enter the amount: ", (amount) => {
            if (amount.trim() === ''||Number(amount) <= 0) {
                console.log("Invalid amount. Please enter a positive number.");
                showMenu();
                return;
            }
            rl.question("Enter the date (YYYY-MM-DD): ", (date) => {
                if (date>12&&date<0) {
                    console.log("Invalid date format. Please use YYYY-MM-DD.");
                    showMenu();
                    return;
                }
                expenses.push({ type, amount: Number(amount), date });
                console.log("Expense added successfully!");
                showMenu();
            });
        });
    });
}

function viewExpenses() {
    sum=0;
    if (expenses.length === 0) {
        console.log("No expenses recorded.");
    } else {
        console.log("Expense List:");
        expenses.forEach((expense) => {
            sum=sum+expense.amount
            console.log(`Type: ${expense.type}, Amount: ${expense.amount}, Month: ${expense.date}`);
        });
    }
    showMenu();
}


showMenu();

