export function flashMessage() {

    const myFlashMessage = document.getElementById('myFlashMessage');
    const myFlashMessageAnimation = document.getElementById('myFlashMessageAnimation');
    const myTypeOfFlashMessage = document.getElementById('myTypeOfFlashMessage');
    const myFlashMessageContent = document.getElementById('myFlashMessageContent');
    const myFlashMessageBtn = document.getElementById('myFlashMessageBtn');
    const myFlashMessageOverlay = document.getElementById('myFlashMessageOverlay');
    const userId = document.getElementById('userId');

    

    window.addEventListener ('load', function() {
        const fetchedUserId = localStorage.getItem('user_id');
        localStorage.setItem('fetchedUser_id', fetchedUserId);
        userId.value = fetchedUserId;
        if(localStorage.getItem('display')) {
        myFlashMessageOverlay.style.display = 'block';
        myFlashMessage.classList.add('show', 'success');
        myFlashMessageAnimation.src = '/client/assets/images/animations/success.gif';
        myTypeOfFlashMessage.textContent = "Success";
        myFlashMessageContent.textContent = `Welcome` + " " + localStorage.getItem('username');
        myFlashMessageBtn.textContent = 'Continue';

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
        this.localStorage.removeItem('username');
        }
    });
}
