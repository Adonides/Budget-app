
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
const transactions = [{
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
    }
}

getMonthList.addList(listOfMonths)
