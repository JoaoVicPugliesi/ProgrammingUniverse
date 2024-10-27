export function openAppContainer(elements, element2, element3, element6) {
    elements.forEach(element => {
        element.addEventListener('click', (e) => {
            e.preventDefault();

            if (element2.classList.contains('minimize')) {
                element2.classList.remove('minimize');
            }
            element2.classList.add('display');
            
            elements.forEach(el => el.classList.remove('background'));
            element.classList.add('background');
        });
    });

    element3.addEventListener('click', (e) => {
        e.preventDefault();
        if (!element2.classList.contains('minimize')) {
            element2.classList.add('minimize');
        }
    });

    element6.addEventListener('click', (e) => {
        e.preventDefault();

        const openApp = document.querySelector('.myAppContainer.background');
        if (openApp) openApp.classList.remove('background');

        element2.classList.remove('display');
        element2.style.left = '';
        element2.style.top = '';
        element2.style.transform = '';
    });

    let isDragging = false;
    let startX, startY, initialX, initialY;

    element2.addEventListener('mousedown', (e) => {
        if (!e.target.closest('#myAppContainerInfoForm') && !e.target.closest('#myForeignAppContainerInfo')) {
            e.preventDefault(); 
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;

            initialX = element2.offsetLeft;
            initialY = element2.offsetTop;

            document.addEventListener('mousemove', drag);
            document.addEventListener('mouseup', stopDrag);
        }
    });

    function drag(e) {
        if (isDragging) {
            e.preventDefault();

            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;

            element2.style.left = `${initialX + deltaX}px`;
            element2.style.top = `${initialY + deltaY}px`;
        }
    }

    function stopDrag(e) {
        if (isDragging) {
            e.preventDefault();
            isDragging = false;

            document.removeEventListener('mousemove', drag);
            document.removeEventListener('mouseup', stopDrag);
        }
    }
}
