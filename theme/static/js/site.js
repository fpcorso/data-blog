/*********
JS for Blog ✔
**********/

// Saves dark mode preference to local storage to be checked in
// future page loads.
function saveDarkModePreference( enabled ) {
    if ( enabled ) {
        localStorage.setItem( 'darkModeEnabled', 1 );
    } else {
        localStorage.setItem( 'darkModeEnabled', 0 );
    }
}

// Loads the dark mode preference.
function loadDarkModePreference() {
    let preference = localStorage.getItem( 'darkModeEnabled' );
    if ( preference === null || parseInt(preference) === 0 ) {
        return false;
    }
    return true;
}

// Switches toggle to on and adds dark mode class to body.
function enableDarkMode() {
    document.querySelector('#dark-switch').checked = true;
    document.body.classList.add('dark');
}

// Switches toggle to off and removes dark mode class to body.
function disableDarkMode() {
document.querySelector('#dark-switch').checked = false;
    document.body.classList.remove('dark');
}

// During the onload event, check if dark mode should be on.
window.addEventListener('load', (event) => {
    if (loadDarkModePreference()) {
        enableDarkMode();
    } else {
        disableDarkMode();
    }
});

// Sets up dark mode switcher.
document.querySelector( '#dark-switch' ).addEventListener( 'change', function( event ) {
    if (event.target.checked) {
        enableDarkMode();
        saveDarkModePreference(true);
    } else {
        disableDarkMode();
        saveDarkModePreference(false);
    }
});

// Sets up the scroll indicator.
var p_elements = document.querySelectorAll('p');
document.querySelector('#scroll-indicator').style.display = 'block';
document.addEventListener('wheel', (evt) => {
    var seen = 0;

    // Determine which p elements are visible and calculate seen percentage.
    p_elements.forEach((element, index) => {
        let rect = element.getBoundingClientRect();
        let inView = rect.bottom > 0 && rect.bottom < window.innerHeight;
        if ( inView ) {
            seen = ( index / p_elements.length ) * 100;
        }
    });

    // If the first p is visible, set to 0.
    let rect = p_elements[0].getBoundingClientRect();
    let inView = rect.bottom > 0 && rect.bottom < window.innerHeight;
    if ( inView ) {
        seen = 0;
    }

    // If the last p is visible, set to 100.
    rect = p_elements[p_elements.length - 1].getBoundingClientRect();
    inView = rect.bottom > 0 && rect.bottom < window.innerHeight;
    if ( inView ) {
        seen = 100;
    }
    document.querySelector('#scroll-indicator').value = seen;
}, { capture: false, passive: true})