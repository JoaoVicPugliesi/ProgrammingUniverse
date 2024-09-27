const myForm = document.getElementById('myForm');

/* 

   Here i'm establishing a network request system in JavaScript. 
   It sends the data captured by the FormData object and 
   converted into URLSearchParams (It makes easier to the serve parse the data).
   into a POST request to the PHP controller. Once it arrives there the data will be filtered and
   applied into the module logic sending the feedback (response);

*/

myForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const prePayload = new FormData(myForm);
    const payLoad = new URLSearchParams(prePayload);

    console.log(...payLoad);

    fetch('http://localhost/WindowsUniverse/server/controllers/newUserController.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: payLoad,
    }) 
    .then(res => res.json())
    .then(data => {
        const myFlashMessage = document.getElementById('myFlashMessage');

        if (data.success) {
            myFlashMessage.textContent = 'User registered successfully!';
            myFlashMessage.className = 'flash-message success show'; 
        } else {
            myFlashMessage.textContent = 'Error: ' + data.message;
            myFlashMessage.className = 'flash-message error show'; 
        }

        setTimeout(() => {
            myFlashMessage.classList.add('fade-out'); 
            setTimeout(() => {
                myFlashMessage.classList.remove('show', 'fade-out'); 
                myFlashMessage.className = 'flash-message'; 
            }, 500); 
        }, 3000); 
    }) 
    .catch(error => console.error('Error', error));
})

// Here i'm changing the TogglePasswordVisibility

myView.onclick = function() {

    const myView = document.getElementById('myView');
    const myPassword = document.getElementById('myPassword');

    if(myPassword.type === 'password') {
        myPassword.type = 'text';
        myView.src = '../client/assets/images/view.png';
    } else  {
        myPassword.type = 'password';
        myView.src = '../client/assets/images/hide.png';
    }
}

