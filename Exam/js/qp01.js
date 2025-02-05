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
3. Show Total Expense for a Month
4. Exit
    `);
    rl.question("Choose an option (1, 2, 3, 4): ", handleOption);
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
            showTotalExpense();
            break;
        case '4':
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
            if (amount.trim() === '' || Number(amount) <= 0 || isNaN(amount)) {
                console.log("Invalid amount. Please enter a positive number.");
                showMenu();
                return;
            }
            rl.question("Enter the date (YYYY-MM-DD): ", (date) => {
                if (!isValidDate(date)) {
                    console.log("Invalid date format. Please use YYYY-MM-DD.");
                    showMenu();
                    return;
                }
                expenses.push({ type, amount: Number(amount), date: new Date(date) });
                console.log("Expense added successfully!");
                showMenu();
            });
        });
    });
}

function viewExpenses() {
    if (expenses.length === 0) {
        console.log("No expenses recorded.");
    } else {
        console.log("\nExpense List (sorted by latest date):");
        expenses
            .sort((a, b) => b.date - a.date)
            .forEach((expense, index) => {
                console.log(`${index + 1}. ${expense.type} - ₹${expense.amount} on ${expense.date.toISOString().split('T')[0]}`);
            });

        // Show total expense
        const totalAmount = expenses.reduce((sum, exp) => sum + exp.amount, 0);
        console.log(`\nTotal Expense: ₹${totalAmount}\n`);
    }
    showMenu();
}

function showTotalExpense() {
    rl.question("Enter the month and year (YYYY-MM): ", (input) => {
        if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(input)) {
            console.log("Invalid format. Please use YYYY-MM.");
            showMenu();
            return;
        }

        const [year, month] = input.split('-').map(Number);
        const total = expenses
            .filter(exp => exp.date.getFullYear() === year && (exp.date.getMonth() + 1) === month)
            .reduce((sum, exp) => sum + exp.amount, 0);

        console.log(`Total Expense for ${input}: ₹${total}`);
        showMenu();
    });
}

function isValidDate(dateString) {
    const date = new Date(dateString);
    return !isNaN(date.getTime()) && dateString === date.toISOString().split('T')[0];
}

// Start the program
showMenu();
