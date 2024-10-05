export function fetchUsers() {
    const userContainers = document.getElementById('userContainer');
    
    fetch('http://localhost/WindowsUniverse/server/controllers/profileController.php')
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                userContainers.innerHTML = ''; 

                data.users.forEach(user => {
                    const userDiv = document.createElement('div');
                    userDiv.id = 'myContainer';

                    userDiv.innerHTML = `
                        <div id="myImageContainer">
                            <img id="myProfileImage" src="${user.user_icon}" alt="myProfileImg">
                            <div id="myButtonDiv" class="flex">
                                <button class="myEnterButton" data-user-id="${user.user_id}">
                                    <img id="myEnterButtonImage" src="/client/assets/images/enter.png" alt="myEnterImg">
                                </button>
                                <button class="myDeleteButton" data-user-id="${user.user_id}">
                                    <img id="myDeleteButtonImage" src="/client/assets/images/delete.png" alt="myDeleteImg">
                                </button>
                            </div>
                        </div>
                        <div id="myNameDiv">
                            <h3 id="myProfileName">${user.username}</h3>
                        </div>
                    `;

                    userContainers.appendChild(userDiv);
                });
            } else {
                console.log('No users Found');
            }
        })
        .catch(error => console.error('Error', error));
}
