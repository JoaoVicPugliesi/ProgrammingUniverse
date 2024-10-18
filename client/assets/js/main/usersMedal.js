export function usersMedal() {

    const myNetworkingHallOfFameMedalsBtn = document.getElementById('myNetworkingHallOfFameMedalsBtn');
    const myNetworkingHallOfFameResults = document.getElementById('myNetworkingHallOfFameResults');
    const myStarsResults = document.getElementById('myStarsResults');
    const myMedalResults = document.getElementById('myMedalResults');
    const myMedalHeroesDiv = document.getElementById('myMedalHeroesDiv');
    const myTimeResults = document.getElementById('myTimeResults');

    myNetworkingHallOfFameMedalsBtn.addEventListener('click', (e) => {

            myTimeResults.classList.remove('display');
            myStarsResults.classList.remove('display');
            myNetworkingHallOfFameResults.classList.add('display');
            myMedalResults.classList.add('display');
        
        e.preventDefault();
        fetch('http://localhost/WindowsUniverse/server/controllers/userControllers/fetchUsersMedalsController.php')
        .then(res => res.json())
        .then(data => {
            if(data.success) {

                myMedalHeroesDiv.innerHTML = '';
                
                data.medals.sort((a, b) => b.medal_count - a.medal_count);

                data.medals.forEach((medal, index) => {  


                    let color;
                    if (index === 0) {
                        color = '#ffcc33'; 
                    }
                    if (index === 1) {
                        color = '#c0c0c0'; 
                    }           
                    if (index === 2) {
                        color = '#cd7f32'; 
                    } 
                    if(index > 2) {
                        color = 'white';   
                    }

                    const myMedalHero = document.createElement('div');

                    myMedalHero.id = 'myMedalHero';
                    myMedalHero.innerHTML = `
                        <div class="myMedalHero">
                            <div id="myMedalHeroUser" class="flex">
                            <h3 class="myHeroPosition" style="color: ${color};">${index + 1}</h3>
                            <img id="myMedalHeroImage" src="${medal.user_icon}" alt="">
                            <div id="myMedalHeroMedals" class="flex">
                                <h3 id="myMedalHeroName">${medal.username}</h3>
                                <div id="myMedalHeroesNumberDiv" class="flex">
                                        <img id="myMedalHeroes" src="/client/assets/images/icons/medal.png" alt="">
                                        <h3 id="myMedalHeroesNumber">${medal.medal_count == 0 ? 0 : medal.medal_count}</h3>
                                </div>
                            </div>
                            </div>
                            <button id="mySeeProfileBtn" class="flex"><h3 id="mySeeProfileBtnH3">See Profile</h3></button>
                        </div>
                    `;

                    myMedalHeroesDiv.appendChild(myMedalHero);
                })
                
            } else {
                console.log('error');
            }
        })
        .catch(error => console.log('Error', error));
        })
}

usersMedal();