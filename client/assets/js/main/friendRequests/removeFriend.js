import { fetchUser } from "../fetchUser.js";

export function removeFriend() {
    const senderId = document.getElementById('myProfileRemoveSectionSenderId');
    const receiverId = document.getElementById('myProfileRemoveSectionReceiverId');

    const myProfileRemoveSectionBtn = document.querySelector('.myProfileRemoveSectionBtn');

    myProfileRemoveSectionBtn.addEventListener('click', (e) => {
        e.preventDefault();

        const payLoad = new URLSearchParams({ sender_id: senderId.value, receiver_id: receiverId.value});

        fetch('http://localhost/WindowsUniverse/server/controllers/friendshipControllers/removeFriendController.php', {
            method: 'POST',
            body: payLoad,
        })
        .then(res => res.json())
        .then(data => {
            if(data.success) {
                console.log('success')
                fetchUser();
            } else {
                console.log('error');
            }
        })
        .catch(error => console.log('Error', error));
    })

}

removeFriend();