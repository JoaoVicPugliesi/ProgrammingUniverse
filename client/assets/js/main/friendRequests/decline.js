import { fetchUser } from "../fetchUser.js";
import { declineNotifications } from "./declineNotifications.js";

export function decline() {
    const myFriendRequestsSpace = document.getElementById('myFriendRequestsSpace');
    myFriendRequestsSpace.addEventListener('submit', (e) => {
        if (e.target.matches('.myFriendRequestReceiverFormDeclineResponse')) {
            e.preventDefault(); 
    
            const prePayLoad = new FormData(e.target);
            const payLoad = new URLSearchParams(prePayLoad);
    
            fetch('http://localhost/WindowsUniverse/server/controllers/friendshipControllers/declineController.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: payLoad,
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    const senderId = prePayLoad.get('sender_id'); 
                    const requestElement = document.querySelector(`[data-sender-id="${senderId}"]`).closest('#myFriendRequestNotification');
                    
                    if (requestElement) {
                        requestElement.remove(); 
                    }
                    fetchUser();
                    declineNotifications();
                } else {
                    console.log('error');
                }
            })
            .catch(error => console.log('Error', error));
        }
    });
    
}

decline();

