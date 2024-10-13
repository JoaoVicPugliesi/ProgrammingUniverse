export function setupLogin() {
    const myFlashMessage = document.getElementById('myFlashMessage');
    const myFlashMessageAnimation = document.getElementById('myFlashMessageAnimation');
    const myTypeOfFlashMessage = document.getElementById('myTypeOfFlashMessage');
    const myFlashMessageContent = document.getElementById('myFlashMessageContent');
    const myFlashMessageBtn = document.getElementById('myFlashMessageBtn');
    const myFlashMessageOverlay = document.getElementById('myFlashMessageOverlay');
    const myLoginFormOverlay = document.getElementById('myLoginFormOverlay');
    const myLoginDiv = document.getElementById('myLoginDiv');
    const myCancelBtn2 = document.getElementById('myCancelBtn2');
    const myBubbleLogin = document.getElementById('myBubbleLogin');
    const myLoginEmail = document.getElementById('myLoginEmail');
    const myLoginPassword = document.getElementById('myLoginPassword');

    document.getElementById('userContainer').addEventListener('click', function(e) {
        const enterButton = e.target.closest('.myEnterButton');
        if (enterButton) {
            e.preventDefault();
            myLoginFormOverlay.classList.add('Display');
            myLoginDiv.classList.add('Display');

            const enterButton = e.target.closest('.myEnterButton');

            const userId = enterButton.getAttribute('data-user-id');
            document.getElementById('myLoginUserId').value = userId;

            const userIcon = enterButton.getAttribute('data-user-icon');
            myBubbleLogin.style.backgroundImage = `url(${userIcon})`
        }

        myCancelBtn2.addEventListener('click', function(e) {
            e.preventDefault();
            myLoginEmail.value = null;
            myLoginPassword.value = null;
            myLoginFormOverlay.classList.remove('Display');
            myLoginDiv.classList.remove('Display');
        });
    });

    const myLoginForm = document.getElementById('myLoginForm');
    myLoginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const prePayLoad = new FormData(myLoginForm);
        const payLoad = new URLSearchParams(prePayLoad);

        fetch('http://localhost/WindowsUniverse/server/controllers/userControllers/loginController.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: payLoad,
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                myLoginEmail.value = null;
                myLoginPassword.value = null;
                localStorage.setItem('username', data.user.username);
                localStorage.setItem('display', true);
                localStorage.setItem('user_id', data.user.user_id);
                window.location.replace('main.html');
            } else {
                myFlashMessageAnimation.src = '/client/assets/images/animations/error.gif';
                myTypeOfFlashMessage.textContent = "Error";
                myFlashMessageContent.textContent = `${data.error}`;
                myFlashMessage.className = 'myFlashMessage error show';
                myFlashMessageOverlay.style.display = 'block';
                myFlashMessageBtn.textContent = 'Try Again';
        
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
            }
        })
        .catch(error => console.log(['Error', error]));
    });

    myLoginForm.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            myLoginForm.dispatchEvent(new Event('submit'));
        }
    });
}
