const userId = document.getElementById('userId');
const myProfileImage = document.getElementById('myProfileImage');
const myProfileName = document.getElementById('myProfileName');

export function fetchUser() {
    const payLoad = new URLSearchParams({userId : userId.value});

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
            localStorage.setItem('user_icon', data.user.user_icon);
            myProfileImage.src = localStorage.getItem('user_icon');
            myProfileName.textContent = localStorage.getItem('username');
            
        } else {
            console.log('Error');
        }
    })
    .catch(error => console.log('Error', error));
};
