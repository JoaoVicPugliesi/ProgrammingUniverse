export function logout() {
    const userIdLogout = document.getElementById('userIdLogout');

        const fetchedUserId = localStorage.getItem('user_id');
        if (fetchedUserId) {
            userIdLogout.value = fetchedUserId;
        }

        const payLoad = new URLSearchParams({userId: userIdLogout.value});

        fetch('http://localhost/WindowsUniverse/server/controllers/userControllers/logoutController.php', {
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
}