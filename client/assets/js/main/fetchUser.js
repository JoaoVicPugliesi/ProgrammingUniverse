import { checkWeather } from "./weather/weatherApi.js";

export function fetchUser() {

    const userIdMain = document.getElementById('userIdMain');
    const userIdUpdate = document.getElementById('userIdUpdate');
    const myProfileImage = document.getElementById('myProfileImage');
    const myProfileName = document.getElementById('myProfileName');
    const myProfileBackgroundImage = document.getElementById('myEditProfileBackgroundImage');
    const myUsername = document.getElementById('myUsername');
    const myEmail = document.getElementById('myEmail');
    const myDescription = document.getElementById('myDescription');
    const myIcon = document.getElementById('myIcon');
    const userIdApp = document.getElementById('userIdApp');
    const appAuthor = document.getElementById('appAuthor');
    const myNumberOfMedals = document.getElementById('myNumberOfMedals');
    const myEditMedalDivNumbers = document.getElementById('myEditMedalDivNumbers');
    const mySelfImage = document.getElementById('mySelfImage');
    const mySelfH3 = document.getElementById('mySelfH3');
    const myNumberOfNotifications = document.getElementById('myNumberOfNotifications');
    const myNumberOfFriends = document.getElementById('myNumberOfFriends');
    const mySelfNotificationH3 = document.getElementById('mySelfNotificationH3');
    const myEditStarDivNumbers = document.getElementById('myEditStarDivNumbers');
    const myWorldPlaces = document.getElementById('myWorldPlaces');
    const myChatProfileImage = document.getElementById('myChatProfileImage');
    const myChatProfileUsername = document.getElementById('myChatProfileUsername');
    const myGroupChatConversationUserid = document.getElementById('myGroupChatConversationUserid');

    const payLoad = new URLSearchParams({userId : userIdMain.value});

    fetch('http://localhost/WindowsUniverse/server/controllers/userControllers/fetchLoggedUserController.php', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded',
        },
        body: payLoad,
    })
    .then(res => res.json())
    .then(data => {
        if(data.success) {
            localStorage.setItem('username', data.user.username);
            localStorage.setItem('email', data.user.email);
            localStorage.setItem('description', data.user.user_description);
            localStorage.setItem('user_icon', data.user.user_icon);
            localStorage.setItem('medals', data.user.medal_count);
            localStorage.setItem('friends', data.user.friends_count);
            localStorage.setItem('notifications', data.user.notifications_count);
            localStorage.setItem('stars', data.user.total_stars);
            localStorage.setItem('place', data.user.user_place)
            myProfileName.textContent = localStorage.getItem('username');
            mySelfH3.textContent = localStorage.getItem('username');
            myChatProfileUsername.textContent = localStorage.getItem('username');
            myUsername.value = localStorage.getItem('username');
            appAuthor.value = localStorage.getItem('username');
            myEmail.value = localStorage.getItem('email');
            myDescription.value = localStorage.getItem('description');
            userIdUpdate.value = localStorage.getItem('user_id');
            myGroupChatConversationUserid.value = localStorage.getItem('user_id');
            userIdApp.value = localStorage.getItem('user_id');
            myProfileImage.src = localStorage.getItem('user_icon');
            myChatProfileImage.src = localStorage.getItem('user_icon');
            mySelfImage.src = localStorage.getItem('user_icon');
            myProfileBackgroundImage.src = localStorage.getItem('user_icon');
            myIcon.value = localStorage.getItem('user_icon');
            myNumberOfMedals.textContent = localStorage.getItem('medals');
            myEditMedalDivNumbers.textContent = myNumberOfMedals.textContent;
            myNumberOfNotifications.textContent = localStorage.getItem('notifications');
            mySelfNotificationH3.textContent = localStorage.getItem('notifications');
            myNumberOfFriends.textContent = localStorage.getItem('friends');
            myEditStarDivNumbers.textContent = localStorage.getItem('stars');

            const place = localStorage.getItem('place');

            if(place != 'undefined') {
                myWorldPlaces.classList.remove('display');
            }

            checkWeather(place);
                     
        } else {    
            console.log('Error');
        }
    })
    .catch(error => console.log('Error', error));
};
