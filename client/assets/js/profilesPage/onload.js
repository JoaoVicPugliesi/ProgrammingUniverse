export function onload() {
    window.addEventListener ('load', function() {
        setTimeout(() => {
            myBody.classList.add('display');
        }, 20)
        setTimeout(() => {
            myLoadOverlay.classList.add('display');
            myLoad.classList.add('display');
            setTimeout(() => {
                myLoadOverlay.classList.remove('display');
                myLoad.classList.remove('display');
            }, 2000)
        })
    });
}

