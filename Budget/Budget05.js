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

/*STORAGE==========================================*/
const MonthStorage = {
    LOCAL_STORAGE_BUDGET_05: "AA_Web_Projects_Budget_05",
    LOCAL_SELECTED_MONTH_05: "AA_Web_Projects_Selected_05",
    getList() {
        return JSON.parse(localStorage.getItem(this.LOCAL_STORAGE_BUDGET_05)) || []
    },
    getSelected() {
        return JSON.parse(localStorage.getItem(this.LOCAL_SELECTED_MONTH_05))
    },
    save() {
        localStorage.setItem(this.LOCAL_STORAGE_BUDGET_05, JSON.stringify(Transaction.all))
        localStorage.setItem(this.LOCAL_SELECTED_MONTH_05, JSON.stringify(Transaction.monthSelected))
        /*Se deseja salvar a seleção do mês*/
    },
    saveAndRender() {
        MonthStorage.save()
        BudgetApp.renderList()
    }
}



/*Display==========================================*/
const Transaction = {
    all: MonthStorage.getList(),
    monthSelected: MonthStorage.getSelected(),

    incomes() {
        const selectedMonth = Transaction.all.find(list => list.id === Transaction.monthSelected)
        
        if (Transaction.monthSelected == null) {
            return
        } else {
            let income = 0

        selectedMonth.transactions.forEach(transaction => {
            if (transaction.amount > 0) {
                income += transaction.amount
            }
        })
        return income
        }
    },
    expenses() {
        const selectedMonth = Transaction.all.find(list => list.id === Transaction.monthSelected) 
        
        if (Transaction.monthSelected == null) {
            return
        } else {
            let expense = 0

        selectedMonth.transactions.forEach(transaction => {
            if (transaction.amount < 0) {
                expense += transaction.amount
            }
        })
        return expense
        }     
    },
    total() { 
        return this.incomes() + this.expenses()
    },
    updateBalance(){
        document
            .querySelector('#incomeDisplay')
            .innerText = Formation.formatCurrency(this.incomes())
        document
            .querySelector('#expenseDisplay')
            .innerText = Formation.formatCurrency(this.expenses())
        document
            .querySelector('#totalDisplay')
            .innerText = Formation.formatCurrency(this.total())

    }

}

/*MONTH LIST==========================================*/
const MonthList = {
    listContainer: document.querySelector('#list'),
    addMonth() {
        Transaction.all.forEach(list => {
            const li = document.createElement('li')
            li.dataset.listId = list.id
            li.classList.add('month')
            li.innerText = list.month
            if (list.id === Transaction.monthSelected) {
                li.classList.add("active-month")
            }
            
            this.listContainer.appendChild(li)

            this.setSelection()
            
        })
    },
    clearElementHTML(elements) {
        while (elements.firstChild) {
            elements.removeChild(elements.firstChild)
        }
    },
    setSelection() {
        this.listContainer.addEventListener('click', e => {
            if (e.target.tagName.toLowerCase() === 'li') {
                Transaction.monthSelected = e.target.dataset.listId
                MonthStorage.saveAndRender()
            }
        })
    },
    setMonthForm() {
        const monthForm = document.querySelector('#month-form')
        monthForm.addEventListener('submit', e => {
            e.preventDefault()
            const monthInput = document.querySelector('#month-input')
            const monthName = monthInput.value
            if (monthName == null || monthName === "") return
    
            const newMonth = this.createMonth(monthName)
            monthInput.value = null
            Transaction.all.push(newMonth)
            MonthStorage.saveAndRender()

            
        })
    },
    createMonth(monthName) {
        return {id: Date.now().toString(), month: monthName, 
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
            },{
                id: 4,
                description: 'Budget App',
                amount: 200000,
                date: '21/02/2021'
            }] }
    },
    
    deleteMonth() {
        Transaction.all = Transaction.all.filter(list => list.id !== Transaction.monthSelected)
        Transaction.monthSelected = null
        MonthStorage.saveAndRender()
    }
}
    
/*TRANSACTIONS TABLE==========================================*/
const selectedMonth = Transaction.all.find(list => list.id === Transaction.monthSelected)

const TheTable = {
    transactionsContainer: document.querySelector('#data-table tbody'),
    addTable(transactions, index) {
        
        
        const tr = document.createElement('tr')
        tr.innerHTML = this.innerHTMLTransaction(transactions)
        

        this.transactionsContainer.appendChild(tr)

    },

    innerHTMLTransaction(transactions) {
        
        const addClass = transactions.amount > 0 ? "income" : "expense"

        const amount = Formation.formatCurrency(transactions.amount)
        

        const transactionHTML =  `
            
            <td class="description">${transactions.description}</td> 
            <td class="${addClass}">${amount}</td>
            <td class="date">${transactions.date}</td>
            <td><img src="./Images/minus.svg" alt="delete transaction"></td>
            
        `
        return transactionHTML
    },
    addNewTransaction(newTransaction){
        selectedMonth.transactions.push(newTransaction)

            BudgetApp.reload()
    },
    removeTransaction(index) {
        selectedMonth.transactions.splice(index, 1)

        BudgetApp.reload()
    }
}

const Formation = {
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

/*Initiation==========================================*/
const BudgetApp = {
    renderList() {
        const tableTitle = document.querySelector('#table-title')
        const tableDisplay = document.querySelector('#transfer') 
        MonthList.clearElementHTML(MonthList.listContainer)
        
        MonthList.addMonth()

        MonthList.setMonthForm()

        
        if (Transaction.monthSelected == null) {
            tableDisplay.style.display = 'none'
        } else {
            tableDisplay.style.display = ''
            tableTitle.innerText = selectedMonth.month

            MonthList.clearElementHTML(TheTable.transactionsContainer)
            selectedMonth.transactions.forEach(transaction => { 
                TheTable.addTable(transaction)
            })
            

            Transaction.updateBalance()

        }
    },
    reload() {
        

        this.renderList()
    }
}  
   
BudgetApp.renderList()

