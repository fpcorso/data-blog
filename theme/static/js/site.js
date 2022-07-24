/*********
JS for Blog ✔
**********/

/****
Slide in modal
****/

function addModalMarkup() {
    const modalHTML = `<div class="slidein" tabindex="-1">
        <button class="slidein-close"></button>
        <div class="slidein-content">
            <div class="slide-content-field">
              <label class="slide-content-label">Quick question: What area of data engineering or data science would you like to learn more about?</label>
              <div class="slide-content-control">
                <textarea id="slidein-answer" class="slidein-content-textarea" placeholder=""></textarea>
              </div>
            </div>
            <div class="slide-content-field">
              <div class="slide-content-control">
                <button id="slidein-submit" class="slide-content-button">Submit</button>
              </div>
            </div>
        </div>
    </div>`;
    const modalElement = document.createRange().createContextualFragment(modalHTML);
    document.querySelector('body').appendChild(modalElement);
}


function openModal() {
    const token = Cookies.get('slideinclosed');
    if (token === undefined) {
        document.querySelector('.slidein').classList.add('is-active');
    }
}

function closeModal() {
    document.querySelector('.slidein').classList.remove('is-active');
    Cookies.set('slideinclosed', 'yes', { expires: 1 });
}

document.addEventListener('DOMContentLoaded', () => {
    addModalMarkup();

    document.querySelector('.slidein .slidein-close').addEventListener('click', () => {
        closeModal();
    });

    document.querySelector('#slidein-submit').addEventListener('click', () => {
        const answer = document.querySelector('#slidein-answer').value;
        console.log(answer);
        fetch('https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/web/fn-df66057e-1236-454c-9a08-3d6c1d33d7d7/default/Test?survey_id=1&answer=' + encodeURIComponent(answer))
        document.querySelector('.slidein .slidein-content').replaceChildren('Thanks! I appreciate you taking the time to respond.')
    });

    document.addEventListener('keydown', (event) => {
        const e = event || window.event;

        if (e.keyCode === 27) { // Escape key
          closeModal();
        }
    });

    setTimeout(openModal, 8000);
});

/****
Dark Mode
****/

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