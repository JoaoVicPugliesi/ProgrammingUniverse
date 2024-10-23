export function fetchUserApps () {
    const myAppContainerOpen = document.getElementById('myAppContainerOpen');
    const myAppContainerMinimizeBtn = document.getElementById('myAppContainerMinimizeBtn');
    const myAppContainerDimensionBtn = document.getElementById('myAppContainerDimensionBtn');
    const myAppContainerDimensionBtn2 = document.getElementById('myAppContainerDimensionBtn2');
    const myAppContainerCloseBtn = document.getElementById('myAppContainerCloseBtn');
    const myAppsUniverse = document.getElementById('myAppsUniverse');
    const userId = document.getElementById('userIdMain').value;
    const payLoad = new URLSearchParams({userId: userId});

    fetch('http://localhost/WindowsUniverse/server/controllers/appControllers/fetchUserAppsController.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: payLoad,
    })
    .then(res => res.json())
    .then(data => {
        if(data.success) {

            data.userApps.forEach(userApp => {

                const myAppContainer = document.createElement('div');

                myAppContainer.className = 'myAppContainer';
                myAppContainer.innerHTML = `
                     <button class="myAppImageBtn" data-app-id="${userApp.app_id}">
                     <img id="myAppImage" src="/server/controllers/appControllers/uploads/${userApp.app_logo}" alt="${userApp.app_name}">
                     <h3 id='appName'>${userApp.app_name}</h3>
                     </button>
                `;

                myAppContainer.addEventListener('click', (e) => {

                    e.preventDefault();

                    if(myAppContainerOpen.classList.contains('minimize')) {
                        myAppContainerOpen.classList.remove('minimize');
                    }
                    

                    myAppContainerOpen.classList.add('display');
                    myAppContainer.classList.add('background');
                })

                myAppContainerMinimizeBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    if (!myAppContainerOpen.classList.contains('minimize')) {
                        myAppContainerOpen.classList.add('minimize');
                    }
                })

                myAppContainerDimensionBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    
                 
                    myAppContainerOpen.classList.add('maximize');
                    
                    
                    myAppContainerOpen.style.left = '0'; 
                    myAppContainerOpen.style.top = '0'; 
                    myAppContainerOpen.style.width = '100vw'; 
                    myAppContainerOpen.style.height = '100vh';
                
                    myAppContainerDimensionBtn2.style.display = 'flex';
                    myAppContainerDimensionBtn.style.display = 'none'; 
                });
                
                myAppContainerDimensionBtn2.addEventListener('click', (e) => {
                    e.preventDefault();
                
                    
                    myAppContainerOpen.classList.remove('maximize');
                    
                    myAppContainerOpen.style.width = '30em'; 
                    myAppContainerOpen.style.height = '20em'; 
                    myAppContainerOpen.style.left = ''; 
                    myAppContainerOpen.style.top = ''; 
                
                    myAppContainerDimensionBtn.style.display = 'flex'; 
                    myAppContainerDimensionBtn2.style.display = 'none';
                });

                myAppContainerCloseBtn.addEventListener('click', (e) => {
                    e.preventDefault();

                    if(myAppContainerDimensionBtn.style.display == 'flex') { 
                        myAppContainerDimensionBtn2.style.display = 'none';
                    }; 

                    if(myAppContainerDimensionBtn.style.display == 'none') { 
                        myAppContainerDimensionBtn2.style.display = 'flex';
                    }; 
                   
                    myAppContainerOpen.classList.remove('display', 'maximize');
                    myAppContainer.classList.remove('background');

                    myAppContainerOpen.style.left = ''; 
                    myAppContainerOpen.style.top = ''; 
                    myAppContainerOpen.style.transform = '';
                })

                let isDragging = false;
                let startX, startY, initialX, initialY;
                
                myAppContainerOpen.addEventListener('mousedown', (e) => {
                    e.preventDefault();
                    if (e.target.closest('#myAppContainerOpenIcons')) { 
                        isDragging = true;
                        startX = e.clientX; 
                        startY = e.clientY;
                
                        initialX = myAppContainerOpen.offsetLeft;
                        initialY = myAppContainerOpen.offsetTop;
                
                        document.addEventListener('mousemove', drag);
                        document.addEventListener('mouseup', stopDrag);
                    }
                });
                
                function drag(e) {
                    if (isDragging) {
                        e.preventDefault();

                        const deltaX = e.clientX - startX; 
                        const deltaY = e.clientY - startY;
                
                        myAppContainerOpen.style.left = `${initialX + deltaX}px`;
                        myAppContainerOpen.style.top = `${initialY + deltaY}px`;
                    }
                }
                
                function stopDrag(e) {
                    if (isDragging) {
                        isDragging = false; 
                        
                        const rect = myAppContainerOpen.getBoundingClientRect();
                        const windowWidth = window.innerWidth;
                        const windowHeight = window.innerHeight;
                
                        if (rect.right >= windowWidth * 0.95 || 
                            rect.left <= windowWidth * 0.05 || 
                            rect.bottom >= windowHeight * 0.95 || 
                            rect.top <= windowHeight * 0.05) {
                            maximizeWindow();
                        }
                
                        document.removeEventListener('mousemove', drag);
                        document.removeEventListener('mouseup', stopDrag);
                    }
                }
                
                function maximizeWindow() {
                    myAppContainerOpen.classList.add('maximize');
                    myAppContainerOpen.style.left = '0'; 
                    myAppContainerOpen.style.top = '0'; 
                    myAppContainerOpen.style.width = '100vw'; 
                    myAppContainerOpen.style.height = '100vh';
                
                    myAppContainerDimensionBtn2.style.display = 'flex';
                    myAppContainerDimensionBtn.style.display = 'none'; 
                }


                myAppsUniverse.appendChild(myAppContainer);
            })

        } else {
            console.log('error');
        }
    })
    .catch(error => console.error('error', error));
}