export function updatePassword() {
    const myForgotPasswordBtn = document.getElementById('myForgotPasswordBtn');
    const myNewPasswordDiv = document.getElementById('myNewPasswordDiv');
    const myNewPasswordFormLeftArrowBtn = document.getElementById('myNewPasswordFormLeftArrowBtn');
    const myNewPasswordView = document.getElementById('myNewPasswordView');
    const myNewPasswordPassword = document.getElementById('myNewPasswordPassword');

    myForgotPasswordBtn.addEventListener('click', (e) => {
        e.preventDefault();
        myNewPasswordDiv.classList.add('display');
    })

    myNewPasswordFormLeftArrowBtn.addEventListener('click', (e) => {
        e.preventDefault();
        myNewPasswordDiv.classList.remove('display');
    })

    myNewPasswordView.addEventListener('click', () => {
        if(myNewPasswordPassword.type == 'password') {
            myNewPasswordPassword.type = 'text';
            myNewPasswordView.src = '../client/assets/images/icons/hide.png';
        } else {
            myNewPasswordPassword.type = 'password';
            myNewPasswordView.src = '../client/assets/images/icons/view.png';
        }
    })

    const form = document.getElementById('myNewPasswordForm');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const prePayLoad = new FormData(form);
        const payLoad = new URLSearchParams(prePayLoad);

        fetch('http://localhost/WindowsUniverse/server/controllers/userControllers/updatePasswordController.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: payLoad,
        })
        .then(res => res.json())
        .then(data => {

            const myNewPasswordEmail = document.getElementById('myNewPasswordEmail');
            const myNewPasswordPassword = document.getElementById('myNewPasswordPassword');
            if(data.success) {
                myNewPasswordEmail.value = '';
                myNewPasswordPassword.value = '';
                console.log('success' + data.message);
            } else {
                myNewPasswordEmail.value = '';
                myNewPasswordPassword.value = '';
                console.log(data.message);
            }
        })
        .catch(error => console.log('Error', error));
    })
}