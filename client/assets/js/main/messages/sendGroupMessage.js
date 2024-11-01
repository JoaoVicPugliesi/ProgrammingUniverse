import { lastGroupMessages } from 'lastGroupMessages.js';

export function sendGroupMessage() {
    const form = document.getElementById('myGroupChatConversationTextBarForm');
   
    form.addEventListener('submit', function (e) {

        console.log("Submitting form");
        e.preventDefault();

        const prePayLoad = new FormData(form);
        const payLoad = new URLSearchParams(prePayLoad);

        fetch('http://localhost/WindowsUniverse/server/controllers/messageControllers/sendMessageController.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: payLoad,
        })
        .then(res => res.json())
        .then(data => {

            if(data.success) {
                lastGroupMessages();
                console.log("success");
            } else {


                console.log(data.error);
            }
        }) 
        .catch(error => console.log('Error', error));
    })
 }

sendGroupMessage();