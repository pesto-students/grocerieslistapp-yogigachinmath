let currentUser = '';

function handleSubmit(event) {
    event.preventDefault();
    let username = event.target[0].value;
    let userData = fetchData(username);
    currentUser = username;
    
    createNewUser(username);
    noOfItemsRemaining();
    removeUsers(userData); // to remove the users if greater then 3.
    displayItems();

    document.querySelector('.loginForm').style.display = 'none';
    document.querySelector('.groceryList').style.display = 'inline';
    
}

function removeUsers(userData) {
    let users = Object.keys(userData);
    if(users.length > 3) {
        for(let i of users) {
            if(i > 3) {
                userData[i] = [];
            }
        }
    }
}

function addItem(event) {
    event.preventDefault();
    let userData = fetchData();
    if(userData[currentUser].length < 5) {
        userData[currentUser].push(event.target[0].value);
        storeData(userData);
        displayItems();
        noOfItemsRemaining();
        document.getElementById("addItemForm").reset();
    } else {
        alert('Only five items can be added');
    }
}

function displayItems() {
    let userData = fetchData();
    let items = userData[currentUser];
    itemsData = '';
    // <button type="submit" onclick = "editItem(event)" class="btn btn-primary ${index}">Edit Item</button>
    items.forEach((item,index) => {
        itemsData += `<div class = "itemContainer"> 
                        <div class = "itemName">
                        <h2>
                       <span class = "hiddenSpan"><input type = "text"  onchange = "handleChange(event)" data-index = "${index}" class = "hiddeninput ${index}" value = ${item} ></span>
                        </h2>
                        </div>
                        <div>
                            <button type="submit" onclick = "deleteItem(event)" data-index = "${index}" class="btn btn-primary ${index}">Delete Item</button>
                        </div>                    
                     </div>`
    })
    document.querySelector('.displayItems').innerHTML = itemsData;
}

function handleChange(event) {
    let index = event.target.dataset.index;
    let userData = fetchData();
    let val = event.target.value;
    console.log(val);
    if(val.trim().length > 0 ) {
        userData[currentUser][index] = event.target.value;
        storeData(userData);
        displayItems();
    } else {
        deleteItem(event);
    }
}
function editItem(event) {
    
}
function deleteItem(event) {
    let index = event.target.dataset.index;
    let userData = fetchData();
    userData[currentUser].splice(index,1);
    storeData(userData);
    displayItems();
    noOfItemsRemaining();
}

function fetchData() {
   let userData;
    try{
        userData = JSON.parse(localStorage.getItem('userData'));
   } catch(error) {
        userData = new Object();
       localStorage.setItem('userData', JSON.stringify(userData));
   }
   return userData;
}

function createNewUser(username) {
    try{
        userData = JSON.parse(localStorage.getItem('userData'));
        if(!userData[username]) {
            userData[username] = [];
        }
   } catch(error) {
    userData[username] = [];
   }
}

function noOfItemsRemaining() {
    let userData = fetchData();
    let noOfItems = userData[currentUser].length;
    document.querySelector('.remainingItems').innerHTML = 5 - noOfItems + " Items can be Added  ";
}

function storeData(userData) {
    localStorage.setItem('userData', JSON.stringify(userData));
}