const balance = document.getElementById("balance");

const incomeTotal = document.getElementById("income-total");

const expensesTotal = document.getElementById("expenses-total");

const incomeTableBody = document
  .getElementById("income-table")
  .getElementsByTagName("tbody")[0];

const expensesTableBody = document
  .getElementById("expenses-table")
  .getElementsByTagName("tbody")[0];

const form = document.getElementById("transaction-form");

const typeInput = document.getElementById("type");

const textInput = document.getElementById("text");

const amountInput = document.getElementById("amount");

let transactions = [];

function init() {
  incomeTableBody.innerHTML = "";

  expensesTableBody.innerHTML = "";

  transactions.forEach(addTransactionToDOM);

  updateTotals();
}

function addTransactionToDOM(transaction) {
  const row = document.createElement("tr");

  row.innerHTML = `<td>${
    transaction.text
  }</td><td>$${transaction.amount.toFixed(2)}</td>`;

  if (transaction.type === "income") {
    incomeTableBody.appendChild(row);
  } else {
    expensesTableBody.appendChild(row);
  }
}

function updateTotals() {
  const totalIncome = transactions
    .filter((transaction) => transaction.type === "income")

    .reduce((acc, transaction) => (acc += transaction.amount), 0)

    .toFixed(2);

  const totalExpenses = transactions
    .filter((transaction) => transaction.type === "expense")

    .reduce((acc, transaction) => (acc += transaction.amount), 0)

    .toFixed(2);

  const totalBalance = (totalIncome - totalExpenses).toFixed(2);

  balance.innerText = totalBalance;

  incomeTotal.innerText = totalIncome;

  expensesTotal.innerText = totalExpenses;
}

function addTransaction(e) {
  e.preventDefault();

  const transaction = {
    id: generateID(),

    type: typeInput.value,

    text: textInput.value,

    amount: +amountInput.value
  };

  transactions.push(transaction);

  addTransactionToDOM(transaction);

  updateTotals();

  textInput.value = "";

  amountInput.value = "";
}

function generateID() {
  return Math.floor(Math.random() * 100000000);
}

function removeTransaction(id) {
  transactions = transactions.filter((transaction) => transaction.id !== id);

  init();
}

form.addEventListener("submit", addTransaction);

init();
