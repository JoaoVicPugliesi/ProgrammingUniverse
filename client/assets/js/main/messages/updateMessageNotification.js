import { fetchUser } from "../fetchUser.js";
import { friendMessageNotifications } from "./friendMessageNotifications.js";

export function updateMessageNotification (btns) {
    
    btns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();

            const userIdX = localStorage.getItem('user_id');
            const userIdY = btn.getAttribute('user_id');

            const payLoad = new URLSearchParams({userIdX: userIdX, userIdY: userIdY});

            fetch('http://localhost/WindowsUniverse/server/controllers/messageControllers/updateMessageNotificationController.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: payLoad,
            })
            .then(res => res.json())
            .then(data => {
                if(data.success) {
                    friendMessageNotifications();
                    fetchUser();
                } else {
                    console.log('Error');
                }
            })
            .catch(error => console.log('Error', error));
        });
    })
}