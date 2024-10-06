import { flashMessage } from "./flashMessage.js"
import { fetchUser } from "./fetchUser.js";
import { logoutDisplay } from "./logoutDisplay.js";
import { logout } from "./logout.js";


document.addEventListener('DOMContentLoaded', function() {
    flashMessage();
    setTimeout(() => {
            fetchUser();
    }, 20);
    logout();
    logoutDisplay();
})

