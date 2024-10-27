export function friendRequest(forms, btn) {
    const myProfileAddSectionSenderId = document.getElementById('myProfileAddSectionSenderId');
    const myProfileAddSectionReceiverId = document.getElementById('myProfileAddSectionReceiverId');

    const handleSubmit = (e) => {
        e.preventDefault();  
        const prePayLoad = new FormData(e.target); 
        const payLoad = new URLSearchParams(prePayLoad);
        triggerFetch(payLoad);
    };

    forms.forEach(form => {

        form.removeEventListener('submit', handleSubmit);
        form.addEventListener('submit', handleSubmit);
    });

    const handleClick = (e) => {
        e.preventDefault();  
        const payLoad = new URLSearchParams({ 
            sender_id: myProfileAddSectionSenderId.value, 
            receiver_id: myProfileAddSectionReceiverId.value 
        });
        triggerFetch(payLoad);
    };

    btn.removeEventListener('click', handleClick);
    btn.addEventListener('click', handleClick);

    function triggerFetch(payLoad) {
    
        btn.disabled = true;

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

            myFriendRequestFeedback.classList.add('display');
            myFriendRequestFeedbackH3.textContent = data.success ? 'Easy Peasy!' : 'Oops!';
            myFriendRequestFeedbackP.textContent = data.message;

            myFriendRequestFeedbackBtn.onclick = (e) => {
                e.preventDefault();
                myFriendRequestFeedback.classList.remove('display');
            };
        }) 
        .catch(error => console.log('Error', error))
        .finally(() => {
    
            btn.disabled = false; 
        });
    }
}
