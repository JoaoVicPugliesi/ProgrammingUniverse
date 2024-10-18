export function timeResults() {
    console.log('time');
    const myNetworkingHallOfFameResults = document.getElementById('myNetworkingHallOfFameResults');
    const myStarsResults = document.getElementById('myStarsResults');
    const myMedalResults = document.getElementById('myMedalResults');
    const myNetworkingHallOfFameTimeBtn = document.getElementById('myNetworkingHallOfFameTimeBtn');
    const myTimeResults = document.getElementById('myTimeResults');

    myNetworkingHallOfFameTimeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        myStarsResults.classList.remove('display');
        myMedalResults.classList.remove('display');
        myNetworkingHallOfFameResults.classList.add('display');
        myTimeResults.classList.add('display');
        
    });
}

timeResults();