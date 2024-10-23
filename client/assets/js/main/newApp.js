export function newApp() {
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

                const myFriendRequestFeedback = document.getElementById('myFriendRequestFeedback');
                const myFriendRequestFeedbackH3 = document.getElementById('myFriendRequestFeedbackH3');
                const myFriendRequestFeedbackP = document.getElementById('myFriendRequestFeedbackP');
                const myFriendRequestFeedbackBtn = document.getElementById('myFriendRequestFeedbackBtn');

                if (data.success) {
                    console.log('Success');
                } else {
                    myFriendRequestFeedback.classList.add('display');
                    myFriendRequestFeedbackH3.textContent = 'Oops!';
                    myFriendRequestFeedbackP.textContent = data.error;
                    myFriendRequestFeedbackBtn.addEventListener('click', (e) => {
                        e.preventDefault();
                        myFriendRequestFeedback.classList.remove('display');
                    }) 
                }
            })
            .catch(error => console.log('Error', error));
        });
    }

    document.addEventListener('DOMContentLoaded', newApp);
