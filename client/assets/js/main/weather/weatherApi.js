let timeInterval;

export async function checkWeather(city) {

        const myHowMuchWeather = document.getElementById('myHowMuchWeather');
        const myPlaceName = document.getElementById('myPlaceName');
        const myWeatherIllustration = document.getElementById('myWeatherIllustration');
        const myDayOfWeek = document.getElementById('myDayOfWeek');
        const myDay = document.getElementById('myDay');
        const myHour = document.getElementById('myHour');
        const myFriendRequestFeedback = document.getElementById('myFriendRequestFeedback');
        const myFriendRequestFeedbackH3 = document.getElementById('myFriendRequestFeedbackH3');
        const myFriendRequestFeedbackP = document.getElementById('myFriendRequestFeedbackP');
        const myFriendRequestFeedbackBtn = document.getElementById('myFriendRequestFeedbackBtn');                
        
  
        const apiKey = "4ad1333af26eecdebe02a4e3efda7cd5";
        const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

        if(response.status == 404) {
            myFriendRequestFeedback.classList.add('display');
            myFriendRequestFeedbackH3.textContent = 'Oops!';
            myFriendRequestFeedbackP.textContent = 'No city found';
            myFriendRequestFeedbackBtn.addEventListener('click', (e) => {
                e.preventDefault();
                myFriendRequestFeedback.classList.remove('display');
            })                   
            return false;
        }

        const data = await response.json();

        if(data.weather[0].main == "Clouds") {
            myWeatherIllustration.src = '/client/assets/images/weather/clouds.png';
        }

        if(data.weather[0].main == "Clear") {
            myWeatherIllustration.src = '/client/assets/images/weather/sun.png';
        }

        if(data.weather[0].main == "Rain") {
            myWeatherIllustration.src = '/client/assets/images/weather/rain.png';
        }

        if(data.weather[0].main == "Drizzle") {
            myWeatherIllustration.src = '/client/assets/images/weather/drizzle.png';
        }

        if(data.weather[0].main == "Mist") {
            myWeatherIllustration.src = '/client/assets/images/weather/mist.png';
        }


        myHowMuchWeather.innerHTML = Math.round(data.main.temp) + 'ºC';
        myPlaceName.innerHTML = data.name;

        const timezoneOffsetInSeconds = data.timezone;
        const utcTime = new Date().getTime() + new Date().getTimezoneOffset() * 60000;
        let localTime = new Date(utcTime + timezoneOffsetInSeconds * 1000);

        if (timeInterval) {
            clearInterval(timeInterval);
        }

    function updateTime() {
        localTime.setSeconds(localTime.getSeconds() + 1);

        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const dayOfWeek = daysOfWeek[localTime.getUTCDay()];
        const day = localTime.toLocaleDateString();
        const hour = localTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

        myDayOfWeek.innerHTML = dayOfWeek;
        myDay.innerHTML = day;
        myHour.innerHTML = hour;
    }

        updateTime();

        timeInterval = setInterval(updateTime, 1000);

        console.log(data);
        return true;
}

