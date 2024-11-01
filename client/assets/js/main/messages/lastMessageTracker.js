import { lastGroupMessages } from "./lastGroupMessages.js";

export function lastMessageTracker() {
    const messageId = localStorage.getItem('messageId');

    const payLoad = new URLSearchParams({message_id: messageId});

    fetch('http://localhost/WindowsUniverse/server/controllers/messageControllers/lastMessageTrackerController.php', {
        method: 'POST',
        body: payLoad,
    })
    .then(res => res.json())
    .then(data => {
        if(data.success) {
            lastGroupMessages();
            console.log('Tracking');
        } 
    })
    .catch(error => console.log('Error', error));
}

lastMessageTracker();