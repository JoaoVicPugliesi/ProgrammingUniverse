export function friendRequest() {
    const myUserResultAddFriendForm = document.querySelectorAll('.myUserResultAddFriendForm');

    myUserResultAddFriendForm.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();  
            const prePayLoad = new FormData(form);
            const payLoad = new URLSearchParams(prePayLoad);

            fetch('http://localhost/WindowsUniverse/server/controllers/friendshipControllers/friendRequestController.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: payLoad,
            })
            .then(res => res.json()) 
            .then(data => {

                const myFriendRequestFeedback = document.getElementById('myFriendRequestFeedback');
                const myFriendRequestFeedbackH3 = document.getElementById('myFriendRequestFeedbackH3');
                const myFriendRequestFeedbackP = document.getElementById('myFriendRequestFeedbackP');
                const myFriendRequestFeedbackBtn = document.getElementById('myFriendRequestFeedbackBtn');
                
                if (data.success) {
                    myFriendRequestFeedback.classList.add('display');
                    myFriendRequestFeedbackH3.textContent = 'Easy Peasy!';
                    myFriendRequestFeedbackP.textContent = data.message;
                    myFriendRequestFeedbackBtn.addEventListener('click', (e) => {
                        e.preventDefault();
                        myFriendRequestFeedback.classList.remove('display');
                    })
                } else {
                    myFriendRequestFeedback.classList.add('display');
                    myFriendRequestFeedbackH3.textContent = 'Oops!';
                    myFriendRequestFeedbackP.textContent = data.message;
                    myFriendRequestFeedbackBtn.addEventListener('click', (e) => {
                        e.preventDefault();
                        myFriendRequestFeedback.classList.remove('display');
                    }) 
                }
            }) 
            .catch(error => console.log('Error', error));
        });
    });
}

friendRequest();
