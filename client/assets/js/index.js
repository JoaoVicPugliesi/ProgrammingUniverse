window.onload = function() {

    const myFlashMessage = document.getElementById('myFlashMessage');
    const myFlashMessageAnimation = document.getElementById('myFlashMessageAnimation');
    const myTypeOfFlashMessage = document.getElementById('myTypeOfFlashMessage');
    const myFlashMessageContent = document.getElementById('myFlashMessageContent');
    const myFlashMessageBtn = document.getElementById('myFlashMessageBtn');
    const myFlashMessageOverlay = document.getElementById('myFlashMessageOverlay');

    if(localStorage.getItem('success') && localStorage.getItem('display')) {

        myFlashMessageAnimation.src = '/client/assets/images/animations/haha.gif';
        myTypeOfFlashMessage.textContent = "Success";
        myFlashMessageContent.textContent = localStorage.getItem('success');
        myFlashMessage.className = localStorage.getItem('display');
        myFlashMessageOverlay.style.display = 'block'; // Show overlay
        myFlashMessageBtn.textContent = 'Continue';
       
        

       myFlashMessageBtn.onclick = function() { 
            setTimeout(() => {
            myFlashMessage.classList.add('fade-out'); 
            setTimeout(() => {
                myFlashMessage.classList.remove('show', 'fade-out'); 
                myFlashMessage.className = 'myFlashMessage';
                myFlashMessageOverlay.style.display = 'none'; // Hide overlay 
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
        const myFlex = document.getElementById('userContainers'); 

        myFlex.innerHTML = '';

        data.users.forEach(user => {
            const userDiv = document.createElement('div');
            userDiv.id = 'myContainer';

            userDiv.innerHTML = `
                <div id="myImageContainer">
                    <img id="myProfileImage" src="${user.user_icon}" alt="myProfileImg">
                </div>
                <div id="myNameAndListDiv" class="myNameAndListDiv">
                    <h3 id="myProfileName">${user.username}</h3>
                    <div id="myButtonDiv" class="flex">
                        <button id="myUpdateButton"><img id="myUpdateButtonImage" src="/client/assets/images/edit.png" alt="myUpdateImg"></button>
                        <button id="myEnterButton"><img id="myEnterButtonImage" src="/client/assets/images/enter.png" alt="myEnterImg"></button>
                        <button id="myInfoButton"><img id="myInfoButtonImage" src="/client/assets/images/info.png" alt="myInfoImg"></button>
                        <button id="myDeleteButton"><img id="myDeleteButtonImage" src="/client/assets/images/delete.png" alt="myDeleteImg"></button>
                    </div>
                </div>
            `;

            myFlex.appendChild(userDiv);
        });
    } else {
        console.log('No users Found');
    }
})
.catch(error => console.error('Error', error));


// Here i'm applying the search profile

const mySearchForm = document.getElementById('mySearchForm');

mySearchForm.addEventListener('click', function(e) {
    e.preventDefault();
})


// Here i'm making changes on the list icons display

