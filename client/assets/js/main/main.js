import { onload } from "./onload.js"
import { logoutDisplay } from "./logoutDisplay.js";
import { logout } from "./logout.js";
import { myNavBar } from "./myNavBar.js";
import { updateUser } from "./updateUser.js";

document.addEventListener('DOMContentLoaded', function() {
    onload();
    logout();
    updateUser();
    logoutDisplay();
    myNavBar();
})

/*
     <div id="myLoadOverlay" class="myLoadOverlay"></div>
     <div id="myLoad" class="myLoad">
        <img id="myLoadImage" src="/client/assets/images/programmer.png" alt="hacker">
        <h3 id="myLoadContent">Loading...</h3>
        <div class="loader"></div>
     </div>
*/
