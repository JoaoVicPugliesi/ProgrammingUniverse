export function declineNotifications() {
    
    const userId = localStorage.getItem('user_id');

    const payLoad = new URLSearchParams({userId: userId});

    fetch('http://localhost/WindowsUniverse/server/controllers/friendshipControllers/declineNotificationsController.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: payLoad,
    })
    .then(res => res.json())
    .then(data => {
        if(data.success) {
            const myDeclineRequestsSpace = document.getElementById('myDeclineRequestsSpace');

            myDeclineRequestsSpace.innerHTML = '';

            data.declines.forEach(decline => {
                const myDeclineNotification = document.createElement('div');
                myDeclineNotification.id = 'myDeclineNotification';
                myDeclineNotification.setAttribute('data-receiver-id', decline.receiver_id);
                myDeclineNotification.innerHTML = `
                     <div id="myDeclineTypeDiv" class="flex">
                    <img id="myDeclineNotificationType" src="/client/assets/images/icons/close.png" alt="">
                    </div>
                    <div id="myDeclineSenderInformations">
                        <div id="myDeclineSenderImageDiv" class="flex">
                            <img id="myDeclineSenderImage" src="${decline.user_icon}" alt="">
                        </div>
                        <div id="myDeclineSenderNamePInsightDiv" class="flex">
                            <h3 id="myDeclineSenderName">${decline.username}</h3>
                            <p id="myDeclineSenderP">Declined your friend request</p>
                        </div>
                    </div>
                    <div id="myDeclineReceiverResponse">
                        <form class="myDeclineReceiverResponseForm">
                        <input type="hidden" name="sender_id" value="${userId}">
                        <input type="hidden" name="receiver_id" value="${decline.receiver_id}">
                        <button type="submit" class="myDeclineReceiverResponseBtn"><h3 id="myDeclineReceiverResponseH3">Sad! :|</h3></button>
                        </form>
                    </div>
                `;
                myDeclineRequestsSpace.appendChild(myDeclineNotification);
            })
        } 
    })
    .catch(error => console.log('Error', error));
}