const myEditProfileDiv = document.getElementById('myEditProfileDiv');
const myEditUserBtn = document.getElementById('myEditUserBtn');
const myMenuDiv = document.getElementById('myMenuDiv');
const myMenuBtn = document.getElementById('myMenuBtn');
const myEditProfileForm = document.getElementById('myEditProfileForm');
const myEditProfileBannerBtn = document.getElementById('myEditProfileBannerBtn');
const myEditProfileBannerImage = document.getElementById('myEditProfileBannerImage');
const myEditIconBtn = document.getElementById('myEditIconBtn');
const myEditAlbum = document.getElementById('myEditAlbum');
const myCloseAlbumBtn = document.getElementById('myCloseAlbumBtn');


export function myNavBar(btn, element, image) {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        
        if (element.classList.contains('display')) {
            element.classList.remove('display');
            btn.classList.remove('background');
            image.src = '/client/assets/images/icons/view.png';
        } else {
            element.classList.add('display');
            btn.classList.add('background');
            image.src = '/client/assets/images/icons/hide.png';
        }
    });
}


myNavBar(myCloseAlbumBtn, myEditAlbum);
myNavBar(myEditIconBtn, myEditAlbum);
myNavBar(myEditUserBtn, myEditProfileDiv);
myNavBar(myMenuBtn, myMenuDiv);
myNavBar(myEditProfileBannerBtn, myEditProfileForm, myEditProfileBannerImage);




