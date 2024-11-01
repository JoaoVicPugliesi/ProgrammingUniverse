import { friendRequest } from "./friendRequests/friendRequest.js";
import { seeProfileDisplay } from "./seeProfileDisplay.js";

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

                const myGroupChatConversationReceiverMembersH3 = document.getElementById('myGroupChatConversationReceiverMembersH3');
                const myGroupChatConversationReceiverMembersOnlineH3 = document.getElementById('myGroupChatConversationReceiverMembersOnlineH3');
                const users = data.users;
                const onlineUsers = users.filter(user => user.is_online === 1);
                myGroupChatConversationReceiverMembersH3.innerHTML = `${users.length + 1} members ` ;
                myGroupChatConversationReceiverMembersOnlineH3.innerHTML = `${onlineUsers.length + 1} online`;

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
                                <button class="mySeeProfileBtn" data-user-id="${user.user_id}"><h3 id="mySeeProfileBtnH3">See Profile</h3></button>
                            </div>
                    `;
                    myUsers.appendChild(myUser);
                })


                const myProfileAddSectionBtnDiv = document.querySelector('.myProfileAddSectionBtnDiv');
                const myProfileRemoveSectionBtnDiv = document.querySelector('.myProfileRemoveSectionBtnDiv');
                const myProfileAddSectionBtn = document.querySelector('.myProfileAddSectionBtn');
                const myUserResultAddFriendForm = document.querySelectorAll('.myUserResultAddFriendForm');
                const mySeeProfileNameBtnDiv = document.getElementById('mySeeProfileNameBtnDiv');

                myProfileAddSectionBtnDiv.classList.remove('remove');
                myProfileRemoveSectionBtnDiv.classList.remove('display');
                mySeeProfileNameBtnDiv.classList.remove('display');

                friendRequest(myUserResultAddFriendForm, myProfileAddSectionBtn);

                const mySeeProfileBtn = document.querySelectorAll('.mySeeProfileBtn');
                
                seeProfileDisplay(mySeeProfileBtn);
               


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

