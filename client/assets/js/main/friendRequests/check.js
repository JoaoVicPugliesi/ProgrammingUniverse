import { fetchUser } from "../fetchUser.js";
import { acceptNotifications } from "./acceptNofitications.js";
import { friends } from "./friends.js";

export function check() {
    const myAcceptRequestsSpace = document.getElementById('myAcceptRequestsSpace');

    myAcceptRequestsSpace.addEventListener('submit', (e) => {
        if(e.target.matches('.myAcceptReceiverResponseForm')) {
                e.preventDefault();
    
                const prePayLoad = new FormData(e.target);
                const payLoad = new URLSearchParams(prePayLoad);
    
                fetch('http://localhost/WindowsUniverse/server/controllers/friendshipControllers/checkController.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: payLoad,
                })
                .then(res => res.json())
                .then(data => {
                    if(data.success) {

                        const senderId = prePayLoad.get('sender_id');
                        const requestElement = document.querySelector(`[data-sender-id="${senderId}"]`);  

                        if (requestElement) {
                            requestElement.remove();  
                        }

                        fetchUser();
                        acceptNotifications();
                        friends();
                    } else {
                        console.log('error');
                    }
                })
                .catch(error => console.log('Error', error));
        }
    })
}

check();
