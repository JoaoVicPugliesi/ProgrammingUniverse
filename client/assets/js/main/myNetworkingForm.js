export function myNetworkingForm() { 
    const myAddAppExplainOverlay = document.getElementById('myAddAppExplainOverlay');
    const myAddAppExplain = document.getElementById('myAddAppExplain');
    const myAddAppExplainBtn = document.getElementById('myAddAppExplainBtn');
    const myNetworkingExplainOverlay = document.getElementById('myNetworkingExplainOverlay');
    const myNetworkingExplain = document.getElementById('myNetworkingExplain');
    const myNetworkingExplainBtn = document.getElementById('myNetworkingExplainBtn');
    const myAddAppForm = document.getElementById('myAddAppForm');
    const myNetworkingForm = document.getElementById('myNetworkingForm');

    function myExplainDisplay(btn, element1, element2, form) {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            element1.classList.add('none');
            element2.classList.add('none');
            form.classList.add('display');
        });
    }

    myExplainDisplay(myAddAppExplainBtn, myAddAppExplain, myAddAppExplainOverlay, myAddAppForm);
    myExplainDisplay(myNetworkingExplainBtn, myNetworkingExplain, myNetworkingExplainOverlay, myNetworkingForm);

    const myNetworkingUsersSpaceBtn = document.getElementById('myNetworkingUsersSpaceBtn');
    const myNetworkingHallOfFameBtn = document.getElementById('myNetworkingHallOfFameBtn');
    const myNetworkingUsersSpaceImageBtn = document.getElementById('myNetworkingUsersSpaceImageBtn');
    const myNetworkingHallOfFameImageBtn = document.getElementById('myNetworkingHallOfFameImageBtn');
    const myNetworkingSubSpacesUserBtnsDiv = document.getElementById('myNetworkingSubSpacesUserBtnsDiv');
    const myNetworkingSubSpacesHallOfFameBtnsDiv = document.getElementById('myNetworkingSubSpacesHallOfFameBtnsDiv');
    const myNetworkingUsersResults = document.getElementById('myNetworkingUsersResults');
    const myNetworkingHallOfFameResults = document.getElementById('myNetworkingHallOfFameResults');

    function handleButtonState(activeBtn, inactiveBtn) {
        inactiveBtn.classList.remove('active');
        activeBtn.classList.add('active');
    }

    function toggleImages(activeImage, inactiveImage, activeSrc, inactiveSrc) {
        activeImage.src = activeSrc;
        inactiveImage.src = inactiveSrc;
    }

    function mySubSpacesDisplay(btn, btn2, image1, image2, subspaces1, subspaces2, activeImageSrc, inactiveImageSrc, results1, results2) {
        btn.addEventListener('click', (e) => {
            e.preventDefault();

            handleButtonState(btn, btn2);
            toggleImages(image1, image2, activeImageSrc, inactiveImageSrc);

            subspaces2.classList.remove('display');
            subspaces1.classList.add('display');
            results1.classList.remove('display');
            results2.classList.remove('display');
        });
    }

    mySubSpacesDisplay(
        myNetworkingUsersSpaceBtn,
        myNetworkingHallOfFameBtn,
        myNetworkingUsersSpaceImageBtn,
        myNetworkingHallOfFameImageBtn,
        myNetworkingSubSpacesUserBtnsDiv,
        myNetworkingSubSpacesHallOfFameBtnsDiv,
        '/client/assets/images/icons/groupWhite.png',
        '/client/assets/images/icons/ranking.png',
        myNetworkingUsersResults,
        myNetworkingHallOfFameResults 
    );

    mySubSpacesDisplay(
        myNetworkingHallOfFameBtn,
        myNetworkingUsersSpaceBtn,
        myNetworkingHallOfFameImageBtn,
        myNetworkingUsersSpaceImageBtn,
        myNetworkingSubSpacesHallOfFameBtnsDiv,
        myNetworkingSubSpacesUserBtnsDiv,
        '/client/assets/images/icons/rankingWhite.png',
        '/client/assets/images/icons/group.png',
        myNetworkingHallOfFameResults, 
        myNetworkingUsersResults
    );
}

myNetworkingForm();
