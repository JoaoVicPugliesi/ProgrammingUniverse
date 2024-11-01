export function seeProfileDisplay(btns) {

    const myProfileIcon = document.getElementById('myProfileIcon');
    const mySeeProfileName = document.getElementById('mySeeProfileName');
    const mySeeProfileMedalScoresNumber = document.getElementById('mySeeProfileMedalScoresNumber');
    const mySeeProfileStarScoresNumber = document.getElementById('mySeeProfileStarScoresNumber');
    const myProfileDescription = document.getElementById('myProfileDescription');
    const myProfileAppsSectionBtn = document.getElementById('myProfileAppsSectionBtn');
    const myProfileDescriptionDiv = document.getElementById('myProfileDescriptionDiv');
    const mySeeProfileApps = document.getElementById('mySeeProfileApps');
    const myProfileAddSectionSenderId = document.getElementById('myProfileAddSectionSenderId');
    const myProfileAddSectionReceiverId = document.getElementById('myProfileAddSectionReceiverId');
    const myProfileRemoveSectionSenderId = document.getElementById('myProfileRemoveSectionSenderId');
    const myProfileRemoveSectionReceiverId = document.getElementById('myProfileRemoveSectionReceiverId');
    
    btns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            mySeeProfileApps.classList.remove('display');
            myProfileDescriptionDiv.classList.remove('remove');
            myProfileDescriptionDiv.classList.remove('display');
    
            const mySeeProfile = document.getElementById('mySeeProfile');
    
            mySeeProfile.classList.add('display');
    
            const myProfileCloseBtn = document.getElementById('myProfileCloseBtn');
    
            myProfileCloseBtn.addEventListener('click', (e) => {
                e.preventDefault();
                mySeeProfile.classList.remove('display');
            })
    
            const userId = btn.getAttribute('data-user-id');
            
            const payLoad = new URLSearchParams({userId: userId});
    
            fetch('http://localhost/WindowsUniverse/server/controllers/userControllers/fetchLoggedUserController.php', {
                method: 'POST',
                body: payLoad,
            })
            .then(res => res.json())
            .then(data => {
                if(data.success) {
                    myProfileIcon.src = data.user.user_icon; 
                    mySeeProfileName.innerHTML = data.user.username;
                    mySeeProfileMedalScoresNumber.innerHTML = data.user.medal_count;
                    mySeeProfileStarScoresNumber.innerHTML = data.user.total_stars;
                    myProfileDescription.textContent = data.user.user_description;
                    myProfileAppsSectionBtn.setAttribute('data-user-id', data.user.user_id);
                    myProfileAddSectionSenderId.value = localStorage.getItem('user_id');
                    myProfileAddSectionReceiverId.value = data.user.user_id;
                    myProfileRemoveSectionSenderId.value = localStorage.getItem('user_id');
                    myProfileRemoveSectionReceiverId.value = data.user.user_id;

                } else {
                    console.log('error');
                }
            })
            .catch(error => console.log('Error', error));
    
        })
    })
}
