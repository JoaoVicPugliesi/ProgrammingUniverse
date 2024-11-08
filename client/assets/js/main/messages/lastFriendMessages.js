import { deleteMessage } from "./deleteMessage.js";
import { formatTimestamp } from "./formatTimestamp.js";

export function lastFriendsMessages(btns) {

    function scrollToBottom() {
        const myIndividualChatConversationContent = document.getElementById('myIndividualChatConversationContent');
        myIndividualChatConversationContent.scrollTop = myIndividualChatConversationContent.scrollHeight;
    }

    btns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            
            localStorage.setItem('btnUserId', btn.getAttribute('user_id'))

            const myChat = document.getElementById('myChat');
            const userId = localStorage.getItem('user_id');
            const myIndividualChatConversationDiv = document.getElementById('myIndividualChatConversationDiv');
            const myGroupChatConversationDiv = document.getElementById('myGroupChatConversationDiv');
            const myIndividualChatConversationReceiverid = document.getElementById('myIndividualChatConversationReceiverid');
            myChat.classList.add('display');
            myGroupChatConversationDiv.classList.add('none');
            myIndividualChatConversationDiv.classList.add('display');
            myIndividualChatConversationReceiverid.value = btn.getAttribute('user_id')
            const userIdX = localStorage.getItem('user_id');
            const userIdY = btn.getAttribute('user_id');

            const payLoad = new URLSearchParams({userIdX: userIdX, userIdY: userIdY});

            fetch('http://localhost/WindowsUniverse/server/controllers/messageControllers/friendMessagesController.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: payLoad,
            })
            .then(res => res.json())
            .then(data => {
                    console.log(data);
                    const myIndividualChatConversationReceiverName = document.getElementById('myIndividualChatConversationReceiverName');
                    const myIndividualChatConversationReceiverImage = document.getElementById('myIndividualChatConversationReceiverImage');
                    const myIndividualChatConversationReceiverStatusH3 = document.getElementById('myIndividualChatConversationReceiverStatusH3');
                    const myIndividualChatConversationReceiverStatus = document.getElementById('myIndividualChatConversationReceiverStatus');
                if(data.success) {
                    
                    myIndividualChatConversationReceiverName.innerHTML = btn.getAttribute('username');
                    myIndividualChatConversationReceiverImage.src = btn.getAttribute('user_icon');
                    
                    if(btn.getAttribute('is_online') === 1) {
                        myIndividualChatConversationReceiverStatusH3.innerHTML = 'online';
                        myIndividualChatConversationReceiverStatus.style.background = '#7CDF4E';
                    } else {
                        myIndividualChatConversationReceiverStatusH3.innerHTML = 'offline';
                        myIndividualChatConversationReceiverStatus.style.background = '#dd3f31';
                    }

                    const myIndividualChatConversationContent = document.getElementById('myIndividualChatConversationContent');
                    myIndividualChatConversationContent.innerHTML = '';
                    let lastDate = null;
                    data.friendMessages.forEach(friendmessage => {
                        if(friendmessage.message_status != '') {
                            const messageDate = new Date(friendmessage.sent_at);
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
                                myIndividualChatConversationContent.appendChild(dateHeader);
                                lastDate = messageDate.toDateString(); 
                        }
                        }
                        const formattedTime = formatTimestamp(friendmessage.sent_at);
                        let individualMessageId;
                        if(friendmessage.user_id != userId) {
                            const myAwayMessageDiv = document.createElement('div');
                            myAwayMessageDiv.id = 'myAwayMessageDiv';

                            if(friendmessage.message_status === '' ) {
                                myAwayMessageDiv.innerHTML = `

                                `;
                                return;
                            }
    
                            myAwayMessageDiv.innerHTML = `
                                <img id="myAwayMessageSenderImage" src="${friendmessage.user_icon}" alt=""></img> 
                                <div id="myAwayMessage">
                                    ${friendmessage.message_image !== 'unknown' || null ? `<img id="myOwnMessageImage" src="${friendmessage.message_image}" alt="">` : ''}
                                    <p id="myAwayMessageP">${friendmessage.message}</p>
                                    <div id="myAwayMessageSenderHour">
                                        <h3 id="myAwayMessageHour">${formattedTime}</h3>
                                        <h3 id="myAwayMessageSender">${friendmessage.username}</h3>
                                    </div>
                                </div>
                            `;


                            individualMessageId = friendmessage.message_id;
                            myIndividualChatConversationContent.appendChild(myAwayMessageDiv);
                        }
    
                        if(friendmessage.user_id == userId) {
                            const myOwnMessage = document.createElement('div');
                            myOwnMessage.id = 'myOwnMessage';

                            if(friendmessage.message_status === '' ) {
                                myOwnMessage.innerHTML = `

                                `;
                                return;
                            }

                            myOwnMessage.innerHTML =  `

                            ${friendmessage.message_image !== 'unknown' || null ? `<img id="myOwnMessageImage" src="${friendmessage.message_image}" alt="">` : ''}
                                <p id="myOwnMessageP">${friendmessage.message}</p>
                                    <div id="myOwnMessageSenderHour">
                                        <button class="myOwnMessageSenderHourBtn" message-id="${friendmessage.message_id}"><img id="myOwnMessageSenderHourBtnImage" src="/client/assets/images/icons/comment.png" alt=""></button>
                                        <h3 id="myOwnMessageHour">${formattedTime}</h3>
                                    </div>
                            `;
                            
                            individualMessageId = friendmessage.message_id;
                            myIndividualChatConversationContent.appendChild(myOwnMessage);
                        }

                            localStorage.setItem('individualMessageId', individualMessageId);
                    })

                    
                    const myOwnMessageSenderHourBtn = document.querySelectorAll('.myOwnMessageSenderHourBtn');

                    deleteMessage(myOwnMessageSenderHourBtn);

                    scrollToBottom();

                } else {
                    console.log('Error');
                }
            })
            .catch(error => console.log('Error', error));
        })        
    })
}
