export function deleteApp() {

    const myDeleteAppOverlay = document.getElementById('myDeleteAppOverlay');
    const myDeleteAppForm = document.getElementById('myDeleteAppForm');
    const myDeleteAppId = document.getElementById('myDeleteAppId');
    const myDeleteAppNoBtn = document.getElementById('myDeleteAppNoBtn');
    const myTrashBin = document.getElementById('myTrashBin');
  

    document.addEventListener('dragstart', (e) => {
        const myAppContainer = e.target.closest('.myAppContainer');
        if(myAppContainer) {
            myAppContainer.classList.add('dragging');
        }
    })

    document.addEventListener('dragend', (e) => {
        const myAppContainer = e.target.closest('.myAppContainer');
        if(myAppContainer) {
            myAppContainer.classList.remove('dragging');
        }
    })

    myTrashBin.addEventListener('dragover', (e) => {
        e.preventDefault();
        myTrashBin.classList.add('background');
    })

    myTrashBin.addEventListener('dragleave', () => {
        myTrashBin.classList.remove('background');
    })

    myTrashBin.addEventListener('drop', function(e) {
        e.preventDefault(); 
        
        const myAppContainer = document.querySelector('.dragging');
        if (myAppContainer) {
            const appId = myAppContainer.querySelector('.myAppImageBtn').getAttribute('data-app-id');
            myDeleteAppId.value = appId; 
            myDeleteAppOverlay.classList.add('display');
            myDeleteAppForm.classList.add('display');
        }
        
        myTrashBin.classList.remove('background'); 
    });

  
    myDeleteAppNoBtn.addEventListener('click', function(e) {
        e.preventDefault();
        myDeleteAppId.value = '';
        myDeleteAppOverlay.classList.remove('display');
        myDeleteAppForm.classList.remove('display');
    });

    myDeleteAppForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const prePayLoad = new FormData(myDeleteAppForm);
        const payLoad = new URLSearchParams(prePayLoad);

        fetch('http://localhost/WindowsUniverse/server/controllers/appControllers/deleteAppController.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: payLoad,
        })
        .then(res => res.json())
        .then(data => {
            if(data.success) {
                myDeleteAppOverlay.classList.remove('display');
                myDeleteAppForm.classList.remove('display');
                console.log('success');
            } else {
                console.log(data.error);
            }
        })
        .catch(error => console.error('Error', error));
    })

}

deleteApp();
