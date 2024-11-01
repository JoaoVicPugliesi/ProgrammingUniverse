import { fetchUser } from "../fetchUser.js";
import { starNotifications } from "./starNotification.js";

export function updateStar() {

    const myStarsRequestsSpace = document.getElementById('myStarsRequestsSpace');

    myStarsRequestsSpace.addEventListener('submit', (e) => {
        if(e.target.matches('.myStarReceiverResponseForm')) {

            e.preventDefault();
            const prePayLoad = new FormData(e.target);
            const payLoad = new URLSearchParams(prePayLoad);

            fetch('http://localhost/WindowsUniverse/server/controllers/appControllers/updateStarController.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
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