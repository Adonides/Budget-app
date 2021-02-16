
/*NAVBAR==========================================*/
function toggleBtn(){
    const navbarList = document.getElementsByClassName('navbar-list')[0]
    navbarList.classList.toggle('active')
}
  
/*MODAL==========================================*/
const Modal = {
    open() {
        document.querySelector('.modal-overlay')
        .classList.add('active-modal')

    },
    close() {
        document.querySelector('.modal-overlay')
        .classList.remove('active-modal')
    }
}

/*Display==========================================*/
const Transaction = {
    incomes() { //somar as entradas

    },
    expenses() { //somar as saídas

    },
    total() { //entradas - saídas

    },
    updateBalance() { //Dispalay Balanço atual

    }
}

/*MONTH LIST==========================================*/
const MonthList = {
    Months: [],
    monthListContainer: document.querySelector('#month-list'),
    addList(listOfMonths) { 
            const ul = document.createElement('ul')
            ul.classList.add("all-months")
            ul.innerHTML = this.elementHTML(listOfMonths)

            this.setMonthForm(listOfMonths)
            this.monthListContainer.appendChild(ul)
        
    },
    elementHTML(listOfMonths) {

        let listHTML = "" 
        listOfMonths.map((month) => {
            listHTML += `
            <li class="month" id="${month}" onclick="MonthList.setActiveMonth('${month}')">${month}</li>
            `
        }) 
        return listHTML
    },
    setActiveMonth(month) {
        const activeMonth = document.getElementById(month)  
        activeMonth.classList.add("active-month")

        const months = [...MonthList.Months]
        const index = months.indexOf(month)
        months.splice(index, 1)

        MonthList.desactiveMonths(months)
    },
    desactiveMonths(months) {
        months.forEach((month) => {
            const elements = document.getElementById(month) 
            elements.classList.remove('active-month')
        })
    },
    setMonthForm(listOfMonths) {
        const newMonthForm = document.querySelector('#month-form')
        newMonthForm.addEventListener('submit', e => {
            e.preventDefault()
            const newMonthInput = document.querySelector('#month-input')

            const monthForm = newMonthInput.value
            if (monthForm === null || monthForm === "") return
            const newMonth = this.createMonth(monthForm)
            
            newMonth.transactions.forEach(transaction => {
                Table.addTransaction(transaction)
            })

            newMonthInput.value = null
            listOfMonths.push(newMonth.month)
            this.addList(listOfMonths)

            Transaction.incomes(newMonth.transactions)
            Transaction.expenses(newMonth.transactions)

            BudgetApp.reload()
        })
    },
    createMonth(month) {
        return {month, 
                    transactions: [{
            id: 1,
            description: 'Luz',
            amount: -50000,
            date: '09/02/2021'
        },{
            id: 2,
            description: 'website',
            amount: 500000,
            date: '09/02/2021'
        },{
            id: 3,
            description: 'Net',
            amount: -20000,
            date: '09/02/2021'
        }]
        }
    },
    clearMonthList(){
        this.monthListContainer.innerHTML = ""
    }
}
/*TRANSACTIONS==========================================*/
const Table = {
    transactionsContainer: document.querySelector('#data-table tbody'),
    addTransaction(transactions, index) {

        const tr = document.createElement('tr')
        tr.innerHTML = this.innerHTMLTransaction(transactions)
        

        this.transactionsContainer.appendChild(tr)

    },

    innerHTMLTransaction(transactions) {
        
        const addClass = transactions.amount > 0 ? "income" : "expense"

        const amount = Formatation.formatCurrency(transactions.amount)
        

        const transactionHTML =  `
            
            <td class="description">${transactions.description}</td> 
            <td class="${addClass}">${amount}</td>
            <td class="date">${transactions.date}</td>
            <td><img src="./Images/minus.svg" alt="delete transaction"></td>
            
        `
        return transactionHTML
    }
}

const Formatation = {
    formatCurrency(value) {
        const sign = Number(value) < 0 ? "-" : ""

        value = String(value).replace(/\D/g, "")

        value = Number(value) / 100

        value = value.toLocaleString("pt-PT", {
            style: "currency",
            currency: "EUR"
        })
        return sign + value
    }
}

const BudgetApp = {
    init() {
        MonthList.addList(MonthList.Months)

        Transaction.updateBalance()
    },
    reload() {
        MonthList.clearMonthList()

        this.init()
    }
}



BudgetApp.init()
