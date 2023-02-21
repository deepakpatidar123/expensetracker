function addNewExpense(e){
    e.preventDefault();

    const expenseDetails = {
        expenseamount: e.target.expenseamount.value,
        category: e.target.category.value,
        description: e.target.description.value,
        userId:1
    }
    console.log(expenseDetails)
    axios.post('http://localhost:3000/expense/addexpense',expenseDetails)
    .then((response) => {

        if(response.status === 201){
            addNewExpensetoUI(response.data.expenseDetails);
        }else{
            throw new Error('Failed To create new expense');
        }

    }).catch(err => console.log(err))
}
window.addEventListener('DOMContentLoaded', ()=> {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:3000/expense/getexpenses', { headers: {"Authorization":token}})
    
    .then(response =>{
        response.data.expenses.forEach(expense=> {
          addNewExpensetoUI(expense) 
          console.log(expense) 
        }) 
          
     })
     .catch(err => console.log(err));
})
function addNewExpensetoUI(expense){
    const parentElement = document.getElementById('listOfExpenses');
    const expenseElementId = `expense-${expense.id}`;
    parentElement.innerHTML +=`
    <li id=${expenseElementId}>
    ${expense.expenseamount} - ${expense.category} - ${expense.description}
    <button onclick='deleteExpense(event, ${expense.id})'>
        Delete Expense
    </button></li>`
}

function deleteExpense(e, expenseid){
    const token = localStorage.getItem('token')
    axios.delete(`http://localhost:3000/expense/deleteexpense/${expenseid}`).then((response)=> {

         removeExpensefromUI(expenseid);

    }).catch((err => {
        showError(err);
    }))
}
// function showError(err){
//    console.log(err)
// }

function removeExpensefromUI(expenseid){
    const expenseElemId = `expense-${expenseid}`;
    document.getElementById(expenseElemId).remove()
}