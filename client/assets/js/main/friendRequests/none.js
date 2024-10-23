import { fetchUser } from "../fetchUser.js";
import { declineNotifications } from "./declineNotifications.js";

export function none() {
    const myDeclineRequestsSpace = document.getElementById('myDeclineRequestsSpace');

    myDeclineRequestsSpace.addEventListener('submit', (e) => {
        if(e.target.matches('.myDeclineReceiverResponseForm')) {
            e.preventDefault();

            const prePayLoad = new FormData(e.target);
            const payLoad = new URLSearchParams(prePayLoad);

            fetch('http://localhost/WindowsUniverse/server/controllers/friendshipControllers/noneController.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: payLoad,
            })
            .then(res => res.json())
            .then(data => {
                if(data.success) {

                    const receiverId = prePayLoad.get('receiver_id');
                    const requestElement = document.querySelector(`[data-receiver-id="${receiverId}"]`);

                    if (requestElement) {
                        requestElement.remove();
                    }

                    fetchUser();
                    declineNotifications();
                }
            })
            .catch(error => console.log('Error', error));
        }
    })
}

none();