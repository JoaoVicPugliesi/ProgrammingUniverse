import { fetchUser } from "./fetchUser.js";
import { fetchUserApps } from "./fetchUserApps.js";

export function onload() {

    const myFlashMessage = document.getElementById('myFlashMessage');
    const myFlashMessageAnimation = document.getElementById('myFlashMessageAnimation');
    const myTypeOfFlashMessage = document.getElementById('myTypeOfFlashMessage');
    const myFlashMessageContent = document.getElementById('myFlashMessageContent');
    const myFlashMessageBtn = document.getElementById('myFlashMessageBtn');
    const myFlashMessageOverlay = document.getElementById('myFlashMessageOverlay');
    const userIdMain = document.getElementById('userIdMain');
    const myLoadOverlay = document.getElementById('myLoadOverlay');
    const myLoad = document.getElementById('myLoad');
    const myBody = document.getElementById('myBody');

    window.addEventListener ('load', function() {
        
        setTimeout(() => {
            myBody.classList.add('display');
        }, 20)
        setTimeout(() => {
            myLoadOverlay.classList.add('display');
            myLoad.classList.add('display');
            setTimeout(() => {
                myLoadOverlay.classList.remove('display');
                myLoad.classList.remove('display');
            }, 2000)
        })
        const fetchedUserId = localStorage.getItem('user_id');
        userIdMain.value = fetchedUserId;
        fetchUser();
        fetchUserApps();
        if(localStorage.getItem('display')) {
        setTimeout(() => {
        myFlashMessageOverlay.style.display = 'block';
        myFlashMessage.classList.add('show', 'success');
        myFlashMessageAnimation.src = '/client/assets/images/animations/success.gif';
        myTypeOfFlashMessage.textContent = "Success";
        myFlashMessageContent.textContent = `Welcome` + " " + localStorage.getItem('username');
        myFlashMessageBtn.textContent = 'Continue';
        }, 2000);
        myFlashMessageBtn.addEventListener('click', function(e) {
            e.preventDefault();
            setTimeout(() => {
                myFlashMessage.classList.add('fade-out');
                setTimeout(() => {
                    myFlashMessage.classList.remove('show', 'fade-out');
                    myFlashMessage.className = 'myFlashMessage';
                    myFlashMessageOverlay.style.display = 'none';
                }, 200);
            });
        });
        localStorage.removeItem('display');
        localStorage.removeItem('username');
        } 
    });
}
