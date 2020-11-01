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