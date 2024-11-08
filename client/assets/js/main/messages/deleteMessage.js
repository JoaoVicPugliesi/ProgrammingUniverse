import { lastFriendsMessages } from "./lastFriendMessages.js";
import { lastGroupMessages } from "./lastGroupMessages.js";

export function deleteMessage(btns) {

    btns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const messageId = btn.getAttribute('message-id');
            console.log(messageId);

            const payLoad = new URLSearchParams({message_id: messageId});

            fetch('http://localhost/WindowsUniverse/server/controllers/messageControllers/deleteMessageController.php', {
                method: 'POST',
                body: payLoad,
            })
            .then(res => res.json())
            .then(data => {
                if(data.success) {
                    lastGroupMessages();
                    lastFriendsMessages();
                } else {
                    console.log('error');
                }
            })
            .catch(error => console.log('Error', error));
        })
    })
}