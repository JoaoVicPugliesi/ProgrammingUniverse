export function handleFlashMessage() {
        const myFlashMessage = document.getElementById('myFlashMessage');
        const myFlashMessageAnimation = document.getElementById('myFlashMessageAnimation');
        const myTypeOfFlashMessage = document.getElementById('myTypeOfFlashMessage');
        const myFlashMessageContent = document.getElementById('myFlashMessageContent');
        const myFlashMessageBtn = document.getElementById('myFlashMessageBtn');
        const myFlashMessageOverlay = document.getElementById('myFlashMessageOverlay');
    
        if (localStorage.getItem('success')) {
            setTimeout(() => {
                myFlashMessageOverlay.style.display = 'block';
                myFlashMessage.classList.add('show', 'success');
    
                myFlashMessageAnimation.src = '/client/assets/images/animations/success.gif';
                myTypeOfFlashMessage.textContent = "Success";
                myFlashMessageContent.textContent = `Account Created`;
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
                        localStorage.removeItem('success');
                }, 200);
            });
        });
    }
}
