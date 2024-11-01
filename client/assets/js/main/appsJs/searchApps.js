import { favoriteApps } from "./favoriteApps.js";
import { fetchAppContainer } from "./fetchAppsContainer.js";
import { openAppContainer } from "./openAppContainer.js";


export function searchApps() {
    const myMenuSearchBarInput = document.getElementById('myMenuSearchBarInput');
    const userId = localStorage.getItem('user_id');
    console.log(userId);

    let debounceTimeout;
    const debounce = (func, delay) => {
        return (...args) => {
            clearTimeout(debounceTimeout);
            debounceTimeout = setTimeout(() => func.apply(this, args), delay);
        };
    };

    const fetchSearchResults = () => {
        const searchValue = myMenuSearchBarInput.value.trim();
        if (searchValue.length === 0) {
            favoriteApps();
            return;
        }

        const payLoad = new URLSearchParams({searchedApp: searchValue, userId: userId});

        fetch('http://localhost/WindowsUniverse/server/controllers/appControllers/searchAppController.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: payLoad,
        })
        .then(res => res.json())
        .then(data => {
        

            if(data.success) {

                const myMenuFavoriteApps = document.getElementById('myMenuFavoriteApps');

                myMenuFavoriteApps.innerHTML = '';
    
                data.searchedApps.forEach(searchedApps => {
                    const myFavoriteApp = document.createElement('div');
                    myFavoriteApp.id = 'myFavoriteApp';
                    myFavoriteApp.innerHTML = `
                        <button class="myFavoriteAppBtn" data-app-id=${searchedApps.app_id}>
                                <img id="myFavoriteAppBtnImage" src="/server/controllers/appControllers/uploads/${searchedApps.app_logo}" alt="">
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
                console.log('Error');
            }
        })
        .catch(error => console.log('Error', error));
    };

    myMenuSearchBarInput.addEventListener('keyup', debounce(fetchSearchResults, 300)); 
}

searchApps();