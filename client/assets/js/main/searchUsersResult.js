import { usersResults } from "./fetchUsersResults.js";
import { friendRequest } from "./friendRequests/friendRequest.js";
import { seeProfileDisplay } from "./seeProfileDisplay.js";

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
                                   <form class="myUserResultAddFriendForm">
                                        <input id="myUserResultSenderId" type="hidden" name="sender_id" value="${localStorage.getItem('user_id')}">
                                        <input id="myUserResultReceiverId" type="hidden" name="receiver_id" value="${user.user_id}">
                                        <button type="submit" class="myUserResultAddFriendBtn">
                                            <img class="myUserResultAddFriendImageBtn" src="/client/assets/images/request.png" alt="myUserResult">
                                        </button>
                                    </form>
                                    </div>
                            </div>
                            </div>
                            <div class="mySeeProfileBtnDiv">
                                <button class="mySeeProfileBtn" data-user-id=${user.user_id}><h3 id="mySeeProfileBtnH3">See Profile</h3></button>
                            </div>
                    `;
                    myUsers.appendChild(myUser);
                })

                const myProfileAddSectionBtnDiv = document.querySelector('.myProfileAddSectionBtnDiv');
                const myProfileRemoveSectionBtnDiv = document.querySelector('.myProfileRemoveSectionBtnDiv');
                const myProfileAddSectionBtn = document.querySelector('.myProfileAddSectionBtn');
                const myUserResultAddFriendForm = document.querySelectorAll('.myUserResultAddFriendForm');

                myProfileAddSectionBtnDiv.classList.remove('remove');
                myProfileRemoveSectionBtnDiv.classList.remove('display');

                friendRequest(myUserResultAddFriendForm, myProfileAddSectionBtn);

                const mySeeProfileBtn = document.querySelectorAll('.mySeeProfileBtn');
                
                seeProfileDisplay(mySeeProfileBtn);

            } else {
                console.log('');
            }
        })
        .catch(error => console.log('Error', error));
    };

    myUsersSearch.addEventListener('keyup', debounce(fetchSearchResults, 300)); 
}

searchUsersResults();