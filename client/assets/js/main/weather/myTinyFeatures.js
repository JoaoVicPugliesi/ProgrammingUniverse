import { checkWeather } from "./weatherApi.js";

export function myTinyFeatures() {

    const myWorldPlaces = document.getElementById('myWorldPlaces');
    const myChangePlaceBtn = document.getElementById('myChangePlaceBtn');
    const myWorldPlaceCloseBtn = document.getElementById('myWorldPlaceCloseBtn');
    const mySearchBarBtn = document.getElementById('myWorldPlaceSearchBarBtn');
    const myPlaceUserId = document.getElementById('myPlaceUserId');

    function myTinyFeaturesDisplay (element, btn, btn2) {

        btn.addEventListener('click', (e) => {
            e.preventDefault();
            element.classList.add('display')
        })

        btn2.addEventListener('click', (e) => {
            e.preventDefault();
            element.classList.remove('display')
        })
    }

    myTinyFeaturesDisplay(myWorldPlaces, myChangePlaceBtn, myWorldPlaceCloseBtn);
 
    const mySearchBar = document.getElementById('myWorldPlaceSearchBar');

   mySearchBarBtn.addEventListener('click', async (e) => {

        e.preventDefault();

        const weatherCheckResult = await checkWeather(mySearchBar.value);

        if (!weatherCheckResult) {
            return;
        }

        setTimeout(() => {
            myWorldPlaces.classList.remove('display');
        }, 1000) 

        myPlaceUserId.value = localStorage.getItem('user_id');

        const payLoad = new URLSearchParams({user_id: myPlaceUserId.value, user_place: mySearchBar.value});

        fetch('http://localhost/WindowsUniverse/server/controllers/userControllers/placeController.php', {
            method: 'POST',
            body: payLoad,
        })
        .then(res => res.json())
        .then(data => {
            if(data.success) {
                console.log('Success');
            } else {
                console.log('error');
            }
        })
        .catch(error => console.log('Error', error));
   })

}

myTinyFeatures();