export function fetchAppContainer(btns, element2, element3, element4, element5, element6, element7, element8, element9) {
    btns.forEach(btn => {
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

                


                if(data.success) {
                    element2.src = `/server/controllers/appControllers/uploads/${data.app.app_logo}`;
                    element3.innerHTML = data.app.app_name;
                    element3.value = data.app.app_name;
                    element4.innerHTML = data.app.stars_count;
                    element5.innerHTML = data.app.app_author;
                    element6.innerHTML = data.app.app_description;
                    element7.value = data.app.app_url;
                    element7.innerHTML = data.app.app_url;
                    element8.innerHTML = data.app.app_visibility;
                    element9.href = data.app.app_url;

                } else {
                    console.log('error');
                }
            })
            .catch(error => console.log('error', error));
        })
    })
}