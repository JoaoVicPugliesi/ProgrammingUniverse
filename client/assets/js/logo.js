// Here i'm veryfing if the user chose a icon or not

const myForm = document.getElementById('myForm');

myForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const myChosenIcon = document.querySelector('input[name="icon"]:checked');

    if(myChosenIcon) {
        localStorage.setItem('myChosenIcon', myChosenIcon.value);
        window.location.replace("newUser.html");
    } else {
        const myFlashMessage = document.getElementById('myFlashMessage');
        const myFlashMessageAnimation = document.getElementById('myFlashMessageAnimation');
        const myTypeOfFlashMessage = document.getElementById('myTypeOfFlashMessage');
        const myFlashMessageContent = document.getElementById('myFlashMessageContent');
        const myFlashMessageBtn = document.getElementById('myFlashMessageBtn');
        const myFlashMessageOverlay = document.getElementById('myFlashMessageOverlay');

        myFlashMessageAnimation.src = '/client/assets/images/animations/error.gif'
        myTypeOfFlashMessage.textContent = "Error";
        myFlashMessageContent.textContent = "Select a icon";
        myFlashMessage.className = 'myFlashMessage error show';
        myFlashMessageBtn.textContent = 'Try Again';
        myFlashMessageOverlay.style.display = 'block'; // Show overlay

       myFlashMessageBtn.onclick = function() { setTimeout(() => {
            myFlashMessage.classList.add('fade-out'); 
            setTimeout(() => {
                myFlashMessage.classList.remove('show', 'fade-out'); 
                myFlashMessage.className = 'myFlashMessage'; 
                myFlashMessageOverlay.style.display = 'none'; // Hide overlay
            }, 200); 
        }); 
    }
    }

}) 