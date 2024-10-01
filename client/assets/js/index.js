window.onload = function() {

    const myFlashMessage = document.getElementById('myFlashMessage');
    const myFlashMessageAnimation = document.getElementById('myFlashMessageAnimation');
    const myTypeOfFlashMessage = document.getElementById('myTypeOfFlashMessage');
    const myFlashMessageContent = document.getElementById('myFlashMessageContent');
    const myFlashMessageBtn = document.getElementById('myFlashMessageBtn');
    const myFlashMessageOverlay = document.getElementById('myFlashMessageOverlay');

    if(localStorage.getItem('success') && localStorage.getItem('display')) {

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
        }

        localStorage.removeItem('success');
        localStorage.removeItem('display');
    } 
}

// Here i'm displaying the profiles


fetch('http://localhost/WindowsUniverse/server/controllers/profileController.php')
.then(res => res.json())
.then(data => {

    if(data.success) {    
        const userContainers = document.getElementById('userContainer'); 
        data.users.forEach(user => {
            const userDiv = document.createElement('div');
            userDiv.id = 'myContainer';

            userDiv.innerHTML = `
                <div id="myImageContainer">
                    <img id="myProfileImage" src="${user.user_icon}" alt="myProfileImg">
                     <div id="myButtonDiv" class="flex">
                    <button id="myEnterButton"><img id="myEnterButtonImage" src="/client/assets/images/enter.png" alt="myEnterImg"></button>
                    <button id="myInfoButton"><img id="myInfoButtonImage" src="/client/assets/images/info.png" alt="myInfoImg"></button>
                    <button id="myDeleteButton"><img id="myDeleteButtonImage" src="/client/assets/images/delete.png" alt="myDeleteImg"></button>
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


// Here i'm applying the search profile

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

        if(data.success) {
            noUsers.classList.remove('block');
            const user = data.user;
            const userDiv = document.createElement('div');
            userDiv.id = 'myContainer';

            userDiv.innerHTML = `
               
                <div id="myImageContainer">
                    <img id="myProfileImage" src="${user.user_icon}" alt="myProfileImg">
                     <div id="myButtonDiv" class="flex">
                    <button id="myEnterButton"><img id="myEnterButtonImage" src="/client/assets/images/enter.png" alt="myEnterImg"></button>
                    <button id="myInfoButton"><img id="myInfoButtonImage" src="/client/assets/images/info.png" alt="myInfoImg"></button>
                    <button id="myDeleteButton"><img id="myDeleteButtonImage" src="/client/assets/images/delete.png" alt="myDeleteImg"></button>
                </div>
                </div>
                <div id="myNameDiv">
                    <h3 id="myProfileName">${user.username}</h3>
                </div>
            `;

            userContainer.appendChild(userDiv);
        } else {
            const noUsers = document.querySelector('.myDisplay'); // Use querySelector to get the specific element
            noUsers.classList.add('block'); //

            
        }
    })
    .catch(error => console.log('Error', error));
});



// Here i'm making changes on the list icons display

/*
   

   
    <div id="userContainer" class="flex">
                
    </div>
*/