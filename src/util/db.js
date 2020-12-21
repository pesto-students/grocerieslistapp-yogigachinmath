let currentUser = '';

function storeData(userData) {
    localStorage.setItem('userData', JSON.stringify(userData));
}

function createNewUser(username) {
    try{
        let userData = JSON.parse(localStorage.getItem('userData'));
        if(!userData[username]) {
            userData[username] = [];
            storeData(userData);
        }
   } catch(error) {
       console.log(error);
    userData[username] = [];
    storeData(userData);
   }
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

export {
    storeData,
    createNewUser,
    fetchData,
    currentUser
}