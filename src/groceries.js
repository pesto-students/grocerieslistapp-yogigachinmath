import {
    storeData,
    fetchData,
    currentUser
} from './util/db'

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
    let itemsData = '';
    items.forEach((item,index) => {
        itemsData += `<div class = "itemContainer"> 
                        <div class = "itemName">
                        <h2>
                       <span class = "hiddenSpan"><input type = "text"  onchange = "editItem(event)" data-index = "${index}" class = "hiddeninput ${index}" value = ${item} ></span>
                        </h2>
                        </div>
                        <div>
                            <button type="submit" onclick = "deleteItem(event)" data-index = "${index}" class="btn btn-primary ${index}">Delete Item</button>
                        </div>                    
                     </div>`
    })
    document.querySelector('.displayItems').innerHTML = itemsData;
}

function editItem(event) {
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

function deleteItem(event) {
    let index = event.target.dataset.index;
    let userData = fetchData();
    userData[currentUser].splice(index,1);
    storeData(userData);
    displayItems();
    noOfItemsRemaining();
}

function noOfItemsRemaining() {
    let userData = fetchData();
    let noOfItems = userData[currentUser].length;
    document.querySelector('.remainingItems').innerHTML = 5 - noOfItems + " Items can be Added  ";
}

window.addItem = addItem;
window.deleteItem = deleteItem;
window.editItem = editItem;


export {
    addItem,
    displayItems,
    editItem,
    deleteItem,
    noOfItemsRemaining
}