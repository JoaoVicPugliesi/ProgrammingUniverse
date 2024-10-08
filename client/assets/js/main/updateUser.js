export function updateUser() {
    const myEditProfileForm = document.getElementById('myEditProfileForm');

    myEditProfileForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const prePayLoad = new FormData(myEditProfileForm);
        const payLoad = new URLSearchParams(prePayLoad);

        fetch('http://localhost/WindowsUniverse/server/controllers/updateProfileController.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: payLoad,
        })
        .then(res => res.json())
        .then(data => {
            if(data.success) {
                console.log('success');
            } else {
                console.log(data.error);
            }
        }) .catch(error => console.log('error', error));
    })
}