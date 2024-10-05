// Here i'm retriving the myChosenIcon from the local storage

window.onload = function () {
    const myChosenIcon = localStorage.getItem('myChosenIcon');
    if(myChosenIcon) {
        document.getElementById('myIcon').src = myChosenIcon;
        document.getElementById('myChosenIcon').value = myChosenIcon;
        localStorage.removeItem('myChosenIcon');
    }
}

/* 

   Here i'm establishing a network request system in JavaScript. 
   It sends the data captured by the FormData object and 
   converted into URLSearchParams (It makes easier to the serve parse the data).
   into a POST request to the PHP controller. Once it arrives there the data will be filtered and
   applied into the module logic sending the feedback (response);

*/

const myForm = document.getElementById('myForm');

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
        const myFlashMessageAnimation = document.getElementById('myFlashMessageAnimation');
        const myTypeOfFlashMessage = document.getElementById('myTypeOfFlashMessage');
        const myFlashMessageContent = document.getElementById('myFlashMessageContent');
        const myFlashMessageBtn = document.getElementById('myFlashMessageBtn');
        const myFlashMessageOverlay = document.getElementById('myFlashMessageOverlay');

        if (data.success) {
            const success = 'User registered successfully!';
            const display = 'myFlashMessage success show'; 
            localStorage.setItem('success', success);
            localStorage.setItem('display', display);
            window.location.replace("/index.html"); 
        } else {

            myFlashMessageAnimation.src = '/client/assets/images/animations/error.gif';
            myTypeOfFlashMessage.textContent = "Error";
            myFlashMessageContent.textContent = data.message;
            myFlashMessage.className = 'myFlashMessage error show';
            myFlashMessageOverlay.style.display = 'block'; // Show overlay
            myFlashMessageBtn.textContent = 'Try Again';
        }

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
    }) 
    .catch(error => console.error('Error', error));
})

// Here i'm changing the TogglePasswordVisibility

myView.onclick = function() {

    const myView = document.getElementById('myView');
    const myPassword = document.getElementById('myPassword');

    if(myPassword.type === 'password') {
        myPassword.type = 'text';
        myView.src = '../client/assets/images/hide.png';
    } else  {
        myPassword.type = 'password';
        myView.src = '../client/assets/images/view.png';
    }
}

// Here i'm saving the user's input progress

window.addEventListener('load', function() {
    
    const mySaveFromEdit = sessionStorage.getItem('mySaveFromEdit');

    if (mySaveFromEdit === 'true') {
        if (sessionStorage.getItem('username')) {
            document.querySelector('.myUsername').value = sessionStorage.getItem('username');
        }
        if (sessionStorage.getItem('email')) {
            document.querySelector('.myEmail').value = sessionStorage.getItem('email');
        }
        if (sessionStorage.getItem('password')) {
            document.querySelector('.myPassword').value = sessionStorage.getItem('password');
        }
    } else {
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('email');
        sessionStorage.removeItem('password');
    }
});

document.querySelector('.myEditIcon').addEventListener('click', function(e) {
    e.preventDefault(); 

    const username = document.querySelector('.myUsername').value;
    const email = document.querySelector('.myEmail').value;
    const password = document.querySelector('.myPassword').value;

    sessionStorage.setItem('username', username);
    sessionStorage.setItem('email', email);
    sessionStorage.setItem('password', password);

    sessionStorage.setItem('mySaveFromEdit', 'true');

    window.location.href = 'logo.html'; 
});

const myUsername = document.getElementById('myUsername');

function changeInput(element) {
    element.addEventListener('input', () => {
        if(element.value.length > 0) {
            element.classList.add('change');
        } else {
            element.classList.remove('change');
        }
    })
}

changeInput(myUsername);



