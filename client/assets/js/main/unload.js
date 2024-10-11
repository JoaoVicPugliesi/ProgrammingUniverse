export function unload() {

    window.addEventListener('beforeunload', function() {
        const fetchedUserId = localStorage.getItem('user_id');
        if (fetchedUserId) {
            const payLoad = new URLSearchParams({ userId: fetchedUserId });
    
            fetch('http://localhost/WindowsUniverse/server/controllers/logoutController.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: payLoad,
            }).then(res => res.json())
              .then(data => {
                  if (data.success) {
                      console.log('User set to offline');  
                  } else {
                      console.log('Error setting user to offline');
                  }
              }).catch(error => console.log('Error', error));
        }
    });
    
}