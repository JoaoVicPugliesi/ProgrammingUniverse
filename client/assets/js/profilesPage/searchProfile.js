import { fetchUsers } from './fetchUsers.js';

export function searchProfile() {
    const mySearchInput = document.getElementById('mySearch');
    const userContainer = document.getElementById('userContainer'); 
    const noUsersFound = document.getElementById('noUsersFound');

    let debounceTimeout;
    const debounce = (func, delay) => {
        return (...args) => {
            clearTimeout(debounceTimeout);
            debounceTimeout = setTimeout(() => func.apply(this, args), delay);
        };
    };

    const fetchSearchResults = () => {
        const searchValue = mySearchInput.value.trim();
        if (searchValue.length === 0) {
            noUsersFound.classList.remove('block');
            fetchUsers();
            return;
        }

        const payLoad = new URLSearchParams({ searchedUsername: searchValue });

        fetch('http://localhost/WindowsUniverse/server/controllers/userControllers/searchUserController.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: payLoad,
        })
        .then(res => res.json())
        .then(data => {
            userContainer.innerHTML = ''; 
            if (data.success && data.users.length > 0) {
                noUsersFound.classList.remove('block');
                data.users.forEach(user => {
                    const userDiv = document.createElement('div');
                    userDiv.id = 'myContainer';
                    userDiv.innerHTML = `
                        <div id="myImageContainer">
                            <img id="myProfileImage" src="${user.user_icon}" alt="ProfileImg">
                            <div id="myButtonDiv" class="flex">
                                <button id="myEnterButton" class="myEnterButton" data-user-id="${user.user_id}" data-user-icon="${user.user_icon}">
                                    <img id="myEnterButtonImage" src="/client/assets/images/icons/enter.png" alt="Enter">
                                </button>
                                <button id="myDeleteButton" class="myDeleteButton" data-user-id="${user.user_id}" data-user-icon="${user.user_icon}">
                                    <img id="myDeleteButtonImage" src="/client/assets/images/icons/delete.png" alt="Delete">
                                </button>
                            </div>
                        </div>
                        <div id="myNameDiv">
                            <h3 id="myProfileName">${user.username}</h3>
                        </div>
                    `;
                    userContainer.appendChild(userDiv);
                });
            } else {
                userContainer.innerHTML = '';  
                noUsersFound.classList.add('block');
            }
        })
        .catch(error => console.log('Error', error));
    };

    mySearchInput.addEventListener('keyup', debounce(fetchSearchResults, 300)); 

    document.getElementById('mySearchForm').addEventListener('submit', function(e) {
        e.preventDefault();  
    });
}
