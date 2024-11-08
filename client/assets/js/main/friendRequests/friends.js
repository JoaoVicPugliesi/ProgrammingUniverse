import { friendMessages } from "../messages/friendMessages.js";
import { lastGroupMessages } from "../messages/lastGroupMessages.js";
import { seeProfileDisplay } from "../seeProfileDisplay.js";

export function friends() {
    console.log('friends');
    const userId = localStorage.getItem('user_id');

    const payLoad = new URLSearchParams({userId: userId});

    fetch('http://localhost/WindowsUniverse/server/controllers/friendshipControllers/friendsController.php', {
        method: 'POST',
        body: payLoad,
    })
    .then(res => res.json())
    .then(data => {
        if(data.success) {

           const myFriendsOnlineResult = document.getElementById('myFriendsOnlineResult');
           const myFriendsOfflineResult = document.getElementById('myFriendsOfflineResult'); 

           myFriendsOnlineResult.innerHTML = '';
           myFriendsOfflineResult.innerHTML = '';
            
           data.friends.forEach(friend => {


                if(friend.is_online == 1) {
                    const myFriendOnline = document.createElement('div');
                    myFriendOnline.id = 'myFriendOnline';
                    myFriendOnline.innerHTML = `
                        <div id="myFriendOnlineImageNameLastSeen" class="flex">
                            <img id="myFriendOnlineImage" src="${friend.user_icon}" alt="">
                            <div id="myFriendOnlineNameLastSeenMessage" class="flex">
                                    <h3 id="myFriendOnlineName">${friend.username}</h3>
                                    <div id="myFriendOnlineLastSeenMessage" class="flex">
                                            <h3 id="myFriendOnlineLastSeen" class="flex">Online <div id="myFriendOnlineStatus"></div></h3>
                                            <button class="myFriendOnlineChatBtn" class="flex"><img id="myFriendOnlineChat" src="/client/assets/images/icons/chat.png" alt=""></button>
                                    </div>
                            </div>
                        </div>
                        <div id="myFriendOnlineBtnDiv" class="flex">
                                <button class="myFriendOnlineBtn" data-user-id=${friend.user_id}><h3 id="myFriendOnlineBtnH3">See Profile</h3></button>
                        </div>
                    `;

                    myFriendsOnlineResult.appendChild(myFriendOnline);
                }

                if(friend.is_online == 0) {

                    const myFriendOffline = document.createElement('div');
                    myFriendOffline.id = 'myFriendOffline';
                    myFriendOffline.innerHTML = `
                        <div id="myFriendOfflineImageNameLastSeen" class="flex">
                            <img id="myFriendOfflineImage" src="${friend.user_icon}" alt="">
                            <div id="myFriendOfflineNameLastSeenMessage" class="flex">
                                    <h3 id="myFriendOfflineName">${friend.username}</h3>
                                    <div id="myFriendOfflineLastSeenMessage" class="flex">
                                            <h3 id="myFriendOfflineLastSeen" class="flex">Offline <div id="myFriendOfflineStatus"></div></h3>
                                            <button class="myFriendOfflineChatBtn" class="flex"><img id="myFriendOfflineChat" src="/client/assets/images/icons/chat.png" alt=""></button>
                                    </div>
                            </div>
                        </div>
                        <div id="myFriendOfflineBtnDiv" class="flex">
                                <button class="myFriendOfflineBtn" data-user-id=${friend.user_id}><h3 id="myFriendOfflineBtnH3">See Profile</h3></button>
                        </div>
                    `;

                    myFriendsOfflineResult.appendChild(myFriendOffline);
                }
           })

           const myProfileAddSectionBtnDiv = document.querySelector('.myProfileAddSectionBtnDiv');
           const myProfileRemoveSectionBtnDiv = document.querySelector('.myProfileRemoveSectionBtnDiv');
           const myFriendOnlineBtn = document.querySelectorAll('.myFriendOnlineBtn');
           const myFriendOfflineBtn = document.querySelectorAll('.myFriendOfflineBtn');
           const mySeeProfileNameBtnDiv = document.getElementById('mySeeProfileNameBtnDiv');
           const myChat = document.getElementById('myChat');
           const myFriendOfflineChatBtn = document.querySelectorAll('.myFriendOfflineChatBtn');
           const myFriendOnlineChatBtn = document.querySelectorAll('.myFriendOnlineChatBtn');

           function chatDisplay (btns) {
                btns.forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        e.preventDefault();
                        myChat.classList.add('display');
                        lastGroupMessages();
                        friendMessages();
                    })
                })
           }

           chatDisplay(myFriendOnlineChatBtn);
           chatDisplay(myFriendOfflineChatBtn);

           function btnsdisplay (btns)  {
                btns.forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        e.preventDefault();
                        myProfileAddSectionBtnDiv.classList.add('remove');
                        myProfileRemoveSectionBtnDiv.classList.add('display');
                        mySeeProfileNameBtnDiv.classList.add('display');
                    })
                })
           }

           btnsdisplay(myFriendOnlineBtn);
           btnsdisplay(myFriendOfflineBtn);

           seeProfileDisplay(myFriendOnlineBtn);
           seeProfileDisplay(myFriendOfflineBtn);

        } else {
            console.log('error');
        }
    })
    .catch(error => console.log('Error', error));
}

friends();