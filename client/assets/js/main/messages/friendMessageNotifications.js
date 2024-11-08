import { lastFriendsMessages } from "./lastFriendMessages.js";
import { updateMessageNotification } from "./updateMessageNotification.js";

export function friendMessageNotifications() {
    const userId = localStorage.getItem('user_id');

    const payLoad = new URLSearchParams({user_id: userId});

    fetch('http://localhost/WindowsUniverse/server/controllers/messageControllers/friendNotificationsController.php', {
        method: 'POST',
        body: payLoad,
    })
    .then(res => res.json())
    .then(data => {
        if(data.success) {
            const myMessageRequestsSpace = document.getElementById('myMessageRequestsSpace');
            myMessageRequestsSpace.innerHTML = '';

            data.notifications.forEach(notification => {
                const myMessageNotification = document.createElement('div');
                myMessageNotification.id = 'myMessageNotification';
                myMessageNotification.innerHTML = `
                    <div id="myFriendMessageTypeDiv" class="flex">
                    <img id="myMessageNotificationType" src="/client/assets/images/icons/chat.png" alt="">
                    </div>
                    <div id="myMessageSenderInformations">
                        <div id="myMessageSenderImageDiv" class="flex">
                            <img id="myMessageSenderImage" src="${notification.user_icon}" alt="">
                        </div>
                        <div id="myMessageSenderNamePInsightDiv" class="flex">
                            <h3 id="myMessageSenderName">${notification.username}</h3>
                            <p id="myMessageSenderP">${notification.message}</p>
                        </div>
                    </div>
                    <div id="myMessageReceiverResponse">
                        <button class="myMessageReceiverResponseBtn" user_id=${notification.user_id}><img id="myMessageReceiverResponseImage" src="/client/assets/images/icons/chat.png" alt=""></button>
                    </div>
                `;

                myMessageRequestsSpace.appendChild(myMessageNotification);
            }) 

            const myMessageReceiverResponseBtn = document.querySelectorAll('.myMessageReceiverResponseBtn');
            lastFriendsMessages(myMessageReceiverResponseBtn);
            updateMessageNotification(myMessageReceiverResponseBtn);

        } else {
            console.log('error');
        }
    })
    .catch(error => console.log('Error', error));
} 