import { fetchUser } from "../fetchUser.js";
import { starNotifications } from "./starNotification.js";

export function updateStar() {

    const myStarsRequestsSpace = document.getElementById('myStarsRequestsSpace');

    myStarsRequestsSpace.addEventListener('submit', (e) => {
        if(e.target.matches('.myStarReceiverResponseForm')) {

            e.preventDefault();
            console.log("App ID:", e.target.querySelector('input[name="app_id"]').value);
            console.log("User ID:", e.target.querySelector('input[name="user_id"]').value);
            const prePayLoad = new FormData(e.target);
            const payLoad = new URLSearchParams(prePayLoad);

            fetch('http://localhost/WindowsUniverse/server/controllers/appControllers/updateStarController.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-url-encoded',
                },
                body: payLoad,
            })
            .then(res => res.json())
            .then(data => {
                if(data.success) {
                    starNotifications();
                    fetchUser();
                } else {
                    console.log('error');
                }
            })
            .catch(error => console.log('Error', error));

        }
    })
}

updateStar();