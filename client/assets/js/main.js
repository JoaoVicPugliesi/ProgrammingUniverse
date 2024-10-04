const myFlashMessage = document.getElementById('myFlashMessage');
const myFlashMessageAnimation = document.getElementById('myFlashMessageAnimation');
const myTypeOfFlashMessage = document.getElementById('myTypeOfFlashMessage');
const myFlashMessageContent = document.getElementById('myFlashMessageContent');
const myFlashMessageBtn = document.getElementById('myFlashMessageBtn');
const myFlashMessageOverlay = document.getElementById('myFlashMessageOverlay');

window.onload = function() {
    if(localStorage.getItem('user_id')) {
        localStorage.setItem('fetchedUser_id', localStorage.getItem('user_id'));
        myFlashMessageOverlay.style.display = 'block';
        myFlashMessage.classList.add('show', 'success');
        myFlashMessageAnimation.src = '/client/assets/images/animations/success.gif';
        myTypeOfFlashMessage.textContent = "Success";
        myFlashMessageContent.textContent = "Welcome";
        myFlashMessageBtn.textContent = 'Continue';

        myFlashMessageBtn.onclick = function() {
            setTimeout(() => {
                myFlashMessage.classList.add('fade-out');
                setTimeout(() => {
                    myFlashMessage.classList.remove('show', 'fade-out');
                    myFlashMessage.className = 'myFlashMessage';
                    myFlashMessageOverlay.style.display = 'none';
                }, 200);
            });
        };
        localStorage.removeItem('user_id');
    }
}