export function usersResults() {

        const userId = document.getElementById('userIdMain').value;

        const payLoad = new URLSearchParams({ userId: userId});

        fetch('http://localhost/WindowsUniverse/server/controllers/userControllers/fetchUsersResultsController.php', {
            method: 'POST',
            body: payLoad,
        })
        .then(res => res.json())
        .then(data => {
            if(data.success) {

                const myUsers = document.getElementById('myUsers');

                myUsers.innerHTML = '';

                data.users.forEach(user => {
                    const myUser = document.createElement('div');
                    myUser.id = 'myUser';
                    myUser.innerHTML = `
                            <div id="myUserResultImageNameStatusDiv" class="flex">
                                <img id="myUserResultImage" src="${user.user_icon}" alt="">
                            <div id="myUserResultNameStatusRequestDiv">
                                    <div id="myUserResultNameStatusDiv" class="flex">
                                    <h3 id="myUserResultName">${user.username}</h3>
                                    <div id="myUserStatusResult" style="background: ${user.is_online == 1 ? '#7CDF4E' : '#dd3f31'};"></div>
                                    </div>
                                    <div id="myUserResultRequestDiv" class="flex">
                                    <h3>+</h3>
                                    <button class="myUserResultAddFriendBtn" data-receiver-id=${user.user_id}><img class="myUserResultAddFriendImageBtn" src="/client/assets/images/request.png" alt=""></button>
                                    </div>
                            </div>
                            </div>
                            <div id="mySeeProfileBtnDiv" class="flex">
                                <button id="mySeeProfileBtn" data-user-id=${user.user_id}><h3 id="mySeeProfileBtnH3">See Profile</h3></button>
                            </div>
                    `;
                    myUsers.appendChild(myUser);
                })

            } else {
                console.log('Error');
            }
        })
        .catch(error => console.log('Error', error));
}

const myNetworkingUsersBtn = document.getElementById('myNetworkingUsersBtn');
const myUsersResults = document.getElementById('myUsersResults');
const myFriendsResults = document.getElementById('myFriendsResults');
const myNetworkingUsersResults = document.getElementById('myNetworkingUsersResults');

myNetworkingUsersBtn.addEventListener('click', (e) => {
    e.preventDefault();
    usersResults();

        myNetworkingUsersResults.classList.add('display');
        myFriendsResults.classList.remove('display');
        myUsersResults.classList.add('display');

})

