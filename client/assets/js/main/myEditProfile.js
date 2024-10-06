export function myEditProfile() {
    const myEditProfile = document.getElementById('myEditProfileDiv');
    const myEditUser = document.getElementById('myEditUser');

    myEditUser.addEventListener('click', (e) => {
        e.preventDefault();
        myEditProfile.classList.add('display');
    })
}