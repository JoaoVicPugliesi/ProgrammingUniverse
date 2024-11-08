export function notifications(element) {
    const myNotificationsBtn = document.getElementById('myNotificationsBtn');
    const mySelfNotificationBtn = document.getElementById('mySelfNotificationBtn');
    const myNotifications = document.getElementById('myNotifications');
    const myNotificationsCloseBtn = document.getElementById('myNotificationsCloseBtn');

    myNotificationsCloseBtn.addEventListener('click', (e) => {
        e.preventDefault();
        myNotifications.classList.remove('display');
    })

    myNotificationsBtn.addEventListener('click', (e) => {
        e.preventDefault();

        if (myNotifications.classList.contains('display')) {
            myNotifications.myNotifications.classList.remove('display');
        } else {
            myNotifications.classList.add('display');
        }
    })

    mySelfNotificationBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (myNotifications.classList.contains('display')) {
            myNotifications.classList.remove('display');
        } else {
            myNotifications.classList.add('display');
        }
    })

    let isDragging = false;
    let startX, startY, initialX, initialY;

    element.addEventListener('mousedown', (e) => {
        e.preventDefault();
        if (e.target.closest('#myNotifications') || e.target.closest('#myChatExit')) {  
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;

            initialX = element.offsetLeft;
            initialY = element.offsetTop;

            document.addEventListener('mousemove', drag);
            document.addEventListener('mouseup', stopDrag);
        }
    });

    function drag(e) {
        if (isDragging) {
            e.preventDefault();

            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;

            element.style.left = `${initialX + deltaX}px`;
            element.style.top = `${initialY + deltaY}px`;
        }
    }

    function stopDrag(e) {
        if (isDragging) {
            e.preventDefault();
            isDragging = false;

            document.removeEventListener('mousemove', drag);
            document.removeEventListener('mouseup', stopDrag);
        }
    }

}

const myNotifications = document.getElementById('myNotifications');

notifications(myNotifications);


/*
            <div id="myMessageNotification">
                <div id="myFriendMessageTypeDiv" class="flex">
                <img id="myMessageNotificationType" src="/client/assets/images/icons/chat.png" alt="">
                </div>
                <div id="myMessageSenderInformations">
                    <div id="myMessageSenderImageDiv" class="flex">
                        <img id="myMessageSenderImage" src="/client/assets/images/icon_images/missionImpossible.png" alt="">
                    </div>
                    <div id="myMessageSenderNamePInsightDiv" class="flex">
                        <h3 id="myMessageSenderName">Johnpugliesi10</h3>
                        <p id="myMessageSenderP">Sent a message</p>
                        <p id="myMessageSenderInsight">"Eae bobo! haha"</p>
                    </div>
                </div>
                <div id="myMessageReceiverResponse">
                    <button class="myMessageReceiverResponseBtn"><img id="myMessageReceiverResponseImage" src="/client/assets/images/icons/chat.png" alt=""></button>
                </div>
            </div>
            <div id="myAcceptNotification">
                <div id="myAcceptTypeDiv" class="flex">
                <img id="myAcceptNotificationType" src="/client/assets/images/icons/check.png" alt="">
                </div>
                <div id="myAcceptSenderInformations">
                    <div id="myAcceptSenderImageDiv" class="flex">
                        <img id="myAcceptSenderImage" src="/client/assets/images/icon_images/missionImpossible.png" alt="">
                    </div>
                    <div id="myAcceptSenderNamePInsightDiv" class="flex">
                        <h3 id="myAcceptSenderName">Johnpugliesi10</h3>
                        <p id="myAcceptSenderP">Is now your Friend</p>
                    </div>
                </div>
                <div id="myAcceptReceiverResponse">
                    <button class="myAcceptReceiverResponseBtn"><h3 id="myAcceptReceiverResponseH3">Nice!</h3></button>
                </div>
            </div>
            <div id="myDeclineNotification">
                <div id="myDeclineTypeDiv" class="flex">
                <img id="myDeclineNotificationType" src="/client/assets/images/icons/close.png" alt="">
                </div>
                <div id="myDeclineSenderInformations">
                    <div id="myDeclineSenderImageDiv" class="flex">
                        <img id="myDeclineSenderImage" src="/client/assets/images/icon_images/missionImpossible.png" alt="">
                    </div>
                    <div id="myDeclineSenderNamePInsightDiv" class="flex">
                        <h3 id="myDeclineSenderName">Johnpugliesi10</h3>
                        <p id="myDeclineSenderP">Declined your friend request</p>
                    </div>
                </div>
                <div id="myDeclineReceiverResponse">
                    <button class="myDeclineReceiverResponseBtn"><h3 id="myDeclineReceiverResponseH3">Sad! :|</h3></button>
                </div>
            </div>

*/