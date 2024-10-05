// Here i'm handling the FlashMessages onload;
    import { handleFlashMessage } from './flashMessage.js';
    import { fetchUsers } from './fetchUsers.js';
    import { searchProfile } from './searchProfile.js';
    import { setupLogin } from './login.js';
    import { setupDeleteProfile } from './deleteProfile.js';
    import { setupPasswordToggle } from './togglePassword.js';

    document.addEventListener('DOMContentLoaded', function() {
        handleFlashMessage(); // Moved inside DOMContentLoaded
    
        // Here i'm Fetching and displaying user profiles
        fetchUsers(); 
    
        // Here i'm applying the login system
        setupLogin();
    
        // Here i'm applying the DeleteSystem
        setupDeleteProfile();
    
        // Here i'm applying the search system
        searchProfile();
    
        // Toggle password visibility
        setupPasswordToggle();

        const mySearch = document.querySelector('.mySearch');

        mySearch.addEventListener('input', function() {
            if(mySearch.value.length > 0) {
                mySearch.classList.add('change');
            } else {
                mySearch.classList.remove('change');
            }
        });
    });

   