import { openAppContainer } from "./appsJs/openAppContainer.js";

export function fetchUserApps () {

    const myAppsUniverse = document.getElementById('myAppsUniverse');
    const userId = localStorage.getItem('user_id');
    const payLoad = new URLSearchParams({userId: userId});

    fetch('http://localhost/WindowsUniverse/server/controllers/appControllers/fetchUserAppsController.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: payLoad,
    })
    .then(res => res.json())
    .then(data => {
        if(data.success) {

            data.userApps.forEach(userApp => {

                const myAppContainer = document.createElement('div');

                myAppContainer.className = 'myAppContainer';
                myAppContainer.innerHTML = `
                     <button class="myAppImageBtn" data-app-id="${userApp.app_id}">
                     <img id="myAppImage" src="/server/controllers/appControllers/uploads/${userApp.app_logo}" alt="${userApp.app_name}">
                     <h3 id='appName'>${userApp.app_name}</h3>
                     </button>
                `;

                myAppsUniverse.appendChild(myAppContainer);
            })
            
            const myAppContainer = document.querySelectorAll('.myAppContainer')
            const myAppContainerOpen = document.getElementById('myAppContainerOpen');
            const myAppContainerMinimizeBtn = document.getElementById('myAppContainerMinimizeBtn');
            const myAppContainerCloseBtn = document.getElementById('myAppContainerCloseBtn');

            openAppContainer(myAppContainer, myAppContainerOpen, myAppContainerMinimizeBtn, myAppContainerCloseBtn);

            const myAppImageBtn = document.querySelectorAll('.myAppImageBtn');

                myAppImageBtn.forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        e.preventDefault();
                        
                        const appId = btn.getAttribute('data-app-id');
                        
                        const payLoad = new URLSearchParams({app_id: appId});

                        fetch('http://localhost/WindowsUniverse/server/controllers/appControllers/openAppController.php', {
                            method: 'POST',
                            body: payLoad,
                        })
                        .then(res => res.json())
                        .then(data => {

                            const myAppContainerInfoFormId = document.getElementById('myAppContainerInfoFormId');
                            const myAppContainerInfoBannerImg = document.getElementById('myAppContainerInfoBannerImg');
                            const myAppContainerInfoBannerName = document.getElementById('myAppContainerInfoBannerName');
                            const myAppContainerInfoBannerStarsNumber = document.getElementById('myAppContainerInfoBannerStarsNumber');
                            const myAppContainerInfoBannerAuthorName = document.getElementById('myAppContainerInfoBannerAuthorName');
                            const myAppContainerInfoBannerDescription = document.getElementById('myAppContainerInfoBannerDescription');
                            const myAppContainerInfoBannerLink = document.getElementById('myAppContainerInfoBannerLink');
                            const myAppContainerInfoBannerVisibility = document.getElementById('myAppContainerInfoBannerVisibility');

                            if(data.success) {
                                myAppContainerInfoFormId.value = data.app.app_id;
                                myAppContainerInfoBannerImg.src = `/server/controllers/appControllers/uploads/${data.app.app_logo}`;
                                myAppContainerInfoBannerName.value = data.app.app_name;
                                myAppContainerInfoBannerStarsNumber.innerHTML = data.app.stars_count;
                                myAppContainerInfoBannerAuthorName.innerHTML = data.app.app_author;
                                myAppContainerInfoBannerDescription.innerHTML = data.app.app_description;
                                myAppContainerInfoBannerLink.value = data.app.app_url;
                                myAppContainerInfoBannerVisibility.innerHTML = data.app.app_visibility;
    
                            } else {
                                console.log('error');
                            }
                        })
                        .catch(error => console.log('error', error));
                    })
                })
        } else {
            console.log('error');
        }
    })
    .catch(error => console.error('error', error));
}