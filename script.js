
// ==========================================
// 1. APPLICATION VARIABLES
// ==========================================

const appName = "SpendWise";
const currency = "KES";

let monthlyBudget = 0;

// Array containing multiple expense records
let expenses = [
    {
        id: 1,
        name: "Lunch",
        category: "Food",
        amount: 1200
    },
    {
        id: 2,
        name: "Transport Fare",
        category: "Transport",
        amount: 500
    },
    {
        id: 3,
        name: "Electricity",
        category: "Utilities",
        amount: 800
    }
];


// ==========================================
// 2. SELECT HTML ELEMENTS
// ==========================================

const budgetForm = document.getElementById("budget-form");
const budgetInput = document.getElementById("budget-input");

const expenseForm = document.getElementById("expense-form");
const expenseName = document.getElementById("expense-name");
const expenseCategory = document.getElementById("expense-category");
const expenseAmount = document.getElementById("expense-amount");

const balanceDisplay = document.getElementById("balance");
const budgetDisplay = document.getElementById("budget");
const totalExpensesDisplay = document.getElementById("total-expenses");

const expenseCount = document.getElementById("expense-count");
const balanceStatus = document.getElementById("balance-status");

const expenseList = document.getElementById("expense-list");
const budgetFeedback = document.getElementById("budget-feedback");


// ==========================================
// 3. CALCULATE TOTAL EXPENSES USING A LOOP
// ==========================================

function calculateTotalExpenses() {

    let total = 0;

    // Loop through all expense records
    for (let i = 0; i < expenses.length; i++) {

        total += expenses[i].amount;

    }

    return total;
}


// ==========================================
// 4. CALCULATE REMAINING BALANCE
// ==========================================

function calculateBalance() {

    const total = calculateTotalExpenses();

    return monthlyBudget - total;
}


// ==========================================
// 5. DETERMINE BUDGET STATUS
// ==========================================

function checkBudgetStatus() {

    const balance = calculateBalance();
    const total = calculateTotalExpenses();

    // Conditional statements

    if (monthlyBudget <= 0) {

        return "Please set your monthly budget.";

    } else if (balance < 0) {

        return "Warning: You have exceeded your budget!";

    } else if (balance === 0) {

        return "You have used your entire budget.";

    } else if (total >= monthlyBudget * 0.8) {

        return "Warning: You have used 80% or more of your budget.";

    } else {

        return "You are within your budget. Keep it up!";

    }
}


// ==========================================
// 6. UPDATE DASHBOARD
// ==========================================

function updateDashboard() {

    const total = calculateTotalExpenses();
    const balance = calculateBalance();

    // Update financial figures

    budgetDisplay.textContent =
        currency + " " + monthlyBudget.toLocaleString();

    totalExpensesDisplay.textContent =
        currency + " " + total.toLocaleString();

    balanceDisplay.textContent =
        currency + " " + balance.toLocaleString();

    expenseCount.textContent =
        expenses.length + " transactions";

    // Update budget status

    const status = checkBudgetStatus();

    balanceStatus.textContent = status;
    budgetFeedback.textContent = status;

    // Change status styling based on budget

    if (monthlyBudget <= 0 || balance < 0) {

        budgetFeedback.className = "budget-feedback danger";

    } else if (total >= monthlyBudget * 0.8) {

        budgetFeedback.className = "budget-feedback warning";

    } else {

        budgetFeedback.className = "budget-feedback success";

    }

    // Display updated expense records
    displayExpenses();
}


// ==========================================
// 7. DISPLAY EXPENSES USING A LOOP
// ==========================================

function displayExpenses() {

    // Clear previous records
    expenseList.innerHTML = "";

    // Check whether the array is empty
    if (expenses.length === 0) {

        expenseList.textContent = "No expenses recorded yet.";

        return;

    }

    // Create a container for expense records
    const recordsContainer = document.createElement("div");

    recordsContainer.className = "expense-records";

    // Loop through expense array
    for (let i = 0; i < expenses.length; i++) {

        const expense = expenses[i];

        // Create HTML elements
        const row = document.createElement("div");
        row.className = "transaction-row";

        const details = document.createElement("div");
        details.className = "expense-details";

        const name = document.createElement("h4");
        name.textContent = expense.name;

        const category = document.createElement("small");
        category.textContent = expense.category;

        const amount = document.createElement("strong");
        amount.textContent =
            "- " + currency + " " + expense.amount.toLocaleString();

        // Add elements to the page
        details.append(name, category);
        row.append(details, amount);

        recordsContainer.appendChild(row);

    }

    expenseList.appendChild(recordsContainer);
}


// ==========================================
// 8. SET MONTHLY BUDGET
// ==========================================

budgetForm.addEventListener("submit", function(event) {

    // Prevent page refresh
    event.preventDefault();

    const enteredBudget = Number(budgetInput.value);

    // Validate budget
    if (!Number.isFinite(enteredBudget) || enteredBudget <= 0) {

        alert("Please enter a valid monthly budget.");

        return;

    }

    // Store the budget
    monthlyBudget = enteredBudget;

    // Update dashboard
    updateDashboard();

    // Reset form
    budgetForm.reset();

    console.log("Monthly budget updated:", monthlyBudget);

});


// ==========================================
// 9. ADD NEW EXPENSE
// ==========================================

expenseForm.addEventListener("submit", function(event) {

    event.preventDefault();

    // Collect user input
    const name = expenseName.value.trim();
    const category = expenseCategory.value;
    const amount = Number(expenseAmount.value);

    // Validate expense information
    if (
        !name ||
        !category ||
        !Number.isFinite(amount) ||
        amount <= 0
    ) {

        alert("Please enter valid expense information.");

        return;

    }

    // Create a new expense object
    const newExpense = {

        id: Date.now(),
        name: name,
        category: category,
        amount: amount

    };

    // Store expense inside the array
    expenses.push(newExpense);

    // Update dashboard
    updateDashboard();

    // Clear form
    expenseForm.reset();

    console.log("New expense added:", newExpense);

});


// ==========================================
// 10. INITIALIZE APPLICATION
// ==========================================

function initializeApp() {

    console.log(appName + " application loaded successfully.");

    updateDashboard();

    console.log("Initial expense records:", expenses);

}

// Start application
initializeApp();
