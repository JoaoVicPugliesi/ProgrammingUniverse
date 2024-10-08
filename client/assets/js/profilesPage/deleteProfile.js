import { fetchUsers } from './fetchUsers.js';

export function setupDeleteProfile() {
    const myFlashMessage = document.getElementById('myFlashMessage');
    const myFlashMessageAnimation = document.getElementById('myFlashMessageAnimation');
    const myTypeOfFlashMessage = document.getElementById('myTypeOfFlashMessage');
    const myFlashMessageContent = document.getElementById('myFlashMessageContent');
    const myFlashMessageBtn = document.getElementById('myFlashMessageBtn');
    const myFlashMessageOverlay = document.getElementById('myFlashMessageOverlay');
    const myDeleteFormOverlay = document.getElementById('myDeleteFormOverlay');
    const myDeleteDiv = document.getElementById('myDeleteDiv');
    const myCancelBtn1 = document.getElementById('myCancelBtn1');

    document.getElementById('userContainer').addEventListener('click', function(e) {
        if (e.target.closest('.myDeleteButton')) {
            e.preventDefault();
            myDeleteFormOverlay.classList.add('Display');
            myDeleteDiv.classList.add('Display');

            const userId = e.target.closest('.myDeleteButton').getAttribute('data-user-id');
            document.getElementById('myDeleteUserId').value = userId;

            myCancelBtn1.addEventListener('click', function(e) {
                e.preventDefault();
                myDeleteFormOverlay.classList.remove('Display');
                myDeleteDiv.classList.remove('Display');
            }
            )};
    });

    const myDeleteForm = document.getElementById('myDeleteForm');
    myDeleteForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const prePayLoad = new FormData(myDeleteForm);
        const payLoad = new URLSearchParams(prePayLoad);

        fetch('http://localhost/WindowsUniverse/server/controllers/deleteProfileController.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: payLoad,
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                const userId = document.getElementById('myDeleteUserId').value;
                const userProfile = document.querySelector(`.myDeleteButton[data-user-id="${userId}"]`).closest('#myContainer');
                if (userProfile) {
                    userProfile.remove();  
                }
                fetchUsers();
                myDeleteFormOverlay.classList.remove('Display');
                myDeleteDiv.classList.remove('Display');
                myFlashMessageAnimation.src = '/client/assets/images/animations/success.gif';
                myTypeOfFlashMessage.textContent = "Success";
                myFlashMessageContent.textContent = `Profile deleted`;
                myFlashMessage.className = 'myFlashMessage success show';
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

    myDeleteForm.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            myDeleteForm.dispatchEvent(new Event('submit'));
        }
    });
}
