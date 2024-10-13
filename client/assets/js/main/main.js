import { onload } from "./onload.js"
import { logoutDisplay } from "./logoutDisplay.js";
import { logout } from "./logout.js";
import { myNavBar } from "./myNavBar.js";
import { updateUser } from "./updateUser.js";
import { myMenuFeaturesDisplay, upload } from "./myMenuFeatures.js";
import { deleteApp } from "./deleteApp.js";

document.addEventListener('DOMContentLoaded', function() {
    onload();
    logout();
    updateUser();
    logoutDisplay();
    myNavBar();
    myMenuFeaturesDisplay();
    upload();
    deleteApp();
})



/*
     
*/
