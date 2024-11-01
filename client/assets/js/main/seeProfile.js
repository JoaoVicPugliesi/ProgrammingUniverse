import { favoriteApps } from "./appsJs/favoriteApps.js";
import { fetchAppContainer } from "./appsJs/fetchAppsContainer.js";
import { openAppContainer } from "./appsJs/openAppContainer.js";

export function seeProfile() {
    const mySeeProfile = document.getElementById('mySeeProfile');

    let isDragging = false;
    let startX, startY, initialX, initialY;

    mySeeProfile.addEventListener('mousedown', (e) => {
        if (e.target.closest('#myProfileIconNameScores') || e.target.closest('#myProfileDescriptionOrApps')) {  
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;

            initialX = mySeeProfile.offsetLeft;
            initialY = mySeeProfile.offsetTop;

            document.addEventListener('mousemove', drag);
            document.addEventListener('mouseup', stopDrag);
        }
    });

    function drag(e) {
        if (isDragging) {
            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;

            mySeeProfile.style.left = `${initialX + deltaX}px`;
            mySeeProfile.style.top = `${initialY + deltaY}px`;
        }
    }

    function stopDrag() {
        if (isDragging) {
            isDragging = false;
            document.removeEventListener('mousemove', drag);
            document.removeEventListener('mouseup', stopDrag);
        }
    }
    
    const myProfileDescriptionSectionBtn = document.getElementById('myProfileDescriptionSectionBtn');
    const myProfileAppsSectionBtn = document.getElementById('myProfileAppsSectionBtn');
    const myProfileDescriptionDiv = document.getElementById('myProfileDescriptionDiv');
    const mySeeProfileApps = document.getElementById('mySeeProfileApps');

    myProfileDescriptionSectionBtn.addEventListener('click', (e) => {
        e.preventDefault();
        mySeeProfileApps.classList.remove('display');
        myProfileDescriptionDiv.classList.remove('remove');
        myProfileDescriptionDiv.classList.add('display');
    });

    myProfileAppsSectionBtn.addEventListener('click', (e) => {
        e.preventDefault();

        mySeeProfileApps.innerHTML = '';
        myProfileDescriptionDiv.classList.add('remove');
        myProfileDescriptionDiv.classList.remove('display');
        mySeeProfileApps.classList.add('display');

        const userId = myProfileAppsSectionBtn.getAttribute('data-user-id');
        const loggedUserId = localStorage.getItem('user_id');
        const payLoad = new URLSearchParams({ userId: userId, loggedUserId: loggedUserId });

        fetch('http://localhost/WindowsUniverse/server/controllers/appControllers/fetchUserAppsController.php', {
            method: 'POST',
            body: payLoad,
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                const mySeeProfileApps = document.getElementById('mySeeProfileApps');
                mySeeProfileApps.innerHTML = '';

                data.userApps.forEach(userApp => {
                    const mySeeProfileApp = document.createElement('div');
                    mySeeProfileApp.className = 'mySeeProfileApp';

                    mySeeProfileApp.innerHTML = `
                        <button class="mySeeProfileAppBtn" data-app-id="${userApp.app_id}">
                            <img id="mySeeProfileAppLogo" src="/server/controllers/appControllers/uploads/${userApp.app_logo}" alt="">
                            <h3 id="mySeeProfileAppName">${userApp.app_name}</h3>
                        </button>
                        <button class="mySeeProfileGiveStarBtn ${userApp.is_starred ? 'remove' : 'display'}" data-giveStar-id="${userApp.app_id}">
                            <img id="mySeeProfileGiveStarBtnImage" src="/client/assets/images/icons/emptyStar.png" alt="">
                        </button>
                        <button class="mySeeProfileRemoveStarBtn ${userApp.is_starred ? 'display' : 'remove'}" data-removeStar-id="${userApp.app_id}">
                            <img id="mySeeProfileRemoveStarBtnImage" src="/client/assets/images/icons/star.png" alt="">
                        </button>
                    `;

                    mySeeProfileApps.appendChild(mySeeProfileApp);

                });

                const mySeeProfileApp = document.querySelectorAll('.mySeeProfileApp');
                const myForeignAppContainerOpen = document.getElementById('myForeignAppContainerOpen');
                const myForeignAppContainerMinimizeBtn = document.getElementById('myForeignAppContainerMinimizeBtn');
                const myForeignAppContainerCloseBtn = document.getElementById('myForeignAppContainerCloseBtn');

                openAppContainer(mySeeProfileApp, myForeignAppContainerOpen, myForeignAppContainerMinimizeBtn, myForeignAppContainerCloseBtn);

                const mySeeProfileGiveStarBtn = document.querySelectorAll('.mySeeProfileGiveStarBtn');
                const mySeeProfileRemoveStarBtn = document.querySelectorAll('.mySeeProfileRemoveStarBtn');
                
                mySeeProfileGiveStarBtn.forEach((btn, index) => {
                    btn.addEventListener('click', (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        const appId = btn.getAttribute('data-giveStar-id');
                        const userId = localStorage.getItem('user_id');

                        const payLoad = new URLSearchParams({app_id: appId, user_id: userId});

                        fetch('http://localhost/WindowsUniverse/server/controllers/appControllers/giveStarController.php', {
                            method: 'POST',
                            body: payLoad,
                        })
                        .then(res => res.json())
                        .then(data => {
                            if(data.success) {
                                favoriteApps();
                            } else {
                                console.log('error');
                            }
                        })
                        .catch(error => console.log('Error', error));

                        mySeeProfileRemoveStarBtn[index].classList.add('display');
                
                        btn.classList.add('remove');
                    })
                }) 
                
                mySeeProfileRemoveStarBtn.forEach((btn, index) => {
                    btn.addEventListener('click', (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        const appId = btn.getAttribute('data-removeStar-id');
                        const userId = localStorage.getItem('user_id');

                        const payLoad = new URLSearchParams({app_id: appId, user_id: userId});

                        fetch('http://localhost/WindowsUniverse/server/controllers/appControllers/removeStarController.php', {
                            method: 'POST',
                            body: payLoad,
                        })
                        .then(res => res.json())
                        .then(data => {
                            if(data.success) {
                                favoriteApps(); 
                            } else {
                                console.log('error');
                            }
                        })
                        .catch(error => console.log('Error', error));

                        mySeeProfileGiveStarBtn[index].classList.remove('remove');
                
                        btn.classList.remove('display');
                
                    })
                })


                const mySeeProfileAppBtn = document.querySelectorAll('.mySeeProfileAppBtn');

                const myForeignAppContainerInfoBannerImg = document.getElementById('myForeignAppContainerInfoBannerImg');
                const myForeignAppContainerInfoBannerName = document.getElementById('myForeignAppContainerInfoBannerName');
                const myForeignAppContainerInfoBannerStarsNumber = document.getElementById('myForeignAppContainerInfoBannerStarsNumber');
                const myForeignAppContainerInfoBannerAuthorName = document.getElementById('myForeignAppContainerInfoBannerAuthorName');
                const myForeignAppContainerInfoBannerDescription = document.getElementById('myForeignAppContainerInfoBannerDescription');
                const myForeignAppContainerInfoBannerLink = document.getElementById('myForeignAppContainerInfoBannerLink');
                const myForeignAppContainerInfoBannerVisibility = document.getElementById('myForeignAppContainerInfoBannerVisibility');
                const myForeignAppContainerInfoBannerSearchLink = document.getElementById('myForeignAppContainerInfoBannerSearchLink');

                fetchAppContainer(mySeeProfileAppBtn, myForeignAppContainerInfoBannerImg, myForeignAppContainerInfoBannerName, myForeignAppContainerInfoBannerStarsNumber, myForeignAppContainerInfoBannerAuthorName, myForeignAppContainerInfoBannerDescription, myForeignAppContainerInfoBannerLink, myForeignAppContainerInfoBannerVisibility, myForeignAppContainerInfoBannerSearchLink);
                
            } else {
                console.log('error');
            }
        })
        .catch(error => console.log('Error', error));
    });
}

seeProfile();


