// Here i'm handling the FlashMessages onload;
    const myFlashMessage = document.getElementById('myFlashMessage');
    const myFlashMessageAnimation = document.getElementById('myFlashMessageAnimation');
    const myTypeOfFlashMessage = document.getElementById('myTypeOfFlashMessage');
    const myFlashMessageContent = document.getElementById('myFlashMessageContent');
    const myFlashMessageBtn = document.getElementById('myFlashMessageBtn');
    const myFlashMessageOverlay = document.getElementById('myFlashMessageOverlay');
    const userContainers = document.getElementById('userContainer');
    const myDeleteFormOverlay = document.getElementById('myDeleteFormOverlay');
    const myDeleteDiv = document.getElementById('myDeleteDiv');
    const myCancelBtn = document.getElementById('myCancelBtn');

window.onload = function() {
    
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
};

// Here i'm Fetching and displaying user profiles

function fetchUsers() {
    fetch('http://localhost/WindowsUniverse/server/controllers/profileController.php')
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                userContainers.innerHTML = ''; 

                data.users.forEach(user => {
                    const userDiv = document.createElement('div');
                    userDiv.id = 'myContainer';

                    userDiv.innerHTML = `
                        <div id="myImageContainer">
                            <img id="myProfileImage" src="${user.user_icon}" alt="myProfileImg">
                            <div id="myButtonDiv" class="flex">
                                <button class="myEnterButton">
                                    <img id="myEnterButtonImage" src="/client/assets/images/enter.png" alt="myEnterImg">
                                </button>
                                <button class="myDeleteButton" data-user-id="${user.user_id}">
                                    <img id="myDeleteButtonImage" src="/client/assets/images/delete.png" alt="myDeleteImg">
                                </button>
                            </div>
                        </div>
                        <div id="myNameDiv">
                            <h3 id="myProfileName">${user.username}</h3>
                        </div>
                    `;

                    userContainers.appendChild(userDiv);
                });
            } else {
                console.log('No users Found');
            }
        })
        .catch(error => console.error('Error', error));
}

// Here i'm handling the Delete and Search System

document.addEventListener('DOMContentLoaded', function() {
    fetchUsers(); 

    document.getElementById('userContainer').addEventListener('click', function(e) {
        if(e.target.closest('.myDeleteButton')) {
            e.preventDefault();

            myDeleteFormOverlay.classList.add('Display');
            myDeleteDiv.classList.add('Display');

            myCancelBtn.onclick = function(e) {
                e.preventDefault();
                myDeleteFormOverlay.classList.remove('Display');
                myDeleteDiv.classList.remove('Display');
            }
           
            const userId = e.target.closest('.myDeleteButton').getAttribute('data-user-id');
            const myUserId = document.getElementById('myUserId');
            myUserId.value = userId;
        }
    })

    const myDeleteForm = document.getElementById('myDeleteForm');
  
        myDeleteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const prePayLoad = new FormData(myDeleteForm);
            const payLoad = new URLSearchParams(prePayLoad);

            fetch('http://localhost/WindowsUniverse/server/controllers/deleteProfileController.php', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/x-www-form-urlencoded',
                },
                body: payLoad,
            })
            .then(res => res.json())
            .then(data => {
                if(data.success) {

                    const userId = document.getElementById('myUserId').value;

                    const userProfile = document.querySelector(`.myDeleteButton[data-user-id="${userId}"]`).closest('#myContainer');
                    if (userProfile) {
                        userProfile.remove();  
                    }

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
            .catch(error => console.log(['Error', error])) ;
        }) 

    const mySearchForm = document.getElementById('mySearchForm');

    mySearchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const prePayLoad = new FormData(mySearchForm);
        const payLoad = new URLSearchParams(prePayLoad);

        fetch('http://localhost/WindowsUniverse/server/controllers/searchUsernameController.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: payLoad,
        })
        .then(res => res.json())
        .then(data => {
            const noUsers = document.querySelector('.myDisplay');
            const userContainer = document.getElementById('userContainer');
            userContainer.innerHTML = ''; 

            if (data.success) {
                noUsers.classList.remove('block');
                const user = data.user;
                const userDiv = document.createElement('div');
                userDiv.id = 'myContainer';

                userDiv.innerHTML = `
                    <div id="myImageContainer">
                        <img id="myProfileImage" src="${user.user_icon}" alt="myProfileImg">
                        <div id="myButtonDiv" class="flex">
                            <button id="myEnterButton" class="myEnterButton">
                                <img id="myEnterButtonImage" src="/client/assets/images/enter.png" alt="myEnterImg">
                            </button>
                            <button id="myDeleteButton" class="myDeleteButton">
                                <img id="myDeleteButtonImage" src="/client/assets/images/delete.png" alt="myDeleteImg">
                            </button>
                        </div>
                    </div>
                    <div id="myNameDiv">
                        <h3 id="myProfileName">${user.username}</h3>
                    </div>
                `;

                userContainer.appendChild(userDiv);
            } else {
                noUsers.classList.add('block');
            }
        })
        .catch(error => console.log('Error', error));
    });
});
