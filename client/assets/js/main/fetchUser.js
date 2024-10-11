export function fetchUser() {

    const userIdMain = document.getElementById('userIdMain');
    const userIdUpdate = document.getElementById('userIdUpdate');
    const myProfileImage = document.getElementById('myProfileImage');
    const myProfileName = document.getElementById('myProfileName');
    const myProfileBackgroundImage = document.getElementById('myEditProfileBackgroundImage');
    const myUsername = document.getElementById('myUsername');
    const myEmail = document.getElementById('myEmail');
    const myDescription = document.getElementById('myDescription');
    const myIcon = document.getElementById('myIcon');
    
    const payLoad = new URLSearchParams({userId : userIdMain.value});

    fetch('http://localhost/WindowsUniverse/server/controllers/fetchLoggedUserController.php', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded',
        },
        body: payLoad,
    })
    .then(res => res.json())
    .then(data => {
        if(data.success) {
            localStorage.setItem('username', data.user.username);
            localStorage.setItem('email', data.user.email);
            localStorage.setItem('description', data.user.user_description);
            localStorage.setItem('user_icon', data.user.user_icon);
            myProfileName.textContent = localStorage.getItem('username');
            myUsername.value = localStorage.getItem('username');
            myEmail.value = localStorage.getItem('email');
            myDescription.value = localStorage.getItem('description');
            userIdUpdate.value = localStorage.getItem('user_id');
            myProfileImage.src = localStorage.getItem('user_icon');
            myProfileBackgroundImage.src = localStorage.getItem('user_icon');
            myIcon.value = localStorage.getItem('user_icon');
           
        } else {
            console.log('Error');
        }
    })
    .catch(error => console.log('Error', error));
};
