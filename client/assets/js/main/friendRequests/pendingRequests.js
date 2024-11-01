import { seeProfileDisplay } from "../seeProfileDisplay.js";

export function pendingRequests() {
    const userId = localStorage.getItem('user_id');

    const payLoad = new URLSearchParams({userId: userId});

    fetch('http://localhost/WindowsUniverse/server/controllers/friendshipControllers/pendingRequestsController.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: payLoad,
    })
    .then(res => res.json())
    .then(data => {
        if(data.success) {
            const myFriendRequestsSpace = document.getElementById('myFriendRequestsSpace');

            myFriendRequestsSpace.innerHTML = '';

            data.requests.forEach(request => {
                const myFriendRequestNotification = document.createElement('div');
                myFriendRequestNotification.className = 'myFriendRequestNotification';
                myFriendRequestNotification.innerHTML = `

                        <div id="myFriendRequestNotificationTypeDiv" class="flex">
                        <h3>+</h3>
                        <img id="myFriendRequestNotificationType" src="/client/assets/images/request.png" alt="">
                        </div>
                        <div id="myFriendRequestSenderInformations">
                            <div id="myFriendRequestSenderImageDiv" class="flex">
                                <img id="myFriendRequestSenderImage" src="${request.user_icon}" alt="">
                            </div>
                            <div id="myFriendRequestSenderNamePBtnDiv" class="flex">
                                <h3 id="myFriendRequestSenderName">${request.username}</h3>
                                <p id="myFriendRequestSenderP">Wants to be your friend</p>
                                <button class="myFriendRequestSenderBtn" data-user-id="${request.sender_id}"><h3 id="myFriendRequestSenderH3">See Profile</h3></button>
                            </div>
                        </div>
                        <div class="myFriendRequestReceiverResponse">
                            <form class="myFriendRequestReceiverFormAcceptResponse">
                            <input type="hidden" name="receiver_id" value="${userId}">
                            <input type="hidden" name="sender_id" value="${request.sender_id}">
                            <button type="submit" class="myFriendRequestReceiverAcceptResponseBtn" data-sender-id="${request.sender_id}"><img id="myFriendRequestReceiverResponseImage" src="/client/assets/images/icons/check.png" alt=""></button>
                            </form>
                            <form class="myFriendRequestReceiverFormDeclineResponse">
                            <input type="hidden" name="receiver_id" value="${userId}">
                            <input type="hidden" name="sender_id" value="${request.sender_id}">
                            <button type="submit" class="myFriendRequestReceiverDeclineResponseBtn" data-sender-id="${request.sender_id}"><img id="myFriendRequestReceiverResponseImage" src="/client/assets/images/icons/close.png" alt=""></button>
                            </form>
                        </div>
                    
                `;
                myFriendRequestsSpace.appendChild(myFriendRequestNotification);
            })

            const myFriendRequestSenderBtn = document.querySelectorAll('.myFriendRequestSenderBtn');

            seeProfileDisplay(myFriendRequestSenderBtn);
        } 
    })
    .catch(error => console.log('Error', error));
}

