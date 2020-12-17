let currentUser = '';

function handleSubmit(event) {
    event.preventDefault();
    let username = event.target[0].value;
    let userData = fetchData(username);
    currentUser = username;
    
    createNewUser(username);
    noOfItemsRemaining();
    removeUsers(); // to remove the users if greater then 3.
    displayItems();

    document.querySelector('.loginForm').style.display = 'none';
    document.querySelector('.groceryList').style.display = 'inline';
}

function removeUsers() {
    let userData = fetchData(username);
    let users = Object.keys(userData);
    if(users.length > 3) {
       delete userData[users[0]];
    }
    storeData(userData);
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
    let items = userData[currentUser] || [];
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
        if(!userData) {
            userData = new Object();
            storeData(userData);
        }
    } catch(error) {
        console.error(error);
   }
   return userData;
}

function createNewUser(username) {
    try{
        userData = JSON.parse(localStorage.getItem('userData'));
        if(!userData[username]) {
            userData[username] = [];
            storeData(userData);
        }
   } catch(error) {
    userData[username] = [];
    storeData(userData);
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