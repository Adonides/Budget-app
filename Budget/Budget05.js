
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

    }
}

/*MONTH LIST==========================================*/
const listOfMonths = ["April", "May", "June", "July"]

const getMonthList = {

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
            <li class="month" id="${month}" onclick="getMonthList.setActiveMonth('${month}')">${month}</li>
            `
        }) 
        return listHTML
    },
    setActiveMonth(month) {
        const activeMonth = document.getElementById(month)  
        activeMonth.classList.add("active-month")

        const months = [...listOfMonths]
        const index = months.indexOf(month)
        months.splice(index, 1)

        getMonthList.desactiveMonths(months)
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
            newMonthInput.value = null
            listOfMonths.push(newMonth)
            this.addList(listOfMonths)
        })
    },
    createMonth(monthForm) {
        return [monthForm, 
                    transactions = [{
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
    ]
    }
}

getMonthList.addList(listOfMonths)

/*TRANSACTIONS==========================================*/
const DOM = {
    addTransaction(monthTransaction, index) {
        console.log( monthTransaction)
        const transaction = monthTransaction.indexOf([1])
        console.log( transaction)
        const tr = document.createElement('tr')
        tr.innerHTML = this.innerHTMLTransaction()
    },

    innerHTMLTransaction() {

        const transactionHTML =  `
            
                <td class="description">Luz</td> 
                <td class="expense">- R$ 500,00</td>
                <td class="date">23/01/2021</td>
                <td><img src="../logo-32x32.png" alt="delete transaction"></td>
            
        `
        return transactionHTML
    }
}


DOM.addTransaction(listOfMonths)