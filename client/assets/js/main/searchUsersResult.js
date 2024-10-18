import { usersResults } from "./fetchUsersResults.js";

export function searchUsersResults() {

    const myUsersSearch = document.getElementById('myUsersSearch');
    const myUsers = document.getElementById('myUsers');
    const userId = localStorage.getItem('user_id');
    
    let debounceTimeout;
    const debounce = (func, delay) => {
        return (...args) => {
            clearTimeout(debounceTimeout);
            debounceTimeout = setTimeout(() => func.apply(this, args), delay);
        };
    };

    const fetchSearchResults = () => {
        const searchValue = myUsersSearch.value.trim();
        if (searchValue.length === 0) {
            usersResults();
            return;
        }

        const payLoad = new URLSearchParams({searchedUsernameExcept: searchValue, userId: userId});

        fetch('http://localhost/WindowsUniverse/server/controllers/userControllers/searchUserController.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: payLoad,
        })
        .then(res => res.json())
        .then(data => {
            myUsers.innerHTML = '';

            if(data.success && data.users.length > 0) {

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
                console.log('error');
            }
        })
        .catch(error => console.log('Error', error));
    };

    myUsersSearch.addEventListener('keyup', debounce(fetchSearchResults, 300)); 
}

searchUsersResults();