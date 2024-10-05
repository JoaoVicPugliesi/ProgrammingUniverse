export function handleFlashMessage() {
    const myFlashMessage = document.getElementById('myFlashMessage');
    const myFlashMessageAnimation = document.getElementById('myFlashMessageAnimation');
    const myTypeOfFlashMessage = document.getElementById('myTypeOfFlashMessage');
    const myFlashMessageContent = document.getElementById('myFlashMessageContent');
    const myFlashMessageBtn = document.getElementById('myFlashMessageBtn');
    const myFlashMessageOverlay = document.getElementById('myFlashMessageOverlay');

    if (localStorage.getItem('success') && localStorage.getItem('display')) {
        myFlashMessageAnimation.src = '/client/assets/images/animations/success.gif';
        myTypeOfFlashMessage.textContent = "Success";
        myFlashMessageContent.textContent = localStorage.getItem('success');
        myFlashMessage.className = localStorage.getItem('display');
        myFlashMessageOverlay.style.display = 'block';
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

        localStorage.removeItem('success');
        localStorage.removeItem('display');
    }
}