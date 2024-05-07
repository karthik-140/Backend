const form = document.getElementById('my-form');
form.addEventListener('submit', onsubmit);
function onsubmit(e) {
    e.preventDefault();
    const amount = e.target.money.value;
    const description = e.target.description.value;
    const category = e.target.category.value;
    const obj = {
        amount, description, category
    }
    // localStorage.setItem(obj.description, JSON.stringify(obj));
    axios.post("http://localhost:3000/add-expense", obj)
        .then((response) => {
            showOnScreen(response.data.expenses);
            // console.log(response)
        })
        .catch(err => {
            console.log(err);
        })
}

window.addEventListener('DOMContentLoaded', async () => {
    // const localStorageObj = localStorage;
    // const localStoragekeys = Object.keys(localStorageObj);

    const response = await axios.get("http://localhost:3000/expenses")

    response?.data.map((expense) => {
        showOnScreen(expense)
    })
    // for (var i = 0; i < localStoragekeys.length; i++) {
    //     const key = localStoragekeys[i];
    //     const ExpensesString = localStorageObj[key];
    //     const ExpensesObj = JSON.parse(ExpensesString);
    //     showOnScreen(ExpensesObj);
    // }
})

function showOnScreen(expense) {
    document.getElementById('money').value = '';
    document.getElementById('description').value = '';
    document.getElementById('category').value = '';
    const parentNode = document.getElementById('list');
    const childNode = `<li id=${expense.id} style="margin-bottom:10px;">${expense.amount} - ${expense.description} - ${expense.category}
                    <button onclick=deleteExpenses('${expense.id}') style="float:right;">Delete</button>
                    <button onclick=editExpenses('${expense.id}','${expense.amount}','${expense.description}','${expense.category}') style="float:right; margin-right:5px;">Edit</button>
                    </li>`
    parentNode.innerHTML = parentNode.innerHTML + childNode;
}

async function editExpenses(id, amount, description, category) {
    document.getElementById('money').value = amount;
    document.getElementById('description').value = description;
    document.getElementById('category').value = category;
    // await axios.put(`http://localhost:3000/edit-expense/${id}`, {
    //     amount: amount,
    //     description: description,
    //     category: category
    // })
    deleteExpenses(id);
    removeFromScreen(id);
}

async function deleteExpenses(id) {
    console.log(id)
    await axios.delete(`http://localhost:3000/delete-expense/${id}`)

    // localStorage.removeItem(expense);
    removeFromScreen(id);
}

function removeFromScreen(id) {
    const parentNode = document.getElementById('list');
    const childNode = document.getElementById(id);
    parentNode.removeChild(childNode);
}