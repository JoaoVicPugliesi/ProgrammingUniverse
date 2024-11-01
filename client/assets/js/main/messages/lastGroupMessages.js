import { deleteMessage } from "./deleteMessage.js";
import { formatTimestamp } from "./formatTimestamp.js";
export function lastGroupMessages() {

    function scrollToBottom() {
        const myGroupChatConversationContent = document.getElementById('myGroupChatConversationContent');
        myGroupChatConversationContent.scrollTop = myGroupChatConversationContent.scrollHeight;
    }

    fetch('http://localhost/WindowsUniverse/server/controllers/messageControllers/lastGroupMessagesController.php')
    .then(res => res.json())
    .then(data => {
        if(data.success) {

           
            const myLastMessages = document.getElementById('myLastMessages');
            myLastMessages.innerHTML = '';

            data.messages.forEach(message => {
                let background = message.is_online == 1 ? '#7CDF4E' : '#dd3f31';
                const formattedTime = formatTimestamp(message.sent_at);
               

                const myMenuMessageDiv = document.createElement('div');
                myMenuMessageDiv.id = 'myMenuMessageDiv';
                myMenuMessageDiv.innerHTML = `

                    <div id="myMenuMessageUserDiv">
                        <img id="myMenuMessageUser" src="${message.user_icon}" alt="myMenuUser">
                    </div>
                    <div id="myMenuMessageContent" class="flex">
                        <div id="myMenuUserDiv" class="flex">
                            ${message.user_id != localStorage.getItem('user_id') ? `<h3 id="myMenuUser">${message.username}</h3>` : `<h3 id="myMenuUser">You</h3>`}
                        <div id="myStatusMenuAnswer" class="myStatusAnswer" style="background: ${background}"></div>    
                        </div>
                   
                    ${message.message_image != null ? ` <img id="myMenuUserDivImage" src="/client/assets/images/icons/galery.png" alt="">` : ''}
                    <p id="myMenuMessage">${message.message}</p>
                   
                    </div>
                     <h3 id="myFormattedTime">${formattedTime}</h3>
                    <div>
                    </div>                               
                `;

                myLastMessages.appendChild(myMenuMessageDiv);

                const myGroupMessages = document.getElementById('myGroupMessages');
                myGroupMessages.innerHTML = '';

                data.lastMessage.forEach(message => {

                    const formattedTime = formatTimestamp(message.sent_at);

                    const myGroupMessagesBtn = document.createElement('button');
                    myGroupMessagesBtn.id = 'myGroupMessagesBtn';
                    myGroupMessagesBtn.innerHTML = `
                            <img id="myGroupMessagesBtnUserImage" src="${message.user_icon}" alt="">
                            <div id="myGroupMessagesBtnNameMessage">
                                ${message.user_id != localStorage.getItem('user_id') ? `<h3 id="myGroupMessagesBtnName">${message.username}</h3>` : `<h3 id="myGroupMessagesBtnName">You</h3>`}
                                ${message.message_image != null ? ` <img id="myGroupMessagesBtnNameMessageImage" src="/client/assets/images/icons/galery.png" alt="">` : ''}
                                <p id="myGroupMessagesBtnMessage">${message.message}</p>
                            </div>
                            <h3 id="myGroupMessagesBtnFormattedTime">${formattedTime}</h3>
                    `;

                    myGroupMessages.appendChild(myGroupMessagesBtn);
                });

                const myGroupChatConversationContent = document.getElementById('myGroupChatConversationContent');
                myGroupChatConversationContent.innerHTML = '';
                const userId = localStorage.getItem('user_id');

                let lastDate = null;

                data.groupMessages.forEach(Groupmessage => {

                    const messageDate = new Date(Groupmessage.sent_at);
                    const today = new Date();
                    const yesterday = new Date(today);
                    yesterday.setDate(today.getDate() - 1);

                    let dateLabel;
                    if (messageDate.toDateString() === today.toDateString()) {
                        dateLabel = "Today";
                    } else if (messageDate.toDateString() === yesterday.toDateString()) {
                        dateLabel = "Yesterday";
                    } else {
                        dateLabel = messageDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                    }

                    if (lastDate !== messageDate.toDateString()) {
                        const dateHeader = document.createElement('h3');
                        dateHeader.textContent = `---------------- ${dateLabel} ----------------`;
                        myGroupChatConversationContent.appendChild(dateHeader);
                        lastDate = messageDate.toDateString(); 
                    }

                    const formattedTime = formatTimestamp(Groupmessage.sent_at);
                    let messageId;

                    if(Groupmessage.user_id != userId) {
                        const myAwayMessageDiv = document.createElement('div');
                        myAwayMessageDiv.id = 'myAwayMessageDiv';

                        myAwayMessageDiv.innerHTML = `
                            <img id="myAwayMessageSenderImage" src="${Groupmessage.user_icon}" alt="">
                            <div id="myAwayMessage">
                                ${Groupmessage.message_image !== 'unknown' || null ? `<img id="myOwnMessageImage" src="${Groupmessage.message_image}" alt="">` : ''}
                                <p id="myAwayMessageP">${Groupmessage.message}</p>
                                <div id="myAwayMessageSenderHour">
                                    <h3 id="myAwayMessageHour">${formattedTime}</h3>
                                    <h3 id="myAwayMessageSender">${Groupmessage.username}</h3>
                                </div>
                            </div>
                        `;

                        messageId = Groupmessage.message_id;
                        myGroupChatConversationContent.appendChild(myAwayMessageDiv);
                    }

                    if(Groupmessage.user_id == userId) {
                        const myOwnMessage = document.createElement('div');
                        myOwnMessage.id = 'myOwnMessage';
                        myOwnMessage.innerHTML =  `

                        ${Groupmessage.message_image !== 'unknown' || null ? `<img id="myOwnMessageImage" src="${Groupmessage.message_image}" alt="">` : ''}
                            <p id="myOwnMessageP">${Groupmessage.message}</p>
                                <div id="myOwnMessageSenderHour">
                                    <button class="myOwnMessageSenderHourBtn" message-id="${Groupmessage.message_id}"><img id="myOwnMessageSenderHourBtnImage" src="/client/assets/images/icons/comment.png" alt=""></button>
                                    <h3 id="myOwnMessageHour">${formattedTime}</h3>
                                </div>
                        `;

                        messageId = Groupmessage.message_id;
                        myGroupChatConversationContent.appendChild(myOwnMessage);
                    }

                    localStorage.setItem('messageId', messageId);
                    
                }) 

                const btns = document.querySelectorAll('.myOwnMessageSenderHourBtn');

                console.log(localStorage.getItem('messageId'));

                deleteMessage(btns);

                scrollToBottom();

            })
            console.log('success');
        } else {
            console.log('error');
        }
    })
    .catch(error => console.error('Error', error));

}