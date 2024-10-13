const myMenuFeatureAddAppBtn = document.getElementById('myMenuFeatureAddAppBtn');
const myAddAppDiv = document.getElementById('myAddAppDiv');
const myMenuFeatureNetworkingBtn = document.getElementById('myMenuFeatureNetworkingBtn');
const myNetworkingDiv = document.getElementById('myNetworkingDiv');
const myMenuFeatureInfoBtn = document.getElementById('myMenuFeatureInfoBtn');
const myInfoDiv = document.getElementById('myInfoDiv');
const myMenuFeatureConfigBtn = document.getElementById('myMenuFeatureConfigBtn');
const myConfigDiv = document.getElementById('myConfigDiv');
const myAddAppLogo = document.getElementById('myAddAppLogo');
const myAddAppLogoLabel = document.getElementById('myAddAppLogoLabel');

export function myMenuFeaturesDisplay(btn, element, element2, element3, element4) {
    
    btn.addEventListener('click', (e) => {
        e.preventDefault();

        if(element.classList.contains('display')) {
            element.classList.remove('display');
        } else {
            element.classList.add('display');
            element2.classList.remove('display');
            element3.classList.remove('display');
            element4.classList.remove('display');
        }

    })

}

myMenuFeaturesDisplay(myMenuFeatureAddAppBtn, myAddAppDiv, myNetworkingDiv, myInfoDiv, myConfigDiv);
myMenuFeaturesDisplay(myMenuFeatureNetworkingBtn, myNetworkingDiv, myInfoDiv, myConfigDiv, myAddAppDiv);
myMenuFeaturesDisplay(myMenuFeatureInfoBtn, myInfoDiv, myConfigDiv, myAddAppDiv, myNetworkingDiv);
myMenuFeaturesDisplay(myMenuFeatureConfigBtn, myConfigDiv, myAddAppDiv, myNetworkingDiv, myInfoDiv);

export function upload(input, element) {
    const file = input.files[0]; 

    if (file) {
        const reader = new FileReader(); 

        reader.onload = function(e) {
            element.style.backgroundImage = `url(${e.target.result})`;
        };

        reader.readAsDataURL(file); 
    }
}

myAddAppLogo.addEventListener('change', function() {
    upload(myAddAppLogo, myAddAppLogoLabel);
});
