import { flashMessage } from "./flashMessage.js"
import { fetchUser } from "./fetchUser.js";


document.addEventListener('DOMContentLoaded', function() {
    flashMessage();
    setTimeout(() => {
        if(localStorage.getItem('fetchedUser_id')) {
            fetchUser();
        }
    }, 20);
})

/* 
*/