const transactionsUl = document.querySelector('#transactions')

//FORMULÁRIO E AFINS
const form = document.querySelector('#form')
const textInput = document.querySelector('#text')
const amountInput = document.querySelector('#amount')
//DESPESAS
const expenseDisplay = document.querySelector('#money-minus')
//RECEITAS
const incomeDisplay = document.querySelector('#money-plus')
//TOTAL
const balanceDisplay = document.querySelector('#balance')


const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'))
let transactions = localStorage
    .getItem('transactions') !== null ? localStorageTransactions : []

const removeTransaction = ID => {
    transactions = transactions.filter(transaction => transaction.id !== ID)
    updateLocalStorage()
    init()
}

const addTransaction = transaction => {

    const operator = transaction.amount < 0 ? '-' : '+'
    const CSSclass = transaction.amount < 0 ? 'minus' : 'plus'
    const amountWithoutOperator = Math.abs(transaction.amount)
    const li = document.createElement('li')

    li.classList.add(CSSclass)
    li.innerHTML = `
    ${transaction.name} 
    <span>${operator} R$ ${amountWithoutOperator}</span>
    <button class="delete-btn" onClick="removeTransaction(${transaction.id})">
    x
    </button>
    `
    transactionsUl.appendChild(li)
}

const updateBalanceValues = () => {
    const transactionAmount = transactions.map(item => item.amount)
    const income = transactionAmount
        .filter(item => item > 0)
        .reduce((acc, item) => acc + item, 0)
        .toFixed(2);
    const expense = Math.abs(transactionAmount
        .filter(item => item < 0)
        .reduce((acc, item) => acc + item, 0))
        .toFixed(2)
    const total = transactionAmount
        .reduce((acc, transaction) => acc + transaction, 0)
        .toFixed(2);

    incomeDisplay.textContent = `R$ ${income}` //DESPESAS
    expenseDisplay.textContent = `R$ ${expense}` //RECEITAS
    balanceDisplay.textContent = `R$ ${total}` //TOTAL
}

const init = () => {
    transactionsUl.innerHTML = ''
    transactions.forEach(element => {
        addTransaction(element)
    });
    updateBalanceValues();
}

init();

const updateLocalStorage = () => {
    localStorage.setItem('transactions', JSON.stringify(transactions))
}

const genereteID = () => Math.round(Math.random() * 1000)

form.addEventListener('submit', event => {
    event.preventDefault()
    const transactionName = textInput.value.trim()
    const transactionAmount = amountInput.value.trim()

    if (transactionName === '' || transactionAmount === '') {
        alert('Preencha os campos!')
        return
    }

    const transaction = {
        id: genereteID(),
        name: transactionName,
        amount: +transactionAmount
    }

    transactions.push(transaction)
    console.log(transaction)
    console.log(transactions)
    init()
    updateLocalStorage()

    transactionName.value = ''
    transactionAmount.value = ''
})