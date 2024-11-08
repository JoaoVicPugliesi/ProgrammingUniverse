import { formatTimestamp } from "./formatTimestamp.js";
import { lastFriendsMessages } from "./lastFriendMessages.js";
import { updateMessageNotification } from "./updateMessageNotification.js";

export function friendMessages() {
    const userId = localStorage.getItem('user_id');

    const payLoad = new URLSearchParams({ userId: userId })

    fetch('http://localhost/WindowsUniverse/server/controllers/messageControllers/lastFriendMessagesController.php', {
        method: 'POST',
        body: payLoad,
    })
    .then(res => res.json())
    .then(data => {
        if(data.success) {
            const myFriendMessages = document.getElementById('myFriendMessages');
            myFriendMessages.innerHTML = '';

            data.messages.forEach(message => {
                const formattedTime = formatTimestamp(message.sent_at);
                const myFriendMessagesBtn = document.createElement('button');
                myFriendMessagesBtn.classList = 'myFriendMessagesBtn';
                myFriendMessagesBtn.setAttribute('user_id', message.user_id);
                myFriendMessagesBtn.setAttribute('username', message.username);
                myFriendMessagesBtn.setAttribute('user_icon', message.user_icon);
                myFriendMessagesBtn.setAttribute('is_online', message.is_online);
                myFriendMessagesBtn.innerHTML =  `
                     <img id="myFriendMessagesBtnUserImage" src="${message.user_icon}" alt="">
                            <div id="myFriendMessagesBtnNameMessage">
                                <h3 id="myFriendMessagesBtnName">${message.username}</h3>
                               ${message.message != null ? `<p id="myFriendMessagesBtnMessage">${message.message}</p>` : `<p id="myFriendMessagesBtnMessage">No Message</p>`} 
                            </div>
                    ${message.sent_at != null ? `<h3 id="myGroupMessagesBtnFormattedTime">${formattedTime}</h3>` : `<h3 id="myGroupMessagesBtnFormattedTime"></h3>`}
                    ${message.message_image != null ? ` <img id="myindividualMessagesBtnNameMessageImage" src="/client/assets/images/icons/galery.png" alt="">` : ''}
                `;

                myFriendMessages.appendChild(myFriendMessagesBtn);

            })

            const myFriendMessagesBtn = document.querySelectorAll('.myFriendMessagesBtn');

            lastFriendsMessages(myFriendMessagesBtn);
            updateMessageNotification(myFriendMessagesBtn);

        } else {
            console.log('Error');
        }
    })
    .catch(error => console.log('Error', error));
}