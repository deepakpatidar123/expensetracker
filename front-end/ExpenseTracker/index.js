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
function showPremiumuserMessage(){
    document.getElementById('rzp-button1').style.visibility = "hidden"
    document.getElementById('message').innerHTML = "You are a premium user"
}
window.addEventListener('DOMContentLoaded', ()=> {
    const token = localStorage.getItem('token');
    const isadmin = localStorage.getItem('isadmin')
    if(isadmin){
       showPremiumuserMessage()    }
    axios.get('http://localhost:3000/expense/getexpenses', { headers: {"Authorization":token}})
    
    .then(response =>{
        response.data.expense.forEach(expense=> {
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
document.getElementById('rzp-button1').onclick = async function(e){
    const token = localStorage.getItem('token')
    const response = await axios.get('http://localhost:3000/purchase/premiummembership', { headers: {"Authorization" : token} });
    console.log(response);
    var options =
    {
        "key": response.data.key_id,
        "order_id": response.data.order.id,
        "handler": async function (response){
            await axios.post('http://localhost:3000/purchase/updatetransactionstatus',{
                order_id: options.order_id,
                payment_id: response.razorpay_payment_id,
            }, { headers: {"Authorization" : token} })

            console.log(res)
            alert('You are a Premium User Now')
            document.getElementById('rzp-button1').style.visibility = "hidden"
            document.getElementById('message').innerHTML = "You are a premium user"
            localStorage.setItem('isadmin', true)
        },
    };
    const rzp1 = new Razorpay(options);
    rzp1.open();
    e.preventDefault();

    rzp1.on('payment.failed', function (response){
        console.log(response)
        alert('Something went wrong')
    })
}