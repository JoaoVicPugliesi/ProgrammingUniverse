export function friendRequest() {
    const addFriendBtn = document.querySelectorAll('.myUserResultAddFriendBtn');
    const senderId = document.getElementById('userIdMain').value;
    
    addFriendBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const receiverId = addFriendBtn.getAttribute('data-receiver-id');

        const payLoad = new URLSearchParams({senderId: senderId, receiverId: receiverId});

        fetch('http://localhost/WindowsUniverse/server/controllers/friendshipControllers/friendRequestController.php', {
            method: 'POST',
            body: payLoad,
        })
        .then(res => res.json()) 
        .then(data => {
            if(data.success) {
                console.log(data.message);
            } else {
                console.log('Error' + data.message);
            }
        }) 
        .catch(error => console.log('Error', error));
    }) 
}

friendRequest();
