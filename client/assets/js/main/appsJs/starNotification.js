export function starNotifications() {

    const userId = localStorage.getItem('user_id');
    console.log(userId);
    const payLoad = new URLSearchParams({userId: userId});

    fetch('http://localhost/WindowsUniverse/server/controllers/appControllers/starNotificationsController.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: payLoad,
    })
    .then(res => res.json())
    .then(data => {
        if(data.success) {
            const myStarsRequestsSpace = document.getElementById('myStarsRequestsSpace');

            myStarsRequestsSpace.innerHTML = '';

            data.star.forEach(star => {
                const myStarNotification = document.createElement('div');
                myStarNotification.id = 'myStarNotification';

                myStarNotification.innerHTML = `

                    <div id="myStarTypeDiv" class="flex">
                        <img id="myStarNotificationType" src="/client/assets/images/icons/starWhite.png" alt="">
                        </div>
                        <div id="myStarSenderInformations">
                            <div id="myStarSenderImageDiv" class="flex">
                                <img id="myStarAppImage" src="/server/controllers/appControllers/uploads/${star.app_logo}" alt="">
                            </div>
                            <div id="myStarSenderNamePInsightDiv" class="flex">
                                <h3 id="myStarAppReceiverName">${star.app_name}</h3>
                                <p id="myStarAppReceiverP">Received a Star From</p>
                                <button id="myStarSenderNameBtn"><h3 id="myStarSenderName">${star.username}</h3></button>
                            </div>
                        </div>
                        <div id="myStarReceiverResponse">
                            
                        </div>

                `;
                myStarsRequestsSpace.appendChild(myStarNotification);
            })

            console.log('success');
        } else {
            console.log('error');
        }
    })
    .catch(error => console.log('Error', error));
}

/*
    <form class="myStarReceiverResponseForm">
    <input type="hidden" name="app_id" value="${star.app_id}">
    <input type="hidden" name="user_id" value="${star.rater_user_id}">
    <button type="submit" class="myStarReceiverResponseBtn"><h3 id="myStarReceiverResponseH3">Cool!</h3></button>
    </form>
*/