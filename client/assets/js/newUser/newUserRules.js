function newUserRules() {
    const myRulesDiv = document.getElementById('myRulesDiv');
    const newUserRulesBtn = document.getElementById('newUserRulesBtn');

    newUserRulesBtn.addEventListener('click', () => {
        if(myRulesDiv.classList.contains('display')) {
            myRulesDiv.classList.remove('display');
        } else {
            myRulesDiv.classList.add('display');
        }
    })

}

newUserRules();