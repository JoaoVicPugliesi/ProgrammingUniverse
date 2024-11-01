import { fetchUser } from "../fetchUser.js";

export function removeFriend() {
    const senderId = document.getElementById('myProfileRemoveSectionSenderId');
    const receiverId = document.getElementById('myProfileRemoveSectionReceiverId');

    const myProfileRemoveSectionBtn = document.querySelector('.myProfileRemoveSectionBtn');

    myProfileRemoveSectionBtn.addEventListener('click', (e) => {
        e.preventDefault();

        const senderIdValue = senderId.value;
        const receiverIdValue = receiverId.value;
    
        console.log('Sender ID:', senderIdValue);
        console.log('Receiver ID:', receiverIdValue);
    
        const payLoad = new URLSearchParams({ sender_id: senderIdValue, receiver_id: receiverIdValue });
    

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