export function usersMedal() {

    const myNetworkingHallOfFameMedalsBtn = document.getElementById('myNetworkingHallOfFameMedalsBtn');
    const myNetworkingHallOfFameResults = document.getElementById('myNetworkingHallOfFameResults');
    const myStarsResults = document.getElementById('myStarsResults');
    const myMedalResults = document.getElementById('myMedalResults');
    const myMedalHeroesDiv = document.getElementById('myMedalHeroesDiv');
    const myTimeResults = document.getElementById('myTimeResults');

   
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
                            <div id="myMedalHeroPositionDiv">
                            <h3 class="myHeroPosition" style="color: ${color};">${index + 1}</h3>
                            </div>
                            <img id="myMedalHeroImage" src="${medal.user_icon}" alt="">
                            <div id="myMedalHeroMedals" class="flex">
                                <h3 id="myMedalHeroName">${medal.username}</h3>
                                <div id="myMedalHeroesNumberDiv" class="flex">
                                        <img id="myMedalHeroes" src="/client/assets/images/icons/medal.png" alt="">
                                        <h3 id="myMedalHeroesNumber">${medal.medal_count == 0 ? 0 : medal.medal_count}</h3>
                                </div>
                            </div>
                            </div>

                            <div id="myStarUserHeroBtnDiv" class="flex">

                            </div>
                            
                        </div>
                    `;

                    myMedalHeroesDiv.appendChild(myMedalHero);
                })
                
            } else {
                console.log('error');
            }
        })
        .catch(error => console.log('Error', error));

        myNetworkingHallOfFameMedalsBtn.addEventListener('click', (e) => {

            myTimeResults.classList.remove('display');
            myStarsResults.classList.remove('display');
            myNetworkingHallOfFameResults.classList.add('display');
            myMedalResults.classList.add('display');
        
            e.preventDefault();
            usersMedal();
        })
}

usersMedal();


/*
      ${
            medal.user_id != localStorage.getItem('user_id') ?
            `<button class="myMedalUserHeroBtn" data-user-id=${medal.user_id}><h3 id="mySeeProfileBtnH3">See Profile</h3></button>`
            : '<button class="mySelfMedalBtn"><h3 id="mySelfBtnH3">Edit Profile</h3></button>'
      }
*/