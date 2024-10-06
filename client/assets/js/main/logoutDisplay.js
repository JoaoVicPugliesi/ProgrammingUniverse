const myLogoutConfirmation = document.getElementById('myLogoutConfirmation');
const myLogoutBtn = document.getElementById('myLogoutBtn');
const myNo = document.getElementById('myNo');

export function logoutDisplay(element, button1, button2) {

    button1.addEventListener('click', (e) => {
        e.preventDefault();
        element.classList.remove('hide');
        element.classList.add('display');
    });

    button2.addEventListener('click', (e) => {
        e.preventDefault();
        element.classList.remove('display');
        
    });
}

logoutDisplay(myLogoutConfirmation, myLogoutBtn, myNo);