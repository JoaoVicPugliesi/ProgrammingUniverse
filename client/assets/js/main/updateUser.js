import { fetchUser } from "./fetchUser.js";

export function updateUser() {
    const myEditProfileForm = document.getElementById('myEditProfileForm');

    myEditProfileForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const prePayLoad = new FormData(myEditProfileForm);
        const payLoad = new URLSearchParams(prePayLoad);

        fetch('http://localhost/WindowsUniverse/server/controllers/userControllers/updateProfileController.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: payLoad,
        })
        .then(res => res.json())
        .then(data => {

            const myFriendRequestFeedback = document.getElementById('myFriendRequestFeedback');
            const myFriendRequestFeedbackH3 = document.getElementById('myFriendRequestFeedbackH3');
            const myFriendRequestFeedbackP = document.getElementById('myFriendRequestFeedbackP');
            const myFriendRequestFeedbackBtn = document.getElementById('myFriendRequestFeedbackBtn');

            if(data.success) {
                fetchUser();
                console.log('success');
            } else {
                myFriendRequestFeedback.classList.add('display');
                myFriendRequestFeedbackH3.textContent = 'Oops!';
                myFriendRequestFeedbackP.textContent = data.error;
                myFriendRequestFeedbackBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    myFriendRequestFeedback.classList.remove('display');
                }) 
            }
        }) .catch(error => console.log('error', error));
    })
}