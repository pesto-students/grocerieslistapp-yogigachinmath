function handleSubmit(event) {
    event.preventDefault();
    let username = event.target[0].value;
    let userData;
    try{
         userData = JSON.parse(localStorage.getItem('userData'));
         if(!userData[username]) {
             userData[username] = [];
         }
    } catch(error) {
         userData = new Object();
         userData[username] = [];
        localStorage.setItem('userData', JSON.stringify(userData));
    }
    removeUsers(userData); // to remove the users if greater then 3.
    
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