export function shortcuts() {
    const mySelfBtn = document.getElementById('mySelfBtn');
    const myEditProfileDiv = document.getElementById('myEditProfileDiv');
    const myEditProfileForm = document.getElementById('myEditProfileForm');
    const myEditUserBtn = document.getElementById('myEditUserBtn');

    mySelfBtn.addEventListener('click', (e) => {
        e.preventDefault();

        myEditUserBtn.classList.add('background');
        myEditProfileDiv.classList.add('display');
        myEditProfileForm.classList.add('display');
    });

    const myMenuDiv = document.getElementById('myMenuDiv');
    const myMenuFeaturesDiv = document.getElementById('myMenuFeaturesDiv');
    const myNetworkingDiv = document.getElementById('myNetworkingDiv');
    const myNetworkingExplainOverlay = document.getElementById('myNetworkingExplainOverlay');
    const myNetworkingExplain = document.getElementById('myNetworkingExplain');
    const myNetworkingForm = document.getElementById('myNetworkingForm');
    const myNetworkingSubSpacesUserBtnsDiv = document.getElementById('myNetworkingSubSpacesUserBtnsDiv');
    const myNetworkingSubSpacesHallOfFameBtnsDiv = document.getElementById('myNetworkingSubSpacesHallOfFameBtnsDiv');
    const myNetworkingUsersResults = document.getElementById('myNetworkingUsersResults');
    const myNetworkingHallOfFameResults = document.getElementById('myNetworkingHallOfFameResults');
    const myFriendsResults = document.getElementById('myFriendsResults');
    const myMedalResults = document.getElementById('myMedalResults');
    const myUsersResults = document.getElementById('myUsersResults');
    const myStarsResults = document.getElementById('myStarsResults');
    const myTimeResults = document.getElementById('myTimeResults');
    const myFriendsBtn = document.getElementById('myFriendsBtn');
    const myRankingBtn = document.getElementById('myRankingBtn');
    const myNetworkingUsersSpaceBtn = document.getElementById('myNetworkingUsersSpaceBtn');
    const myNetworkingHallOfFameBtn = document.getElementById('myNetworkingHallOfFameBtn');
    const myNetworkingUsersSpaceImageBtn = document.getElementById('myNetworkingUsersSpaceImageBtn');
    const myNetworkingHallOfFameImageBtn = document.getElementById('myNetworkingHallOfFameImageBtn');
    const myMenuBtn = document.getElementById('myMenuBtn');
    const myChatsHeaderBtn = document.getElementById('myChatsHeaderBtn');

    function handleButtonState(activeBtn, inactiveBtn) {
        inactiveBtn.classList.remove('active');
        activeBtn.classList.add('active');
    }

    function toggleImages(activeImage, inactiveImage, activeSrc, inactiveSrc) {
        activeImage.src = activeSrc;
        inactiveImage.src = inactiveSrc;
    }

    function btns(btn, element, element2, element3, element5, element6, element7, activeBtn, inactiveBtn, activeImage, inactiveImage, activeSrc, inactiveSrc) {
        btn.addEventListener('click', (e) => {
            e.preventDefault();

            myMenuBtn.classList.add('background');
            
            handleButtonState(activeBtn, inactiveBtn);
            toggleImages(activeImage, inactiveImage, activeSrc, inactiveSrc);

            myMenuDiv.classList.add('display');
            myMenuFeaturesDiv.classList.add('display');
            myNetworkingDiv.classList.add('display');
            myNetworkingExplainOverlay.classList.add('none');
            myNetworkingExplain.classList.add('none');
            myNetworkingForm.classList.add('display');
            element.classList.add('display');
            element2.classList.add('display');
            element3.classList.add('display');
            element5.classList.remove('display');
            element6.classList.remove('display');
            element7.classList.remove('display');
            myUsersResults.classList.remove('display');
            myStarsResults.classList.remove('display');
            myTimeResults.classList.remove('display');
        });
    }

    btns(
        myFriendsBtn, 
        myNetworkingSubSpacesUserBtnsDiv, 
        myNetworkingUsersResults, 
        myFriendsResults, 
        myNetworkingSubSpacesHallOfFameBtnsDiv,  
        myNetworkingHallOfFameResults, 
        myMedalResults,
        myNetworkingUsersSpaceBtn, 
        myNetworkingHallOfFameBtn,
        myNetworkingUsersSpaceImageBtn,
        myNetworkingHallOfFameImageBtn,
        '/client/assets/images/icons/groupWhite.png', 
        '/client/assets/images/icons/ranking.png'
    );

    btns(
        myChatsHeaderBtn, 
        myNetworkingSubSpacesUserBtnsDiv, 
        myNetworkingUsersResults, 
        myFriendsResults, 
        myNetworkingSubSpacesHallOfFameBtnsDiv,  
        myNetworkingHallOfFameResults, 
        myMedalResults,
        myNetworkingUsersSpaceBtn, 
        myNetworkingHallOfFameBtn,
        myNetworkingUsersSpaceImageBtn,
        myNetworkingHallOfFameImageBtn,
        '/client/assets/images/icons/groupWhite.png', 
        '/client/assets/images/icons/ranking.png'
    );

    btns(
        myRankingBtn, 
        myNetworkingSubSpacesHallOfFameBtnsDiv, 
        myNetworkingHallOfFameResults, 
        myMedalResults, 
        myNetworkingSubSpacesUserBtnsDiv, 
        myNetworkingUsersResults, 
        myFriendsResults,
        myNetworkingHallOfFameBtn, 
        myNetworkingUsersSpaceBtn,
        myNetworkingHallOfFameImageBtn,
        myNetworkingUsersSpaceImageBtn,
        '/client/assets/images/icons/rankingWhite.png', 
        '/client/assets/images/icons/group.png'
    );
}

shortcuts();
