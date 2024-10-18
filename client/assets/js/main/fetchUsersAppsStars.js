export function usersAppsStars() {
    const myNetworkingHallOfFameResults = document.getElementById('myNetworkingHallOfFameResults');
    const myStarsResults = document.getElementById('myStarsResults');
    const myMedalResults = document.getElementById('myMedalResults');
    const myNetworkingHallOfFameStarsBtn = document.getElementById('myNetworkingHallOfFameStarsBtn');
    const myTimeResults = document.getElementById('myTimeResults');
    const myStarsHeroesDiv = document.getElementById('myStarsHeroesDiv');

    myNetworkingHallOfFameStarsBtn.addEventListener('click', (e) => {
        e.preventDefault();

        myTimeResults.classList.remove('display');
        myMedalResults.classList.remove('display');
        myNetworkingHallOfFameResults.classList.add('display');
        myStarsResults.classList.add('display');
    })

    const myStarsUserResultsBtn = document.getElementById('myStarsUserResultsBtn');

    myStarsUserResultsBtn.addEventListener('click', (e) => {
        e.preventDefault();
    
        fetch('http://localhost/WindowsUniverse/server/controllers/userControllers/fetchUsersStarsController.php')
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                myStarsHeroesDiv.innerHTML = ''; 
    
                data.stars.forEach((star, index) => {
                    
                    const myStarUserHero = document.createElement('div');
                    myStarUserHero.id = 'myStarUserHero'; 
                    myStarUserHero.innerHTML = `
                        <div id="myStarUser" class="flex">
                            <h3 class="myHeroPosition">${index + 1}</h3> <!-- Display position dynamically -->
                            <img id="myStarUserHeroImage" src="${star.user_icon}" alt="">
                            <div id="myStarUserHeroStars" class="flex">
                                <h3 id="myStarUserHeroName">${star.username}</h3>
                                <div id="myStarUserHeroesNumberDiv" class="flex">
                                    <img id="myStarsImage" src="/client/assets/images/icons/star.png" alt="">
                                    <h3 id="myStarUserStarsNumber">${star.total_stars}</h3>
                                </div>
                            </div>
                        </div>
                        <div id="myStarUserHeroBtnDiv" class="flex">
                            <button class="myStarUserHeroBtn" data-user-id="${star.user_id}">
                                <h3 id="myStarUserHeroH3">See Profile</h3>
                            </button>
                        </div>
                    `;
    
                    myStarsHeroesDiv.appendChild(myStarUserHero);
                });
               
    
            } else {
                console.log('error');
            }
        })
        .catch(error => console.log('Error', error));
    });
    

    const myStarsAppResultsBtn = document.getElementById('myStarsAppResultsBtn');

    myStarsAppResultsBtn.addEventListener('click', (e) => {
        e.preventDefault();

        fetch('http://localhost/WindowsUniverse/server/controllers/appControllers/fetchAppsStarsController.php')
        .then(res => res.json())
        .then(data => {

            if(data.success) {

                myStarsHeroesDiv.innerHTML = ''; 

                data.stars.forEach((star, index) => {
                    
                    const myStarAppHero = document.createElement('div');
                    myStarAppHero.id = 'myStarAppHero'; 
                    myStarAppHero.innerHTML = `
                        <div id="myStarApp" class="flex">
                            <h3 class="myHeroPosition">${index + 1}</h3> <!-- Display position dynamically -->
                            <img id="myStarAppHeroImage" src="/server/controllers/appControllers/uploads/${star.app_logo}" alt="">
                            <div id="myStarAppHeroStars" class="flex">
                                <h3 id="myStarAppHeroName">${star.app_name}</h3>
                                <div id="myStarAppHeroesNumberDiv" class="flex">
                                    <img id="myStarsImage" src="/client/assets/images/icons/star.png" alt="">
                                    <h3 id="myStarAppStarsNumber">${star.stars_count}</h3>
                                </div>
                            </div>
                        </div>
                        <div id="myStarAppHeroBtnDiv" class="flex">
                            <button class="myStarAppHeroBtn" data-app-id="${star.app_id}">
                                <h3 id="myStarAppHeroH3">See App</h3>
                            </button>
                        </div>
                    `;
    
                    myStarsHeroesDiv.appendChild(myStarAppHero);
                });
                
            } else {
                console.log('error');
            }
        })
        .catch(error => console.log('error', error));
    })

}

usersAppsStars();

/*
    <div id="myStarAppHero" class="flex">
                                            <div id="myStarApp" class="flex">
                                                <h3 class="myHeroPosition">1</h3>
                                                <img id="myStarAppHeroImage" src="/client/assets/images/chrome.png" alt="">
                                                <div id="myStarAppHeroStars" class="flex">
                                                    <h3 id="myStarAppHeroName">Johnpugliesi10</h3>
                                                    <div id="myStarAppHeroesNumberDiv" class="flex">
                                                            <img id="myStarsImage" src="/client/assets/images/icons/star.png" alt="">
                                                            <h3 id="myStarAppStarsNumber">0</h3>
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="myStarAppHeroBtnDiv" class="flex">
                                                <button id="myStarAppHeroBtn"><h3 id="myStarAppHeroH3">See App</h3></button>
                                            </div>
                                        </div>
*/