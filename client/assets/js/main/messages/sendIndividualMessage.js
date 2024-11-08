import { dynamicFetchIndividualMessages } from "./dynamicFetchIndividualMessages.js";
import { friendMessages } from "./friendMessages.js";

export function sendIndividualMessage() {
    const form = document.getElementById('myIndividualChatConversationForm');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const prePayLoad = new FormData(form);
        const payLoad = new URLSearchParams(prePayLoad);

        fetch('http://localhost/WindowsUniverse/server/controllers/messageControllers/sendIndividualMessageController.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: payLoad,
        })
        .then(res => res.json())
        .then(data => {
            if(data.success) {
                friendMessages();
                dynamicFetchIndividualMessages();
                console.log('Success');
            } else {
                console.log(data.error);
            }
        })
        .then(error => console.log('Error', error));
    })
}

sendIndividualMessage();