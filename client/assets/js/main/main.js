import { onload } from "./onload.js"
import { logoutDisplay } from "./logoutDisplay.js";
import { logout } from "./logout.js";
import { myNavBar } from "./myNavBar.js";
import { updateUser } from "./updateUser.js";
import { myMenuFeaturesDisplay, upload } from "./myMenuFeatures.js";
import { deleteApp } from "./deleteApp.js";
import { usersMedal } from "./usersMedal.js";
import { usersResults } from "./fetchUsersResults.js";
import { friendsResults } from "./fetchFriendsResults.js";
import { usersAppsStars } from "./fetchUsersAppsStars.js";
import { timeResults } from "./fetchTimeResults.js";
import { friendRequest } from "./friendRequests/friendRequest.js";
import { searchUsersResults } from "./searchUsersResult.js";
import { notifications } from "./friendRequests/notifications.js";
import { accept } from "./friendRequests/accept.js";
import { decline } from "./friendRequests/decline.js";
import { check } from "./friendRequests/check.js";
import { none } from "./friendRequests/none.js";
import { newApp } from "./appsJs/newApp.js";
import { myTinyFeatures } from "./weather/myTinyFeatures.js";
import { seeProfile } from "./seeProfile.js";
import { removeFriend } from "./friendRequests/removeFriend.js";
import { shortcuts } from "./shortcuts.js";
import { updateStar } from "./appsJs/updateStar.js";
import { searchApps } from "./appsJs/searchApps.js";
import { chat } from "./messages/chat.js";
import { sendIndividualMessage } from "./messages/sendIndividualMessage.js";
import { myConfig } from "./myConfig.js";

document.addEventListener('DOMContentLoaded', function() {
    onload();
    const myLogoutForm = document.getElementById('myLogoutForm');
    myLogoutForm.addEventListener('submit', function(e) {
        e.preventDefault();
        logout();
    });

    const logoutBtn = document.getElementById('logoutBtn');
    logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        logout();
    })

    updateUser();
    logoutDisplay();
    myNavBar();
    myMenuFeaturesDisplay();
    myTinyFeatures();
    newApp();
    upload();
    deleteApp();
    usersMedal();
    usersResults();
    friendsResults();
    timeResults();
    usersAppsStars();
    friendRequest();
    searchUsersResults();
    notifications();
    accept();
    decline();
    check();
    none();
    seeProfile();
    removeFriend();
    shortcuts();
    updateStar();
    myConfig();
    searchApps();
    chat();
    sendIndividualMessage();
})



/*
     
*/
