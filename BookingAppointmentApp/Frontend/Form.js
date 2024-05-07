let form = document.getElementById('my-form');
form.addEventListener('submit', onsubmit);

function onsubmit(e) {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const obj = {
        name,
        email
    };

    axios.post("http://localhost:4000/user/add-user", obj)
        .then((response) => {
            showNewUserOnScreen(response.data.userData)
            console.log(response);
        })
        .catch((err) => {
            document.body.innerHTML += "<h4>Something went wrong</h4>"
            console.log(err)
        });

    // localStorage.setItem(obj.Email,JSON.stringify(obj));
    // showNewUserOnScreen(obj);

}
window.addEventListener("DOMContentLoaded", () => {

    axios.get("http://localhost:4000/user/get-users")
        .then((response) => {
            console.log(response)

            for (let i = 0; i < response.data.userData.length; i++) {
                showNewUserOnScreen(response.data.userData[i]);
            }
        })
        .catch((err) => {
            console.log(err)
        })


    // const localStorageObj = localStorage;
    // const localstoragekeys  = Object.keys(localStorageObj)

    // for(var i =0; i< localstoragekeys.length; i++){
    //     const key = localstoragekeys[i]
    //     const userDetailsString = localStorageObj[key];
    //     const userDetailsObj = JSON.parse(userDetailsString);
    //     showNewUserOnScreen(userDetailsObj)
    // }
})

function showNewUserOnScreen(user) {
    document.getElementById('email').value = '';
    document.getElementById('name').value = '';
    if (localStorage.getItem(user.Email !== null)) {
        removeUserFromScreen(user.Email);
    }
    const parentNode = document.getElementById('users');
    const childHTML = `<li id=${user.id}>${user.name} - ${user.email}
                  <button onclick=deleteUser('${user.id}') style="float:right; margin-left:5px;">Delete</button>
                  <button onclick=editUser('${user.name}','${user.email}','${user.id}') style="float:right;">Edit</button>
                   </li>`
    parentNode.innerHTML = parentNode.innerHTML + childHTML
}

function editUser(name, email, id) {
    document.getElementById('name').value = name;
    document.getElementById('email').value = email;
    deleteUser(id);
    // axios.put("http://localhost:4000/user/edit-user/"+id, {
    //     name: document.getElementById('name').value,
    //     email: document.getElementById('email').value
    // })
    //     .then((response) => {
    //         deleteUser(id);
    //         console.log(response);
    //     })
    //     .catch(err => console.log(err))
}
async function deleteUser(id) {
    try {
        const res = await axios.delete(`http://localhost:4000/user/delete-user/${id}`)
        console.log(res)
        removeUserFromScreen(id);
    } catch (err) {
        console.log(err);
    }
}

function removeUserFromScreen(id) {
    const parentNode = document.getElementById('users');
    const removeChildNode = document.getElementById(id);
    // console.log(removeChildNode)
    if (removeChildNode) {
        // console.log(`check`,removeChildNode)
        parentNode.removeChild(removeChildNode);
    }
}