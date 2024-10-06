export function logout() {
    const myLogoutForm = document.getElementById('myLogoutForm');
    const userIdLogout = document.getElementById('userIdLogout');

    myLogoutForm.addEventListener('submit', function(e) {

        e.preventDefault();

        const fetchedUserId = localStorage.getItem('user_id');
        if (fetchedUserId) {
            userIdLogout.value = fetchedUserId;
        }

        const payLoad = new URLSearchParams({userId: userIdLogout.value});

        fetch('http://localhost/WindowsUniverse/server/controllers/logoutController.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: payLoad,
        })
        .then(res => res.json())
        .then(data => {

            if(data.success) {
                localStorage.clear();
                window.location.replace('index.html');
            } else {
                console.log('Error');
            }
        })
        .catch(error => console.log('Error', error));
    }); 
}