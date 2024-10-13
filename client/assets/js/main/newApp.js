export function newApp() {
    console.log('New App Loaded');
    const myAddAppForm = document.getElementById('myAddAppForm');
    
        myAddAppForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const payLoad = new FormData(myAddAppForm);

            fetch('http://localhost/WindowsUniverse/server/controllers/appControllers/newAppController.php', {
                method: 'POST',
                body: payLoad,
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    console.log('Success');
                } else {
                    console.log(data.error);
                }
            })
            .catch(error => console.log('Error', error));
        });
    }

    document.addEventListener('DOMContentLoaded', newApp);
