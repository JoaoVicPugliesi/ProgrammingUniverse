window.onload = function() {

    const myFlashMessage = document.getElementById('myFlashMessage');

    if(localStorage.getItem('success') && localStorage.getItem('display')) {
        myFlashMessage.textContent = localStorage.getItem('success');
        myFlashMessage.className = localStorage.getItem('display');
        setTimeout(() => {
            myFlashMessage.classList.add('fade-out'); 
            setTimeout(() => {
                myFlashMessage.classList.remove('show', 'fade-out'); 
                myFlashMessage.className = 'myFlashMessage'; 
            }, 500); 
        }, 3000); 


        localStorage.removeItem('success');
        localStorage.removeItem('display');
    } 
}