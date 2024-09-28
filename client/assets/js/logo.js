const myForm = document.getElementById('myForm');

myForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const myChosenIcon = document.querySelector('input[name="icon"]:checked');

    if(myChosenIcon) {
        localStorage.setItem('myChosenIcon', myChosenIcon.value);
        window.location.replace("newUser.html");
    } else {
        const errorMessage = document.querySelector('.myFlashMessage');
        errorMessage.textContent = "please select a icon before confirming";
        errorMessage.className = 'myFlashMessage error show';
        setTimeout(() => {
            myFlashMessage.classList.add('fade-out'); 
            setTimeout(() => {
                myFlashMessage.classList.remove('show', 'fade-out'); 
                myFlashMessage.className = 'myFlashMessage'; 
            }, 500); 
        }, 3000); 
    }

}) 