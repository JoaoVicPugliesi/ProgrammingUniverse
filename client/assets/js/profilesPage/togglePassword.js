export function setupPasswordToggle() {
    const myLoginPassword = document.getElementById('myLoginPassword');
    const myLoginView = document.getElementById('myLoginView');
    const myDeletePassword = document.getElementById('myDeletePassword');
    const myDeleteView = document.getElementById('myDeleteView');

    myLoginView.addEventListener('click', function(e) {
        e.preventDefault;
        if (myLoginPassword.type === 'password') {
            myLoginPassword.type = 'text';
            myLoginView.src = '../client/assets/images/icons/hide.png';
        } else {
            myLoginPassword.type = 'password';
            myLoginView.src = '../client/assets/images/icons/view.png';
        }
    });

    myDeleteView.addEventListener('click', function(e) {
        e.preventDefault();
        if (myDeletePassword.type === 'password') {
            myDeletePassword.type = 'text';
            myDeleteView.src = '../client/assets/images/icons/hide.png';
        } else {
            myDeletePassword.type = 'password';
            myDeleteView.src = '../client/assets/images/icons/view.png';
        }
    });
}