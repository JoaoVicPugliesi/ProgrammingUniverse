import { fetchAppContainer } from "./fetchAppsContainer.js";
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
            const myForeignAppContainerInfoBannerImg = document.getElementById('myForeignAppContainerInfoBannerImg');
            const myForeignAppContainerInfoBannerName = document.getElementById('myForeignAppContainerInfoBannerName');
            const myForeignAppContainerInfoBannerStarsNumber = document.getElementById('myForeignAppContainerInfoBannerStarsNumber');
            const myForeignAppContainerInfoBannerAuthorName = document.getElementById('myForeignAppContainerInfoBannerAuthorName');
            const myForeignAppContainerInfoBannerDescription = document.getElementById('myForeignAppContainerInfoBannerDescription');
            const myForeignAppContainerInfoBannerLink = document.getElementById('myForeignAppContainerInfoBannerLink');
            const myForeignAppContainerInfoBannerVisibility = document.getElementById('myForeignAppContainerInfoBannerVisibility');
            const myForeignAppContainerInfoBannerSearchLink = document.getElementById('myForeignAppContainerInfoBannerSearchLink');

            fetchAppContainer(myFavoriteAppBtn, myForeignAppContainerInfoBannerImg, myForeignAppContainerInfoBannerName, myForeignAppContainerInfoBannerStarsNumber, myForeignAppContainerInfoBannerAuthorName, myForeignAppContainerInfoBannerDescription, myForeignAppContainerInfoBannerLink, myForeignAppContainerInfoBannerVisibility, myForeignAppContainerInfoBannerSearchLink);
            
            
        } else {
            console.log('error');
        }
    })
    .catch(error => console.log('Error', error));
}

