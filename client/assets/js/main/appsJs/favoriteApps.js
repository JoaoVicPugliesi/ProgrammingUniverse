import { openAppContainer } from "./openAppContainer.js";

export function favoriteApps() {
    const userId = localStorage.getItem('user_id');

    const payLoad = new URLSearchParams({userId: userId});

    fetch('http://localhost/WindowsUniverse/server/controllers/appControllers/favoriteAppsController.php', {
        method: 'POST',
        body: payLoad,
    })
    .then(res => res.json())
    .then(data => {
        if(data.success) {

            const myMenuFavoriteApps = document.getElementById('myMenuFavoriteApps');

            myMenuFavoriteApps.innerHTML = '';

            data.apps.forEach(app => {
                const myFavoriteApp = document.createElement('div');
                myFavoriteApp.id = 'myFavoriteApp';
                myFavoriteApp.innerHTML = `

                    <button class="myFavoriteAppBtn" data-app-id=${app.app_id}>
                            <img id="myFavoriteAppBtnImage" src="/server/controllers/appControllers/uploads/${app.app_logo}" alt="">
                    </button>
                
                `;
                myMenuFavoriteApps.appendChild(myFavoriteApp);
            })

            const myFavoriteAppBtn = document.querySelectorAll('.myFavoriteAppBtn');
            const myForeignAppContainerOpen = document.getElementById('myForeignAppContainerOpen');
            const myForeignAppContainerMinimizeBtn = document.getElementById('myForeignAppContainerMinimizeBtn');
            const myForeignAppContainerCloseBtn = document.getElementById('myForeignAppContainerCloseBtn');

            openAppContainer(myFavoriteAppBtn, myForeignAppContainerOpen, myForeignAppContainerMinimizeBtn, myForeignAppContainerCloseBtn);
            
        } else {
            console.log('error');
        }
    })
    .catch(error => console.log('Error', error));
}

