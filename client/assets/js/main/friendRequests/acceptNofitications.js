export function acceptNotifications() {
    const userId = localStorage.getItem('user_id');

    const payLoad = new URLSearchParams({userId: userId})

    fetch('http://localhost/WindowsUniverse/server/controllers/friendshipControllers/acceptNotificationsController.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: payLoad,
    })
    .then(res => res.json())
    .then(data => {
        if(data.success) {
            const myAcceptRequestsSpace = document.getElementById('myAcceptRequestsSpace');

            myAcceptRequestsSpace.innerHTML = '';

            data.accepts.forEach(accept => {
                
                let friendUsername, friendIcon, senderId, receiverId;

                if (accept.sender_id == userId) {
                    friendUsername = accept.receiver_username;
                    friendIcon = accept.receiver_icon;
                    senderId = userId; // 
                    receiverId = accept.receiver_id; 
                } else {
                    
                    friendUsername = accept.sender_username;
                    friendIcon = accept.sender_icon;
                    senderId = accept.sender_id; 
                    receiverId = userId; 
                }

                const myAcceptNotification = document.createElement('div');
                myAcceptNotification.id = 'myAcceptNotification';
                myAcceptNotification.setAttribute('data-sender-id', senderId);
                myAcceptNotification.innerHTML = `
                    <div id="myAcceptTypeDiv" class="flex">
                        <img id="myAcceptNotificationType" src="/client/assets/images/icons/check.png" alt="">
                    </div>
                    <div id="myAcceptSenderInformations">
                        <div id="myAcceptSenderImageDiv" class="flex">
                            <img id="myAcceptSenderImage" src="${friendIcon}" alt="">
                        </div>
                        <div id="myAcceptSenderNamePInsightDiv" class="flex">
                            <h3 id="myAcceptSenderName">${friendUsername}</h3>
                            <p id="myAcceptSenderP">Is now your Friend</p>
                        </div>
                    </div>
                    <div id="myAcceptReceiverResponse">
                        <form class="myAcceptReceiverResponseForm">
                        <input type="hidden" class="sender_id" name="sender_id" value="${senderId}">
                        <input type="hidden" class="receiver_id" name="receiver_id" value="${receiverId}">
                        <button type="submit" class="myAcceptReceiverResponseBtn"><h3 id="myAcceptReceiverResponseH3">Nice!</h3></button>
                        </form>
                    </div>
                `;

                myAcceptRequestsSpace.appendChild(myAcceptNotification);
            })
        }   
    })
    .catch(error => console.log('Error', error));
}