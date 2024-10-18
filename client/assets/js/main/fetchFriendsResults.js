export function friendsResults() {

    const myNetworkingFriendsBtn = document.getElementById('myNetworkingFriendsBtn');
    const myNetworkingUsersResults = document.getElementById('myNetworkingUsersResults');
    const myUsersResults = document.getElementById('myUsersResults');
    const myFriendsResults = document.getElementById('myFriendsResults');

    myNetworkingFriendsBtn.addEventListener('click', (e) => {
        e.preventDefault();

            myNetworkingUsersResults.classList.add('display');
            myUsersResults.classList.remove('display');
            myFriendsResults.classList.add('display');
    })
}

friendsResults();