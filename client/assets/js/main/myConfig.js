export function myConfig() {
    const myIdiomsForm = document.getElementById('myIdiomsForm');
    const myIdiomsBtn = document.getElementById('myIdiomsBtn');

    myIdiomsBtn.addEventListener('click', (e) => {
        e.preventDefault();

        myIdiomsForm.classList.contains('display') ? myIdiomsForm.classList.remove('display') : myIdiomsForm.classList.add('display');
    })
    
    myIdiomsBtn.addEventListener('submit', (e) => {
        e.preventDefault();

        const prePayLoad = new FormData(myIdiomsBtn);
        const payLoad = new URLSearchParams(prePayLoad);

        fetch('http://localhost/WindowsUniverse/server/controllers/userControllers/languageController.php', {
            method: 'POST',
            body: payLoad,
        })
        .then(res => res.json())
        .then(data => {
            if(data.success) {
                console.log('Success'); 
            } else {
                console.log('Error'); 
            }
        })
        .catch(error => console.log('Error', error));
    })

}

myConfig();