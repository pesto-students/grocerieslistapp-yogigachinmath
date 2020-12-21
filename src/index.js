
import {
    storeData,
    createNewUser,
    fetchData,
    currentUser
} from './util/db' ;

import {
    displayItems,
    noOfItemsRemaining
} from './groceries'



function handleLoginSubmit(event) {

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


function logout() {
    currentUser = "";
    document.querySelector('.loginForm').style.display = 'inline';
    document.querySelector('.groceryList').style.display = 'none';
}


window.handleLoginSubmit = handleLoginSubmit;
window.logout = logout;
window.removeUsers = removeUsers;
