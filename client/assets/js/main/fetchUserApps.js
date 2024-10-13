export function fetchUserApps () {
    const myAppsUniverse = document.getElementById('myAppsUniverse');
    const userId = document.getElementById('userIdMain').value;
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
                myAppContainer.id = 'myAppContainer';
                myAppContainer.innerHTML = `
                     <button id="myAppImageBtn" data-app-id="${userApp.app_id}"><img id="myAppImage" src="/server/controllers/appControllers/uploads/${userApp.app_logo}" alt="${userApp.app_name}"></button>
                     <h3 id='appName'>${userApp.app_name}</h3>
                `;

                myAppsUniverse.appendChild(myAppContainer);
            })

        } else {
            console.log('error');
        }
    })
    .catch(error => console.error('error', error));
}